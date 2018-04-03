import 'amfe-flexible';
import './assets/styles/index.less';
import { Router, Route, Switch } from 'dva/router'
import {
  Main,
  Calc,
  NoticeDetail,
  OrderDetail,
  Filldata,
  Login,
  FindPsd,
  Fillpeople,
  Fillsame,
  Fillother,
  OrganNotice,
  OneKey,
  SetStages,
  StageSuccess,
  Receivables,
  MessageDetail,
  ChangePsd,
  Myshop,
  Search,
  AddGood,
  SearchDetail,
} from './routes';


// import dynamic from 'dva/dynamic';

function RouterConfig({ history, app}) {
  // const IndexPage = dynamic({
  //   app,
  //   component: () => import('./routes/IndexPage'),
  // });
  // const Example = dynamic({
  //   app,
  //   component: () => import('./routes/Example'),
  // });import ChangePsd from './routes/ChangePsd/index';

  return (
    <Router history={history}>
      <Switch>
        <Route path="/messageDetail/:detail" exact component={MessageDetail} />
        <Route path="/filldata/fillother/:otherToken?/:returnUrl?" exact component={Fillother} />
        <Route path="/filldata/fillsame/:otherToken?/:returnUrl?" exact component={Fillsame} />
        <Route path="/filldata/fillpeople/:otherToken?/:returnUrl?" exact component={Fillpeople} />
        <Route path="/filldata/:otherToken?/:returnUrl?" exact component={Filldata} />
        <Route path="/orderDetail/:orderId" exact component={OrderDetail} />
        <Route path="/noticeDetail/:detailId" exact component={NoticeDetail} />
        <Route path="/organNotice/:first?/:second?" component={OrganNotice} />
        <Route path="/oneKey" exact component={OneKey} />
        <Route path="/oneKey/setStages/:id?" exact component={SetStages} />
        <Route path="/oneKey/stageSuccess/:id?" exact component={StageSuccess} />
        <Route path="/receivables/:item?/:status?" component={Receivables} />
        <Route path="/main" component={Main} />
        <Route path="/calc" component={Calc} />
        <Route path="/login" component={Login} />
        <Route path="/findPsd" component={FindPsd} />
        <Route path="/mine/changePsd" component={ChangePsd} />
        <Route path="/mine/myshop" component={Myshop} />
        <Route path="/mine/search" component={Search} />
        <Route path="/mine/searchDetail" component={SearchDetail} />
        <Route path="/addGood" component={AddGood} />
        <Route component={Main} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
