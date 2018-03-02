import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ReactDM from 'react-dom';
import classnames from 'classnames';
import Chart from './main';
import './index.less';
import shouldComponentUpdate from 'utils/shouldComponentUpdate';

class Recharts extends Component {
	constructor() {
		super();
		this.state = {
			options: null
		};
	}

	componentDidMount() {
		this.container = ReactDM.findDOMNode(this.refs.echarts);
		if(this.props.options) {
			this.renderChart(this.props);
			this.setState({options: this.props.options});
		}
	} 

	componentWillReceiveProps(nextProps) {
		if('options' in nextProps && nextProps.options != this.props.options) {			
			this.renderChart(nextProps);
			this.setState({options: nextProps.options});
		}
	}

	shouldComponentUpdate = shouldComponentUpdate

	renderChart(props) {
		new Chart({
			container: this.container,
			...props
		});
	}

	resize() {
		const props = this.props;
		var chart = new Chart({
			container: this.container,
			...props
		});
	
		chart.resize();
	}

	render() {
		const {className, type, height,  ...other} = this.props;
		return (
			<div className={classnames('echarts_chart', className)} style={{height: height || '300px'}} {...other}>
				<div className='echarts_chart_box' ref='echarts' key={type || 'echarts'}></div>
			</div>
		);
	}
}

Recharts.propTypes = {
	// 容器高度，默认300px，也可以使用百分比 30%
	height: PropTypes.string,
	// 此属性为显示地图名称，例 'beijing' ;采用echarts自带的地图数据，命名符合echarts规范.
	showMapName: PropTypes.string,
	// echarts图表配置，参考 http://echarts.baidu.com/option.html, 暂不支持，[打包配置需要重新配置地图数据]
	options: PropTypes.object.isRequired,
	// echarts 图表类型，key值
  type: PropTypes.string,
  customProp(props) {
    if(!props.options) {
      return new Error('You echarts chart need a options!');
    }
  }
};

export default Recharts;