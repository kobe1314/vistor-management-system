import React, { Component } from 'react';

class About extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }

    gotoHomePage = () => {
        this.props.history.push({
            pathname:'/home',
            state: {
                name : 3
            }
        });
    }
    render() {
        return (
            // '<div>This is about us!</div>'
            <button onClick={this.gotoHomePage}>go to home page</button>
        );
    }
}

export default About;