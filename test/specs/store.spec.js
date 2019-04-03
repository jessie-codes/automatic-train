import test from 'ava'
import { mutations } from '../../store'

test('setKeyword', (t) => {
  const state = { keyword: '' }
  mutations.setKeyword(state, 'test')
  t.is('test', state.keyword)
})

test('setSort', (t) => {
  const state = { sort: 'relevance' }
  mutations.setSort(state, 'date')
  t.is('date', state.sort)
})

test('setSearched', (t) => {
  const state = {
    searchedKeyword: '',
    searchedSort: ''
  }
  mutations.setSearched(state, { keyword: 'kpop', sort: 'date' })
  t.is('kpop', state.searchedKeyword)
  t.is('date', state.searchedSort)
})

test('setData', (t) => {
  const state = {
    nextPageToken: '',
    prevPageToken: '',
    results: []
  }
  mutations.setData(state, {
    pageInfo: {
      nextPageToken: 'next',
      prevPageToken: 'prev'
    },
    results: [{
      id: 1
    }, {
      id: 2
    }]
  })
  t.deepEqual({
    nextPageToken: 'next',
    prevPageToken: 'prev',
    results: [{
      id: 1
    }, {
      id: 2
    }]
  }, state)
})
