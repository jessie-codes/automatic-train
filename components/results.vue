<template>
  <div class="content">
    <div v-for="rows in results" :key="rows" class="columns">
      <div
        v-for="r in rows"
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
                {{ r.comments }} Comments
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
