<template>
  <nav class="navbar is-dark">
    <section class="navbar-brand">
      <span>Automatic Train</span>
    </section>
    <section class="navbar-menu">
      <form class="navbar-end">
        <div class="navbar-item">
          <div class="field is-horizontal">
            <div class="field-label">
              <label class="label" for="keyword">Keyword</label>
            </div>
            <div class="field-body">
              <div class="control">
                <input v-model="keyword" class="input" type="text" name="keyword">
              </div>
            </div>
          </div>
        </div>
        <div class="navbar-item">
          <div class="field is-horizontal">
            <div class="field-label">
              <label class="label" for="Sort">
                Sort
              </label>
            </div>
            <div class="field-body">
              <div class="select">
                <select v-model="sort">
                  <option value="relevance">
                    Relevance
                  </option>
                  <option value="rating">
                    Rating
                  </option>
                  <option value="date">
                    Date
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div class="navbar-item">
          <div class="field is-grouped">
            <div class="control">
              <button class="button" @click.stop.prevent="search">
                Search
              </button>
            </div>
          </div>
        </div>
      </form>
    </section>
  </nav>
</template>

<script>
import axios from 'axios'

export default {
  computed: {
    keyword: {
      get () { return this.$store.state.keyword },
      set (value) { this.$store.commit('setKeyword', value) }
    },
    sort: {
      get () { return this.$store.state.sort },
      set (value) { this.$store.commit('setSort', value) }
    }
  },
  methods: {
    search () {
      this.$store.commit('setSearched', { keyword: this.keyword, sort: this.sort })
      axios.get(`/api/search?keyword=${this.keyword}&sort=${this.sort}`)
        .then((searchResults) => {
          this.$store.commit('setData', searchResults.data)
        }).catch(() => {
          alert('Server Error: Error during search.')
        })
    }
  }
}
</script>

<style>
.navbar {
  margin-bottom: 50px;
}

.navbar-brand {
    background: url(../static/logo.png) 0 125px;
    height: 50px;
    width: 200px;
}

.navbar-brand span {
    display: none;
}

.navbar label {
    color: #fff;
}

.navbar button {
  background-color: #E68200;
  border-color: transparent;
  color: rgba(0, 0, 0, 0.7);
}
</style>
