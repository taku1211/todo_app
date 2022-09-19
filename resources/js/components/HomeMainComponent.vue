<template>
<div class="body-container">
    <header class="header-container">
      
      <h1 class="title title-header">TODO APP</h1>
      
      <nav class="nav-header-container">
        <ul class="menu">
          <li class="menu-item" v-if="!showHomeMenu"><i class="fa-solid fa-bars icon icon-header icon-hover" @click="openHomeMenu"></i></li>
          <li class="menu-item"  v-else-if="showHomeMenu"><i class="fa-solid fa-xmark icon icon-header icon-hover" @click="openHomeMenu"></i></li>
        </ul>
      </nav>
    </header>

     <transition name="slide-right">
      <HomeMenuComponent v-if="showHomeMenu" @close="closeHomeMenu" @showAccountPage="showEditAccount"></HomeMenuComponent>
     </transition>
     <transition name="slide-right">
      <HomeAccountComponent v-if="showAccountPage" @close="closeAccountPage"></HomeAccountComponent>
    </transition>

    <main class="flex-container flex-container-home">
      <h2 class="title title-pc text-center margin-bottom-xxl">My List & My Todo</h2>
       <section class="main-container">
        

         <div class="todo-container">
          
          
          <router-link :to="{name:'list', params:{listType:'list'}}">
           <div class="grid-container grid-container-white">
             <div class="circle-area circle-area-category circle-area-orange">
               <i class="fa-solid fa-file icon icon-white"></i>
             </div>
             <div class="task-count-area ">
               {{allTodoCounts}}
             </div>
               <p class="text">すべて</p>
          </div> 
         </router-link>
          <router-link :to="{name:'listToday', params:{listType:'today'}}">
           <div class="grid-container grid-container-white">
             <div class="circle-area  circle-area-category circle-area-blue">
               <i class="fa-solid fa-calendar-day icon icon-white"></i>
             </div>
             <div class="task-count-area ">
               {{todayTodoCounts}}
             </div>
               <p class="text">今日</p>
           </div>
          </router-link>
          <router-link :to="{name:'listScheduled', params:{listType:'scheduled'}}">
           <div class="grid-container grid-container-white">
             <div class="circle-area  circle-area-category circle-area-red">
               <i class="fa-solid fa-triangle-exclamation icon icon-white"></i>
             </div>
             <div class="task-count-area ">
               {{scheduledTodoCounts}}
             </div>
               <p class="text">期限あり</p>
           </div>
          </router-link>

          <router-link :to="{name:'listExpired', params:{listType:'expired'}}">
           <div class="grid-container grid-container-white">
             <div class="circle-area circle-area-category circle-area-gray">
               <i class="fa-solid fa-xmark icon icon-white"></i>
             </div>
             <div class="task-count-area ">
               {{expiredTodoCounts}}
             </div>
               <p class="text">期限切れ</p>
           </div>
        </router-link>

        </div>
        
        <div class="lists-container">
         <div class="mylist-container">
            <h2 class="title title-list">My List</h2>
            <!--<div class="button-area">
              <button type="button" class="button button-blue" name="button">TODO追加</button>
              <button type="button" class="button button-orange" name="button">リスト追加</button>
            </div>-->
         </div>
         <div class="list-container">

           <div class="list-item list-item-no-flex" v-for="(list, idx) in indexAllLists" :key="idx" 
              :class="indexAllLists.length == 1 ? 'list-item-solo' : ''">
              <router-link :to="{name:'listSelectedId',params:{listId:list.id,listName:list.name,listColor:list.color}}">
                  <div class="list-item-around">
                      <div class="list-item-left">
                        <div class="circle-area circle-area-list" :class="list.color">
                            <i class="fa-solid fa-list-check icon icon-white"></i>
                        </div>
                        <p class="text">{{list.name}}</p>
                      </div>
                      <div class="list-item-right">
                        <p class="text text-gray">{{countListedTodo(listedTodo[list.id -1])}}</p>
                        <div class="angle-area">
                          <i class="fa-solid fa-angle-right icon icon-angle"></i>
                        </div>
                      </div>
                  </div>
              </router-link>
          </div>
        </div>
         
        </div>
       </section>

    </main>
 
</div>


</template>

