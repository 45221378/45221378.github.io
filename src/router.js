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
  Fillpeople,
  Fillsame,
  OrganNotice,
  OneKey,
  SetStages,
  StageSuccess,
  Receivables
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
  // });
  return (
    <Router history={history}>
        <Switch>
          <Route path="/fillsame" exact component={Fillsame} />
          <Route path="/fillpeople" exact component={Fillpeople} />
          <Route path="/filldata" exact component={Filldata} />
          <Route path="/orderDetail" exact component={OrderDetail} />
          <Route path="/noticeDetail" exact component={NoticeDetail} />
          <Route path="/organNotice/:first?/:second?" component={OrganNotice} />
          <Route path="/oneKey" exact component={OneKey} />
          <Route path="/oneKey/setStages/:id?" exact component={SetStages} />
          <Route path="/oneKey/stageSuccess/:id?" exact component={StageSuccess} />
          <Route path="/receivables/:item?/:status?" component={Receivables} />
          <Route path="/main" component={Main} />
          <Route path="/calc" component={Calc} />
          <Route path="/login" component={Login} />
          <Route component={Main} />
        </Switch>
    </Router>
  );
}

export default RouterConfig;
