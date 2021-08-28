import { createStore } from 'vuex'

export default createStore({
  state: {
    
    isAddDialogVisible:false,
    isEditDiglogVisible:false,
    isEditRightsBoxVisible:false,
    isSetRolesDialogVisible:false,
    isAddRolesBoxDialogVisible:false,
    isEditRolesBoxDialogVisible:false,
    userData:'',
    total:0,
    queryInfo:{
      query:'',
      pagenum:1,
      pagesize:5,
    },
    defKey:'',
  },
  mutations: {
    
  },
  actions: {
  },
  modules: {
  }
})
