import React, { Component } from 'react';
import './pagination.css';

class Pagination extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
            <div className="pagination">
                <ul >
                    <li className="page-btn page-btn-pre">上一页</li>
                    <li className="page-btn">1</li>
                    <li className="page-btn active">2</li>
                    <li className="page-btn">3</li>
                    <li className="page-btn">...</li>
                    <li className="page-btn">50</li>
                    <li className="page-btn page-btn-next">下一页</li>
                </ul>
            </div>
        );
    }
}

export default Pagination;