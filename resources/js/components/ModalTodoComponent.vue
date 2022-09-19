 <template>


      <div class="modal-container">
        <form class="form-container" @submit.prevent="registerTodo" method="post" action="">
          
          <transition name="slide-right">
              <ModalTodoDetailComponent v-if="showModalTodoDetail" @registClose="close" @connectData="receiveTodoDetail" :todoDate="todoDate"
               :todoTime="todoTime" :todoName="createTodo.name" :todoDetail="createTodo.detail" :todoList="createTodo.listId" 
               :todoCategory="createTodo.categoryId" :updateTodoFlg="updateTodoFlg" :editDeleteFlg="createTodo.deleteFlg"
               :editFixedFlg="createTodo.fixedFlg" :editCompleteFlg="createTodo.completeFlg" :editTodoId="createTodo.id">
              </ModalTodoDetailComponent>
          </transition>
          <transition name="slide-right">
              <ModalTodoCategoryComponent v-if="showModalTodoCategory" @connectData="receiveTodoCategory" :todoCategoryName="todoCategoryName" :createTodoFlg="createTodoFlg"></ModalTodoCategoryComponent>
          </transition>
           <transition name="slide-right">
              <ModalTodoListComponent v-if="showModalTodoList" @connectData="receiveTodoList" :todoListName="todoListName"></ModalTodoListComponent>
          </transition> 

          <div class="task-nav-container task-nav-container-todo">
            <div class="nav-left">
              <p class="text-nav text-hover" @click="close">キャンセル</p>
            </div>
            <div class="nav-center">
              <p class="text-nav" v-if="updateTodoFlg == false">新規TODO</p>
              <p class="text-nav" v-else-if="updateTodoFlg == true">TODOの編集</p>
            </div>
            <div class="nav-right">
              <input class="text-nav" type="submit" v-if="!updateTodoFlg" value="追加" :disabled="createTodo.name === ''" :class="createTodo.name === '' ? 'text-gray' : 'text-blue'">
              <input class="text-nav" type="submit" v-else-if="updateTodoFlg" value="更新" :disabled="createTodo.name === ''" :class="createTodo.name === '' ? 'text-gray' : 'text-blue'">
            </div>
          </div>

          <input class="modal-item modal-item-first modal-item-text border-none border-buttom" type="text" placeholder="タイトル" v-model="createTodo.name" ref="todoTitle">
          <textarea  class="modal-item modal-item-last modal-item-text" name="name" rows="6" cols="80" maxlength="500" placeholder="メモ" v-model="createTodo.detail"></textarea>
          <div class="modal-item area-hover" @click="openModalTodoDetail">
             <div class="modal-item-left">
               <p class="text">詳細</p>
             </div>
             <div class="list-item-right">
               <p class="text text-gray">{{showDate}} {{todoTime}}</p>
               <div class="angle-area">
                 <i class="fa-solid fa-angle-right icon icon-angle"></i>
               </div>
             </div>
          </div>
          <div class="modal-item area-hover" @click="showModalTodoList = true">
             <div class="modal-item-left">
               <p class="text">リスト名選択</p>
             </div>
             <div class="list-item-right">
               <p class="text text-gray">{{todoListName}}</p>
               <div class="angle-area">
                 <i class="fa-solid fa-angle-right icon icon-angle"></i>
               </div>
             </div>
          </div>
          <div class="modal-item area-hover" @click="showModalTodoCategory = true" :class="!todoListName ? 'modal-item-unclick' : ''">
             <div class="modal-item-left">
               <p class="text">カテゴリー</p>
             </div>
             <div class="list-item-right">
               <p class="text text-gray">{{todoCategoryName}}</p>
               <div class="angle-area">
                 <i class="fa-solid fa-angle-right icon icon-angle"></i>
               </div>
             </div>
          </div>

        </form>
    
      </div>
</template>

