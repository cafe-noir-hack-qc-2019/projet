/**
 * # Store composer
 * > to extend a vuexmodul within behaviours (eg mixins)
 * @see https://blog.hellocomet.co/mixin-composition-in-vuex/
 * @see https://gitlab.com/etnbrd/vuex-composition-example
 *
 * @param {VuexModule} module - your vuex base module
 * @param  {...any} behaviors -
 *
 * @exemple
 *
 * ```
 *  import composer from 'store/composer';
 *  const store = {
 *    namespaced: true,
 *    state() {
 *      return {}
 *    }
 *    ...
 *  }
 *  const behavior = function(){
 *    return {
 *      state() {},
 *      mutations:{}
 *      ...
 *    }
 *  }
 *  export default composer(store, behavior())
 * ```
 *
 * @author Nicolas Husson <nicolas@kffein.com>
 */
export default function composer(module, ...behaviors) {
  return {
    // Include everything from the main module (the namespaced attribute, for example)
    ...module,

    // The state function calls, and compose the resulting state of the functions of
    // all the behaviors, and finally overwrites it with the result from the main module.
    state() {
      const init = typeof module.state === 'function'
        ? module.state()
        : module.state || {};
      return Object.assign({},
        // Returns an array of instantiated state functions from the behaviors
        // Then spreads it into the arguments of Object.assign, to extend the object
        ...behaviors.map(behavior => behavior.state && behavior.state(init)),
        init);
    },

    // Populate the three static attributes with the behaviors attributes,
    // overwritten by the main module
    ...['getters', 'actions', 'mutations'].reduce((composed, attr) => ({
        ...composed,
        [attr]: Object.assign({},
          ...behaviors.map(behavior => behavior[attr]),
          module[attr]),
      }),
     {}),
  };
}
