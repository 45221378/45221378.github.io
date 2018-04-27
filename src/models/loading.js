
export default {

  namespace: 'loading',

  state: false,

  subscriptions: {
    
  },
  reducers: {
    save(state, action){
      return action.payload
    }
  },
};
