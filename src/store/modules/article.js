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

  deleteArticleStart: '[article] deleteArticleStart',
  deleteArticleSuccess: '[article] deleteArticleSuccess',
  deleteArticleFailure: '[article] deleteArticleFailure',
};

export const actionTypes = {
  getArticle: '[article] getArticle',
  deleteArticle: '[article] deleteArticle',
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
  [mutationTypes.deleteArticleStart]() {},
  [mutationTypes.deleteArticleSuccess]() {},
  [mutationTypes.deleteArticleFailure]() {},
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
  [actionTypes.deleteArticle](contex, {slug}) {
    return new Promise((resolve) => {
      contex.commit(mutationTypes.deleteArticleStart);
      articleApi
        .deleteArticle(slug)
        .then(() => {
          contex.commit(mutationTypes.deleteArticleSuccess);
          resolve();
        })
        .catch(() => {
          contex.commit(mutationTypes.deleteArticleFailure);
        });
    });
  },
};

export default {
  state,
  actions,
  mutations,
};