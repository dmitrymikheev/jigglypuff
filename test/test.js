import configureMockStore from 'redux-mock-store'
import expect from 'expect';
import nock from 'nock';
import thunk from 'redux-thunk';
import * as actions from '../app/src/actions/message';

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

describe('message actions', () => {
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

  it('should create an action to submit message', () => {
    const expectedAction = { type: actions.SUBMIT_MESSAGE };

    expect(actions.submitMessage()).toEqual(expectedAction);
  });

  it('should create an action to clear message', () => {
    const message = 'Message saved to drafts';
    const status = 'success';
    const expectedAction = {
      type: actions.CLEAR_MESSAGE,
      message,
      status
    };

    expect(actions.clearMessage()).toEqual(expectedAction);
  });
});

describe('async actions', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('should create an action to send message', () => {
    nock('http://localhost:3000').post('/messages');

    const message = 'Message saved to drafts';
    const status = 'success';
    const expectedAction = [{ type: actions.CLEAR_MESSAGE, message, status }];
    const store = mockStore();

    return store.dispatch(actions.sendMessage())
      .then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
  });
});
