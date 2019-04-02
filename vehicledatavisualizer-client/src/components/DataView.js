import React from 'react';
import { Row, Table, Col } from 'reactstrap';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const DataView = ({hasData, municipality, carBrand, age, mileage, count, motorSize, power}) => {

  const HeaderContainer = styled.div`
    margin-top: 20px;
  `;

  const MarginRow = styled(Row)`
    margin: 20px;
  `

  const municipalityStr = municipality === '' ? '' : `in ${municipality}`;

  if(hasData) {
    return(
      <Row>
        <Col md={11}>
          <HeaderContainer>
            <h2>Data about {carBrand}s {municipalityStr}</h2>
          </HeaderContainer>
          <Table size="sm">
            <thead>
              <tr>
                <th>Count</th>
                <th>Avg. age</th>
                <th>Avg. mileage</th>
                <th>Avg. power</th>
                <th>Avg. cylinder size</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{count}</td>
                <td>{age} yrs</td>
                <td>{mileage} km</td>
                <td>{power} hp</td>
                <td>{motorSize} cc</td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
    );
  }
  else {
    return(<MarginRow>Select a sector in the chart</MarginRow>);
  }
};

DataView.propTypes = {
  hasData: PropTypes.bool.isRequired,
  age: PropTypes.number.isRequired,
  mileage: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired,
  motorSize: PropTypes.number.isRequired,
  power: PropTypes.number.isRequired,
  municipality: PropTypes.string.isRequired,
  carBrand: PropTypes.string.isRequired
};

export default DataView;