<script>
import ModalTodoDetailComponent from "./ModalTodoDetailComponent";
import ModalTodoCategoryComponent from "./ModalTodoCategoryComponent.vue";
import ModalTodoListComponent from "./ModalTodoListComponent.vue";
import { off } from "process";

 export default{
    props:{
      updateTodoFlg:{
        type:Boolean,
        default:false
      },
      updateListName:{
        type:String,
        default:'',
      },
      updateCategoryName:{
        type:String,
        default:''
      },
      editTodoData:{
        Type:Array,
        default:()=>[]
      },
    },
    data: function(){
      return{
          showModalTodoDetail: false,
          showModalTodoCategory: false,
          showModalTodoList: false,
          todoDate: '',
          showDate:'',
          todoTime: '',
          todoCategoryName: '',
          todoListName: '',
          createTodoFlg: true,
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
            fixedFlg:'',
            deleteFlg:'',
            completeFlg:'',
          },
      }
    },
    components: {
      ModalTodoDetailComponent,
      ModalTodoCategoryComponent,
      ModalTodoListComponent,
    },
    methods: {
      openModalTodoDetail(){
      this.createTodo.listId = this.$store.getters['todo/list']
      this.createTodo.categoryId = this.$store.getters['todo/category']

        this.showModalTodoDetail = true
      },
      close(){
         this.showModalTodoDetail = false;
         this.$emit('close')
      },
       userId() {
           this.createTodo.userId =  this.$store.getters['auth/id']
         },
      async registerTodo(){
        this.userId()
        this.createTodo.listId = this.$store.getters['todo/list']
        this.createTodo.categoryId = this.$store.getters['todo/category']

        if(!this.updateTodoFlg){
          await this.$store.dispatch('todo/register', this.createTodo)
        }else if(this.updateTodoFlg){
          await this.$store.dispatch('todo/edit',this.createTodo)
        }
        
        if(this.apiStatus){
          await this.$store.dispatch('todo/count')
          
          
          if(this.apiStatus){
            this.close()
          }
        }
      },
      updateName(e){
        this.createTodo.name = e.target.value
      },
      receiveTodoDetail(date, time){
        this.showModalTodoDetail = false;
        this.todoDate = date;
        this.todoTime = time;
        
        if(date !== ''){
            this.showDate = date.toLocaleDateString();

        }else if(date === ''){
            this.showDate = '';
        }
        this.createTodo.todoDate = this.showDate
        this.createTodo.todoTime = time
          
      },
      receiveTodoCategory(categoryName){
        this.showModalTodoCategory = false;
        this.todoCategoryName = categoryName;
      },
      receiveTodoList(listName){
        this.showModalTodoList = false;
        this.todoListName = listName;
      },

    },
    created:function(){
      this.todoCategoryName = this.updateCategoryName
      this.todoListName = this.updateListName
      if(this.updateTodoFlg){
        this.createTodo.id = this.editTodoData.id
        this.createTodo.name = this.editTodoData.name
        this.createTodo.userId = this.editTodoData.user_id
        this.createTodo.listId = this.editTodoData.list_id
        this.createTodo.categoryId = this.editTodoData.category_id
        this.createTodo.detail = this.editTodoData.detail
        this.createTodo.todoDate = this.editTodoData.todo_date
        this.createTodo.todoTime = this.editTodoData.todo_time
        this.createTodo.cycle = this.editTodoData.cycle
        this.createTodo.place = this.editTodoData.place
        this.createTodo.priority = this.editTodoData.priority
        this.createTodo.fileName = this.editTodoData.filename
        this.showDate = this.editTodoData.todo_date
        this.createTodo.fixedFlg = this.editTodoData.fixed_flg
        this.createTodo.completeFlg = this.editTodoData.complete_flg
        this.createTodo.deleteFlg = this.editTodoData.delete_flg

        if(this.editTodoData.todo_time == null){
          this.todoTime = ''
        }else{
          this.todoTime = this.editTodoData.todo_time.slice(0,-3)
        }
        if(this.createTodo.todoDate != null){
          this.todoDate = new Date(this.createTodo.todoDate)
        }
      }
    },
    mounted: function(){
      this.$nextTick(function(){
          const input = this.$refs.todoTitle
          input.addEventListener('keyup',this.updateName)
          input.addEventListener('compositioned',this.updateName)
      })
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
