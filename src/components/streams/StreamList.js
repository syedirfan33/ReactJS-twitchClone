import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchStreams } from '../../redux/actions';

class StreamList extends React.Component {
  componentDidMount() {
    this.props.fetchStreams();
  }

  renderList = () => {
    return this.props.streams.map(stream => {
      return (
        <div className='item' key={stream.id}>
          {this.renderButtons(stream)}
          <i className='large middle aligned icon camera' />
          <div className='content'>
            <Link to={`/stream/${stream.id}`}>{stream.title}</Link>

            <div className='description'>{stream.description}</div>
          </div>
        </div>
      );
    });
  };

  renderButtons(stream) {
    if (this.props.currentUser === stream.userId) {
      return (
        <div className='right floated content'>
          <Link to={`/stream/edit/${stream.id}`} className='ui button primary'>
            Edit
          </Link>
          <Link
            to={`/stream/delete/${stream.id}`}
            className='ui button negative'
          >
            Delete
          </Link>
        </div>
      );
    }
  }

  renderCreate() {
    if (this.props.isSignedIn) {
      return (
        <div style={{ textAlign: 'right' }}>
          <Link to='/stream/create' className='ui button primary'>
            Create Stream
          </Link>
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        <h2>Streams</h2>
        <div className='ui celled list'>{this.renderList()}</div>
        {this.renderCreate()}
      </div>
    );
  }
}
const mapStateToProps = state => {
  const streamArr = Object.values(state.streams);
  return {
    streams: streamArr,
    currentUser: state.auth.userId,
    isSignedIn: state.auth.isSignedIn
  };
};

export default connect(mapStateToProps, { fetchStreams })(StreamList);
