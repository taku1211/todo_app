import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'


import auth from './auth'
import error from './error'
import list from './list'
import category from './category'
import todo from './todo'
import message from './message'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    auth,
    error,
    list,
    category,
    todo,
    message,
  },
  plugins: [createPersistedState(
      {
        key: 'todoAppVuex',
        paths:[
            'list.indexAllLists',
            'todo.allTodoCounts',
            'todo.todayTodoCounts',
            'todo.scheduledTodoCounts',
            'todo.expiredTodoCounts',
            'todo.indexAllTodo',
            'todo.listType',
            'category.indexAllCategorys'
            
        ],
        storage:window.sessionStrage
      }
  )],
})

export default store