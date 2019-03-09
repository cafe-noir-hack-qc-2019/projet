/**
 * # Bot store
 */
import Axios from 'axios';
import uuid from 'uuid';
import { get } from 'lodash';

const STATUS = {
  QUERY_LOADING: 'LOADING',
  RESPONSE_RECEIVED: 'RESPONSE_RECEIVED',
};

export default {
  namespaced: true,
  state: {
    firebaseBaseUrl: 'https://us-central1-hackqc19-9d018.cloudfunctions.net',
    token: '0682a5af70de452fbe3866dfb742fe8e',
    projectId: 'hackqc19-9d018',
    sessionId: uuid.v4(),
    steps: [],
    status: null,
  },
  mutations: {
    ADD_STEP(state, payload) {
      state.steps.push(payload);
      state.status = STATUS.RESPONSE_RECEIVED;
    },
    SET_STATUS(state, payload) {
      state.status = payload;
    },
  },
  actions: {
    START_BOT({ state }) {
      console.log(state.sessionId);
      Axios({
        method: 'get',
        url: `${state.firebaseBaseUrl}/helloWorld`,
      })
        .then((response) => {
          console.log('response', response);
        });
      // dispatch('QUERY_BOT', 'bonjour');
    },
    QUERY_BOT({ commit, state }, query) {
      commit('SET_STATUS', STATUS.QUERY_LOADING);
      Axios({
        method: 'post',
        url: 'https://api.dialogflow.com/v1/query',
        data: {
          v: '20150910',
          query,
          sessionId: state.sessionId,
          lang: 'fr',
        },
        headers: {
          Authorization: `Bearer ${ state.token}`,
        },
      })
        .then((response) => {
          commit('ADD_STEP', get(response, 'data.result'));
        })
        .catch((error) => {
          console.log('error', error);
        });
    },
    INTENT_BOT({ commit, state }, query) {
      commit('SET_STATUS', STATUS.QUERY_LOADING);
      Axios({
        method: 'post',
        url: 'https://api.dialogflow.com/v1/intents',
        data: {
          v: '20150910',
          userSays: query,
          sessionId: state.sessionId,
          lang: 'fr',
          webhookUsed: true,
        },
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      })
        .then((response) => {
          console.log('responses', response);
          commit('ADD_STEP', get(response, 'data.result'));
        })
        .catch((error) => {
          console.log('error', error);
        });
    },
  },
  getters: {
    status: state => state.status,
    isLoading: state => state.status === STATUS.QUERY_LOADING,
    isResponseReceived: state => state.status === STATUS.RESPONSE_RECEIVED,
    steps: state => state.steps,
  },
};
