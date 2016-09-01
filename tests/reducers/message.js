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
});
