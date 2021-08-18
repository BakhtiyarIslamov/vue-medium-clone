<template>
  <div>
    <div v-if="isLoading">Loading...</div>
    <div v-if="error">Something bad happend</div>
    <div v-if="feed">
      <div
        class="article-preview"
        v-for="(article, index) in feed.articles"
        :key="index"
      >
        <div class="article-meta">
          <router-link
            :to="{name: 'userProfile', params: {slug: article.autor.username}}"
          >
            <img :src="article.autor.image" />
          </router-link>
          <div class="info">
            <router-link
              :to="{
                name: 'userProfile',
                params: {slug: article.autor.username},
              }"
              class="autor"
            >
              {{ article.autor.username }}
            </router-link>
            <span class="date">{{ article.createAt }}</span>
          </div>
          <div class="pull-xs-right">ADD TO FAVOURITES</div>
        </div>
        <router-link
          :to="{name: 'article', params: {slug: article.slug}}"
          class="preview-link"
        >
          <h1>{{ article.title }}</h1>
          <p>{{ arcitle.description }}</p>
          <span>Read more...</span>
          TAG LIST
        </router-link>
        <app-pagination
          :total="feed.articlesCount"
          :limit="limit"
          :current-page="currentPage"
          :url="baseUrl"
        />
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex';
import {actionTypes} from '@/store/modules/feed.js';
import AppPagination from '@/components/Pagination.vue';
import {limit} from '@/helpers/variables.js';
import {stringify, parseUrl} from 'query-string';

export default {
  name: 'AppFeed',
  props: {
    apiUrl: {
      type: String,
      required: true,
    },
  },
  components: {
    AppPagination,
  },
  data() {
    return {
      limit,
    };
  },
  computed: {
    ...mapState({
      isLoading: (state) => state.feed.isLoading,
      feed: (state) => state.feed.data,
      error: (state) => state.feed.error,
    }),
    currentPage() {
      return Number(this.$route.query.page || '1');
    },
    baseUrl() {
      return this.$route.path;
    },
    offset() {
      return this.currentPage * limit - limit;
    },
  },
  watch: {
    currentPage() {
      this.fetchFeed();
    },
  },
  mounted() {
    this.fetchFeed();
  },
  methods: {
    fetchFeed() {
      const parsedUrl = parseUrl(this.apiUrl);
      const stringifiedParams = stringify({
        limit,
        offset: this.offset,
        ...parsedUrl.query,
      });
      const apiUrlWithParams = `${parsedUrl.url}?${stringifiedParams}`;
      this.$store.dispatch(actionTypes.getFeed, {apiUrl: apiUrlWithParams});
    },
  },
};
</script>
