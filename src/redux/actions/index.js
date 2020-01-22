import streams from '../../apis/streams';
import {
  CREATE_STREAM,
  DELETE_STREAM,
  EDIT_STREAM,
  FETCH_STREAM,
  FETCH_STREAMS,
  SIGN_IN,
  SIGN_OUT
} from '../ReduxType';
import history from '../../history';
export const signIn = userId => {
  return { type: SIGN_IN, payload: userId };
};

export const signOut = () => {
  return { type: SIGN_OUT };
};

export const createStream = streamCreateReq => {
  return (dispatch, getState) => {
    const { userId } = getState().auth;
    streams
      .post('/streams', { ...streamCreateReq, userId })
      .then(response => {
        dispatch({ type: CREATE_STREAM, payload: response.data });
        history.push('/');
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const fetchStreams = () => {
  return dispatch => {
    streams.get('/streams').then(response => {
      dispatch({ type: FETCH_STREAMS, payload: response.data });
    });
  };
};

export const fetchStream = id => {
  return dispatch => {
    streams.get(`/streams/${id}`).then(response => {
      dispatch({ type: FETCH_STREAM, payload: response.data });
    });
  };
};

export const deleteStream = id => {
  return dispatch => {
    streams.delete(`/streams/${id}`).then(response => {
      dispatch({ type: DELETE_STREAM, payload: id });
    });
  };
};

export const editStream = (id, streamCreateReq) => {
  return dispatch => {
    streams.patch(`/streams/${id}`, streamCreateReq).then(response => {
      dispatch({ type: EDIT_STREAM, payload: response.data });
      history.push('/');
    });
  };
};
