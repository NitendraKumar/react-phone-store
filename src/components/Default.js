import React, { Component } from 'react';

class Default extends Component {
    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-10 mx-auto text-title text-uppercase mt-3 text-center">
                        <h1 className='display-3'> 404 Error </h1>
        <h1> Requested URL <span className='text-danger'> {this.props.location.pathname} </span> not found.</h1>
                    </div>
                </div>
            </div>
        );
    }
}

export default Default;
