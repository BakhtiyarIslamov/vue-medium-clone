import userProfileApi from '@/api/userProfile.js';

const state = {
  data: null,
  isLoading: false,
  error: null,
};

export const mutationTypes = {
  getUserProfileStart: '[userProfile] getUserProfileStart',
  getUserProfileSuccess: '[userProfile] getUserProfileSuccess',
  getUserProfileFailure: '[userProfile] getUserProfileFailure',
};

export const actionTypes = {
  getUserProfile: '[userProfile] getUserProfile',
};

const mutations = {
  [mutationTypes.getUserProfileStart](state) {
    state.isLoading = true;
    state.data = null;
  },
  [mutationTypes.getUserProfileSuccess](state, payload) {
    state.isLoading = false;
    state.data = payload;
  },
  [mutationTypes.getUserProfileFailure](state) {
    state.isLoading = false;
  },
};

const actions = {
  [actionTypes.getUserProfile](contex, {slug}) {
    return new Promise((resolve) => {
      contex.commit(mutationTypes.getUserProfileStart);
      userProfileApi
        .getUserProfile(slug)
        .then((userProfile) => {
          contex.commit(mutationTypes.getUserProfileSuccess, userProfile);
          resolve(userProfile);
        })
        .catch(() => {
          contex.commit(mutationTypes.getUserProfileFailure);
        });
    });
  },
};

export default {
  state,
  actions,
  mutations,
};
