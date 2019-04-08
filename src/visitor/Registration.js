import React, { Component } from 'react';
// import logo from './logo.svg';
import './css/registration.scss';
class Registration extends Component {

	constructor(props) {
		super(props)
		this.state = {
				name:'',
				sex:'0',
				number:'',
				ID:'',
				fromCompany:'',
				fromDepartment:'',
				reason:'',
				carNum:'',
				tel:'',
				date:'',
				comeWith:'',
				receive:'',
				transactor:''
		}
		this.onChange = this.onChange.bind(this);
		this.print = this.print.bind(this);
		this.clear = this.clear.bind(this);
		this.readCard = this.readCard.bind(this);
		// this.doReadCert = this.doReadCert.bind(this);
		// this.state = { weather: null }
		// this.print = this.print.bind(this);
	}

	print() {
		// window.document.body.innerHTML = window.document.getElementById('toPrint').innerHTML;  
		// window.print(); 
		// window.location.reload();
		window.sessionStorage.setItem('stateInfo', JSON.stringify(this.state));
		document.getElementById('buttonSection').style.display = 'none';//不需要打印的部分隐藏
		window.print();
		document.getElementById('buttonSection').style.display = 'block';//恢复打印前的页面
		if (window.matchMedia) {
			var mediaQueryList = window.matchMedia('print');
			mediaQueryList.addListener((mql) => {
					if (mql.matches) {
						this.clear();
					} else {
						console.log('a');
					}
			})
		}
		
	}

	onChange(e){
		this.setState({
			[e.target.name]:e.target.value
		})
	}

	componentDidMount(){
		const stateInfo = JSON.parse(window.sessionStorage.getItem('stateInfo'));
		for(let i in stateInfo){
			this.setState({
				[i]:stateInfo[i]
			})
		}
	}

	clear(){
		window.sessionStorage.setItem('stateInfo','{}');
		const state = this.state;
		for(let i in state){
			this.setState({
				[i]:''
			})
		}
	}

	readCard() {

		const CertCtl = window.document.getElementById("CertCtl");
		CertCtl.connect();
		const strResult = CertCtl.readCert();
		// window.doReadCert();
		const userInfo = JSON.parse(strResult)
		console.log('id',userInfo.resultContent.certNumber);

		this.setState({
			'ID': userInfo.resultContent.certNumber
		},() => {})
		
	}

	render() {
		return (
				<div className="app">
					<h3 className="title">宝丰能源访客登记单</h3>
					<form className="form" autoComplete="off">
						<div className= "formGroup firstGroup">
							<label className="label">姓名</label><input name="name" onChange={this.onChange} className={"input"} value={this.state.name} type="text"/>
							<label className="label">性别</label>
							<select className="input smallInput" name="sex" onChange={this.onChange} value={this.state.sex}>
								<option value="0">男</option>
								<option value="1">女</option>
							</select>
							<label className="label">人数</label>
							<input name="number" value={this.state.number} onChange={this.onChange} className= "input lastInput smallInput" type="number"/>
						</div >
						<div className="formGroup">
							<label className="label">证件号</label>
							<input name="ID" value={this.state.ID} maxLength="18" onChange={this.onChange} className= "input lastInput alignLeft" type="test"/>
						</div >
						<div className="formGroup">
							<label className="label">单位</label>
							<input name="fromCompany" value={this.state.fromCompany} onChange={this.onChange} className= "input lastInput alignLeft" type="text"/>
						</div >
						<div className="formGroup">
							<label className="label">部门</label>
							<input name="fromDepartment" value={this.state.fromDepartment} onChange={this.onChange} className= "input lastInput alignLeft" type="text"/>
						</div >
						<div className="formGroup">
							<label className={"label"}>事由</label>
							<input name="reason" value={this.state.reason} onChange={this.onChange} className= "input lastInput alignLeft" type="text"/>
						</div >
						<div className="formGroup">
							<label className={"label"}>车牌号</label>
							<input name="carNum" value={this.state.carNum} onChange={this.onChange} className= "input lastInput alignLeft" type="text"/>
						</div >
						<div className="formGroup">
							<label className={"label"}>电话</label>
							<input name="tel" value={this.state.tel} maxLength="11" onChange={this.onChange} className="input lastInput alignLeft" type="number"/>
						</div >
						<div className="formGroup">
							<label className={"label"}>时间</label>
							<input name="date" value={this.state.date} onChange={this.onChange} className= "input lastInput alignLeft" type="text"/>
						</div >
						<div className="formGroup">
							<label className={"label"}>携带<br/>物品</label>
							<input name="comeWith" value={this.state.comeWith} onChange={this.onChange} className= "input lastInput alignLeft" type="text"/>
						</div >
						<div className="formGroup">
							<label className="label">接待人<br/>签字</label>
							<input name="receive" onChange={this.onChange} className="input receive" value={this.state.receive} type="text"/>
						</div >
						<div className="formGroup lastGroup transactorGroup">
							<label className="label noBorder transactor">办理人:</label>
							<input name="transactor" onChange={this.onChange} className="input transactorInput" value={this.state.transactor} type="text"/>
						</div >
						<div className= "formGroup lastGroup groupDescript">
							<label className= "label noBorder descript">说明：此单仅供本人使用，不得涂改转借此单当日有效</label>
						</div >
						<div id="buttonSection">
							<div className="opertion">
								<button className="btn btnPrint"  type="button" onClick={this.print}>打印</button>
								<button className="btn btnClear"  type="button"  onClick={this.clear} >撤销</button>
								<button className="btn btnClear"  type="button"  onClick={window.connect} >connect</button>
								<button className="btn btnClear"  type="button"  onClick={this.readCard} >readcard</button>
							</div >
						</div>
					</form>
				</div>
		)
	}
}

export default Registration;
