 <template>


      <div class="modal-container">
        <el-table v-if="loading" v-loading="loading" style="width:100%;height:100%;"></el-table>
        <form class="form-container" @submit.prevent="registerTodo" method="post" action="">
          
          <transition name="slide-right">
              <ModalTodoDetailComponent v-if="showModalTodoDetail" @registClose="close" @connectData="receiveTodoDetail" :todoDate="todoDate"
               :todoTime="todoTime" :todofileName="createTodo.fileName" :todoName="createTodo.name" :todoDetail="createTodo.detail" :todoList="createTodo.listId" 
               :todoCategory="createTodo.categoryId" :todoCycle="this.createTodo.cycle" :todoPriority="this.createTodo.priority"
               :todoPlace="createTodo.place" :updateImgData="showImgUrl"
               :updateTodoFlg="updateTodoFlg" :editDeleteFlg="createTodo.deleteFlg"
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
              <input class="text-nav" type="submit" v-if="!updateTodoFlg" value="追加" :disabled="createTodo.name === ''" :class="createTodo.name === '' ? 'text-gray not-pointer' : 'text-blue'">
              <input class="text-nav" type="submit" v-else-if="updateTodoFlg" value="更新" :disabled="createTodo.name === ''" :class="createTodo.name === '' ? 'text-gray not-pointer' : 'text-blue'">
            </div>
          </div>

          <input class="modal-item modal-item-first modal-item-text border-none border-buttom" type="text" placeholder="タイトル" v-model="createTodo.name" ref="todoTitle">
          <textarea  class="modal-item modal-item-last modal-item-text" name="name" rows="6" cols="80" maxlength="500" placeholder="メモ" v-model="createTodo.detail"></textarea>
          <div v-if="registerErrors" >
                  <ul v-if="registerErrors.fileName" class="errors">
                      <li v-for="msg in registerErrors.fileName" :key="msg">{{ msg }}</li>
                  </ul>
          </div>

          <div class="modal-item area-hover" @click="openModalTodoDetail">
             <div class="modal-item-left">
               <p class="text">詳細</p>
             </div>
             <div class="list-item-right">
               <p class="text text-gray">{{showDate}} {{todoTime}}<br v-if="showDate || todoTime">{{createTodo.place}}<br v-if="createTodo.place">{{showCycle}} {{showPriority}}</p>
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
          loading:false,
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
            cycle:null,
            place:'',
            priority:null,
            fileName:'',
            fixedFlg:'',
            deleteFlg:'',
            completeFlg:'',
            databaseImg:'',
          },
          showCycle:"",
          showPriority:"",
          showImgUrl: "",

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
        this.loading=true;
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
        }else{
          this.loading = false
        }
      },
      updateName(e){
        this.createTodo.name = e.target.value
      },
      receiveTodoDetail(date, time, img,cycle,priority,place,showCycle,showPriority){
        if(typeof(img) === "object"){
          this.showImgUrl = ""
        }

        this.showModalTodoDetail = false;
        this.todoDate = date;
        this.todoTime = time;
        this.createTodo.fileName = img;
        this.createTodo.cycle = cycle
        this.createTodo.priority = priority
        this.createTodo.place = place
        this.showCycle = "繰り返し:" + showCycle
        this.showPriority = "優先度:" + showPriority
        
        
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
      receiveCycle(data){

          switch(data){
            case 0:
              this.showCycle = '繰り返し:なし'
              break;
            case 1:
              this.showCycle = '繰り返し:毎日'
              break;
            case 2:
              this.showCycle = '繰り返し:月～金'
              break;
            case 3:
              this.showCycle = '繰り返し:土日'
              break;
            case 4:
              this.showCycle = '繰り返し:日曜日'
              break;
            case 5:
              this.showCycle = '繰り返し:月曜日'
              break;
            case 6:
              this.showCycle = '繰り返し:火曜日'
              break;
            case 7:
              this.showCycle = '繰り返し:水曜日'
              break;
            case 8:
              this.showCycle = '繰り返し:木曜日'
              break;
            case 9:
              this.showCycle = '繰り返し:金曜日'
              break;
            case 10:
              this.showCycle = '繰り返し:土曜日'
              break;
            case 11:
              this.showCycle = '繰り返し:毎週'
              break;
            case 12:
              this.showCycle = '繰り返し:毎月'
              break;
            case 13:
              this.showCycle = '繰り返し:毎年'
              break;
            default:
              this.showCycle = '繰り返し:なし'
          }
        },
        receivePriority(data){

          if(this.createTodo.priority === 1){
            this.showPriority = '優先度:低'
          }else if(this.createTodo.priority === 2){
            this.showPriority = "優先度:中"
          }else if(this.createTodo.priority === 3){
            this.showPriority = '優先度:高'
          }else{
            this.showPriority = '優先度:なし'
          }
        },
        clearError(){
            this.$store.commit('todo/setRegisterErrorMessages', null)
        }
    },
    created:function(){
      this.clearError()
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
        this.showImgUrl = this.editTodoData.url
        this.createTodo.databaseImg = this.editTodoData.filename


        this.receiveCycle(this.createTodo.cycle)
        this.receivePriority(this.createTodo.priority)

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
