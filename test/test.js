import expect from 'expect';
import * as actions from '../app/src/actions/message';

describe('actions', () => {
  it('should create an action to set field in message', () => {
    const field = 'title';
    const value = 'kekpek my body text';
    const expectedAction = {
      type: actions.SET_FIELD,
      field,
      value
    };

    expect(actions.setField(field, value)).toEqual(expectedAction);
  });
});
