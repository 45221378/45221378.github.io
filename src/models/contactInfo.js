export default {

  namespace: 'contactInfo',

  state: [
    {contactRelation:"1",contactPhone:"132",contactName:""}
  ],

  subscriptions: {

  },

  reducers: {
    add(state){
      // console.log(state);
        state.push({contactRelation:"",contactPhone:"",contactName:""});
        return [...state];
    },
    remove(state,{index}){
      // console.log(index);
      var newState = state.splice(index,1);
      // console.log(newState);
      return [...newState];
    }
  },

};
