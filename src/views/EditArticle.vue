<template>
  <div>
    <app-loading v-if="isLoading" />
    <app-article-form
      v-if="initialValues"
      :initial-values="initialValues"
      :errors="validationErrors"
      :is-submitting="isSubmitting"
      @article-submit="onSubmit"
    />
  </div>
</template>

<script>
import AppArticleForm from '@/components/ArticleForm.vue';
import AppLoading from '@/components/Loading.vue';
import {mapState} from 'vuex';
import {actionTypes} from '@/store/modules/editArticle.js';

export default {
  name: 'AppEditArticle',
  components: {
    AppArticleForm,
    AppLoading,
  },
  computed: {
    ...mapState({
      isSubmitting: (state) => state.editArticle.isSubmitting,
      isLoading: (state) => state.editArticle.isLoading,
      validationErrors: (state) => state.editArticle.validationErrors,
      article: (state) => state.editArticle.article,
    }),
    initialValues() {
      if (!this.article) {
        return null;
      }

      return {
        title: this.article.title,
        description: this.article.description,
        body: this.article.body,
        tagList: this.article.tagList,
      };
    },
  },
  mounted() {
    this.$store.dispatch(actionTypes.getArticle, {
      slug: this.$route.params.slug,
    });
  },
  methods: {
    onSubmit(articleInput) {
      this.$store
        .dispatch(actionTypes.updateArticle, {
          slug: this.$route.params.slug,
          articleInput,
        })
        .then((article) => {
          this.$router.push({name: 'article', params: {slug: article.slug}});
        });
    },
  },
};
</script>
