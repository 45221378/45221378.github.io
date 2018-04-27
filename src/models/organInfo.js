export default {

  namespace: 'organInfo',

  state: {
    organId:'',
    organType:'',
    phone:'',
    organName:'',
    accessPath:''
  },

  subscriptions: {

  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
