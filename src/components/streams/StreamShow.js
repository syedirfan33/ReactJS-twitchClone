import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { fetchStream } from '../../redux/actions';

class StreamShow extends Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  render() {
    return (
      <Fragment>
        {this.props.stream && (
          <div>
            <h2>{this.props.stream.title}</h2>
            <h3>{this.props.stream.description}</h3>
          </div>
        )}
      </Fragment>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    stream: state.streams[ownProps.match.params.id]
  };
}

export default connect(mapStateToProps, { fetchStream })(StreamShow);
