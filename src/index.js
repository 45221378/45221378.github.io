// import '@babel/polyfill';
import dva from 'dva';
import createHistory from 'history/createBrowserHistory';
// import token from './models/token'
// import version from './models/version'
let options = {
  basename:''  //organService
};
if(process.env.API_ENV==='dev'){
  options={basename:''}
}
const history = createHistory(options);

// 1. Initialize
let app;
if(process.env.API_ENV==='devDist'){
   app = dva();
}else{
  app = dva({
    history: history
  });
}

// 2. Plugins
// app.use({});

// 3. Model
// app.model(token);
// app.model(version);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');

let store;
store = app._store.getState() || {};
export default store;
