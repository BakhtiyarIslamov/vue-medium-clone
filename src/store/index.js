import {createStore} from 'vuex';

import auth from '@/store/modules/auth.js';
import feed from '@/store/modules/feed.js';
import popularTags from '@/store/modules/popularTags';
import article from '@/store/modules/article';
import createArticle from '@/store/modules/createArticle';
import editArticle from '@/store/modules/editArticle';
import settings from '@/store/modules/settings.js';
import addToFavorites from '@/store/modules/addToFavorites.js';
import userProfile from '@/store/modules/userProfile.js';

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    auth,
    feed,
    popularTags,
    article,
    createArticle,
    editArticle,
    settings,
    addToFavorites,
    userProfile,
  },
});
