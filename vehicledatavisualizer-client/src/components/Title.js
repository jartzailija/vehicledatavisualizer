import React from 'react';
import { Row, Col } from 'reactstrap';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Title = ({municipality, count}) => {

  const StyledHeaderCol = styled(Col)`
    margin-top: 20px;
  `;

  const municipalityString = municipality !== '' ? ` in ${municipality}` : '';
  const titleString = <StyledHeaderCol className="col-md-12"><h2>Vehicle distribution{municipalityString}</h2></StyledHeaderCol>
  const countString = Number(count) !== Number(0) ? <div className="col-md-12"><p>{`Vehicle count is ${count}`}</p></div> : '';
  return(<Row>{titleString}{countString}</Row>);
};

Title.propTypes = {
  municipality: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired
};

export default Title;