<script>
import { anyTypeAnnotation } from '@babel/types'
import HomeMenuComponent from "./HomeMenuComponent"
import HomeAccountComponent from "./HomeAccountComponent"


 export default{
  components:{
    HomeMenuComponent,
    HomeAccountComponent
  },
  data: function(){
    return{
      allTodoCounts: this.$store.getters['todo/allTodoCounts'],
      todayTodoCounts:this.$store.getters['todo/todayTodoCounts'],
      scheduledTodoCounts:this.$store.getters['todo/scheduledTodoCounts'],
      expiredTodoCounts:this.$store.getters['todo/expiredTodoCounts'],
      indexAllLists:this.$store.getters['list/indexAllLists'],
      indexAllTodo:this.$store.getters['todo/indexAllTodo'],
      listedTodo:[],
      indexAllCategorys:this.$store.getters['category/indexAllCategorys'],
      showTransition:false,
      showHomeMenu:false,
      showAccountPage:false,
    } 
  },
  methods: {
    closeAccountPage(){
      this.showHomeMenu = false
      this.showAccountPage = false
    },
    showEditAccount(){
      this.showAccountPage = true
    },
    openHomeMenu(){
      this.showHomeMenu = true
    },
    closeHomeMenu(){
      this.showHomeMenu = false
    },
    async logout(){
      await this.$store.dispatch('auth/logout')

      if(this.apiStatus){
        this.$router.push('/')
      }
    },
    countListedTodo(data){
      if(data === undefined){
           return 0
      }else{
        return data.length
      }
     
    },
    countTodoPerList(){
      if(this.indexAllLists.length !== 0){
      
      this.indexAllTodo = this.$store.getters['todo/indexAllTodo']
      
      const listCounts = this.indexAllLists.length
      const endRoopElement = this.indexAllLists.slice(-1)[0]
      const endRoopNumber = endRoopElement.id
      
      this.listedTodo = []

      for(let i=1;i<=endRoopNumber;i++){
        
        const newData = this.indexAllTodo.filter(function(object){ 
          if(object.list_id == i && object.delete_flg == false && object.complete_flg == false){
            return true
          }        
          //return object.list_id == i
        })
        this.listedTodo.push(newData)
      }
     }
    },

  },
  computed: {
    isLogin(){
        return this.$store.getters['auth/check']
      },
    username() {
      return this.$store.getters['auth/username']
    },
    id() {
      return this.$store.getters['auth/id']
    },
    apiStatus(){
      return this.$store.state.auth.apiStatus
    },
    allTodo(){
      return  this.allTodoCounts = this.$store.getters['todo/allTodoCounts']
    },
    todayTodo(){
      return  this.todayTodoCounts = this.$store.getters['todo/todayTodoCounts']
    },
    scheduledTodo(){
      return this.scheduledTodoCounts = this.$store.getters['todo/scheduledTodoCounts']
    },
    expiredTodo(){
      return  this.expiredTodoCounts = this.$store.getters['todo/expiredTodoCounts']
    },
    indexList(){
      return  this.indexAllLists = this.$store.getters['list/indexAllLists']
    },
  },
  mounted: async function(){
    await this.$store.dispatch('category/getAllCategorys')
    this.indexAllCategorys = this.$store.getters['category/indexAllCategorys']
    console.log(this.indexAllCategorys)
    this.showTransition = true
  },
  beforeRouteLeave(to,from,next){
    this.showTransition = false
    setTimeout(()=>{
      next()
    },0)
  },
  created: async function(){
    console.log('create')
     await this.$store.dispatch('todo/count')
     await this.$store.dispatch('list/getAllLists')
     this.allTodoCounts = this.$store.getters['todo/allTodoCounts']
     this.todayTodoCounts = this.$store.getters['todo/todayTodoCounts']
     this.scheduledTodoCounts = this.$store.getters['todo/scheduledTodoCounts']
     this.expiredTodoCounts = this.$store.getters['todo/expiredTodoCounts']
     this.indexAllLists = this.$store.getters['list/indexAllLists']
     this.countTodoPerList()
  },
  beforeUpdate: function(){
    console.log('home beforeupdate')
     this.allTodoCounts = this.$store.getters['todo/allTodoCounts']
     this.todayTodoCounts = this.$store.getters['todo/todayTodoCounts']
     this.scheduledTodoCounts = this.$store.getters['todo/scheduledTodoCounts']
     this.expiredTodoCounts = this.$store.getters['todo/expiredTodoCounts']
     this.indexAllLists = this.$store.getters['list/indexAllLists']
     this.countTodoPerList()
  },
  watch:{
    indexAllLists:{
      handler:function(newData,oldData){
      console.log('watchLIST')
      console.log(oldData)
      console.log(newData)
      this.indexAllLists = newData
    },
    deep:true,
    immediate:true,
   },
   allTodoCounts:{
    handler:function(oldData,newData){
      console.log('watchTODO')
      this.allTodoCounts = this.$store.getters['todo/allTodoCounts']
      this.todayTodoCounts = this.$store.getters['todo/todayTodoCounts']
      this.scheduledTodoCounts = this.$store.getters['todo/scheduledTodoCounts']
      this.expiredTodoCounts = this.$store.getters['todo/expiredTodoCounts']
      this.indexAllLists = this.$store.getters['list/indexAllLists']
      this.countTodoPerList()
    },
    deep:true,
    immediate:true,
   },
   indexList:{
      handler:function(oldData,newData){
        console.log('state.listchange')
        this.indexAllLists = this.$store.getters['list/indexAllLists']
      },
      deep:true,
      immediate:true,
    },
    allTodo:{
      handler:function(oldData,newData){
        console.log('state.alltodo change')
        this.allTodoCounts = this.$store.getters['todo/allTodoCounts']
        this.todayTodoCounts = this.$store.getters['todo/todayTodoCounts']
        this.scheduledTodoCounts = this.$store.getters['todo/scheduledTodoCounts']
        this.expiredTodoCounts = this.$store.getters['todo/expiredTodoCounts']
        this.indexAllLists = this.$store.getters['list/indexAllLists']
        this.countTodoPerList()

      },
      deep:true,
      immediate:true,
    }
  }
 }
</script>
