require('./bootstrap');

window.Vue = require('vue').default;


import VueRouter from 'vue-router';
import HomeMainComponent from "./components/HomeMainComponent";
import TaskListComponent from "./components/TaskListComponent";

//SPA部分
Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    routes:[
      {
          path:'/home',
          name:' HomeMainComponent',
          component:HomeMainComponent
      },
      {
          path:'/list',
          name:' TaskListComponent',
          component:TaskListComponent
      },


    ]
})
const main = new Vue({
  el: '#Main',
  router
});

//===============================
//Jquery
//===============================
//footer固定

//$(function(){
//  var $ftr = $('.footer-container');
//  if( window.innerHeight > $ftr.offset().top + $ftr.outerHeight() ){
//    $ftr.attr({'style': 'position:fixed; top:' + (window.innerHeight - $ftr.outerHeight()) + 'px;' });
//  }
//});
