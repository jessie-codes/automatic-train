export const state = () => ({
  keyword: '',
  searchedKeyword: '',
  sort: 'relevance',
  searchedSort: '',
  nextPageToken: '',
  prevPageToken: '',
  results: []
})

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
    state.results = data.results
  }
}
