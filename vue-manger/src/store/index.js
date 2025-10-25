import Vue from 'vue'
import Vuex from 'vuex'
import menu from "@/store/modules/menu"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: ''
  },
  getters: {
  },
  mutations: {
    SET_TOKEN:(state ,token)=>{
      console.log("localstorage中存储的随机码:",token)
      state.token = token
      localStorage.setItem("token",token)
    }
  },
  actions: {
  },
  modules: {
    menu
  }
})
