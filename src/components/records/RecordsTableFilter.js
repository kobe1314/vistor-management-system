import React, { Component } from 'react';
import './tableFilter.css';
import { Calendar } from 'react-date-range';
import { showErrMsg } from '../tools/tools';
import {FILTER_RECORD_API} from '../../actions/actionType';
import { connect } from 'react-redux';

const mapDispatherToProps = (dispatch) => {
    return {
        filterRecords: (req) => {
            console.log('filter param', req);
            dispatch({
                type: FILTER_RECORD_API,
                req
            })
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
            selectedCompanyName:'',
            selectedAttendanceStatus:'',
            request:{
                companyName:[0],
                cardId:'',
                workType:'',
                userName:'',
                startTime:'',
                endTime:'',
                attendanceStatus:'0'
            },
            response:{
                companys:[
                    {value:'1',name:'华为'},
                    {value:'2',name:'三星'}
                ]
            },
            attendanceStatus: 1,
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
        const request = this.state.request;
        if(request.cardId !== '' && !/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(request.cardId)){
            showErrMsg('请输入有效身份证号码！')
        }
        this.props.filterRecords(this.state.request);
    }

    onInputChange(e){
        const inputName = e.currentTarget.attributes.inputName.value;
        let request = this.state.request;
        request[inputName] = e.currentTarget.value
        this.setState({
            request:request
        })
    }

    checkBoxSelect(e){
        const displayName = e.currentTarget.attributes.selectdisplayname.value;
        this.setState({
            [displayName]:!this.state[displayName]
        })
    }

    changeCompanyName(e){
        let request = this.state.request;
        let selectedCompanyName = this.state.selectedCompanyName;
        let setVal = new Set();
        let setName = new Set();
        const val = e.currentTarget.value;
        const name = e.currentTarget.attributes.textvalue.textContent;
        request.companyName.forEach((i)=>{
            setVal.add(i);
        })
        selectedCompanyName.split('/').forEach((i)=>{
            setName.add(i);
        })
        if(e.currentTarget.checked){
            setName.add(name);
            setVal.add(val);
        }else{
            setName.delete(name);
            setVal.delete(val);
        }
        request.companyName=Array.from(setVal);
        selectedCompanyName = Array.from(setName).join('/');
        this.setState({
            request:request,
            selectedCompanyName:selectedCompanyName
        })
    }

    changeAttendanceStatus(e){
        let request = this.state.request;
        let eleVal = e.currentTarget.value;
        let eleTxt = e.currentTarget.attributes.textvalue.value;
        request.attendanceStatus = eleVal;
        this.setState({
            request:request,
            selectedAttendanceStatus:eleTxt,
            attendanceStatusSelectDisplay:false
        })
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
        date = new Date(date);
        const year = date.getFullYear();
        const month = date.getMonth();
        const day = date.getDate();
        this.setState({
            request:{
                cardId:this.state.request.cardId,
                workType:this.state.request.workType,
                userName:this.state.request.userName,
                attendanceStatus:this.state.request.attendanceStatus,
                startTime:`${year}-${month}-${day}`,
                endTime:this.state.request.endTime,
                companyName:this.state.request.companyName
            },
            startTimeshowCalendar:false,
            endTimeshowCalendar:false
        })
    }

    handleSelectEndDate(date){
        date = new Date(date);
        const year = date.getFullYear();
        const month = date.getMonth();
        const day = date.getDate();
        this.setState({
            request:{
                cardId:this.state.request.cardId,
                workType:this.state.request.workType,
                userName:this.state.request.userName,
                attendanceStatus:this.state.request.attendanceStatus,
                startTime:this.state.request.startTime,
                endTime:`${year}-${month}-${day}`,
                companyName:this.state.request.companyName
            },
            startTimeshowCalendar:false,
            endTimeshowCalendar:false
        })
    }

    render() {
        return (
            <div className="table-filter">
                <form>
                    <div className="form-group">
                        <input type="text" readOnly placeholder="单位名称" name="companyName" className="ele-select" selectDisplayName="companyNameSelectDisplay" onClick={this.checkBoxSelect} value={this.state.selectedCompanyName} />
                        {this.state.companyNameSelectDisplay ?
                        <ul className="checkbox-select">
                            <li className="checkbox-select-item"><input name="companyName" onChange={this.changeCompanyName} value="0" textvalue="全部" type="checkbox" /> 全部</li>
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
                        <input type="text" placeholder="开始时间" value={this.state.request.startTime} readOnly onClick={this.showCalendar} name="startTime" />
                        {this.state.startTimeshowCalendar?
                            <Calendar style={{position:'absolute'}} date={new Date()} onChange={this.handleSelectStartDate} />
                            :
                            ''
                        }
                    </div>
                    <div className="form-group">
                        <input type="text" placeholder="结束时间" value={this.state.request.endTime} readOnly onClick={this.showCalendar} name="endTime"  />
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
                            <li className="checkbox-select-item"><input name="status" onChange={this.changeAttendanceStatus} value="0" textvalue="全部" type="radio" /> 全部</li>
                            <li className="checkbox-select-item"><input name="status" onChange={this.changeAttendanceStatus} value="1" textvalue="正常" type="radio" /> 正常</li>
                            <li className="checkbox-select-item"><input name="status" onChange={this.changeAttendanceStatus} value="2" textvalue="缺勤" type="radio" /> 缺勤</li>
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
                    <div className="form-group">出勤总人数:20</div>
                    <div className="form-group">正常:16</div>
                    <div className="form-group">异常:4</div>
                </div>
            </div>
        );
    }
}

export default connect(mapStatusToProps,mapDispatherToProps )(RecordsTableFilter);