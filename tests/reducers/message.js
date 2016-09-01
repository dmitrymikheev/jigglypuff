import expect from 'expect';
import reducer from 'reducers/message';
import * as actions from 'actions/message';

describe('message reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      message: {
        type: 'drafts',
        title: '',
        body: '',
        submitted: false
      },
      notification: {}
    })
  });

  it('should handle SET_FIELD', () => {
    expect(reducer({}, {
      type: actions.SET_FIELD,
      field: 'title',
      value: 'title'
    })).toEqual({
      message: {
        type: 'drafts',
        title: 'title',
        body: '',
        submitted: false
      },
      notification: {}
    })
  });

  it('should handle SEND_MESSAGE', () => {
    expect(reducer({}, {
      type: actions.SEND_MESSAGE
    })).toEqual({
      message: {
        type: 'drafts',
        title: '',
        body: '',
        submitted: true
      },
      notification: {}
    })
  });
  it('should handle CLEAR_MESSAGE', () => {
    expect(reducer({}, {
      type: actions.CLEAR_MESSAGE,
      message: 'Clear message',
      status: 'success'
    })).toEqual({
      message: {
        type: 'drafts',
        title: '',
        body: '',
        submitted: false
      },
      notification: {
        message: 'Clear message',
        status: 'success',
        isHidden: false
      }
    })
  });
});
