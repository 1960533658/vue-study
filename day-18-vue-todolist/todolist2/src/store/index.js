import { createStore } from "vuex";
import axios from "axios";
export default createStore({
  state: {
    list: [],
    viewKey: "all"
  },
  mutations: {
    initData(state, payload) {
      state.list = payload.data;
    },
    addData(state, payload) {
      state.list.push({
        id: new Date().valueOf(),
        info: payload,
        done: false
      });
    },
    deleteData(state, payload) {
      state.list.splice(
        state.list.findIndex(item => item.id == payload),
        1
      );
    },
    changeData(state, payload) {
      let index = state.list.findIndex(item => item.id == payload.id);
      state.list[index].done = payload.done;
    },
    cleanData(state) {
      state.list = state.list.filter(item => item.done == false);
    },
    handleData(state, payload) {
      state.viewKey = payload;
    }
  },
  actions: {
    async getData(context) {
      let res = await axios.get("/list.json");
      context.commit("initData", res);
    }
  },
  getters: {
    count(state) {
      let data = state.list.filter(item => item.done == false);
      return data.length;
    },
    filterList(state) {
      if (state.viewKey == "all") {
        return state.list;
      }
      if (state.viewKey == "undone") {
        return state.list.filter(item => item.done == false);
      }
      if (state.viewKey == "done") {
        return state.list.filter(item => item.done == true);
      }
    }
  }
});
