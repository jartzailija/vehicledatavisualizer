import {
  connect
} from 'react-redux';
import Chart from '../components/Chart';
import { getDataFromCarBrand } from '../redux/actions';

const mapStateToProps = state => ({
  hasCarBrands: state.carBrands.hasCarBrands,
  data: state.carBrands.data,
  municipality: state.municipalities.selected,
  count: state.carBrands.count
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onSectorClick: (event, data, dataIndex, municipality) => {
    const selectedCarBrand = data[dataIndex].title;
    if(selectedCarBrand !== 'Other') {
      dispatch(getDataFromCarBrand(selectedCarBrand, municipality));
    }
  }
});

const ConnectChart = connect(
  mapStateToProps,
  mapDispatchToProps
)(Chart);


export default ConnectChart;
