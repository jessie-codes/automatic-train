<template>
  <div class="content">
    <div class="columns">
      <div
        v-for="r in results"
        :key="r.id"
        class="column is-one-fifth"
      >
        <div class="card">
          <section class="card-image">
            <img :src="r.thumbnails.high.url" :alt="r.title">
          </section>
          <section class="card-content">
            <div class="media">
              <div class="media-content">
                <a class="title is-4" :href="r.link" target="_blank"> {{ r.title }} </a>
              </div>
            </div>
            <div class="content">
              <p> {{ r.description }}</p>
              <p class="comments">
                Comments: {{ r.statistics.commentCount }}
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    results () { return this.$store.state.results }
  }
}
</script>

<style>
.card {
  height: 100%;
  word-break: break-word;
}

.comments {
    position: absolute;
    bottom: 10px;
}
</style>
