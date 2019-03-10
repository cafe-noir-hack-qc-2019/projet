/**
 * # Bot store
 */
import Axios from 'axios';
import uuid from 'uuid';
import { get } from 'lodash';
import { ApiAiClient } from 'api-ai-javascript';

const STATUS = {
  QUERY_LOADING: 'LOADING',
  RESPONSE_RECEIVED: 'RESPONSE_RECEIVED',
};

export default {
  namespaced: true,
  state: {
    token: 'e382bdba343946bd9a56fd60b6da2368',
    projectId: 'hackqc19-9d018',
    sessionId: uuid.v4(),
    steps: [],
    status: null,
    client: null,
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
    START_BOT({ dispatch, state }) {
      state.client = new ApiAiClient({ accessToken: state.token });

      console.log('LOG BOT OBJ:', state.client);
      dispatch('QUERY_BOT', { text: 'bonjour', type: 'bot' });
    },
    QUERY_BOT({ commit, state }, query) {
      state.client.textRequest(query.text)
          .then((response) => {
            console.log('QUERY BOT RESPONSE:', response);
            commit('ADD_STEP', get(response, 'result.fulfillment'));
          })
          .catch((error) => { console.log(error); });
      commit('SET_STATUS', STATUS.QUERY_LOADING);
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
          console.log('response', response);
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
