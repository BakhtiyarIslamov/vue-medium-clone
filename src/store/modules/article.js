import articleApi from '@/api/article.js';

const state = {
  data: null,
  isLoading: false,
  error: null,
};

export const mutationTypes = {
  getArticleStart: '[article] getArticleStart',
  getArticleSuccess: '[article] getArticleSuccess',
  getArticleFailure: '[article] getArticleFailure',
};

export const actionTypes = {
  getArticle: '[article] getArticle',
};

const mutations = {
  [mutationTypes.getArticleStart](state) {
    state.isLoading = true;
    state.data = null;
  },
  [mutationTypes.getArticleSuccess](state, payload) {
    state.isLoading = false;
    state.data = payload;
  },
  [mutationTypes.getArticleFailure](state) {
    state.isLoading = false;
  },
};

const actions = {
  [actionTypes.getArticle](contex, {slug}) {
    return new Promise((resolve) => {
      contex.commit(mutationTypes.getArticleStart);
      articleApi
        .getArticle(slug)
        .then((article) => {
          contex.commit(mutationTypes.getArticleSuccess, article);
          resolve(article);
        })
        .catch(() => {
          contex.commit(mutationTypes.getArticleFailure);
        });
    });
  },
};

export default {
  state,
  actions,
  mutations,
};
