import React, { Component } from 'react';
import './tableFilter.css';

class TableFilter extends Component {
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
            }
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
        request.companyName.push(e.target.value);
        debugger
        this.setState({
            request:request
        }, ()=>{
            debugger
            let selectedCompanyName = '';
            const allCompanys = this.state.response.companys
            for(let i in allCompanys){
                if(allCompanys[i].value in this.state.request.companyName){
                    selectedCompanyName+=`${allCompanys[i].name}/`
                }
            }
            this.setState({
                selectedCompanyName:selectedCompanyName
            })
            console.log(this.state);
        })
    }

    render() {
        return (
            <div className="table-filter">
                <form>
                    <div className="form-group">
                        <input type="text" readOnly placeholder="单位名称" onClick={this.checkBoxSelect} value={this.state.selectedCompanyName} />
                        {this.state.selectOpen ?
                        <ul className="checkbox-select">
                            <li className="checkbox-select-item"><input name="companyName" onChange={this.changeCompanyName} value="0" type="checkbox" /> 全部</li>
                            <li className="checkbox-select-item"><input name="companyName" onChange={this.changeCompanyName} value="1" type="checkbox" /> 华为</li>
                            <li className="checkbox-select-item"><input name="companyName" onChange={this.changeCompanyName} value="2" type="checkbox" /> 三星</li>
                        </ul>
                        :
                        ''
                        }
                    </div>
                    <div className="form-group">
                        <input type="text" placeholder="单位名称" />
                    </div>
                    <div className="form-group">
                        <input type="text" placeholder="单位名称" />
                    </div>
                </form>
            </div>
        );
    }
}

export default TableFilter;