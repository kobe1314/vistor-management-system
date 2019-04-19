import React, { Component } from 'react';
import { Calendar } from 'react-date-range';
import * as rdrLocales from 'react-date-range/dist/locale';
import {fetchSummariesAPI} from '../../actions/action';
import { connect } from 'react-redux';
import '../records/tableFilter.css';

const mapDispatherToProps = (dispatch) => {
    return {
        filterSummaries: (params) => {
            console.log('filter summaries param', params);
            dispatch(fetchSummariesAPI(params))
        }
    }
}

const mapStatusToProps = (state) => {
    console.log('records mapStatusToProps:',state);
    return {
        data: state.records
    }
}

class SummariesTableFilter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedCompanyName:'',
            companyName:'',
            response:{
                companys:[
                    {value:'1',name:'中软国际'},
                    {value:'2',name:'阿里巴巴'}
                ]
            },
            startTime:'',
            endTiem:'',
            startTimeshowCalendar:false,
            endTimeshowCalendar:false,
            companyNameSelectDisplay:false
         };
    }

    checkBoxSelect = () => {
        this.setState({
            companyNameSelectDisplay:!this.state.companyNameSelectDisplay
        })
    }

    changeCompanyName = (e) => {
        let eleTxt = e.currentTarget.attributes.textvalue.value;
        this.setState({companyName:eleTxt,companyNameSelectDisplay:false});
    }
    searchRequest = (e)=>{
        e.preventDefault();
        const {companyName, startTime, endTime} = this.state;
        const params = {
            'company':companyName,
            'startDate':startTime,
            'endDate':endTime
        }
        this.props.filterSummaries(params);
    }

    showCalendar = (e) => {
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
        const month = date.getMonth();
        const day = date.getDate();
        return  `${year}-${month}-${day}`;
    }

    render() {
        return (
            <div className="table-filter">
                <form>
                    <div className="form-group">
                        <input type="text" readOnly placeholder="单位名称" className="ele-select" onClick={this.checkBoxSelect} value={this.state.companyName} />
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
                        <input type="text" placeholder="开始月份" value={this.state.startTime} readOnly onClick={this.showCalendar} name="startTime"  />
                        {this.state.startTimeshowCalendar?
                            <Calendar style={{position:'absolute'}} locale={rdrLocales['zhCN']}  date={new Date()} onChange={this.handleSelectStartDate} />
                            :
                            ''
                        }
                    </div>
                    <div className="form-group">
                        <input type="text" placeholder="结束月份" value={this.state.endTime} readOnly onClick={this.showCalendar} name="endTime" />
                        {this.state.endTimeshowCalendar?
                            <Calendar style={{position:'absolute'}} locale={rdrLocales['zhCN']} date={new Date()} onChange={this.handleSelectEndDate} />
                            :
                            ''
                        }
                    </div>
                    <div className="form-group">
                        <button className="btn-success" onClick={this.searchRequest}><i className="iconfont">&#xe601;</i> 查询</button>
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

export default connect(mapStatusToProps,mapDispatherToProps )(SummariesTableFilter);