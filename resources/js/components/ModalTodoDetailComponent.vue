<template>
        <div class="modal-container modal-container-detail">
            <div class="task-nav-container task-nav-container-detail">
              <div class="nav-left">
                <p class="text-nav text-hover" @click="closeDetail">&lt 戻る</p>
              </div>
              <div class="nav-center">
                <p class="text-nav">TODO詳細</p>
              </div>
              <div class="nav-right">
                <input v-if="!updateTodoFlg" class="text-nav" type="submit" @click.prevent="register" value="追加" :disabled="todoName === ''" :class="todoName === '' ? 'text-gray' : 'text-blue'">
                <input v-else-if="updateTodoFlg" class="text-nav" type="submit" @click.prevent="register" value="更新" :disabled="todoName === ''" :class="todoName === '' ? 'text-gray' : 'text-blue'">
              </div>
            </div>
            <div class="modal-item modal-item-first">
               <div class="list-item-left">
                 <div class="square-area square-area-list square-area-red">
                     <i class="fa-solid fa-list-check icon icon-white"></i>
                 </div>
                 <div>
                 <p class="text" v-bind:class='{"text-no-margin": checkedDate}'>日付</p>
                 <p class="text text-no-margin font-xs" v-if="checkedDate">{{today.toLocaleDateString()}}</p>
                 </div>
               </div>
               <div class="list-item-right">
                  <el-switch v-model="checkedDate" active-color="#13ce66" class="slide-button"></el-switch>
               </div>
            </div>
            <div class="modal-item modal-item-middle" v-if="checkedDate">
              <el-calendar v-model="today"></el-calendar>
            </div>

            <div class="modal-item modal-item-last" v-bind:class="checkedTime ? 'modal-item-middle' : 'modal-item-last'">
              <div class="list-item-left">
                 <div class="square-area square-area-list square-area-blue">
                     <i class="fa-solid fa-clock icon icon-white"></i>
                 </div>
                 <div>
                 <p class="text" v-bind:class='{"text-no-margin": checkedTime}'>時刻</p>
                 <p class="text text-no-margin font-xs" v-if="checkedTime">{{selectTime}}</p>
                 </div>
               </div>
               <div class="list-item-right">
                  <el-switch v-model="checkedTime" active-color="#13ce66" class="slide-button"></el-switch>
               </div>

            </div>
            <div class="modal-item modal-item-last" v-if="checkedTime">
                  <p class="text font-s">※時刻を選択してください</p>
                  <el-time-select
                    v-model="selectTime"
                    :picker-options="{
                      start: '00:00',
                      step: '00:05',
                      end: '23:55',
                    }"
                    placeholder="Select time">
                  </el-time-select>
            </div> 

            <div class="modal-item area-hover">
               <div class="list-item-left">
                 <div class="square-area square-area-list square-area-gray">
                     <i class="fa-solid fa-list-check icon icon-white"></i>
                 </div>
                 <p class="text">繰り返し</p>
               </div>
               <div class="list-item-right">
                 <p class="text text-gray">しない</p>
                 <div class="angle-area">
                   <i class="fa-solid fa-angle-right icon icon-angle"></i>
                 </div>
               </div>
            </div>

            <div class="modal-item area-hover">
               <div class="list-item-left">
                 <div class="square-area square-area-list square-area-blue">
                     <i class="fa-solid fa-list-check icon icon-white"></i>
                 </div>
                 <p class="text">場所</p>
               </div>
               <div class="list-item-right">
                 <div class="angle-area">
                   <i class="fa-solid fa-angle-right icon icon-angle"></i>
                 </div>
               </div>
            </div>

            <div class="modal-item area-hover">
               <div class="list-item-left">
                 <div class="square-area square-area-list square-area-orange">
                     <i class="fa-solid fa-list-check icon icon-white"></i>
                 </div>
                 <p class="text">優先順位</p>
               </div>
               <div class="list-item-right">
                 <p class="text text-gray">なし</p>
                 <div class="angle-area">
                   <i class="fa-solid fa-angle-right icon icon-angle"></i>
                 </div>
               </div>
            </div>

            <div class="modal-item area-hover">
               <div class="list-item-left">
                 <div class="square-area square-area-list square-area-orange">
                     <i class="fa-solid fa-list-check icon icon-white"></i>
                 </div>
                 <p class="text">画像を追加</p>
               </div>
               <div class="list-item-right">
                 <p class="text text-gray">なし</p>
                 <div class="angle-area">
                   <i class="fa-solid fa-angle-right icon icon-angle"></i>
                 </div>
               </div>
            </div>

        </div>
        
