import React, { Component } from 'react';
import {fetchRecordAPI} from '../../actions/action';
import './tableFilter.css';
import { Calendar } from 'react-date-range';
import { showErrMsg } from '../tools/tools';
import { connect } from 'react-redux';

const mapDispatherToProps = (dispatch) => {
    return {
        filterRecords: (params) => {
            console.log('filter param', params);
            dispatch(fetchRecordAPI(params))
        }
    }
}

const mapStatusToProps = (state) => {
    console.log('records mapStatusToProps:',state);
    return {
        data: state.records
    }
}

class RecordsTableFilter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            companyNameSelectDisplay:false,
            attendanceStatusSelectDisplay:false,
            // selectedCompanyName:'',
            selectedAttendanceStatus:'',
            companyName:'',
            cardId:'',
            workType:'',
            userName:'',
            startTime:'',
            endTime:'',
            attendanceStatus:'',
            response:{
                companys:[
                    {value:'1',name:'中软国际'},
                    {value:'2',name:'阿里巴巴'}
                ]
            },
            startTimeshowCalendar:false,
            endTimeshowCalendar:false
         };
        this.checkBoxSelect = this.checkBoxSelect.bind(this);
        this.changeCompanyName = this.changeCompanyName.bind(this);
        this.showCalendar = this.showCalendar.bind(this);
        this.handleSelectStartDate = this.handleSelectStartDate.bind(this);
        this.handleSelectEndDate = this.handleSelectEndDate.bind(this);
        this.changeAttendanceStatus = this.changeAttendanceStatus.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.searchRequest = this.searchRequest.bind(this);
        this.hideSelect = this.hideSelect.bind(this);
    }

    hideSelect(){
        this.setState({
            companyNameSelectDisplay:false,
            attendanceStatusSelectDisplay:false,
            startTimeshowCalendar:false,
            endTimeshowCalendar:false
        })
    }

    searchRequest(){
        const { cardId,companyName,workType, userName, startTime, endTime, attendanceStatus} = this.state;
        if(cardId !== '' && !/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(cardId)){
            showErrMsg('请输入有效身份证号码！')
        }
        const params = {
            'company':companyName,
            'idCardNumber':cardId,
            'profession':workType,
            'name':userName,
            'startDate':startTime,
            'endDate':endTime,
            'status':attendanceStatus
        } 
        this.props.filterRecords(params);
    }

    onInputChange(e){
        const inputName = e.currentTarget.attributes.inputName.value;
        this.setState({
            [inputName]:e.currentTarget.value
        })
    }

    checkBoxSelect(e){
        const displayName = e.currentTarget.attributes.selectdisplayname.value;
        this.setState({
            [displayName]:!this.state[displayName]
        })
    }

    changeCompanyName(e){
        let eleTxt = e.currentTarget.attributes.textvalue.value;
        this.setState({companyName:eleTxt,companyNameSelectDisplay:false})
    }

    changeAttendanceStatus(e){
        let eleVal = e.currentTarget.value;
        let eleTxt = e.currentTarget.attributes.textvalue.value;
        this.setState({attendanceStatus:eleVal,selectedAttendanceStatus:eleTxt,attendanceStatusSelectDisplay:false})
    }

    showCalendar(e){
        const name = e.currentTarget.name;
        name === 'startTime' ? (
            this.setState({
                startTimeshowCalendar:!this.state.startTimeshowCalendar
            })
        )
        :
        (
            this.setState({
                endTimeshowCalendar:!this.state.endTimeshowCalendar
            })
        )
    }

    handleSelectStartDate(date){
        const startTime = this.handleDate(date);
        this.setState({startTime,startTimeshowCalendar:false})
    }

    handleSelectEndDate(date){
        const endTime = this.handleDate(date);
        this.setState({endTime,endTimeshowCalendar:false})
    }

    handleDate = (date) => {
        date = new Date(date);
        const year = date.getFullYear();
        const month = date.getMonth();
        const day = date.getDate();
        return  `${year}-${month}-${day}`;
    }

    render() {
        console.log(this.state.startTimeshowCalendar);
        return (
            <div className="table-filter">
                <form>
                    <div className="form-group">
                        <input type="text" readOnly placeholder="单位名称" name="companyName" className="ele-select" selectDisplayName="companyNameSelectDisplay" onClick={this.checkBoxSelect} value={this.state.companyName} />
                        {this.state.companyNameSelectDisplay ?
                        <ul className="checkbox-select">
                            <li className="checkbox-select-item"><input name="companyName" onChange={this.changeCompanyName} value="0" textvalue="" type="checkbox" /> 全部</li>
                            {this.state.response.companys.map((item, index)=>{
                                return (
                                    <li key={index} className="checkbox-select-item"><input name="companyName" onChange={this.changeCompanyName} value={item.value} textvalue={item.name} type="checkbox" /> {item.name}</li>
                                )
                            })}
                        </ul>
                        :
                        ''
                        }
                    </div>
                    <div className="form-group">
                        <input type="text" placeholder="身份证" value={this.state.cardId} inputName="cardId" onChange={this.onInputChange} />
                    </div>
                    <div className="form-group">
                        <input type="text" placeholder="工种" value={this.state.workType} inputName="workType" onChange={this.onInputChange} />
                    </div>
                    <div className="form-group">
                        <input type="text" placeholder="姓名" value={this.state.userName} inputName="userName" onChange={this.onInputChange} />
                    </div>
                    <div className="form-group">
                        <input type="text" placeholder="开始时间" value={this.state.startTime} readOnly onClick={this.showCalendar} name="startTime" />
                        {this.state.startTimeshowCalendar?
                            <Calendar style={{position:'absolute'}} date={new Date()} onChange={this.handleSelectStartDate} />
                            :
                            ''
                        }
                    </div>
                    <div className="form-group">
                        <input type="text" placeholder="结束时间" value={this.state.endTime} readOnly onClick={this.showCalendar} name="endTime"  />
                        {this.state.endTimeshowCalendar?
                            <Calendar style={{position:'absolute'}} date={new Date()} onChange={this.handleSelectEndDate} />
                            :
                            ''
                        }
                    </div>
                    <div className="form-group">
                        <input type="text" readOnly placeholder="考勤状态" name="attendanceStatus" className="ele-select" selectDisplayName="attendanceStatusSelectDisplay" onClick={this.checkBoxSelect} value={this.state.selectedAttendanceStatus} />
                        {this.state.attendanceStatusSelectDisplay ?
                        <ul className="checkbox-select">
                            <li className="checkbox-select-item"><input name="status" onChange={this.changeAttendanceStatus} value="" textvalue="全部" type="radio" /> 全部</li>
                            <li className="checkbox-select-item"><input name="status" onChange={this.changeAttendanceStatus} value="1" textvalue="正常" type="radio" /> 正常</li>
                            <li className="checkbox-select-item"><input name="status" onChange={this.changeAttendanceStatus} value="0" textvalue="缺勤" type="radio" /> 缺勤</li>
                        </ul>
                        :
                        ''
                        }
                    </div>
                    <div className="form-group">
                        <button className="btn-success" type="button" onClick={this.searchRequest}><i className="iconfont">&#xe601;</i> 查询</button>
                    </div>
                </form>
                <div className="total">
                    <div className="form-group">出勤总人数:{this.props.data.count.total}</div>
                    <div className="form-group">正常:{this.props.data.count.attendance}</div>
                    <div className="form-group">异常:{this.props.data.count.absent}</div>
                </div>
            </div>
        );
    }
}

export default connect(mapStatusToProps,mapDispatherToProps )(RecordsTableFilter);