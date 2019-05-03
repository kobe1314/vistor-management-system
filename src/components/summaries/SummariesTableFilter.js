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

const mapStatusToProps = (state,ownProps) => {
    console.log('summaries mapStatusToProps:',state);
    return {
        data: state.summaries,
        fetchSummaries:ownProps.fetchSummaries
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
            startMonth:'',
            endMonth:'',
            startTimeshowCalendar:false,
            endTimeshowCalendar:false,
            companyNameSelectDisplay:false
         };
    }

    checkBoxSelect = () => {
        this.setState({
            companyNameSelectDisplay:!this.state.companyNameSelectDisplay,
            startTimeshowCalendar:false,
            endTimeshowCalendar:false
        })
    }

    changeCompanyName = (e) => {
        let eleTxt = e.currentTarget.attributes.textvalue.value;
        this.setState({companyName:eleTxt,companyNameSelectDisplay:false});
    }
    searchRequest = (e)=>{
        e.preventDefault();
        const {companyName, startMonth, endMonth} = this.state;
        const params = {
            company:companyName !== '全部' ? companyName: '',
            startMonth:this.formatDate(startMonth),
            endMonth:this.formatDate(endMonth),
            pageNumber:0
        }
        this.props.fetchSummaries(params);
    }

    formatDate = (date) => {
        let index = date.lastIndexOf('-');
        return date.substring(0,index);
    }

    showCalendar = (e) => {
        const name = e.currentTarget.name;
        name === 'startMonth' ? (
            this.setState({
                startTimeshowCalendar:!this.state.startTimeshowCalendar,
                endTimeshowCalendar:false,
                companyNameSelectDisplay:false
            })
        )
        :
        (
            this.setState({
                endTimeshowCalendar:!this.state.endTimeshowCalendar,
                startTimeshowCalendar:false,
                companyNameSelectDisplay:false
            })
        )
    }

    handleSelectStartDate = (date) => {
        debugger;
        const startMonth = this.handleDate(date);
        this.setState({startMonth,startTimeshowCalendar:false})
    }

    handleSelectEndDate = (date) => {
        const endMonth = this.handleDate(date);
        this.setState({endMonth,endTimeshowCalendar:false})
    }

    handleDate = (date) => {
        date = new Date(date);
        const year = date.getFullYear();
        const month = (date.getMonth()+1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
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
                        <input type="text" placeholder="开始月份" value={this.state.startMonth} readOnly onClick={this.showCalendar} name="startMonth"  />
                        {this.state.startTimeshowCalendar?
                            <Calendar style={{position:'absolute'}} locale={rdrLocales['zhCN']}  date={new Date()} onChange={this.handleSelectStartDate} />
                            :
                            ''
                        }
                    </div>
                    <div className="form-group">
                        <input type="text" placeholder="结束月份" value={this.state.endMonth} readOnly onClick={this.showCalendar} name="endMonth" />
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
                    <div className="form-group">出勤总人数:{this.props.data.count.totalNumber}</div>
                    <div className="form-group">正常:{this.props.data.count.totalNormalNumber}</div>
                    <div className="form-group">异常:{this.props.data.count.totalAbnormalNumber}</div>
                </div>
            </div>
        );
    }
}

export default connect(mapStatusToProps,mapDispatherToProps )(SummariesTableFilter);