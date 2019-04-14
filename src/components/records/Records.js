import React, { Component } from 'react';
import Breadcrumb from '../breadcrumb/Breadcrumb';
import TableFilter from './TableFilter';
import Pagination from '../pagination/Pagination'
import '../../assets/css/content.css';

class Records extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
            <div className="right-content">
                <Breadcrumb />
                <TableFilter />
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
                            <tr>
                                <td>01</td>
                                <td>华为</td>
                                <td>张三丰</td>
                                <td>开发</td>
                                <td>140602198811093511</td>
                                <td>123456</td>
                                <td>2019-04</td>
                                <td>176</td>
                                <td>正常</td>
                            </tr>
                            <tr>
                                <td>01</td>
                                <td>华为</td>
                                <td>张三丰</td>
                                <td>开发</td>
                                <td>140602198811093511</td>
                                <td>123456</td>
                                <td>2019-04</td>
                                <td>176</td>
                                <td>正常</td>
                            </tr>
                            <tr>
                                <td>01</td>
                                <td>华为</td>
                                <td>张三丰</td>
                                <td>开发</td>
                                <td>140602198811093511</td>
                                <td>123456</td>
                                <td>2019-04</td>
                                <td>176</td>
                                <td>正常</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <Pagination />
            </div>
        );
    }
}

export default Records;