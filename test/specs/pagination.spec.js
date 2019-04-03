import test from 'ava'
import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Pagination from '../../components/pagination.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

test('pagination - should render both buttons', (t) => {
  const store = new Vuex.Store({
    state: {
      nextPageToken: 'next',
      prevPageToken: 'prev'
    }
  })

  const wrapper = mount(Pagination, { store, localVue })
  t.is(2, wrapper.findAll('button').wrappers.length)
})

test('pagination - should render no buttons', (t) => {
  const store = new Vuex.Store({
    state: {
      nextPageToken: '',
      prevPageToken: ''
    }
  })

  const wrapper = mount(Pagination, { store, localVue })
  t.is(0, wrapper.findAll('button').wrappers.length)
})

test('pagination - should only render next button', (t) => {
  const store = new Vuex.Store({
    state: {
      nextPageToken: 'next',
      prevPageToken: ''
    }
  })

  const wrapper = mount(Pagination, { store, localVue })
  t.is(1, wrapper.findAll('button').wrappers.length)
  t.is('Next', wrapper.findAll('button').at(0).text())
})

test('pagination - should only render prev button', (t) => {
  const store = new Vuex.Store({
    state: {
      nextPageToken: '',
      prevPageToken: 'prev'
    }
  })

  const wrapper = mount(Pagination, { store, localVue })
  t.is(1, wrapper.findAll('button').wrappers.length)
  t.is('Prev', wrapper.findAll('button').at(0).text())
})
