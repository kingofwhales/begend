import Vuex from "vuex"

const createStore = () => {
  return new Vuex.Store({
    state: {
      pos: {
        lat: 0,
        long: 0
      }
    },
    getters: {
      pos: state => state.pos
    },
    mutations: {
      setPos(state, payload) {
        state.pos.lat = payload.latitude
        state.pos.long = payload.longitude
      }
    }
  })
}

export default createStore
