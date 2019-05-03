import React, { Component } from 'react';
import '../../assets/css/common.css';
import Pagination from '../pagination/Pagination';
import SummariesTableFilter from './SummariesTableFilter';
import Breadcrumb from '../breadcrumb/Breadcrumb';
import {LOADING} from '../../actions/status';
import ReactLoading from 'react-loading';

class Summaries extends Component {
    constructor(props) {
        super(props);
        this.state = {
            company:'',
            startMonth:'',
            endMonth:'',
            pageNumber:'',
            pageSize:2
        };
    }
    // eslint-disable-next-line react/no-deprecated
    componentWillMount() {
        this.props.fetchSummaries({pageNumber:0,pageSize:2});
        console.log(this.props);
    }

    fetchSummaries = (params) => {
        this.setState({...params});
        this.props.fetchSummaries({...this.state,...params}); 
    }

    render() {

        const datas = this.props.data && this.props.data.summaries || [];
        const isLoading = this.props.data.status;
        const { totalPage = 0, showBeginIndex,currentPage } = this.props.data.pageInfo;
        console.log('datas:',datas);
        return (
            <div className="right-content">
                <Breadcrumb />
                <SummariesTableFilter fetchSummaries={this.fetchSummaries}/>
                <div className="page-content page-records">
                    <table>
                        <thead>
                            <tr>
                                <th>No.</th>
                                <th>单位名称</th>
                                <th>考勤月份</th>
                                <th>姓名</th>
                                <th>工种</th>
                                <th>身份证</th>
                                <th>门禁卡号</th>
                                <th>1</th>
                                <th>2</th>
                                <th>3</th>
                                <th>4</th>
                                <th>5</th>
                                <th>6</th>
                                <th>7</th>
                                <th>8</th>
                                <th>9</th>
                                <th>10</th>
                                <th>11</th>
                                <th>12</th>
                                <th>13</th>
                                <th>14</th>
                                <th>15</th>
                                <th>16</th>
                                <th>17</th>
                                <th>18</th>
                                <th>19</th>
                                <th>20</th>
                                <th>21</th>
                                <th>22</th>
                                <th>23</th>
                                <th>24</th>
                                <th>25</th>
                                <th>26</th>
                                <th>27</th>
                                <th>28</th>
                                <th>29</th>
                                <th>30</th>
                                <th>31</th>
                                <th>出勤天数</th>
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
                                            <td>{user.attendanceDate}</td>
                                            <td>{user.attendanceName}</td>
                                            <td>{user.attendanceDepart}</td>
                                            <td>{user.attendanceIdentityCardNumber}</td>
                                            <td>{user.attendanceAccessCardNumber}</td>
                                            <td>{user.first}</td>
                                            <td>{user.second}</td>
                                            <td>{user.third}</td>
                                            <td>{user.fourth}</td>
                                            <td>{user.fifth}</td>
                                            <td>{user.sixth}</td>
                                            <td>{user.seventh}</td>
                                            <td>{user.eighth}</td>
                                            <td>{user.ninth}</td>
                                            <td>{user.tenth}</td>
                                            <td>{user.eleventh}</td>
                                            <td>{user.twelfth}</td>
                                            <td>{user.thirteenth}</td>
                                            <td>{user.fourteenth}</td>
                                            <td>{user.fifteenth}</td>
                                            <td>{user.sixteenth}</td>
                                            <td>{user.seventeenth}</td>
                                            <td>{user.eighteenth}</td>
                                            <td>{user.nineteenth}</td>
                                            <td>{user.twentieth}</td>
                                            <td>{user.twentyfirst}</td>
                                            <td>{user.twentysecond}</td>
                                            <td>{user.twentythird}</td>
                                            <td>{user.twentyfourth}</td>
                                            <td>{user.twentyfifth}</td>
                                            <td>{user.twentysixth}</td>
                                            <td>{user.twentyseventh}</td>
                                            <td>{user.twentyeighth}</td>
                                            <td>{user.twentyninth}</td>
                                            <td>{user.thirtieth}</td>
                                            <td>{user.thirtyfirst}</td>
                                            <td>{user.attendanceDay}</td>
                                        </tr>
                                    )
                               })
                           }
                        </tbody>
                    </table>
                </div>
                <Pagination pageConfig={{currentPage,totalPage}} fetchCurrentPageInfo={this.fetchSummaries}/>
            </div>
        );
    }
}

export default Summaries;