import React, { Component } from 'react';
import './Registration.css';
import './print.scss';

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
            createTimestamp:''
        }

        this.onChange = this.onChange.bind(this);
        this.print = this.print.bind(this);
        this.reset = this.reset.bind(this);
    }

    onChange(e) {

        this.setState({
            [e.target.name]:e.target.value
        })
    }

    print() {
        const win = window.open('','print_window');
        win.document.write(window.document.getElementById('registration_table_print').innerHTML);
        win.print();

        // let doc = null;
        // const el = document.getElementById("registration_table_print");
        // const iframe = document.createElement('iframe');
        // iframe.setAttribute('style', 'position:absolute;width:0px;height:0px;left:500px;top:500px;');
        // document.body.appendChild(iframe);
        // doc = iframe.contentWindow.document;
        // doc.write(el.innerHTML);
        // doc.close();
        // // 获取iframe的焦点，从iframe开始打印
        // iframe.contentWindow.focus();
        // iframe.contentWindow.print();
        // if (navigator.userAgent.indexOf("MSIE") > 0)
        // {
        //     document.body.removeChild(iframe);
        // }
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

        const CertCtl = window.document.getElementById("CertCtl");

        const strResult = CertCtl.connect();
        alert(strResult);

        const strResults = CertCtl.readCert();
        alert(strResults);
    }

    exportVisit() {

    }

    componentDidMount(){
        const stateInfo = JSON.parse(window.sessionStorage.getItem('stateInfo'));
        for(let i in stateInfo){
            this.setState({
                [i]:stateInfo[i]
            })
        }
    }

    render() {
        return (
            <div className="Registration" align="center">
                <div className="Registration-table-edit-opertion">
                    <button type="button" className="Registration-btn-readcert" id="btn_read_cert" onClick={this.readCert}>读取身份证</button><button type="button" onClick={this.exportVisit} id="btn_export_visit" className="Registration-btn-exportvisit">导出历史数据</button>
                </div>
                <form autoComplete="false">
                    <table id="registration_table_edit" className="Registration-table-edit" border="1px solid #999" >
                        <tbody>
                            <tr>
                                <td colSpan="6" className="Registration-table-edit-title">宝丰能源访客登记单</td>
                            </tr>
                            <tr>
                                <td className="Registration-table-edit-fristrow">
                                    <label className="Registration-table-edit-label">姓名</label>
                                </td>
                                <td className="Registration-table-edit-secondrow">
                                    <input className="Registration-table-edit-input" name="visitName" type="text" onChange={this.onChange} value={this.state.visitName}/>
                                </td>
                                <td className="Registration-table-edit-otherrow">
                                    <label className="Registration-table-edit-label">性别</label>
                                </td>
                                <td className="Registration-table-edit-otherrow">
                                    <select className="Registration-table-edit-input-gender" name="visitGenderType" onChange={this.onChange} value={this.state.visitGenderType}>
                                        <option value="0">男</option>
                                        <option value="1">女</option>
                                    </select>
                                </td>
                                <td className="Registration-table-edit-otherrow">
                                    <label className="Registration-table-edit-label">数量</label>
                                </td>
                                <td className="Registration-table-edit-lastrow">
                                    <input className="Registration-table-edit-input-number" name="visitPersonNumber" type="text" onChange={this.onChange} value={this.state.visitPersonNumber}/>
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
                                    <input className="Registration-table-edit-input" name="visitDate" type="text" onChange={this.onChange} value={this.state.visitDate}/>
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
                            <tr>
                                <td colSpan="2">
                                    <label className="Registration-table-edit-label">办理人:</label>
                                </td>
                                <td colSpan="4">
                                    <input className="Registration-table-edit-input" name="visitTransactor" type="text" onChange={this.onChange} value={this.state.visitTransactor}/>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="6" align="left">
                                    <label className="Registration-table-edit-remark">说明：此单仅供本人使用，不得涂改转借<br />此单当日有效</label>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="Registration-table-edit-opertion">
                        <button type="button" className="Registration-btn-print" id="btn_print" onClick={this.print}>打印</button><button type="button" onClick={this.reset} id="btn_reset" className="Registration-btn-reset">重置</button>
                    </div>
                </form>
                <br/>
                <br/>
                
            </div>
        );
    }
}

export default Registration;
