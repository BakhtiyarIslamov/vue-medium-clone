<template>
  <div class="home-page">
    <app-banner />
    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <app-feed :api-url="apiUrl" />
        </div>
        <div class="col-md-3">
          <app-popular-tags />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppFeed from '@/components/Feed.vue';
import AppPopularTags from '@/components/PopularTags.vue';
import AppBanner from '@/components/Banner.vue';

export default {
  name: 'AppTagFeed',
  components: {
    AppFeed,
    AppPopularTags,
    AppBanner,
  },
  computed: {
    apiUrl() {
      const tagName = this.$route.params.slug;
      return `/articles?tag=${tagName}`;
    },
  },
};
</script>
