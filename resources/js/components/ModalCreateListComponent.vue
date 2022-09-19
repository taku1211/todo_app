<template>
    <div class="modal-container modal-container-create-list">
        <form class="form-container" method="post" @submit.prevent="registerList">
          <transition name="slide-right">
           <ModalTodoCategoryComponent v-if="showModalTodoCategory"  @connectData="receiveTodoCategory" 
           :createListFlag="createListFlag" :todoCategoryName="todoCategoryName"></ModalTodoCategoryComponent>
          </transition>
          
          <div class="task-nav-container task-nav-container-create-list">
            <div class="nav-left">
                <p class="text-nav text-hover" @click="close">キャンセル</p>
            </div>
            <div class="nav-center">
                <p class="text-nav" v-if="editListFlg == false">新規LIST</p>
                <p class="text-nav" v-else-if="editListFlg == true">LISTの更新</p>
            </div>
            <div class="nav-right">
                <input v-if="editListFlg == false" class="text-nav" type="submit" name="" value="追加" 
                :disabled="createList.name === ''" :class="createList.name === '' ? 'text-gray' : 'text-blue'"> 
                <input v-else-if="editListFlg == true" class="text-nav" type="submit" name="" value="更新" 
                :disabled="createList.name === ''" :class="createList.name === '' ? 'text-gray' : 'text-blue'">
            </div>
          </div>

          <div class="modal-item modal-item-list-first">
              <div class="circle-area circle-area-list" :class="selectIconColor" >
                <i class="fa-solid fa-list-check icon icon-white" ></i>
              </div>
              <input v-if="editListFlg == false" type="text" class="modai-item-text modal-item-list border-none" 
               ref="listTitle" v-model="createList.name"  placeholder="リスト名を入力">
              <input v-else-if="editListFlg == true" type="text" class="modai-item-text modal-item-list border-none" 
              ref="listTitle" v-model="createList.name"  placeholder="リスト名を更新する">
          </div>
          <div v-if="registerErrors" >
               <ul v-if="registerErrors.name" class="errors">
                    <li v-for="msg in registerErrors.name" :key="msg">{{ msg }}</li>
               </ul>
          </div>


          <!--
            <div class="modal-item" @click="showModalTodoCategory = true">
             <div class="modal-item-left">
               <p class="text">カテゴリー名</p>
             </div>
             <div class="list-item-right">
               <p class="text text-gray">{{todoCategoryName}}</p>
               <div class="angle-area">
                 <i class="fa-solid fa-angle-right icon icon-angle"></i>
               </div>
             </div>
          </div>
          -->
          <div class="modal-item modal-item-grid">
            <div class="circle-area circle-area-grid circle-area-red icon-select" @click="selectIconColor = 'circle-area-red'"></div>
            <div class="circle-area circle-area-grid circle-area-pink icon-select" @click="selectIconColor = 'circle-area-pink'"></div>
            <div class="circle-area circle-area-grid circle-area-orange icon-select" @click="selectIconColor = 'circle-area-orange'"></div>
            <div class="circle-area circle-area-grid circle-area-yellow icon-select" @click="selectIconColor = 'circle-area-yellow'"></div>
            <div class="circle-area circle-area-grid circle-area-green icon-select" @click="selectIconColor = 'circle-area-green'"></div>
            <div class="circle-area circle-area-grid circle-area-sky icon-select" @click="selectIconColor = 'circle-area-sky'"></div>
            <div class="circle-area circle-area-grid circle-area-blue icon-select" @click="selectIconColor = 'circle-area-blue'"></div>
            <div class="circle-area circle-area-grid circle-area-purple icon-select" @click="selectIconColor = 'circle-area-purple'"></div>
            <div class="circle-area circle-area-grid circle-area-brown icon-select" @click="selectIconColor = 'circle-area-brown'"></div>
            <div class="circle-area circle-area-grid circle-area-gray icon-select" @click="selectIconColor = 'circle-area-gray'"></div>
            <div class="circle-area circle-area-grid circle-area-black icon-select" @click="selectIconColor = 'circle-area-black'"></div>
            <div class="circle-area circle-area-grid circle-area-peach icon-select" @click="selectIconColor = 'circle-area-peach'"></div>

          </div>
          <div class="responsive-button-container" v-if="editListFlg">
                <div class="button-area button-area-responsive">
                    <p class="text text-right text-hidden">削除する</p>
                    <input class="button button-red button-responsive" type="button" name="" value="削除する" @click="deleteList()">
                </div>
          </div>

        </form>

      </div>

