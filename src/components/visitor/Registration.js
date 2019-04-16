import React, { Component } from 'react';
import './Registration.css';
import './print.css';
import 'isomorphic-fetch';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { Calendar } from 'react-date-range';
import { showErrMsg } from '../tools/tools';

class Registration extends Component {

    constructor(props) {
        super(props)
        this.state = {
            visitIdentityCardNumber:'',
            visitName:'',
            visitGenderType:1,
            visitPersonNumber:1,
            visitCompany:'',
            visitDepart:'',
            visitCause:'',
            visitPlateNumber:'',
            visitPhoneNumber:'',
            visitDate:'',
            visitBelongings:'',
            visitReceiver:'',
            visitTransactor:'',
            createTimestamp:'',
            showCalendar:false
        }

        this.onChange = this.onChange.bind(this);
        this.readCert = this.readCert.bind(this);
        this.print = this.print.bind(this);
        this.reset = this.reset.bind(this);
        this.exportVisit = this.exportVisit.bind(this);
        this.saveVisitorInfo = this.saveVisitorInfo.bind(this);
        this.validate = this.validate.bind(this);
        this.showCalendar = this.showCalendar.bind(this);
        this.handleSelectDate = this.handleSelectDate.bind(this);
    }

    componentDidMount(){
        const stateInfo = JSON.parse(window.sessionStorage.getItem('stateInfo'));
        for(let i in stateInfo){
            this.setState({
                [i]:stateInfo[i]
            })
        }
    }

    onChange(e) {
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    validate(){
        const reqData = this.state;
        if(reqData.visitName.length === 0){
            showErrMsg('请输入访客登记者姓名！');
            return false;
        }
        if(reqData.visitGenderType === ''){
            showErrMsg('请选择访客登记者性别！');
            return false;
        }
        if(!/\d/.test(reqData.visitPersonNumber)){
            showErrMsg('请输入有效访客数量！');
            return false;
        }
        if(!/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(reqData.visitIdentityCardNumber)){
            showErrMsg('请输入有效身份证号码！');
            return false;
        }
        if(reqData.visitCompany === ''){
            showErrMsg('请输入单位名称！');
            return false;
        }
        if(reqData.visitDepart === ''){
            showErrMsg('请输入部门名称！');
            return false;
        }
        if(reqData.visitCause === ''){
            showErrMsg('请输入来访事由！');
            return false;
        }
        if(reqData.visitPlateNumber === ''){
            showErrMsg('请输入车牌号码！');
            return false;
        }
        if(!/^1([38]\d|5[0-35-9]|7[3678])\d{8}$/.test(reqData.visitPhoneNumber)){
            showErrMsg('请输入有效手机号！');
            return false;
        }
        if(!/\d{4}-\d{1,2}-\d{1,2}/.test(reqData.visitDate)){
            showErrMsg('请输入有效来访时间！');
            return false;
        }
        if(reqData.visitBelongings === ''){
            showErrMsg('请输入访客携带物品！');
            return false;
        }
        if(reqData.visitReceiver === ''){
            showErrMsg('请输入接待者姓名！');
            return false;
        }
        else if(reqData.visitTransactor === ''){
            showErrMsg('请输入办理人姓名！');
            return false;
        }
        return true;
    }

    saveVisitorInfo () {
        if(this.validate() === true){
            const postData = JSON.stringify(this.state);
            console.log(postData);
            const vrSaveUrl = '/vr/saveVisit'
            fetch(vrSaveUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: postData
            }).then(function(response) {
                console.log(response);
            });
        }else{
            return false;
        }
    }

    print() {
        if(this.saveVisitorInfo()){
            window.print();
        }
    }

    reset() {
        //window.sessionStorage.setItem('stateInfo','{}');
        const state = this.state;
        for(let i in state){
            this.setState({
                [i]:''
            })
        }
    }

    readCert() {

        const CertCtl = window.document.getElementById('CertCtl');
		CertCtl.connect();
		const strUserInfo = CertCtl.readCert();
		// window.doReadCert();
		const userInfo = JSON.parse(strUserInfo)
        const {certNumber,partyName,gender} = userInfo.resultContent || {};
		this.setState({
            'visitIdentityCardNumber': certNumber,
            'visitName': partyName,
            'visitGenderType': gender
        },() => {})
    }

    exportVisit() {
        const vrExportUrl = '/vr/exportVisit';
        fetch(vrExportUrl).then(response => response.blob())
        .then(blob => {
            if (window.navigator && window.navigator.msSaveOrOpenBlob) {  //blob兼容IE
                window.navigator.msSaveOrOpenBlob(blob, '访客记录.xls');
              } else {
                var url = window.URL.createObjectURL(blob);
            var a = document.createElement('a');
            document.body.appendChild(a);  //兼容火狐
            a.href = url;
            a.download = '访客记录.xlsx';
            a.click();
              }
        });
    }

    showCalendar(){
        this.setState({
            showCalendar:!this.state.showCalendar
        })
    }

    handleSelectDate(date){
        date = new Date(date);
        const year = date.getFullYear();
        const month = date.getMonth();
        const day = date.getDate();
        this.setState({
            visitDate:`${year}-${month}-${day}`,
            showCalendar:false
        })
    }

