/**
 * # Menu store
 * > control our menu state (open/close)
 *
 * @todo :
 *
 * @author Sebastien Levy <sebastien@kffein.com>
 */

export default {
    namespaced: true,
    state: {
        open: false,

    },
    mutations: {
        TOGGLE(state) {
            state.open = !state.open;
        },
    },
    actions: {
        TOGGLE({ commit }) {
            commit('TOGGLE');
        },
    },
    getters: {
        // we must return a function to watch it with this.$store.watch
        // watch(fn: Function, callback: Function, options?: Object): Function
        open: state => state.open,
    },
};
