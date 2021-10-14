import React, { Component } from 'react';
import "./PageSelect.scss";
import Map from './map/Map';
import Footer from './footer/Footer';
import Left from './charts/left/Left';
// import ChartBottom from './charts/bottom/ChartBottom';
import Bottom from './charts/bottom/Bottom';
import _ from 'lodash';
// react-redux
import { connect } from 'react-redux';
import { fetchData, setSelectedUsers } from '@/app/slice/selectSlice';
import Drawer from '@/components/drawer/Drawer';


class PageSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leftWidth: 0, // 左侧栏宽度
      bottomHeight: 0, //底部内容高度
      bottomWidth: 0, //底部内容宽度
    };
  }

  // 取交集
  handleIntersection = (...params) => {
    // 若存在元素不为数组类型，则报错
    let type = params.some(item => !Array.isArray(item));
    if (type) {
      throw new Error('param should be Array Type');
    }

    let result = params.reduce((prev, cur) => {
      if (prev.length === 0) return [...cur];
      if (cur.length === 0) return [...prev];
      return Array.from(new Set(prev.filter(item => cur.includes(item))))
    }, []);

    this.props.setSelectedUsers(result);
  };

  componentDidMount() {
    // 请求数据
    this.props.fetchData(`${process.env.PUBLIC_URL}/mock/ocean_score.json`);

    //返回各组件的边界位置，用于日历、map等组件的布局
    const leftWidth = document.querySelector('.left').getBoundingClientRect().right;
    const bottomHeight = document.querySelector('.bottom').getBoundingClientRect().height;
    const bottomWidth = document.querySelector('.bottom').getBoundingClientRect().width;
    this.setState({
      leftWidth: leftWidth,
      bottomHeight: bottomHeight,
      bottomWidth: bottomWidth,
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      !_.isEqual(prevProps.selectedByCharts, this.props.selectedByCharts) ||
      !_.isEqual(prevProps.selectedByCalendar, this.props.selectedByCalendar)
    ) {
      this.handleIntersection(this.props.selectedByCharts, this.props.selectedByCalendar);
    }
  }

  render() {
    return (
      <div className="select-page-ctn">
        <div className="center">
          <Map leftWidth={this.state.leftWidth} bottomHeight={this.state.bottomHeight} />
          <div className="inner">
            <div className="top-bracket"></div>
            <div className="bottom">
              <Bottom bottomHeight={this.state.bottomHeight} bottomWidth={this.state.bottomWidth} />
            </div>
          </div>
        </div>
        <div className="left">
          <Left width={this.state.leftWidth} />
        </div>
        <div className="footer-bar" style={{ float: "right" }} >
          <Drawer 
            render={() => (<Footer setRoutes={this.props.setRoutes} />)}
            type="right"
            width={170}
            initVisible={true}
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    selectedByCharts: state.select.selectedByCharts,
    selectedByCalendar: state.select.selectedByCalendar,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: (url) => dispatch(fetchData(url)),
    setSelectedUsers: (payload) => dispatch(setSelectedUsers(payload)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PageSelect);