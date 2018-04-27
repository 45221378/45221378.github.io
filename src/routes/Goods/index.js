import React from 'react';
import { connect } from 'dva';
import {Link} from 'dva/router'
import { SpaceTips } from '../../components';
import { List, SearchBar, Icon, Modal, Toast } from 'antd-mobile';
import ajax from '../../utils/ajax'
import moment from 'moment'

import './goods.less'

const Item = List.Item;

let scrollY = 0;
let timer = null;
@connect(({ organInfo }) => ({ organInfo }))
export default class OrderList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      proList: null,
      name: '',
      pageSize: 10,
      page: 1,
      loading: false,
      hasNone: false
    }
  }
  updateGoods = (proId, status) => {
    let { proList } = this.state;
    const testList = {
      1: '上架',
      2: '下架'
    }
    Modal.alert('', `是否${testList[status]}该商品`, [
      { text: '否', onPress: () => { } },
      {
        text: '是', onPress: () => {
          ajax.post('/mobile/updateProStatus', { proId, status }).then((data) => {
            Toast.info(`${testList[status]}成功`, 2);
            proList = proList.map((ele, index) => {
              if (ele.busiProductSubsidy.proId === proId) {
                ele.status = ele.status*1 === 1 ? 2 : 1;
              }
              return ele;
            });
            this.setState({
              proList
            })
          })
          .catch((err)=>{
            console.log(err)
          })
        }
      },
    ])
  }
  setName = (val) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      this.setState({
        name: val ? val : ''
      })
    }, 100)
  }
  searchGoods = () => {
    this.setState({
      page: 1,
      hasNone: false
    })
    this.getGoods(1, true);
  }
  getGoods = (page, isClear = false) => {
    let { pageSize, loading, proList, hasNone, name } = this.state;
    const { dispatch } = this.props;
    proList = !proList || isClear ? [] : proList;
    if (loading || hasNone) {
      return;
    }
    if (!isClear) {
      this.setState({
        loading: true,
      })
    } else {
      dispatch({
        type: 'loading/save',
        payload: true
      })
    }
    ajax.post('/mobile/listProduct', { currentflag: 0, currentpage: page, pagesize: pageSize, proName: name }).then((data) => {
      const thisList = proList.concat(data.proList);
      let hasNone = false;
      if (data.proList.length < pageSize && !isClear) {
        hasNone = true;
      }
      this.setState({
        page,
        proList: thisList,
        hasNone
      })
    })
    .catch((err)=>{
      console.log(err)
      this.setState({
        proList: [],
      })
    })
    .finally(() => {
      this.setState({
        loading: false
      })
      dispatch({
        type: 'loading/save',
        payload: false
      })
    })
  }
  scroll = () => {
    const $h = document.documentElement.clientHeight;   //可视高度 （height+padding-横向滚动轴高度）
    const $scrollH = document.documentElement.scrollHeight;   //可滚动高度
    const $scroll = window.scrollY;   //滚动的高度
    if ($scrollH - $scroll - $h < 30 && $scroll > scrollY) {
      const { page } = this.state;
      this.getGoods(page * 1 + 1);
    }
    setTimeout(() => { scrollY = $scroll }, 0)
  }

  // addGood = () => {
  //   const { organInfo: { organType }, history } = this.props;
  //   if (organType == '0') {
  //     history.push('/addGood');
  //   } else {
  //     Modal.alert('添加商品请联系客服人员！', '', [
  //       { text: '知道了', onPress: () => { } },
  //     ])
  //   }
  // }

  componentDidMount() {
    this.getGoods(1, true);
    window.addEventListener('scroll', this.scroll, false);
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.scroll, false);
  }
  render() {
    const { proList, loading, hasNone } = this.state;
    const { organInfo:{organType} } = this.props;
    const statusList = {
      0: '无效',
      1: '上架中',
      2: '下架中'
    }
    const subsidyTypeList = {
      '0': '未贴息',
      '1': '贴息比例',
      '2': '贴息金额'
    }
    return (
      <div className="order tables goods">
       <section className="orderList goodsList">
          <SearchBar placeholder="可输入商品名称" cancelText="搜索" onSubmit={this.searchGoods} onCancel={this.searchGoods} showCancelButton onChange={this.setName} />
          {proList?<div>
            {
              (proList && proList.length > 0) ? <div className="list-wrapper">
                <List>
                  {proList.map((item, idx) => {
                    // const createTime = new Date(oldTime)
                    // const oldTime = item.createTime ;
                    // const createTime = item.createTime
                    return (
                      <Item className="li" key={idx}>
                        <header>
                          <p><span>{item.proName}</span><span className="status">{statusList[item.status]}</span></p>
                        </header>
                        <section className="order-name clearfix">
                          <p>标注价格：<span>{item.proPrice}</span><i className="order-name-num">{item.salesVolume}人付款</i></p>
                          <p>成交价格：<span className="price">{item.proSalePrice}</span></p>

                          <p>贴息信息：<span>{subsidyTypeList[item.busiProductSubsidy.subsidyType]}{item.busiProductSubsidy.subsidyType == 1 && `${item.busiProductSubsidy.subsidyProprotion * 100}%`}{item.busiProductSubsidy.subsidyType == 2 && `${item.busiProductSubsidy.subsidyAmount}元`}</span></p>
                          <p className="createTime">创建时间：{moment(item.busiProductSubsidy.createTime).isValid()?moment(item.busiProductSubsidy.createTime).format('YYYY-MM-DD HH:mm:ss'):item.createTime}</p>
                          {item.status == 2 && <button onClick={() => { this.updateGoods(item.busiProductSubsidy.proId, 1) }}>上架</button>}
                          {item.status == 1 && <button onClick={() => { this.updateGoods(item.busiProductSubsidy.proId, 2) }}>下架</button>}
                          <button onClick={() => { this.props.history.push(`/addGood/${item.busiProductSubsidy.proId}`) }}>修改</button>
                        </section>
                      </Item>
                    )
                  })}
                </List>
                {!hasNone&&<div className="loading-wrapper">
                  {loading&&<p className="list-wrapper-loading"><Icon type="loading" size="xxs"/><span>加载中...</span></p>}
                </div>}
              </div> : <SpaceTips imgUrl={require('../../assets/images/nomessage.png')} tips={'暂无商品'} />

            }
          </div>:''}
        </section>
        {
          organType&&organType=='0'&&<Link className="addGoodBtn" to='/addGood'>
          <img src={require('../../assets/images/addGood.png')} alt="添加商品" />
          </Link>
        }
      </div>
    )
  }
}