import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { connect } from 'react-redux';

import FilterRow from './FilterRow';
import Chart from '../containers/Chart';
import DataView from '../containers/DataView';
import {getCountrywideData} from '../redux/actions';

class App extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    return (
      <Container fluid>
        <Row>
          <Col md="12">
            <FilterRow />
          </Col>
        </Row>
        <Row>
          <Col md="7">
            <Chart />
          </Col>
          <Col md="5">
            <DataView />
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  loadInitialData: () => {
    dispatch(getCountrywideData());
  }
});

export default connect(null, mapDispatchToProps)(App);