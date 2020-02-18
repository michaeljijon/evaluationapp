import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase/app';
import router from '../router';

import db from '../firebase';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {},
    history: [],
    error: '',
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
    setError(state, payload) {
      state.error = payload;
    },
    setHistory(state, tasks) {
      state.history = tasks;
    },
    remove(state, id) {
      state.history = state.history.filter((task) => task.id !== id);
    },
    add(state, evaluation) {
      state.history.push(evaluation);
    },
  },
  actions: {
    createUser({ commit }, payload) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then((res) => {
          commit('setUser', { email: res.user.email, uid: res.user.uid });
          router.push({ name: 'Evaluation' });
        })
        .catch((err) => {
          commit('setError', err.message);
        });
    },
    login({ commit }, payload) {
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then((res) => {
          commit('setUser', { email: res.user.email, uid: res.user.uid });
          router.push({ name: 'Evaluation' });
        })
        .catch((err) => {
          commit('setError', err.message);
        });
    },
    detectUser({ commit }, payload) {
      commit('setUser', payload);
    },
    logout({ commit }) {
      firebase.auth().signOut();
      commit('setUser', null);
    },
    get({ commit }, userId) {
      const history = [];
      db.collection('evaluations').where('userId', '==', userId).get()
        .then((snapshot) => {
          snapshot.docs.forEach((doc) => {
            const evaluation = doc.data();
            evaluation.id = doc.id;
            history.push(evaluation);
          });
          commit('setHistory', history);
        });
    },
    add({ commit }, payload) {
      db.collection('evaluations').add(payload)
        .then((doc) => {
          commit('add', { id: doc.id, ...payload });
        });
    },
    remove({ commit }, id) {
      db.collection('evaluations').doc(id).delete()
        .then(() => {
          commit('remove', id);
        });
    },
    getEvaluation(context, data) {
      return db.collection('evaluations').where('name', '==', data.name).where('userId', '==', data.userId).get();
    },
  },
  getters: {
    existsUser(state) {
      return state.user;
    },
  },
  modules: {
  },
});
