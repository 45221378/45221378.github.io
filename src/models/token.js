
export default {

  namespace: 'token',

  state: '',

  subscriptions: {
    *refreshToken({payload:todo},{call,put}){
      const token = yield call(fetch,todo);
      yield put({
        type:'save',
        payload:token
      })
    }
  },
  reducers: {
    save(state, action){
      return action.payload
    },
    clean(state,action){
      return '';
    }
  },
};
