import React, { Component } from 'react';
import Breadcrumb from '../breadcrumb/Breadcrumb';
import RecordsTableFilter from './RecordsTableFilter';
// import Pagination from '../pagination/Pagination'
import {LOADING} from '../../actions/status';
import ReactLoading from 'react-loading';
import '../../assets/css/content.css';
import Pagination from '../pagination/Pagination';

class Records extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }

    // eslint-disable-next-line react/no-deprecated
    componentWillMount() {
        this.props.fetchRecords({pageNumber:0,pageSize:20});
        console.log(this.props);
    }

    render() {
        const datas = this.props.data && this.props.data.records || [];
        const isLoading = this.props.data.status;
        const { totalPage = 0, showBeginIndex } = this.props.data.pageInfo;
        return (
            <div className="right-content">
                <Breadcrumb />
                <RecordsTableFilter />
                <div className="page-content page-records">
                    <table>
                        <thead>
                            <tr>
                                <th>No.</th>
                                <th>单位名称</th>
                                <th>姓名</th>
                                <th>工种</th>
                                <th>身份证</th>
                                <th>门禁卡号</th>
                                <th>考勤日期</th>
                                <th>考勤时长</th>
                                <th>考勤状态</th>
                            </tr>
                        </thead>
                        <tbody>
                           {
                                isLoading === LOADING ?
                                <tr>
                                    <td id="loadingTd">
                                        <ReactLoading id="loading" type={'spin'} color="#FF0000"/>
                                    </td>
                                </tr>
                                :
                                datas.map((user, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{showBeginIndex + index+1}</td>
                                            <td>{user.attendanceCompany}</td>
                                            <td>{user.attendanceName}</td>
                                            <td>{user.attendanceDepart}</td>
                                            <td>{user.attendanceIdentityCardNumber}</td>
                                            <td>{user.attendanceAccessCardNumber}</td>
                                            <td>{user.attendanceDate}</td>
                                            <td>{user.attendanceDuration}</td>
                                            <td>{user.attendanceStatus === '1'? '正常': '异常'}</td>
                                        </tr>
                                    )
                                })
                           }
                        </tbody>
                    </table>
                </div>
                <Pagination pageConfig={{currentPage:1,totalPage}} fetchCurrentPageInfo={this.props.fetchRecords}/>
            </div>
        );
    }
}

export default Records;