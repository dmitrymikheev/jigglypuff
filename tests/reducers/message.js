import expect from 'expect';
import reducer from 'reducers/message';
import * as actions from 'actions/message';

describe('Message', () => {
  it('return initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      type: 'drafts',
      title: '',
      body: '',
      submitted: false
    })
  });

  it('handle SET_FIELD action', () => {
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

  it('handle SEND_MESSAGE action', () => {
    expect(reducer(undefined, {
      type: actions.SEND_MESSAGE
    })).toEqual({
      type: 'drafts',
      title: '',
      body: '',
      submitted: true
    });
  });

  it('handle CLEAR_MESSAGE action', () => {
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
