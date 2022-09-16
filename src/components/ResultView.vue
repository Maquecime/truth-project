<template>
  <div>
    <link
      href="https://fonts.googleapis.com/css?family=Source+Code+Pro:400,500"
      rel="stylesheet"
    />

    <div class="card" style="width: 80%">
      <div class="card-avatar">
        <img
          :src="picture"
          style="border-radius: 100%; padding: 10px; max-width: 200px"
        />
      </div>
      <div class="card-details">
        <div class="name">{{ fullName }}</div>
        <div class="occupation">{{ job }}</div>

          <div class="card-about">
            <div class="item">
              <span class="label">Age</span>
              <span class="value">{{ age }}</span>
            </div>
            <div class="item">
              <span class="label">Nationality</span>
              <span class="value">{{ nationality }} </span>
            </div>
            <div class="item">
              <span class="label">Gender</span>
              <span class="value">{{ gender }} </span>
            </div>
            <div class="item">
              <span class="label">Music</span>
              <div style="display: flex; flex-direction: row;">
                <span id="album_pic" ></span>
                <div style="display: flex; flex-direction: column;">
                  <span id="song"></span>
                  <span id="artist"></span>
                </div>
              </div>
            </div>
          </div>
          <div class="item">
            <span class="label">Nationality</span>
            <span class="value">{{ nationality }} </span>
          </div>
          <div class="item">
            <span class="label">Gender</span>
            <span class="value">{{ gender }} </span>
          </div>
        </div>
        <div class="skills">
          <span class="label">Favorite Kanye quote</span>
          <span class="value">{{ kanye }}</span>
        </div>
        <div class="item">
          <span class="label"> Favorite Dish</span>
          <span class="value"> {{ favdish?.strMeal }}</span>
          <span class="ingredients">{{ calories }}</span>
        </div>
        <MainLoader v-if="isLoading"> </MainLoader>
      </div>
    </div>
</template>

<script>
import MainLoader from "@/components/utils/MainLoader.vue";
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  name: "ResultView",
  components: { MainLoader },

  setup() {
    const store = useStore();
    let isLoading = computed(function () {
      return store.state.isLoading;
    });
    let fullName = computed(function () {
      return store.state.fullName;
    });

    let picture = computed(function () {
      return store.state.picture;
    });

    let age = computed(function () {
      return store.state.age;
    });
    let nationality = computed(function () {
      return store.state.nationality;
    });
    let gender = computed(function () {
      return store.state.gender;
    });
    let job = computed(function () {
      return store.state.job;
    });
    let kanye = computed(function () {
      return store.state.kanye;
    });
    let favdish = computed(function () {
      return store.state.favdish;
    });

    let music = computed(function () {
      return store.state.music;
    });
    let ingredients = computed(function () {
      return store.state.ingredients;
    });
    let calories = computed(function () {
      return store.state.calories;
    });

    return {
      fullName,
      picture,
      age,
      nationality,
      gender,
      job,
      kanye,
      favdish,
      music,
      isLoading,
      ingredients,
      calories,
    };
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}

:root {
  --background: white;

  --primary: #ff1ead;
  --secondary: #1effc3;

  --card-size: 300px;
}

body {
  height: 100vh;
  margin: 0;
  display: grid;
  place-items: center;
  padding: 1rem;
  background: var(--background);
  font-family: "Source Code Pro", monospace;

  text-rendering: optimizelegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.card {
  width: calc(var(--card-size) * 1.586);
  height: var(--card-size);

  border-radius: 0.75rem;
  box-shadow: 0 22px 70px 4px rgba(0, 0, 0, 0.56), 0 0 0 1px rgba(0, 0, 0, 0.3);

  background: black;

  display: grid;
  grid-template-columns: 40% auto;
  color: white;

  align-items: center;

  will-change: transform;
  transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1),
    box-shadow 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.card:hover {
  transform: scale(1.1);
  box-shadow: 0 32px 80px 14px rgba(0, 0, 0, 0.36), 0 0 0 1px rgba(0, 0, 0, 0.3);
}

.card-details {
  padding: 1rem;
}

.name {
  font-size: 1.25rem;
}

.occupation {
  font-weight: 600;
  color: var(--primary);
}

.card-avatar {
  display: grid;
  place-items: center;
}

svg {
  fill: white;
  width: 65%;
}

.card-about {
  margin-top: 1rem;
  display: grid;
  grid-auto-flow: column;
}

.item {
  display: flex;
  flex-direction: column;
  margin-bottom: 0.5rem;
}

.item .value {
  font-size: 1rem;
}

.item .label {
  margin-top: 0.15rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--primary);
}

.skills {
  display: flex;
  flex-direction: column;
  margin-top: 0.75rem;
}

.skills .label {
  font-size: 1rem;
  font-weight: 600;
  color: var(--primary);
}

.skill .value {
  margin-top: 0.15rem;
  font-size: 0.75rem;
  line-height: 1.25rem;
}
.ingredients {
  font-size: x-small;
  font-style: italic;
}
</style>
