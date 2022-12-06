import React, { Component } from "react";

export default class PopUp extends Component {

    handleClick = () => {
        this.props.toggle();
    };

    render() {
        return (
            <div className="box">
                <h3>{this.props.errorMsg}</h3>
                <div className="auth-btn-group">
                    <button className="btn" onClick={this.handleClick}>OK</button>
                </div>
            </div>
        );
    }
}