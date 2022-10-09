<template>

        <div class="modal-container modal-container-detail">

          <transition name="slide-right">
              <DetailPrioritySelectComponent v-if="openPriority" @close="receivePriority" :sendPriority="createTodo.priority"></DetailPrioritySelectComponent>
          </transition>
          <transition name="slide-right">
              <DetailRoutineSelectComponent v-if="openRoutine" @close="receiveRoutine" :sendRoutine="createTodo.cycle"></DetailRoutineSelectComponent>
          </transition>
          <transition name="slide-right">
              <DetailPlaceSelectComponent v-if="openPlace" @close="receivePlace" :sendPlace="createTodo.place"></DetailPlaceSelectComponent>
          </transition>
          <el-table v-if="loading" v-loading="loading" style="width:100%;height:100%;"></el-table>


            <div class="task-nav-container task-nav-container-detail">
              <div class="nav-left">
                <p class="text-nav text-hover" @click="closeDetail">&lt 戻る</p>
              </div>
              <div class="nav-center">
                <p class="text-nav">TODO詳細</p>
              </div>
              <div class="nav-right">
                <input v-if="!updateTodoFlg" class="text-nav" type="submit" @click.prevent="register" value="追加" :disabled="todoName === ''" :class="todoName === '' ? 'text-gray not-pointer' : 'text-blue'">
                <input v-else-if="updateTodoFlg" class="text-nav" type="submit" @click.prevent="register" value="更新" :disabled="todoName === ''" :class="todoName === '' ? 'text-gray not-pointer' : 'text-blue'">
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

            <div class="modal-item area-hover" @click="openRoutine = true" v-if="checkedDate">
               <div class="list-item-left">
                 <div class="square-area square-area-list square-area-gray">
                     <i class="fa-solid fa-list-check icon icon-white"></i>
                 </div>
                 <p class="text">繰り返し</p>
               </div>
               <div class="list-item-right">
                 <p class="text text-gray">{{showCycle}}</p>
                 <div class="angle-area">
                   <i class="fa-solid fa-angle-right icon icon-angle"></i>
                 </div>
               </div>
            </div>

            <div class="modal-item area-hover" @click="openPlace = true">
               <div class="list-item-left">
                 <div class="square-area square-area-list square-area-blue">
                     <i class="fa-solid fa-list-check icon icon-white"></i>
                 </div>
                 <p class="text">場所</p>
               </div>
               <div class="list-item-right">
                <p class="text text-gray">{{createTodo.place}}</p>
                 <div class="angle-area">
                   <i class="fa-solid fa-angle-right icon icon-angle"></i>
                 </div>
               </div>
            </div>

            <div class="modal-item area-hover" @click="openPriority = true">
               <div class="list-item-left">
                 <div class="square-area square-area-list square-area-orange">
                     <i class="fa-solid fa-list-check icon icon-white"></i>
                 </div>
                 <p class="text">優先順位</p>
               </div>
               <div class="list-item-right">
                 <p class="text text-gray">{{showPriority}}</p>
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
                  <label for="file-form" class="file-form">
                    <input type="file" name="file-form" id="file-form" @change="onFileChange($event)"><span class="text text-gray">画像を選択</span>
                 </label>
                 <div class="angle-area">
                   <i class="fa-solid fa-angle-right icon icon-angle"></i>
                 </div>

               </div>
            </div>
            <div v-if="registerErrors" >
                  <ul v-if="registerErrors.fileName" class="errors">
                      <li v-for="msg in registerErrors.fileName" :key="msg">{{ msg }}</li>
                  </ul>
           </div>

            <div class="modal-item area-hover" v-if="imgPreview">
              <output>
                <img :src="imgPreview" alt="アップロード画像" class="todo-img">
              </output>
            </div>

        </div>
        
</template>

