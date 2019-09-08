import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import {render, fireEvent, waitForElement} from '@testing-library/react';
import App from '../../src/components/App';
import "@babel/polyfill";
import ReactTestUtils from 'react-dom/test-utils';

import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';
import vehicleVisualizer from '../../src/redux/reducers';

const http = require('http');
const mockserver = require('mockserver');
 
const server = http.createServer(mockserver('./__tests__/integration/mocks')).listen(8080);
global.fetch = require('node-fetch');

afterAll(() => {
  server.close();
});

describe('Integration test', () => {
  
  test('Test municipality selection', async () => {

    const store = createStore(
      vehicleVisualizer,
      compose(
        applyMiddleware(thunkMiddleware)
      )
    );
    
    const { getByText, getByPlaceholderText, getByTestId, container } = render(
      <Provider store={store}>
        <App />
      </Provider>);

    //Let's wait for the pie chart to be rendered
    await waitForElement(() => getByText('Vehicle count is 1434717'), {container});
    expect(getByText('Vehicle count is 1434717')).toBeInTheDocument();
    expect(getByText('Toyota')).toBeInTheDocument();
    expect(getByPlaceholderText('Select a municipality')).toBeInTheDocument();

    //Write a municipality and select parikkala
    getByPlaceholderText('Select a municipality').value = 'Par';
    ReactTestUtils.Simulate.change(getByPlaceholderText('Select a municipality'));
    await waitForElement(() => getByText('Parikkala'), {container});
    expect(getByText('Parikkala')).toBeInTheDocument();
    ReactTestUtils.Simulate.click(getByText('Parikkala'));
    await waitForElement(() => getByText('Volkswagen'), {container});

    //Select Toyota and check its average values
    expect(getByText('Toyota')).toBeInTheDocument();
    ReactTestUtils.Simulate.click(getByText('Toyota'));
    await waitForElement(() => getByText('Avg. age'), {container});
    expect(getByText('15.2 yrs')).toBeInTheDocument();
  });
});