import Vue from "vue";
import Vuex from "vuex";
import firebase from "./firebase";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userDetails: null,
    coursesData: [],
    classroomsData: [],
    usersData: [],
    uploadsData: [],
    quizezData: [],
    user: null
  },
  mutations: {
    setCoursesData(state, payload) {
        state.coursesData = payload;
      },
      setClassroomsData(state, payload) {
        state.classroomsData = payload;
      },
      setUsersData(state, payload) {
        state.usersData = payload;
      },
      setUserDetails(state, payload) {
        state.userDetails = payload;
      },
      setUploadsData(state, payload) {
        state.uploadsData = payload;
      },
      setQuizezData(state, payload) {
        state.quizezData = payload;
      },
      setUserId(state, payload) {
        state.user = payload;
      }
  },
  actions: {
    getCoursesData({ commit }) {
        return firebase
        .database()
        .ref("courses")
        .on("value", snapshot => {
            console.log(snapshot.val());
            commit("setCoursesData", snapshot.val());
        });
    },
    getClassroomsData({ commit }) {
        return firebase
        .database()
        .ref("classrooms")
        .on("value", snapshot => {
            console.log(snapshot.val());
            commit("setClassroomsData", snapshot.val());
        });
    },
    getUsersData({ commit }) {
        return firebase
        .database()
        .ref("users")
        .on("value", snapshot => {
            console.log(snapshot.val());
            commit("setUsersData", snapshot.val());
        });
    },
    getUploadsData({ commit }) {
        return firebase
        .database()
        .ref("uploads")
        .on("value", snapshot => {
            console.log(snapshot.val());
            commit("setUploadsData", snapshot.val());
        });
    },
    getQuizezData({ commit }) {
        return firebase
        .database()
        .ref("quizez")
        .on("value", snapshot => {
            console.log(snapshot.val());
            commit("setQuizezData", snapshot.val());
        });
    },
    logout({ commit }) {
      commit("setUserDetails", null);
      localStorage.clear();
    },
    login({ commit }, payload) {
      return firebase
        .database()
        .ref("users/" + payload.username)
        .on("value", snapshot => {
          console.log('snapshot login', snapshot.val())
          if (snapshot.val().password === payload.password) {
            localStorage.setItem("details", JSON.stringify(snapshot.val()));
            commit("setUserDetails", snapshot.val());
          }
        });
    },
    getDataFromLocalStorage({commit}) {
      console.log('localStorage.getItem("details")', localStorage.getItem("details"))
      localStorage.getItem("details") !== null
      ? commit("setUserDetails", localStorage.getItem("details"))
      : commit("setUserDetails", null);
    }
},
  getters: {
    userDetails: (state) => state.userDetails,
    coursesData: (state) => state.coursesData,
    classroomsData: (state) => state.classroomsData,
    usersData: (state) => state.usersData,
    uploadsData: (state) => state.uploadsData,
    quizezData: (state) => state.quizezData,
    user: (state) => state.user
}
});