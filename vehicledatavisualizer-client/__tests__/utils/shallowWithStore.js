//Source: https://joonaviertola.com/react-container-testing-example/
//This file has been copied from there

import { shallow } from 'enzyme';

/*
 * Component wrapper for containers when wanted to test with Redux connect.
 * Example: const component = shallowWithStore(<ConnectedShowBox />, store);
 *
 * @param {Object} component - React component to be wrapped.
 * @param {Object} store - Store made with createMockStore from redux-test-utils module.
 */
const shallowWithStore = (component, store) => {
  const context = {
    store
  };
  return shallow(component, { context });
};

export default shallowWithStore;
