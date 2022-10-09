require('./bootstrap');

window.Vue = require('vue').default;


import VueRouter from 'vue-router';
import IndexComponent from "./components/IndexComponent";
import HomeMainComponent from "./components/HomeMainComponent";
import TaskListComponent from "./components/TaskListComponent";
import FooterComponent from "./components/FooterComponent";
import ModalTodoComponent from "./components/ModalTodoComponent";
import ModalTodoDetailComponent from "./components/ModalTodoDetailComponent";
import ModalTodoListComponent from "./components/ModalTodoListComponent";
import ModalTodoCategoryComponent from "./components/ModalTodoCategoryComponent";
import AuthComponent from "./components/AuthComponent.vue";
import SystemErrorComponent from "./components/errors/SystemErrorComponent.vue";
import NotFoundErrorComponent from "./components/errors/NotFoundErrorComponent.vue";
import SessionErrorComponent from "./components/errors/SessionErrorComponent.vue";



import './bootstrap'

import Vue from 'vue';
import store from './store'
import * as VueGoogleMaps from 'vue2-google-maps'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/ja'

//言語設定
import VueI18n from 'vue-i18n';
Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: locale,
  messages: {
    ja : require('../lang/ja.json'),
  }
});

//Google MAP API設定
Vue.use(VueGoogleMaps, {
  load: {
    //key:'AIzaSyCOpcYukoUH1HWzNnXhPtpsSbpeb8MZrso',
    key:process.env.MIX_APP_MAP_API_KEY,
    libraries: 'places',
    region: 'places',
    language: 'ja'
  }
})

//Vue.jsライブラリの使用宣言
Vue.use(VueRouter);
Vue.use(ElementUI, { locale });


const router = new VueRouter({
    mode: 'history',
    routes:[
      {
          path:'/',
          name:' AuthComponent',
          component:AuthComponent,
          beforeEnter(to, from, next){
            if(store.getters['auth/check']){
              next('/home')
            }else{
              next()
            }
          }
      },
      {
        path: '*',
        name: 'NotFoundError',
        component: NotFoundErrorComponent,
      },
      {
        path:'/home',
        name:' HomeMainComponent',
        component:HomeMainComponent,
        beforeEnter(to, from, next){
          if(store.getters['auth/check']){
            //console.log('kokodayo ')
            next()
          }else{
            next('/')
          }
        }
      },
      {
          path:'/list/today',
          name:'listToday',
          component:TaskListComponent,
          props: true,
          beforeEnter(to, from, next){
            if(store.getters['auth/check']){
              next()
            }else{
              next('/')
            }
          }
  
      },
      {
        path:'/list/scheduled',
        name:'listScheduled',
        component:TaskListComponent,
        props: true,
        beforeEnter(to, from, next){
          if(store.getters['auth/check']){
            next()
          }else{
            next('/')
          }
        }

      },
      {
        path:'/list/expired',
        name:'listExpired',
        component:TaskListComponent,
        props: true,
        beforeEnter(to, from, next){
          if(store.getters['auth/check']){
            next()
          }else{
            next('/')
          }
        }

      },
      {
        path:'/list',
        name:'list',
        component:TaskListComponent,
        props: true,
        beforeEnter(to, from, next){
          if(store.getters['auth/check']){
            next()
          }else{
            next('/')
          }
        }
    },
    {
      path:'/list/:listId',
      name:'listSelectedId',
      component:TaskListComponent,
      props: true,
      beforeEnter(to, from, next){
        if(store.getters['auth/check']){
          const listId = to.params.listId
          const userId = store.getters['auth/id']
          const list = store.getters['list/indexAllLists']
          const userList = list.filter(function(object){
          return object.id === listId
          })
          //console.log('ここだよ')
          //console.log(userList)
          if(userList.length === 0){
            next('/home')
          }else{
            next()
          }
        }else{
          next('/')
        }
      }
  },
      {
        path:'/500',
        name: 'SystemErrorComponent',
        component: SystemErrorComponent
      },
      {
        path:'/419',
        name: 'SessionErrorComponent',
        component: SessionErrorComponent
      },


    ]
})
  
const createApp = async ()=> {
  await store.dispatch('auth/currentUser')


    new Vue({
      el: '#Main',
      router,
      store,
      i18n: i18n,
      data: {
      },
      components: {
        IndexComponent,
      }

  });

}

createApp()

!(function () {
  const viewport = document.querySelector('meta[name="viewport"]');
  function switchViewport() {
    const value =
      window.outerWidth > 360
        ? 'width=device-width,initial-scale=1'
        : 'width=360';
    if (viewport.getAttribute('content') !== value) {
      viewport.setAttribute('content', value);
    }
  }
  addEventListener('resize', switchViewport, false);
  switchViewport();
})();








//===============================
//Jquery
//===============================
//footer固定
//$(function(){

    //modal表示
//    $('.js-modal-open').on('click',function(){
//      $(this).blur();
//      let target = $(this).attr('data-target');
//      $('.js-overlay-container').addClass('isShow');
//      $('body').addClass('isFixed');

//      if(target  === 'modal-todo'){
//        $('.js-modal-todo').addClass('isShow');
//      }else if(target === 'modal-list'){
//        $('.js-modal-list').addClass('isShow');
//      }
//    });

    //modalとじる
//    $(".js-modal-close, .js-overlay-container").unbind().click(function(){
//        $('.js-overlay-container').removeClass('isShow');
//        $('body').removeClass('isFixed');
//        $('.js-modal-todo').removeClass('isShow');
//        $('.js-modal-list').removeClass('isShow');
//    });
//})
