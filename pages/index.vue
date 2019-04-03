<template>
  <div>
    <search />
    <main class="container">
      <results />
      <pagination />
    </main>
  </div>
</template>

<script>
import Pagination from '~/components/pagination.vue'
import Results from '~/components/results.vue'
import Search from '~/components/Search.vue'

export default {
  components: {
    Results,
    Search,
    Pagination
  }
}
</script>
