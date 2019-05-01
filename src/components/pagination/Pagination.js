import React, {Component} from 'react'
import './pagination.css'

class Pagination extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // currentPage: 1, //当前页码
            groupCount: 7, //页码分组，显示7个页码，其余用省略号显示
            startPage: 1  //分组开始页码
        }
        this.createPage = this.createPage.bind(this)
    }


    createPage() {
        //总页数
        const {totalPage, currentPage} = this.props.pageConfig || 1;
        const {groupCount, startPage} = this.state;
        let pages = []
        //上一页
        pages.push(<li className={currentPage === 1 ? 'nomore' : null} onClick={this.goPrev.bind(this)} key={0}>上一页</li>)

        if (totalPage <= 10) {
            /*总页码小于等于10时，全部显示出来*/
            for (let i = 1; i <= totalPage; i++) {
                pages.push(<li key={i} onClick={this.pageClick.bind(this, i)} className={currentPage === i ? 'activePage' : null}>{i}</li>)
            }
        } else {
            /*总页码大于10时，部分显示*/
            for(let i = startPage;i < groupCount + startPage;i ++){
                if(i <= totalPage - 2){
                    pages.push(<li className={this.state.currentPage === i? 'activePage':''} key={i} onClick={this.pageClick.bind(this,i)}>{i}</li>)
                }
            }

            // 分页中间的省略号
            if(totalPage - startPage >= 9){
                pages.push(<li className="ellipsis" key={-1}>···</li>)
            }
            // 倒数第一、第二页
            pages.push(<li className={this.state.currentPage === totalPage -1 ? 'activePage':''} key={totalPage - 1} onClick={this.pageClick.bind(this,totalPage - 1)}>{totalPage -1}</li>)
            pages.push(<li className={this.state.currentPage === totalPage ? 'activePage':''} key={totalPage} onClick={this.pageClick.bind(this,totalPage)}>{totalPage}</li>)

        }
        //下一页
        pages.push(<li className={currentPage === totalPage ? 'nomore' : null}  onClick={this.goNext.bind(this)}  key={totalPage + 1} >下一页</li>)
        return pages;

    }

    //页码点击
    pageClick(currentPage,reset = false) {

        const { groupCount } = this.state;
        const { totalPage } = this.props.pageConfig

        // this.setState({currentPage});

        // 处理下一页的情况
        if(currentPage % groupCount === 1){
            this.setState({startPage:currentPage})
        }

        // 处理上一页的情况
        if(currentPage % groupCount === 0){
            this.setState({startPage:currentPage - groupCount + 1})
        }

        // 点击最后两页的情况
        if(totalPage - currentPage < 2){
            this.setState({startPage:totalPage - groupCount})
        }

        // 选择每页条数后重新分页
        if(reset === true){
            // this.setState({currentPage:1,startPage:1});
            this.setState({startPage:1});
        }
        const parmas = {
            pageNumber: currentPage-1,
            pageSize: 20
        }
        this.props.fetchCurrentPageInfo(parmas);
    }

    //上一页事件
    goPrev() {
        // let {currentPage} = this.state
        let {currentPage} = this.props.pageConfig;
        if (--currentPage === 0) {
            return false
        }
        this.pageClick(currentPage)
    }

    //下一页事件
    goNext() {
        // let { currentPage } = this.state;
        let { totalPage, currentPage} = this.props.pageConfig;
        if (++currentPage > totalPage) {
            return false
        }
        this.pageClick(currentPage)
    }

    render() {
        const pageList = this.createPage();
        return (
            <ul className="page-container">
                {pageList}
            </ul>
        )
    }
}

export default Pagination;