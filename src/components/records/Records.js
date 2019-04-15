import React, { Component } from 'react';
import Breadcrumb from '../breadcrumb/Breadcrumb';
import RecordsTableFilter from './RecordsTableFilter';
import Pagination from '../pagination/Pagination'
import '../../assets/css/content.css';

class Records extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }

    // eslint-disable-next-line react/no-deprecated
    componentWillMount() {
        this.props.fetchRecords();
        console.log(this.props);
    }

    componentWillUpdate(nextProps) {
      console.log(nextProps.records);
    }

    render() {
        const datas = this.props.records && this.props.records.records || [];
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
                           {datas.map((user, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index}</td>
                                    <td>{user.attendanceCompany}</td>
                                    <td>{user.attendanceName}</td>
                                    <td>{user.attendanceDepart}</td>
                                    <td>{user.attendanceIdentityCardNumber}</td>
                                    <td>{user.attendanceAccessCardNumber}</td>
                                    <td>{user.attendanceDate}</td>
                                    <td>{user.attendanceDuration}</td>
                                    <td>{user.attendanceStatus === '1'? '出勤': '缺勤'}</td>
                                </tr>
                            )
                           })}
                        </tbody>
                    </table>
                </div>
                <Pagination />
            </div>
        );
    }
}

export default Records;