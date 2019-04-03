<template>
  <div>
    <search />
    <main class="container">
      <results />
      <button v-if="prevPageToken" class="button" @click.stop.prevent="prev">
        Prev
      </button>
      <button v-if="nextPageToken" class="button is-primary is-pulled-right" @click.stop.prevent="next">
        Next
      </button>
    </main>
  </div>
</template>

<script>
import axios from 'axios'
import Results from '~/components/results.vue'
import Search from '~/components/Search.vue'

export default {
  components: {
    Results,
    Search
  },
  computed: {
    prevPageToken () { return this.$store.state.prevPageToken },
    nextPageToken () { return this.$store.state.nextPageToken },
    keyword () { return this.$store.state.searchedKeyword },
    sort () { return this.$store.state.searchedSort }
  },
  methods: {
    prev () {
      this.getPage(this.keyword, this.sort, this.prevPageToken)
    },
    next () {
      this.getPage(this.keyword, this.sort, this.nextPageToken)
    },
    getPage (keyword, sort, pageToken) {
      axios.get(`/api/search?keyword=${keyword}&sort=${sort}&pageToken=${pageToken}`)
        .then((searchResults) => {
          this.$store.commit('setData', searchResults.data)
        }).catch(() => {
          alert('Server Error: Error during search.')
        })
    }
  }
}
</script>
