import React, {Component} from 'react'
import Pagination from './Pagination'
// import data from '../mock/tsconfig.json'

class PaginationContainer extends Component {
    constructor() {
        super()
        this.state = {
            // dataList:[],
            // pageConfig: {
            //     totalPage: this.props.totalPage //总页码
            // }
        }
        this.getCurrentPage = this.getCurrentPage.bind(this)
    }
    getCurrentPage() {
        // this.setState({
        //     dataList:data[currentPage-1].name
        // })
    }
    render() {
        // const totalPage = this.props.config.totalPage;
        const pageConfig = {
            totalPage: 20
        }
        return (
            <div>
                {/* <div>
                    {this.state.dataList}
                </div> */}
                <Pagination pageConfig={pageConfig} pageCallbackFn={this.getCurrentPage}/>
            </div>

        )
    }
}
export default PaginationContainer;