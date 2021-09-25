import { createStore } from "vuex";
import axios from "axios";
export default createStore({
  state() {
    return {
      uname: "康康",
      list: []
    };
  },
  mutations: {
    initData(state, payload) {
      state.list = payload.data
    } 
  },
  actions: {
    async getData(context) {
      let res = await axios.get("/data/list.json");
      context.commit("initData", res);
    }
  }
});
