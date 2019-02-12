import React,{ PureComponent } from 'react';
// import { BrowserRouter as router, Link, Route } from 'react-router-dom';
class Home extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {  };
        // this.goTodoPage = this.goTodoPage.bind(this);
    }
    componentWillMount() {
        console.log(this.props.history.location.state);
    }
    goTodoPage = () => {
        console.log('this is console');
        // Route.push('/');
        this.props.history.push('/');
    }
    render() {
        return (
            <button onClick={this.goTodoPage}>Go Todo Page</button>
            // '<div>This is Home page</div>'
        );
    }
}

export default Home;