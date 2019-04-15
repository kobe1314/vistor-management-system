import React, { Component } from 'react';
import './tableFilter.css';

class RecordsTableFilter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectOpen:false,
            selectedCompanyName:'',
            request:{
                companyName:[]
            },
            response:{
                companys:[
                    {value:'1',name:'华为'},
                    {value:'2',name:'三星'}
                ]
            },
            attendanceStatus: 1
         };
        this.checkBoxSelect = this.checkBoxSelect.bind(this);
        this.changeCompanyName = this.changeCompanyName.bind(this);
    }

    checkBoxSelect(){
        this.setState({
            selectOpen:!this.state.selectOpen
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

    render() {
        return (
            <div className="table-filter">
                <form>
                    <div className="form-group">
                        <input type="text" readOnly placeholder="单位名称" className="ele-select" onClick={this.checkBoxSelect} value={this.state.selectedCompanyName} />
                        {this.state.selectOpen ?
                        <ul className="checkbox-select">
                            <li className="checkbox-select-item"><input name="companyName" onChange={this.changeCompanyName} value="0" textvalue="全部" type="checkbox" /> 全部</li>
                            <li className="checkbox-select-item"><input name="companyName" onChange={this.changeCompanyName} value="1" textvalue="华为" type="checkbox" /> 华为</li>
                            <li className="checkbox-select-item"><input name="companyName" onChange={this.changeCompanyName} value="2" textvalue="三星" type="checkbox" /> 三星</li>
                        </ul>
                        :
                        ''
                        }
                    </div>
                    <div className="form-group">
                        <input type="text" placeholder="身份证" />
                    </div>
                    <div className="form-group">
                        <input type="text" placeholder="工种" />
                    </div>
                    <div className="form-group">
                        <input type="text" placeholder="姓名" />
                    </div>
                    <div className="form-group">
                        <input type="text" placeholder="开始时间" />
                    </div>
                    <div className="form-group">
                        <input type="text" placeholder="结束时间" />
                    </div>
                    <div className="form-group">
                        <input type="text" placeholder="考勤状态" />
                    </div>
                    <div className="form-group">
                        <input type="text" readOnly placeholder="考勤状态" className="ele-select" onClick={this.checkBoxSelect} value={this.state.selectedCompanyName} />
                        {this.state.selectOpen ?
                        <ul className="checkbox-select">
                            <li className="checkbox-select-item"><input name="status" onChange={this.changeCompanyName} value="0" textvalue="全部" type="checkbox" /> 全部</li>
                            <li className="checkbox-select-item"><input name="status" onChange={this.changeCompanyName} value="1" textvalue="正常" type="checkbox" /> 正常</li>
                            <li className="checkbox-select-item"><input name="status" onChange={this.changeCompanyName} value="2" textvalue="缺勤" type="checkbox" /> 缺勤</li>
                        </ul>
                        :
                        ''
                        }
                    </div>
                    <div className="form-group">
                        <button className="btn-success" type="button"><i className="iconfont">&#xe601;</i> 查询</button>
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

export default RecordsTableFilter;