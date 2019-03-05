/**
 * # ScrollMagic store
 * > control our ScrollMagic scenes etc
 *
 * - persistant scenes : never disposed
 * - page scenes : disposed beforeDestroy (check beforeDestroy vs beforeRoute vs afterRoute)
 *
 * @todo : TEST and finish this
 *
 * @author Nicolas Husson <nicolas@kffein.com>
 */
import {
  without, filter, uniqueId, each,
 } from 'lodash';
import { Scene, Controller } from 'scrollmagic';
import 'ScrollMagicPlugins/debug.addIndicators';
import 'ScrollMagicPlugins/animation.gsap';


// const addIndicators = (process.env.NODE_ENV === 'development') && false;

export default {
  namespaced: true,
  state: {
    controller: null,
    scenes: [],
    transitioning: false,
  },
  mutations: {
    // no needs to call this since would be called on our 1st `ADD_SCENE` action
    REGISTER_CONTROLLER(state, controller) {
      state.controller = controller;
      return controller;
    },
    REMOVE_CONTROLLER(state) {
      state.controller = null;
    },
    /** please use action to add scene
    * this mutation only store our scene in the state */
    REGISTER_SCENE(state, scene) {
      state.scenes.push(scene);

      return scene;
    },
    /**
    * destroy a scene from our controller
    * @param {Object} state
    * @param {Scene} scene - scene we want to destroy
    */
    DESTROY_SCENE(state, scene) {
      state.scenes = without(state.scenes, scene);

      scene.destroy(true);
      scene = null; // eslint-disable-line no-param-reassign
    },
    /**
    * destroy a scene from our controller
    * @param {Object} state
    * @param {Array[Scene]} scenes - array of scene we want to destroy
    */
    DESTROY_SCENES(state, scenes) {
      state.scenes = without(state.scenes, ...scenes);
      each(scenes, (scene) => {
        scene.destroy(true);
        scene = null; // eslint-disable-line no-param-reassign
      });
    },
  },
  actions: {
    /**
    * create our ScrollMagic controller
    * @param {Object} store
    * @param {ScrollMagic.Controller} controller - optional
    */
    CREATE({ commit }, controller = null) {
      let ctrl = controller;
      if (!(ctrl instanceof Controller)) {
        ctrl = new Controller({
          // container: '#App',
        });
      }
      commit('REGISTER_CONTROLLER', ctrl);
    },

    /**
    * destroy our ScrollMagic controller
    * @param {Object} store
    */
    DESTROY({ getters, commit }) {
      const { controller } = getters;
      if (!(controller instanceof Controller)) {
        return;
      }
      controller.destroy(true);
      commit('REMOVE_CONTROLLER');
    },

    ADD_SCENE({
      commit, dispatch, getters, rootGetters,
    }, {
      scene,
      indicators = true, // if true, will add debug indicators (exept prod env)
      persist = false, // if true, will be destroyed on router nav update
      id = null, // just to find in state purpose
    }) {
      let { controller } = getters;

      // if no created yet, create it now (yep, its instantanious :) )
      if (!controller) {
        dispatch('CREATE');
        controller = getters.controller; // eslint-disable-line prefer-destructuring
      }

      if (scene instanceof Scene === false) {
        throw (new Error('scene must be an instance of scrollmagic.Scene'));
      }
      if (indicators && rootGetters['App/debug']) {
        scene.addIndicators();
      }

      // add id just to be able to filter scenes after (without)
      scene.id = id || uniqueId('sm-scene_');
      scene.persist = persist;
      // // uncomment to test if a persist scene is removed on DESTROY_TEMP_SCENES
      // if (scene.id === 'sm-scene_2') { scene.persist = true; }

      scene.addTo(controller);
      return commit('REGISTER_SCENE', scene);
    },
    /**
    * destroy all temp scenes (thoses without persist)
    * @param {Object} state
    * @param {Scene} scene - scene we want to destroy
    */
    DESTROY_TEMP_SCENES({ state, commit }) {
      const scenes = filter(state.scenes, scene => !scene.persist);
      each(scenes, scene => commit('DESTROY_SCENE', scene));
    },
  },
  getters: {
    controller: state => state.controller,
    scenes: state => state.scenes,
  },
};
