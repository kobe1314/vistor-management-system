import React, { Component } from 'react';
import Breadcrumb from '../breadcrumb/Breadcrumb';
import TableFilter from '../tablaFilter/TableFilter';
import './content.css';

class Records extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
            <div>
                <Breadcrumb />
                <TableFilter />
                <div className="page-content page-records">
                    
                </div>
            </div>
        );
    }
}

export default Records;