import { createStore } from "vuex";
// import axios from "axios";
import { faker } from "@faker-js/faker";

export default createStore({
  state: {
    fullName: "",
    picture: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjo39W-qX_H92HpCstPe4gWvQ9R3xgfw5hee2LD_T27HzQIUft3jtser8mnjDN4bTStrA&usqp=CAU",
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