<script>

  import DetailPrioritySelectComponent from "./DetailPrioritySelectComponent";
  import DetailRoutineSelectComponent from "./DetailRoutineSelectComponent";
  import DetailPlaceSelectComponent from "./DetailPlaceSelectComponent";


 export default{
    components:{
      DetailPrioritySelectComponent,
      DetailRoutineSelectComponent,
      DetailPlaceSelectComponent,
    },
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
          default: '',
        },
        todoCategory:{
          default: '',
        },
        todofileName:{
          default: ""
        },
        todoCycle:{
          defult:null,
          type:Number,
        },
        todoPriority:{
          type:Number,
          default:null,
        },
        todoPlace:{
          type:String,
          default:""
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
        },
        updateImgData:{
          Type:String,
          default:"",
        }
    },
    
    data: function(){
      return{
        loading:false,
        openPriority: false,
        openRoutine: false,
        openPlace: false,
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
            cycle:0,
            place:'',
            priority:0,
            fileName:'',
            deleteFlg:'',
            fixedFlg:'',
            completeFlg:'',
            databaseImg:'',
          },
        imgPreview:null,
        showPriority:'なし',
        showCycle:'なし',

      }
    },
    methods:{
        receivePriority(data){
          this.openPriority = false
          this.createTodo.priority = data

          if(this.createTodo.priority === 1){
            this.showPriority = '低'
          }else if(this.createTodo.priority === 2){
            this.showPriority = "中"
          }else if(this.createTodo.priority === 3){
            this.showPriority = '高'
          }else{
            this.showPriority = 'なし'
          }
        },
        receiveImg(data){

          const reader = new FileReader()
          reader.onload = () =>{
            this.imgPreview = reader.result
          }
          reader.readAsDataURL(data)
        },
        receivePlace(place){
          this.openPlace = false
          this.createTodo.place = place
        },
        receiveRoutine(data){
          this.openRoutine = false
          this.createTodo.cycle = data

          switch(data){
            case 0:
              this.showCycle = 'なし'
              break;
            case 1:
              this.showCycle = '毎日'
              break;
            case 2:
              this.showCycle = '月～金'
              break;
            case 3:
              this.showCycle = '土日'
              break;
            case 4:
              this.showCycle = '日曜日'
              break;
            case 5:
              this.showCycle = '月曜日'
              break;
            case 6:
              this.showCycle = '火曜日'
              break;
            case 7:
              this.showCycle = '水曜日'
              break;
            case 8:
              this.showCycle = '木曜日'
              break;
            case 9:
              this.showCycle = '金曜日'
              break;
            case 10:
              this.showCycle = '土曜日'
              break;
            case 11:
              this.showCycle = '毎週'
              break;
            case 12:
              this.showCycle = '毎月'
              break;
            case 13:
              this.showCycle = '毎年'
              break;
            default:
              this.showCycle = 'なし'
          }
        },
        onFileChange(e){
          if(e.target.files.length === 0){
            this.reset()
            return false
          }
          if(!e.target.files[0].type.match('image.*')){
            this.reset()
            return false
          }
          const reader = new FileReader()

          reader.onload = e => {
            this.imgPreview = e.target.result
          }
          reader.readAsDataURL(e.target.files[0])
          this.createTodo.fileName = e.target.files[0]
          this.databaseImg = ""

          //const formData = new FormData()
          //formData.append('photo',this.createTodo.fileName)
          //this.createTodo.fileName = formData
        },
        reset () {
           this.imgPreview = null
           this.createTodo.fileName = ""
           this.$el.querySelector('input[type="file"]').value = null
        },
        closeDetail(){
          if(!this.checkedDate){
            this.today= '';
          }
          if(!this.checkedTime){
            this.selectTime = '';
          }
          
          this.$emit('connectData', this.today, this.selectTime,this.createTodo.fileName,this.createTodo.cycle,
                    this.createTodo.priority, this.createTodo.place,this.showCycle,this.showPriority);
        },
        registClose(){
          this.$emit('registClose')
        },
        userId() {
           this.createTodo.userId =  this.$store.getters['auth/id']
         },

        async register(){
          this.loading=true
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
          }else{
            this.loading = false
          }
        },
        clearError(){
            this.$store.commit('todo/setRegisterErrorMessages', null)
        }
    },
    mounted: function(){
      this.clearError()
      this.today = new Date()

      if(this.todoDate){
        this.checkedDate = true;
        this.today = this.todoDate;
      }
      if(this.todoTime){
        this.checkedTime = true;
        this.selectTime = this.todoTime;
      } 
      if(this.todofileName && this.updateImgData === ""){
        this.createTodo.fileName = this.todofileName
        this.receiveImg(this.todofileName)
      }
      if(this.todoCycle){
        this.createTodo.cycle = this.todoCycle
        this.receiveRoutine(this.todoCycle)
      }
      if(this.todoPriority){
        this.createTodo.priority = this.todoPriority
        this.receivePriority(this.todoPriority)
      }
      if(this.todoPlace){
        this.createTodo.place = this.todoPlace
      }
      if(this.updateTodoFlg && this.updateImgData !== ""){
        this.imgPreview = this.updateImgData
        this.createTodo.databaseImg = this.todofileName
        this.createTodo.fileName = this.todofileName
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