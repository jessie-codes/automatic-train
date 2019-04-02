export const state = () => ({
  keyword: '',
  searchedKeyword: '',
  sort: 'relevance',
  searchedSort: '',
  nextPageToken: '',
  prevPageToken: '',
  results: [[]]
})

const columns = 5

export const mutations = {
  setKeyword (state, keyword) {
    state.keyword = keyword
  },
  setSort (state, sort) {
    state.sort = sort
  },
  setSearched (state, searched) {
    state.searchedKeyword = searched.keyword
    state.searchedSort = searched.sort
  },
  setData (state, data) {
    state.nextPageToken = data.pageInfo.nextPageToken
    state.prevPageToken = data.pageInfo.prevPageToken

    const results = []
    while (data.results.length > 0) {
      results.push(data.results.splice(0, columns))
    }
    state.results = results
  }
}
