import {
  connect
} from 'react-redux';
import DataView from '../components/DataView';

const mapStateToProps = state => ({
  hasData: state.averageData.hasData,
  age: state.averageData.age,
  mileage: state.averageData.mileage,
  count: state.averageData.count,
  motorSize: state.averageData.motorSize,
  power: state.averageData.power,
  carBrand: state.carBrands.selected,
  municipality: state.municipalities.selected
});


const ConnectDataView = connect(
  mapStateToProps
)(DataView);

export default ConnectDataView;
  