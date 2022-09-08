import { createStore } from "vuex";
// import axios from "axios";
import { faker } from "@faker-js/faker";

export default createStore({
  state: {
    fullName: "",
    picture: "",
    age: "",
    nationality: "",
    kanye: "",
    favdish: "",
    recipe: "",
    music: "",
  },
  mutations: {
    setFullName(state, payload) {
      state.fullName = payload;
    },
    setPicture(state, payload) {
      state.picture = payload;
    },
    setAge(state, payload) {
      state.age = payload;
    },
    setNationality(state, payload) {
      state.nationality = payload;
    },
    setKanye(state, payload) {
      state.kanye = payload;
    },
    setFavdish(state, payload) {
      state.favdish = payload;
    },
    setRecipe(state, payload) {
      state.recipe = payload;
    },
    setMusic(state, payload) {
      state.music = payload;
    },
  },
  actions: {
    async fetchProfile({ dispatch }) {
      dispatch("fetchName");
    },

    async fetchName({ commit }) {
      let name = faker.name.fullName();
      return commit("setFullName", name);
    },
  },
  modules: {},
});
