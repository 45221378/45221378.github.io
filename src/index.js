import dva from 'dva';
import createHistory from 'history/createBrowserHistory';
import organInfo from './models/organInfo';
import token from './models/token';
import loading from './models/loading';
import contactInfo from "./models/contactInfo";
import { reducer as formReducer } from 'redux-form';
import { persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage/session'
import fastclick from 'fastclick';

let options = {
  basename:'/organ'  //organ
};
if(process.env.API_ENV==='dev'){
  options={basename:''}
}
const history = createHistory(options);
const persistConfig = {
  key: 'primary',
  storage,
  // whitelist: ['token', 'organInfo'],
  blacklist: ['form']
}
export function createPersistorIfNecessary(store) {
  return persistStore(store);
}
// 1. Initialize
let app,
    option={
      initialState:{
        
      },
      extraReducers: {
        form: formReducer,
      },
      onReducer: (reducer) => {
          const newReducer = persistReducer(persistConfig, reducer);
          return newReducer
      }
    };
if(process.env.API_ENV==='devDist'){
  app = dva({
    ...option
  });
}else{
  app = dva({
    history: history,
    ...option
  });
}

// 2. Plugins
// app.use({});

// 3. Model
app.model(organInfo);
app.model(token);
app.model(loading);
app.model(contactInfo);


// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
fastclick.attach(document.body, {});
export default app._store;
export {history};
