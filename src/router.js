import 'amfe-flexible';
import React from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { createPersistorIfNecessary } from './index'
// import {Toast} from 'antd-mobile'
import App from './routes'

import './assets/styles/index.less';

function RouterConfig({ history,app}) {
    return (
      <PersistGate persistor={createPersistorIfNecessary(app._store)} loading={null}>
        <App app={app} history={history}/>
      </PersistGate>
    );
}

export default RouterConfig;
