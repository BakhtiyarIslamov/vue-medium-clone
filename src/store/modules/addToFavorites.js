import addToFavoritesApi from '@/api/addToFavorites';

export const mutationsTypes = {
  addToFavoritesStart: '[addToFarotites] addToFarotitesStart',
  addToFavoritesSuccess: '[addToFarotites] addToFarotitesSuccess',
  addToFavoritesFailure: '[addToFarotites] addToFarotitesFailure',
};

export const actionTypes = {
  addToFavorites: '[addToFarotites] addToFavorites',
};

const mutations = {
  [mutationsTypes.addToFavoritesStart]() {},
  [mutationsTypes.addToFavoritesSuccess]() {},
  [mutationsTypes.addToFavoritesFailure]() {},
};

const actions = {
  [actionTypes.addToFavorites](contex, {slug, isFavorited}) {
    return new Promise((resolve) => {
      contex.commit(mutationsTypes.addToFavoritesStart);
      const promise = isFavorited
        ? addToFavoritesApi.removeFromFavorites(slug)
        : addToFavoritesApi.addToFavorites(slug);
      promise
        .then((article) => {
          contex.commit(mutationsTypes.addToFavoritesSuccess, article);
          resolve(article);
        })
        .catch(() => {
          contex.commit(mutationsTypes.addToFavoritesFailure);
        });
    });
  },
};

export default {
  mutations,
  actions,
};
