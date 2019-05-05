import React, { Component } from 'react';
import { Calendar } from 'react-date-range';
import * as rdrLocales from 'react-date-range/dist/locale';
import { showErrMsg } from '../tools/tools';
import {fetchRecordAPI} from '../../actions/action';
import { connect } from 'react-redux';

import './tableFilter.css';

const mapDispatherToProps = (dispatch) => {
    return {
        filterRecords: (params) => {
            console.log('filter param', params);
            dispatch(fetchRecordAPI(params))
        }
    }
}

const mapStatusToProps = (state, ownProps) => {
    console.log('records mapStatusToProps:',state);
    return {
        data: state.records,
        fetchRecordsAPI:ownProps.fetchRecordsAPI
    }
}

class RecordsTableFilter extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
            companyNameSelectDisplay:false,
            attendanceStatusSelectDisplay:false,
            startTimeshowCalendar:false,
            endTimeshowCalendar:false
         };
    }

    hideSelect = () => {
        this.setState({
            companyNameSelectDisplay:false,
            attendanceStatusSelectDisplay:false,
            startTimeshowCalendar:false,
            endTimeshowCalendar:false
        })
    }

    searchRequest = () => {
        const { cardId,companyName,workType, userName, startTime, endTime, attendanceStatus} = this.state;
        if(cardId !== '' && !/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(cardId)){
            showErrMsg('请输入有效身份证号码！')
        }
        const params = {
            'company':companyName !== '全部' ? companyName: '',
            'idCardNumber':cardId,
            'profession':workType,
            'name':userName,
            'startDate':startTime,
            'endDate':endTime,
            'status':attendanceStatus !== '全部' ? attendanceStatus: '',
            'pageNumber':0
        }
        // this.props.filterRecords(params);
        this.props.fetchRecordsAPI(params);
    }

    onInputChange = (e) => {
        const inputname = e.currentTarget.attributes.inputname.value;
        this.setState({
            [inputname]:e.currentTarget.value
        })
    }

    checkBoxSelect = (e) => {
        const displayName = e.currentTarget.attributes.selectdisplayname.value;
        if(displayName === 'companyNameSelectDisplay'){
            this.setState({
                attendanceStatusSelectDisplay:false
            })
        }else if(displayName === 'attendanceStatusSelectDisplay'){
            this.setState({
                companyNameSelectDisplay:false
            })
        }
        this.setState({
            [displayName]:!this.state[displayName],
            startTimeshowCalendar:false,
            endTimeshowCalendar:false
        })
    }

    changeCompanyName = (e) => {
        let eleTxt = e.currentTarget.attributes.textvalue.value;
        this.setState({companyName:eleTxt,companyNameSelectDisplay:false})
    }

    changeAttendanceStatus = (e) => {
        let eleVal = e.currentTarget.value;
        let eleTxt = e.currentTarget.attributes.textvalue.value;
        debugger;
        this.setState({attendanceStatus:eleVal,selectedAttendanceStatus:eleTxt,attendanceStatusSelectDisplay:false})
    }

    showCalendar = (e) => {
        const name = e.currentTarget.name;
        name === 'startTime' ? (
            this.setState({
                startTimeshowCalendar:!this.state.startTimeshowCalendar,
                endTimeshowCalendar:false,
                companyNameSelectDisplay:false,
                attendanceStatusSelectDisplay:false
            })
        )
        :
        (
            this.setState({
                endTimeshowCalendar:!this.state.endTimeshowCalendar,
                companyNameSelectDisplay:false,
                attendanceStatusSelectDisplay:false,
                startTimeshowCalendar:false
            })
        )
    }

    handleSelectStartDate = (date) => {
        const startTime = this.handleDate(date);
        this.setState({startTime,startTimeshowCalendar:false})
    }

    handleSelectEndDate = (date) => {
        const endTime = this.handleDate(date);
        this.setState({endTime,endTimeshowCalendar:false})
    }

    handleDate = (date) => {
        date = new Date(date);
        const year = date.getFullYear();
        const month = (date.getMonth()+1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return  `${year}-${month}-${day}`;
    }

    render() {
        console.log(this.state.startTimeshowCalendar);
        return (
            <div className="table-filter">
                <form>
                    <div className="form-group">
                        <input type="text" readOnly placeholder="单位名称" name="companyName" className="ele-select" selectdisplayname="companyNameSelectDisplay" onClick={this.checkBoxSelect} value={this.state.companyName} />
                        {this.state.companyNameSelectDisplay ?
                        <ul className="checkbox-select">
                            <li className="checkbox-select-item"><input name="companyName" onChange={this.changeCompanyName} value="0" textvalue="全部" type="radio" /> 全部</li>
                            {this.state.response.companys.map((item, index)=>{
                                return (
                                    <li key={index} className="checkbox-select-item"><input name="companyName" onChange={this.changeCompanyName} value={item.value} textvalue={item.name} type="radio" /> {item.name}</li>
                                )
                            })}
                        </ul>
                        :
                        ''
                        }
                    </div>
                    <div className="form-group">
                        <input type="text" placeholder="身份证" value={this.state.cardId} inputname="cardId" onChange={this.onInputChange}  onClick={this.hideSelect}/>
                    </div>
                    <div className="form-group">
                        <input type="text" placeholder="工种" value={this.state.workType} inputname="workType" onChange={this.onInputChange} onClick={this.hideSelect}/>
                    </div>
                    <div className="form-group">
                        <input type="text" placeholder="姓名" value={this.state.userName} inputname="userName" onChange={this.onInputChange} onClick={this.hideSelect}/>
                    </div>
                    <div className="form-group">
                        <input type="text" placeholder="开始时间" value={this.state.startTime} readOnly onClick={this.showCalendar} name="startTime" />
                        {this.state.startTimeshowCalendar?
                            <Calendar style={{position:'absolute'}} locale={rdrLocales['zhCN']}  date={new Date()} onChange={this.handleSelectStartDate} />
                            :
                            ''
                        }
                    </div>
                    <div className="form-group">
                        <input type="text" placeholder="结束时间" value={this.state.endTime} readOnly onClick={this.showCalendar} name="endTime"  />
                        {this.state.endTimeshowCalendar?
                            <Calendar style={{position:'absolute'}} locale={rdrLocales['zhCN']} date={new Date()} onChange={this.handleSelectEndDate} />
                            :
                            ''
                        }
                    </div>
                    <div className="form-group">
                        <input type="text" readOnly placeholder="考勤状态" name="attendanceStatus" className="ele-select" selectdisplayname="attendanceStatusSelectDisplay" onClick={this.checkBoxSelect} value={this.state.selectedAttendanceStatus} />
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
                    <div className="form-group">出勤总人数:{this.props.data.count.totalNumber}</div>
                    <div className="form-group">正常:{this.props.data.count.totalNormalNumber}</div>
                    <div className="form-group">异常:{this.props.data.count.totalAbnormalNumber}</div>
                </div>
            </div>
        );
    }
}

export default connect(mapStatusToProps,mapDispatherToProps )(RecordsTableFilter);