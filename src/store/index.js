import { createStore } from 'vuex'

export default createStore({
  state: {
    
    isAddDialogVisible:false,
    isEditDiglogVisible:false,
    userData:'',
    total:0,
    queryInfo:{
      query:'',
      pagenum:1,
      pagesize:5,
    },
  },
  mutations: {
    
  },
  actions: {
  },
  modules: {
  }
})
