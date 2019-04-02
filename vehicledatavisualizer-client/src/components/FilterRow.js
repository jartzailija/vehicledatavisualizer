import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import styled from 'styled-components';
import Suggester from '../containers/Suggester';

const FilterRow = () => {

  const StyledCol = styled(Col)`
    padding-top: 20px;
    padding-bottom: 20px;
  `;

  const BorderRow = styled(Row)`
    border-bottom: 1px solid black;
  `;

  return (
    <BorderRow>
      <StyledCol md={{ size: 3, order: 2, offset: 3 }}>
        <Suggester name="municipality"  description="Select a municipality" />
      </StyledCol>
    </BorderRow>
  );
};

export default FilterRow;