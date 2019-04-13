import React, { Component } from 'react';


class Breadcrumb extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
            <div className="breadcrumb">
                <ol className="breadcrumb-ol">
                    <li className="breadcrumb-li"><a href="/attendance/records">考情记录</a></li>
                </ol>
            </div>
        );
    }
}

export default Breadcrumb;