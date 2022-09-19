
<template>
<footer class="footer-container" v-if="isLogin">

  <transition name="slide-bottom">
    <ModalTodoComponent v-if="showModalTodo" @close="closeModalTodo"></ModalTodoComponent>
  </transition>
  
  <transition name="slide-bottom">
    <ModalCreateListComponent v-if="showModalCreateList" @closeList="showModalCreateList = false"></ModalCreateListComponent>
  </transition>

  <section class="responsive-button-container" v-if="url == '/home'">
    <div class="button-area button-area-responsive">
      <button type="button" class="button button-blue button-responsive" @click="showModalTodo = true">TODO追加</button>
      <button type="button" class="button button-orange button-responsive" @click="showModalCreateList = true">リスト追加</button>
    </div>
  </section>


  <nav class="nav-container" v-if="url !== '/500' && url !== '/419'">
    <ul class="menu menu-pc">
      <li class="menu-item menu-item-pc">
          <i class="fa-solid fa-plus icon icon-footer" @click="showModalTodo = true"></i>
          <div class="menu-item">TODO追加</div>
      </li>
      <li class="menu-item menu-item-pc">
        <i class="fa-solid fa-calendar-plus icon icon-footer" @click="showModalCreateList = true"></i>
          <div class="menu-item">LIST追加</div>
      </li>
      <li class="menu-item">
        <router-link to="/home">
          <i class="fa-solid fa-house-chimney icon icon-footer" :class="url == '/home'?'icon-footer-hover':''"></i>
          <li class="menu-item">ホーム</li>
        </router-link>
      </li>
      <li class="menu-item">
        <router-link :to="{name:'list', params:{listType:'list'}}">
          <i class="fa-solid fa-list-check icon icon-footer" :class="url == '/list'?'icon-footer-hover':''"></i>
          <li class="menu-item">すべて</li>
        </router-link>
      </li>

      <li class="menu-item">   
         <router-link :to="{name:'listToday', params:{listType:'today'}}">
          <i class="fa-solid fa-calendar-day icon icon-footer" :class="url == '/list/today'?'icon-footer-hover':''"></i>
          <li class="menu-item">今日</li>
         </router-link>
      </li>
      <li class="menu-item">
        <router-link :to="{name:'listScheduled', params:{listType:'scheduled'}}">
          <i class="fa-solid fa-triangle-exclamation icon icon-footer" :class="url == '/list/scheduled'?'icon-footer-hover':''"></i>
          <li class="menu-item">期限あり</li>
        </router-link>
        </li>
      <li class="menu-item">
        <router-link :to="{name:'listExpired', params:{listType:'expired'}}">
          <i class="fa-solid fa-circle-xmark icon icon-footer" :class="url == '/list/expired'?'icon-footer-hover':''"></i>
          <li class="menu-item">期限切れ</li>
        </router-link>
      </li>
    </ul>

  </nav>
</footer>

</template>




<script>
  import ModalTodoComponent from "./ModalTodoComponent";
  import ModalCreateListComponent from "./ModalCreateListComponent";


  export default{
    data: function() {
      return {
      showModalTodo: false,
      showModalCreateList: false,
      url:this.$route.path,
      }
    },
    components:{
        ModalTodoComponent,
        ModalCreateListComponent,
    },
    methods:{
        closeModalTodo: function(){
          this.showModalTodo = false
           
        }
    },
    computed: {
      isLogin(){
        return this.$store.getters['auth/check']
      },
    },
    watch: {
    $route(to, from) {
      this.url= this.$route.path
    }
   }
  }
</script>
