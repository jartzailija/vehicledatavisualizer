import React from 'react';
import { Row, Col } from 'reactstrap';
import PropTypes from 'prop-types';
import PieChart from 'react-minimal-pie-chart';
import styled from 'styled-components';
import Title from './Title';
const randomColor = require('randomcolor'); 

const Chart = ({data, hasCarBrands, municipality, count, onSectorClick}) => {

  const randomColors = randomColor({hue: 'random', luminosity: 'random', count: data.length});

  const StyledRow = styled(Row)`
    border-right: 1px solid black;
  `;

  const renderLimit = 25;

  const reducer = (accumulator, currentValue, currentIndex, sourceArray) => {
    const count = Number((sourceArray[currentIndex]).count);
    return accumulator + count;
  };
  
  //Combine marginal car brands to reduce rendering time
  const slicedData = data.slice(0, renderLimit);
  if(data.length > renderLimit) {
    slicedData.push({
      name: "Other",
      count: Number(data.slice(renderLimit).reduce(reducer, 0)) || 0
    });
  }

  const mappedData = slicedData.map((item, iterator) => ({
    title: item.name,
    value: item.count,
    color: randomColors[iterator]
  }));

  const renderSectorTitle = ({data, dataIndex}) => {
    const title = data[dataIndex].title;
    const percentage = Math.round(data[dataIndex].percentage) + '%';
    return title + ' ' + percentage;
  };
  
  return (
    <StyledRow>
      <Col md="12">
        <Title municipality={municipality} count={count} />
        <Row>
        <Col md={{ size: 10, order: 2, offset: 1 }}>
          { hasCarBrands ? <PieChart data={mappedData}
            label={renderSectorTitle}
            labelPosition={80}
            labelStyle={{fontSize: '2px', fontFamily: 'sans-serif', fill: '#121212'}}
            onClick={(event, data, dataIndex) => onSectorClick(event, data, dataIndex, municipality)}
            /> : 'Please select a municipality.'
          }
          </Col>
        </Row>
      </Col>
    </StyledRow>
  );
};

Chart.propTypes = {
  hasCarBrands: PropTypes.bool.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      count: PropTypes.number
    })
  ).isRequired,
  municipality: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  onSectorClick: PropTypes.func.isRequired
};

export default Chart;