</template>

<script>
    import ModalTodoCategoryComponent from "./ModalTodoCategoryComponent.vue";

    export default{
      props:{
        editListId:{
          Type:Number,
          default:'',
        },
        editListFlg:{
          Type:Boolean,
          default:false,
        },
        editListName:{
          Type:String,
          default:''
        },
        editListColor:{
          Type:String,
          default:''
        }

      },
      data: function(){
        return{
        showModalTodoCategory: false,
        selectIconColor: 'circle-area-blue',
        createListFlag : true,
        todoCategoryName: '',
        showEditListColor:'',
        createList: {
            id:'',
            name:'',
            userId: '',
            color: 7,
            fixedFlg: false,
            deleteFlg: false,
          
          }
        }
      },
      methods: {
        async deleteList(){
        if(confirm('このリストを削除しますか？')){
          await this.$store.dispatch('list/deleteList',this.editListId)
          await axios.post('/api/deleteCategoryRelateList',{listId:this.editListId})
          await axios.post('/api/deleteTodoRelateList',{listId:this.editListId})
          await this.$store.dispatch('list/getAllLists')
          this.close()
        }else{

        }
      },

        close(){
          this.clearError()
          this.$emit('closeList')
        },
        receiveTodoCategory(categoryName){
        this.showModalTodoCategory = false;
        this.todoCategoryName = categoryName;
        },
        selectColor(){
          switch(this.selectIconColor){
            case 'circle-area-red':
              this.createList.color = 1
              break;
            case 'circle-area-pink':
              this.createList.color = 2
              break;
            case 'circle-area-orange':
              this.createList.color = 3
              break;
            case 'circle-area-yellow':
              this.createList.color = 4
              break;
            case 'circle-area-green':
              this.createList.color = 5
              break;
            case 'circle-area-sky':
              this.createList.color = 6
              break;
            case 'circle-area-blue':
              this.createList.color = 7
              break;
            case 'circle-area-purple':
              this.createList.color = 8
              break;
            case 'circle-area-brown':
              this.createList.color = 9
              break;
            case 'circle-area-gray':
              this.createList.color = 10
              break;
            case 'circle-area-black':
              this.createList.color = 11
              break;
            case 'circle-area-peach':
              this.createList.color = 12
              break;
            default:
              this.createList.color = ''
          }
        },
        async registerList(){
          if(this.editListFlg == false){
            this.selectColor()
            this.createList.userId =  this.$store.getters['auth/id']
            await this.$store.dispatch('list/register', this.createList)
          }else if(this.editListFlg == true){
            this.showEditListColor = this.selectIconColor
            this.selectColor()
            this.createList.id = this.editListId
            await this.$store.dispatch('list/update',this.createList)
            if(this.apiStatus){
              this.$emit('connectData',this.createList.name, this.showEditListColor)
            }
          }
          if(this.apiStatus){
            await this.$store.dispatch('list/getAllLists')
            if(this.apiStatus){
              this.close()
            }
          }
        },
        clearError(){
            this.$store.commit('list/setRegisterErrorMessages', null)
        },
        updateName(){
          if(this.editListName != ''){
            //console.log('はいった')
            this.createList.name = this.editListName
            //console.log(this.createList.name)
            return this.createList.name
          }else{
            //console.log('はいってない')
            return false
          }
        },
        countListName(e){
          this.createList.name = e.target.value
        },
        updateColor(){
          if(this.editListColor != ''){
            //console.log('はいった')
            this.selectIconColor = this.editListColor
            //console.log(this.selectIconColor)
            return this.selectIconColor
          }else{
            //console.log('はいってない')
            return false
          }
        },        
      },
      computed: {
        userId() {
           return this.createList.userId =  this.$store.getters['auth/id']
        },
        apiStatus(){
          return this.$store.state.list.apiStatus
        },
        registerErrors(){
          return this.$store.state.list.registerErrorMessages
        },
      },
      mounted:function(){
        //console.log('mounted')
        this.updateName()
        this.updateColor()

        this.$nextTick(function(){
          const input = this.$refs.listTitle
          input.addEventListener('keyup',this.countListName)
          input.addEventListener('compositioned',this.countListName)
      })

      },
      beforeupdate:function(){
        //console.log('beforeupdate')
        this.updateName()
      } , 
      components: {
         ModalTodoCategoryComponent,
      },

    }
</script>