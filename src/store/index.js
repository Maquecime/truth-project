import { createStore } from "vuex";
import axios from "axios";
import { faker } from "@faker-js/faker";
import country from "country-list-js";
import { getIngredients } from "../methods";
import { getCalories } from "../methods";

export default createStore({
  state: {
    fullName: "",
    picture:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjo39W-qX_H92HpCstPe4gWvQ9R3xgfw5hee2LD_T27HzQIUft3jtser8mnjDN4bTStrA&usqp=CAU",
    age: "",
    nationality: "",
    gender: "",
    job: "",
    kanye: "",
    favdish: {},
    ingredients: "",
    music: "",
    isLoading: false,
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
    setGender(state, payload) {
      state.gender = payload;
    },
    setJob(state, payload) {
      state.job = payload;
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
    setIsLoading(state, payload) {
      state.isLoading = payload;
    },
  },
  actions: {
    async fetchProfile({ dispatch, commit }) {
      commit("setIsLoading", true);
      dispatch("fetchJob");
      dispatch("fetchKanye");
      await dispatch("fetchDish").then(() => {
        dispatch("fetchCalories");
      });
      await dispatch("fetchGender")
        .then(async () => {
          await dispatch("fetchName").then(() => dispatch("fetchNationality"));
          await dispatch("fetchPicture").then(() => dispatch("fetchAge"));
        })
        .catch((err) => console.log(err));
      commit("setIsLoading", false);
    },
    async fetchName({ state, commit }) {
      let gender = state.gender.toLowerCase();
      let firstName = faker.name.firstName(gender.toLowerCase());
      let lastName = faker.name.lastName();
      return commit("setFullName", firstName.concat(" ", lastName));
    },
    async fetchGender({ commit }) {
      let gender = Math.round(Math.random()) == 0 ? "Male" : "Female";
      return commit("setGender", gender);
    },
    async fetchPicture({ state, commit }) {
      let gender = state.gender;
      await axios
        .get("https://fakeface.rest/face/json", {
          params: {
            gender: gender.toLowerCase(),
          },
        })
        .then(function (response) {
          return commit("setPicture", response.data.image_url);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    async fetchAge({ state, commit }) {
      let picture = state.picture;
      let apiKey =
        import.meta.env.VITE_RAPID_API_KEY != ""
          ? import.meta.env.VITE_RAPID_API_KEY
          : import.meta.env.VITE_LOCAL_RAPID_API_KEY;
      const options = {
        method: "POST",
        url: "https://age-detector.p.rapidapi.com/age-detection",
        headers: {
          "content-type": "application/json",
          "X-RapidAPI-Key": apiKey,
          "X-RapidAPI-Host": "age-detector.p.rapidapi.com",
        },
        data: { url: picture },
      };

      await axios
        .request(options)
        .then(function (response) {
          return commit("setAge", response.data[0].age.value);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    async fetchNationality({ state, commit }) {
      let firstName = state.fullName.split(" ")[0];
      await axios
        .get("https://api.nationalize.io", {
          params: {
            name: firstName,
          },
        })
        .then(function (response) {
          return commit(
            "setNationality",
            country.findByIso2(response.data.country[0].country_id).name
          );
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    async fetchJob({ commit }) {
      let job = faker.name.jobTitle();
      return commit("setJob", job);
    },
    async fetchKanye({ commit }) {
      await axios
        .get("https://api.kanye.rest")
        .then(function (response) {
          return commit("setKanye", response.data.quote);
        })
        .catch(function (error) {
          console.log(error);
        });
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