</template>

<script>

 export default{
    props: {
        todoDate: {
          default: '',
        },
        todoTime: {
          default: '',
        },
        todoName: {
          default: '',
        },
        todoDetail:{
          default:''
        },
        todoList:{
          default:''
        },
        todoCategory:{
          default: ''
        },
        updateTodoFlg:{
          Type:Boolean,
          default:false
        },
        editDeleteFlg:{
          Type:Boolean,
          default:false
        },
        editFixedFlg:{
          Type:Boolean,
          default:false,
        },
        editCompleteFlg:{
          Type:Boolean,
          default:false
        },
        editTodoId:{
          Type:Number,
          default:0,
        }
    },
    
    data: function(){
      return{
        checkedDate: false,
        checkedTime: false,
        today: new Date(),
        registDay: '',
        selectTime: '18:00',
        createTodo: {
            id:'',
            name:'',
            userId:'',
            listId:'',
            categoryId:'',
            detail:'',
            todoDate:'',
            todoTime:'',
            cycle:'',
            place:'',
            priority:'',
            fileName:'',
            deleteFlg:'',
            fixedFlg:'',
            completeFlg:'',
          },
      }
    },
    methods:{
        closeDetail(){
          if(!this.checkedDate){
            this.today= '';
          }
          if(!this.checkedTime){
            this.selectTime = '';
          }
          
          this.$emit('connectData', this.today, this.selectTime);
        },
        registClose(){
          this.$emit('registClose')
        },
        userId() {
           this.createTodo.userId =  this.$store.getters['auth/id']
         },

        async register(){
          if(!this.checkedDate){
            this.today= '';
          }else{
            this.registDay = this.today.toLocaleDateString()
          }
          if(!this.checkedTime){
            this.selectTime = '';
          }
          this.userId()
          
          this.createTodo.todoDate = this.registDay
          this.createTodo.todoTime = this.selectTime
          this.createTodo.name = this.todoName
          this.createTodo.detail = this.todoDetail
          this.createTodo.listId = this.todoList
          this.createTodo.categoryId = this.todoCategory

          if(!this.updateTodoFlg){
            await this.$store.dispatch('todo/register', this.createTodo)
          }else if(this.updateTodoFlg){
            this,this.createTodo.id = this.editTodoId
            this.createTodo.deleteFlg = this.editDeleteFlg
            this.createTodo.fixedFlg = this.editFixedFlg
            this.createTodo.completeFlg = this.editCompleteFlg
            await this.$store.dispatch('todo/edit', this.createTodo)
          }


          if(this.apiStatus){
              this.today= new Date()
              this.selectTime = '18:00'

              await this.$store.dispatch('todo/count')
              if(this.apiStatus){
                  this.registClose()
               }
          }


        },
    },
    mounted: function(){
      this.today = new Date()

      if(this.todoDate){
        this.checkedDate = true;
        this.today = this.todoDate;
      }
      if(this.todoTime){
        this.checkedTime = true;
        this.selectTime = this.todoTime;
      } 
    },
    computed: {
        apiStatus(){
          return this.$store.state.todo.apiStatus
          },
        registerErrors(){
          return this.$store.state.todo.registerErrorMessages
          },       
    },

 }
</script>