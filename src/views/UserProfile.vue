<template>
  <div class="profile-page" v-if="userProfile">
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img :src="userProfile.image" class="user-img" />
            <h4>{{ userProfile.username }}</h4>
            <p>{{ userProfile.bio }}</p>
            <div>
              FOLLOW USER BUTTON
              <router-link
                i-if="isCurrentUserProfile"
                class="btn btn-sm btn-outline-secondary action-btn"
                :to="{name: 'settings'}"
                >Edit profile settings</router-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="article-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <router-link
                  :to="{
                    name: 'userProfile',
                    params: {slug: userProfile.username},
                  }"
                  class="nav-link"
                  :class="{active: routeName === 'userProfile'}"
                >
                  My post
                </router-link>
              </li>

              <li class="nav-item">
                <router-link
                  :to="{
                    name: 'userProfileFavorites',
                    params: {slug: userProfile.username},
                  }"
                  class="nav-link"
                  :class="{active: routeName === 'userProfileFavorites'}"
                >
                  Favorites post
                </router-link>
              </li>
            </ul>
          </div>
          <app-feed :api-url="apiUrl" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState, mapGetters} from 'vuex';
import {actionTypes as userProfileActionTypes} from '@/store/modules/userProfile.js';
import {getterTypes as authGetterTypes} from '@/store/modules/auth.js';
import AppFeed from '@/components/Feed.vue';

export default {
  name: 'AppUserProfile',
  components: {
    AppFeed,
  },
  computed: {
    ...mapState({
      isLoading: (state) => state.userProfile.isLoading,
      error: (state) => state.userProfile.error,
      userProfile: (state) => state.userProfile.data,
    }),
    ...mapGetters({
      currentUser: authGetterTypes.currentUser,
    }),
    isCurrentUserProfile() {
      if (!this.currentUser || !this.userProfile) {
        return false;
      }
      return this.currentUser.username === this.userProfile.username;
    },
    apiUrl() {
      const isFavorites = this.$route.path.includes('favorites');
      return isFavorites
        ? `/articles?favorites=${this.userProfileSlug}`
        : `/articles?author=${this.userProfileSlug}`;
    },
    userProfileSlug() {
      return this.$route.params.slug;
    },
    routeName() {
      return this.$route.name;
    },
  },
  watch: {
    userProfileSlug() {
      this.getUserProfile();
    },
  },
  mounted() {
    this.getUserProfile();
  },
  methods: {
    getUserProfile() {
      this.$store.dispatch(userProfileActionTypes.getUserProfile, {
        slug: this.userProfileSlug,
      });
    },
  },
};
</script>
