import { createStore } from "vuex";
import axios from "axios";
import { faker } from "@faker-js/faker";
import { getIngredients } from "../methods";
import { getCalories } from "../methods";

export default createStore({
  state: {
    fullName: "",
    picture:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjo39W-qX_H92HpCstPe4gWvQ9R3xgfw5hee2LD_T27HzQIUft3jtser8mnjDN4bTStrA&usqp=CAU",
    age: "",
    nationality: "",
    kanye: "",
    favdish: {},
    ingredients: "",
    music: "",
    calories: "",
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
    setFavDish(state, payload) {
      state.favdish = payload;
    },
    setMusic(state, payload) {
      state.music = payload;
    },
    setIngredients(state, payload) {
      state.ingredients = payload;
    },
    setCalories(state, payload) {
      state.calories = payload;
    },
  },
  actions: {
    async fetchProfile({ dispatch }) {
      dispatch("fetchName");
      await dispatch("fetchDish").then(() => {
        dispatch("fetchCalories");
      });
    },

    async fetchName({ commit }) {
      let name = faker.name.fullName();
      return commit("setFullName", name);
    },
    async fetchDish({ commit, state }) {
      await axios
        .get("https://www.themealdb.com/api/json/v1/1/random.php")
        .then((res) => {
          commit("setFavDish", res?.data?.meals[0]);
          let ingredients = getIngredients(state.favdish);
          return commit("setIngredients", ingredients);
        })
        .catch((err) => console.log(err));
    },

    async fetchCalories({ state, commit }) {
      let ingredients = state.ingredients;
      const options = {
        method: "GET",
        url: "https://api.api-ninjas.com/v1/nutrition?query=" + ingredients,
        headers: {
          "content-type": "application/json",
          "X-Api-Key": import.meta.env.VITE_NINJAS_API_KEY,
        },
      };

      await axios
        .request(options)
        .then(function (response) {
          let calories = getCalories(response.data);
          console.log(response);
          console.log(calories);
          return commit("setCalories", calories);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
  modules: {},
});
