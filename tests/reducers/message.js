import expect from 'expect';
import reducer from 'reducers/message';
import * as actions from 'actions/message';

describe('message reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      type: 'drafts',
      title: '',
      body: '',
      submitted: false
    })
  });

  it('should handle SET_FIELD', () => {
    expect(reducer(undefined, {
      type: actions.SET_FIELD,
      field: 'title',
      value: 'title'
    })).toEqual({
      type: 'drafts',
      title: 'title',
      body: '',
      submitted: false
    });
  });

  it('should handle SEND_MESSAGE', () => {
    expect(reducer(undefined, {
      type: actions.SEND_MESSAGE
    })).toEqual({
      type: 'drafts',
      title: '',
      body: '',
      submitted: true
    });
  });

  it('should handle CLEAR_MESSAGE', () => {
    expect(reducer({}, {
      type: actions.CLEAR_MESSAGE
    })).toEqual({
      type: 'drafts',
      title: '',
      body: '',
      submitted: false
    });
  });
});