    render() {
        return (
            <div align="center" className="Registration">
                <div className="Registration-table-edit-opertion">
                    <button type="button" className="Registration-btn-readcert" id="btn_read_cert" onClick={this.readCert}>读取身份证</button>
                    <button type="button" onClick={this.exportVisit} id="btn_export_visit" className="Registration-btn-exportvisit">导出历史数据</button>
                </div>
                <form autoComplete="off" >
                    <table id="registration_table_edit" className="Registration-table-edit">
                        <thead>
                            <tr className="Registration-print-noborder">
                                <td colSpan="6" className="Registration-table-edit-title">宝丰能源访客登记单</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="Registration-table-edit-fristrow">
                                    <label className="Registration-table-edit-label">姓名</label>
                                </td>
                                <td className="Registration-table-edit-secondrow">
                                    <input className="Registration-table-edit-input test-center" name="visitName" type="text" onChange={this.onChange} value={this.state.visitName}/>
                                </td>
                                <td className="Registration-table-edit-otherrow">
                                    <label className="Registration-table-edit-label">性别</label>
                                </td>
                                <td className="Registration-table-edit-otherrow">
                                    <select className="Registration-table-edit-input-gender" name="visitGenderType" onChange={this.onChange} value={this.state.visitGenderType}>
                                        <option value="1">男</option>
                                        <option value="0">女</option>
                                    </select>
                                </td>
                                <td className="Registration-table-edit-otherrow">
                                    <label className="Registration-table-edit-label">数量</label>
                                </td>
                                <td className="Registration-table-edit-lastrow">
                                    <input className="Registration-table-edit-input-number test-center" name="visitPersonNumber" type="text" onChange={this.onChange} value={this.state.visitPersonNumber}/>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label className="Registration-table-edit-label">证件号</label>
                                </td>
                                <td colSpan="5">
                                    <input className="Registration-table-edit-input" name="visitIdentityCardNumber" type="text" onChange={this.onChange} value={this.state.visitIdentityCardNumber}/>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label className="Registration-table-edit-label">单位</label>
                                </td>
                                <td colSpan="5">
                                    <input className="Registration-table-edit-input" name="visitCompany" type="text" onChange={this.onChange} value={this.state.visitCompany}/>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label className="Registration-table-edit-label">部门</label>
                                </td>
                                <td colSpan="5">
                                    <input className="Registration-table-edit-input" name="visitDepart" type="text" onChange={this.onChange} value={this.state.visitDepart}/>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label className="Registration-table-edit-label">事由</label>
                                </td>
                                <td colSpan="5">
                                    <input className="Registration-table-edit-input" name="visitCause" type="text" onChange={this.onChange} value={this.state.visitCause}/>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label className="Registration-table-edit-label">车牌号</label>
                                </td>
                                <td colSpan="5">
                                    <input className="Registration-table-edit-input" name="visitPlateNumber" type="text" onChange={this.onChange} value={this.state.visitPlateNumber}/>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label className="Registration-table-edit-label">电话</label>
                                </td>
                                <td colSpan="5">
                                    <input className="Registration-table-edit-input" name="visitPhoneNumber" type="text" onChange={this.onChange} value={this.state.visitPhoneNumber}/>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label className="Registration-table-edit-label">时间</label>
                                </td>
                                <td colSpan="5">
                                    <input className="Registration-table-edit-input" name="visitDate" readOnly type="text" onClick={this.showCalendar} value={this.state.visitDate}/>
                                    {this.state.showCalendar?
                                        <Calendar style={{position:'absolute'}} date={new Date()} onChange={this.handleSelectDate} />
                                        :
                                        ''
                                    }
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label className="Registration-table-edit-label">携带<br />物品</label>
                                </td>
                                <td colSpan="5">
                                    <textarea className="Registration-table-edit-input" name="visitBelongings" type="text" onChange={this.onChange} value={this.state.visitBelongings}/>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label className="Registration-table-edit-label">接待人<br />签字</label>
                                </td>
                                <td>
                                    <input className="Registration-table-edit-input" name="visitReceiver" type="text" onChange={this.onChange} value={this.state.visitReceiver}/>
                                </td>
                                <td colSpan="4">
                                </td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr className="Registration-print-noborder">
                                <td colSpan="2">
                                    <label className="Registration-table-edit-label">办理人:</label>
                                </td>
                                <td colSpan="4">
                                    <input className="Registration-table-edit-input" name="visitTransactor" type="text" onChange={this.onChange} value={this.state.visitTransactor}/>
                                </td>
                            </tr>
                            <tr className="Registration-print-noborder">
                                <td colSpan="6" align="left">
                                    <label className="Registration-table-edit-remark">说明：此单仅供本人使用，不得涂改转借<br />此单当日有效</label>
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                    <div className="Registration-table-edit-opertion">
                        <button type="button" className="Registration-btn-print" id="btn_print" onClick={this.print}>打印</button>
                        <button type="button" onClick={this.reset} id="btn_reset" className="Registration-btn-reset">重置</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default Registration;
