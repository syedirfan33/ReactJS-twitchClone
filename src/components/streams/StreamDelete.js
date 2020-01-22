import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Modal from '../Modal';
import history from '../../history';
import { fetchStream, deleteStream } from '../../redux/actions';

class StreamDelete extends React.Component {
  renderActions = () => (
    //ref vid = 278 , Fragment doesnt produce any html
    <Fragment>
      <button onClick={this.onDelete} className='ui button negative'>
        Delete
      </button>
      <Link to='/' className='ui button'>
        Cancel
      </Link>
    </Fragment>
  );

  onDelete = () => {
    this.props.deleteStream(this.props.match.params.id);
    history.push('/'); // or we can write this in action itself
  };

  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }
  render() {
    return (
      <div>
        {this.props.stream &&
          this.props.stream.userId === this.props.currentUser && (
            <Modal
              title='Delete Stream'
              content={`Are you sure you want to delete the Stream : ${this.props.stream.title}`}
              actions={this.renderActions()}
              onDismiss={() => history.push('/')}
            />
          )}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    stream: state.streams[ownProps.match.params.id],
    currentUser: state.auth.userId
  };
};

export default connect(mapStateToProps, { fetchStream, deleteStream })(
  StreamDelete
);
