import { createStore } from "vuex";
// import axios from "axios";
import { faker } from "@faker-js/faker";
import axios from "axios";

export default createStore({
  state: {
    fullName: "",
    picture:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjo39W-qX_H92HpCstPe4gWvQ9R3xgfw5hee2LD_T27HzQIUft3jtser8mnjDN4bTStrA&usqp=CAU",
    age: "",
    nationality: "",
    gender: "",
    kanye: "",
    favdish: "",
    recipe: "",
    music: "",
    isLoading: false,
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
    setIsLoading(state, payload) {
      state.isLoading = payload;
    },
  },
  actions: {
    async fetchProfile({ dispatch, commit }) {
      commit("setIsLoading", true);
      await dispatch("fetchGender")
        .then(async () => {
          dispatch("fetchName");
          await dispatch("fetchPicture").then(() => dispatch("fetchAge"));
        })
        .catch((err) => console.log(err));
        dispatch("fetchMusic");
      commit("setIsLoading", false);
    },
    async fetchName({ state, commit }) {
      let gender = state.gender.toLowerCase();
      let name = faker.name.fullName({ sex: gender });
      return commit("setFullName", name);
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
      const options = {
        method: "POST",
        url: "https://age-detector.p.rapidapi.com/age-detection",
        headers: {
          "content-type": "application/json",
          "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API_KEY,
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

    async fetchMusic({commit}) {
      var client_id = import.meta.env.VITE_CLIENTID;
      var accessToken= "?access_token=CXyFeSBw2lAdG41xkuU3LS6a_nwyxwwCz2dCkUohw-rw0C49x2HqP__6_4is5RPx";
      var maxSong= 2471960;
      var songID = getRandomInt(1,maxSong);;
       

      const options = {
        method: 'GET',
        url : 'https://api.genius.com/songs/' + songID + accessToken
      }

      await axios.request(options)
        .then(res => {
          console.log(res)
          if (res.request.status != 200){
            axios.request(options)
          }
          var json = res.data.response
          var song = json['song'];
          // console.log(song)
          document.getElementById("album_pic").innerHTML = "<img src=\""+song['song_art_image_url']+"\"alt=\"Some Awesome Album Art\" style=\"width:50px;height:50px;\">";
          document.getElementById("song").innerHTML = " Song : <a target=\"_blank\" href="+song['url']+" >"+song['title']+"</a>";
          document.getElementById("artist").innerHTML = " Artiste : <a target=\"_blank\"  href="+song['primary_artist']['url']+">"+song['primary_artist']['name']+"</a>";
        })
        .catch(err => console.log(err))

    }
  },
  modules: {},
});

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
