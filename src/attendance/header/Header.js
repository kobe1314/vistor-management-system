import React, { Component } from 'react';
import './Header.css';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
            <div className="header">
                <strong>XXX服务平台</strong><small>后台管理系统</small>
            </div>
        );
    }
}

export default Header;