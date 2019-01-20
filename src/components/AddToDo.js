import React, { PureComponent } from 'react';

class AddToDo extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {};
        this.submitTextVal = this.submitTextVal.bind(this);
    }

    submitTextVal = () => {
        console.log(this.inputRef);
        this.props.onChangeVal(this.inputRef.value);
        this.inputRef.value = '';
    }
    render() {
        // const { inputRef } = this.state;
        return (
            <div>
                <input ref={ (input) => (this.inputRef = input)}></input>
                <button onClick={this.submitTextVal}>Submit </button>
            </div>
            
        );
    }
}

export default AddToDo;