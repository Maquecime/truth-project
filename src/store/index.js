import { createStore } from "vuex";
import { faker } from  "@faker-js/faker";

export default createStore({
  state: {
    userName: "",
  },
  mutations: {
    setUserName(state, payload) {
      state.userName = payload;
    },
  },
  actions: {
    async fetchUserName({ commit }) {
      let name = faker.name.fullName();
      return commit("setUserName", name);
    },
  },
  modules: {},
});
