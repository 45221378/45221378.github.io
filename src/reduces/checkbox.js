const initcheck = {
  total:0,
  lsit:[],
  totalCheck:true
}

export const checkBox=(state=initcheck,action)=>{
  switch(action.type){
    case "list_update":
      state.list = action.data;
      state.list.forEach(item=>{
        if(!item.select){
          state.totalSelect = false;
        }dasi
      })
      return Object.assign({},state);

    case 'total_data':
      var total=0;
      var list =[];
      if(action.data){
        state.list.forEach((item,id)=>{
          total+=item.list;

        })
      }else{
        state.list.forEach((item,id)=>{
          item.select =action.data

        });
        total = 0;
      }
    state.total = total;
    state.totalSelect = action.data;
    return Object.assign({},state);

    case "single_data":
      state.total = 0;
      state.totalSelect = true;

      state.list.forEach((item,idx)=>{
        if(action.data.idx==idx){
          item.select = action.data.flag;
        }
        if(item.select){
          state.total+=item.price
        }
        if(!item.select){
          state.totalSelect = false;
        }
      })

      return Object.assign({},state);

    default:
    return Object.assign({},state);
  }
}
