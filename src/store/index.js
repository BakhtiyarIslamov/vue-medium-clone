import {createStore} from 'vuex';

import auth from '@/store/modules/auth.js';
import feed from '@/store/modules/feed.js';
import popularTags from '@/store/modules/popularTags';
import article from '@/store/modules/article';

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    auth,
    feed,
    popularTags,
    article,
  },
});
