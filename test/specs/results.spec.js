import test from 'ava'
import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Results from '../../components/results.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

test('should render a card per result', (t) => {
  const store = new Vuex.Store({
    state: {
      results: [{}, {}, {}, {}, {}]
    }
  })

  const wrapper = mount(Results, { store, localVue })
  t.is(5, wrapper.findAll('.card').wrappers.length)
})

test('should render a thumbnail, if present', (t) => {
  const store = new Vuex.Store({
    state: {
      results: [{
        thumbnails: {
          high: {
            url: 'test'
          }
        }
      }]
    }
  })

  const wrapper = mount(Results, { store, localVue })
  t.is(1, wrapper.findAll('.card-image img').wrappers.length)
})

test('should render comment count, if it exists', (t) => {
  const store = new Vuex.Store({
    state: {
      results: [{
        statistics: {
          commentCount: 12
        }
      }, {}]
    }
  })

  const wrapper = mount(Results, { store, localVue })
  const comments = wrapper.findAll('.comments')
  t.is(2, comments.wrappers.length)
  t.is('Comments: 12', comments.at(0).text())
  t.is('Comments: unavailable', comments.at(1).text())
})
