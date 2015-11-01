import React, { Component } from 'react';
import { connect } from 'react-redux';

function mapStateToProps(state) {
  return {
    qaz: state.duck1.qaz
  };
}

@connect(mapStateToProps)
export default class Test extends Component {
  render() {

    return (
      <div>
        test {this.props.qaz}
      </div>
    );
  }
}
