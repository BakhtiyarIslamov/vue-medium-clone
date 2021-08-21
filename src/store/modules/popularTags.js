import popularTagsApi from '@/api/popularTags.js';

const state = {
  data: null,
  isLoading: false,
  error: null,
};

export const mutationTypes = {
  getPopularTagsStart: '[popularTags] getPopularTagsStart',
  getPopularTagsSuccess: '[popularTags] getPopularTagsSuccess',
  getPopularTagsFailure: '[popularTags] getPopularTagsFailure',
};

export const actionTypes = {
  getPopularTags: '[popularTags] getPopularTags',
};

const mutations = {
  [mutationTypes.getPopularTagsStart](state) {
    state.isLoading = true;
    state.data = null;
  },
  [mutationTypes.getPopularTagsSuccess](state, payload) {
    state.isLoading = false;
    state.data = payload;
  },
  [mutationTypes.getPopularTagsFailure](state) {
    state.isLoading = false;
  },
};

const actions = {
  [actionTypes.getPopularTags](contex) {
    return new Promise((resolve) => {
      contex.commit(mutationTypes.getPopularTagsStart);
      popularTagsApi
        .getPopularTags()
        .then((tags) => {
          contex.commit(mutationTypes.getPopularTagsSuccess, tags);
          resolve(tags);
        })
        .catch(() => {
          contex.commit(mutationTypes.getPopularTagsFailure);
        });
    });
  },
};

export default {
  state,
  actions,
  mutations,
};
