import {createStore} from 'vuex';

import auth from '@/store/modules/auth.js';
import feed from '@/store/modules/feed.js';

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    auth,
    feed,
  },
});
