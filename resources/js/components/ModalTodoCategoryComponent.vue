<template>
  <div class="modal-container modal-container-category">
      <div class="task-nav-container task-nav-container-category">
          <div class="nav-left">            
            <p class="text-nav text-hover" @click="close()" v-if="createTodoFlg">&lt 戻る</p>
            <p class="text-nav text-hover" @click="close()" v-else-if="createListFlag">&lt 戻る</p>
            <p class="text-nav text-hover" @click="closeUpdateCategory()" v-else-if="updateCategoryFlg">キャンセル</p>
            <p class="text-nav text-hover" @click="closeCreateCategory()" v-else-if="createCategoryFlg">キャンセル</p>
          </div>
          <div class="nav-center">
            <p class="text-nav" v-if="!updateCategoryFlg">カテゴリー名</p>
            <p class="text-nav" v-else-if="updateCategoryFlg">カテゴリーの更新  </p>
            <p class="text-nav" v-else-if="createCategoryFlg">カテゴリーの追加  </p>
          </div>
          <div class="nav-right">
            <p class="text-nav text-hidden" v-if="!updateCategoryFlg">追加する</p>
            <p class="text-nav" v-else-if="updateCategoryFlg" @click="updateCategory" :class="createCategory.name === '' ? 'text-gray not-pointer' : 'text-blue'">更新する</p>
          </div>
      </div>
            
      <p class="text text-center text-margin-bottom text-margin-top" v-if="!updateCategoryFlg &&!createCategoryFlg">新規TODOは"{{selectCategoryName}}"に作成されます。</p>
      <p class="text text-center text-margin-bottom text-margin-top" v-else-if="updateCategoryFlg"></p>
      <p class="text text-center text-margin-bottom text-margin-top" v-else-if="createCategoryFlg">このカテゴリーは{{createListName}}リストに<br>作成されます。</p>


      <form action="post" @submit.prevent="registerCategory">
            <div class="modal-item">
                <div class="circle-area circle-area-list" :class="selectIconColor">
                   <i class="fa-solid fa-calendar-day icon icon-white"></i>
                </div>
                <input type="text" class="modai-item-text modal-item-list border-none" 
                 ref="categoryTitle" v-model="createCategory.name" placeholder="カテゴリー名を入力">

            </div>
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

            <div class="responsive-button-container" v-if="!updateCategoryFlg">
                <div class="button-area button-area-responsive">
                    <p class="text text-right text-hidden">追加する</p>
                    <input class="button button-orange button-responsive" :disabled="createCategory.name === ''"
                    :class="createCategory.name === '' ? 'button-invalid' : ''" type="submit" name="" value="新規追加">
                </div>
            </div>
            <div class="responsive-button-container" v-else-if="updateCategoryFlg">
                <div class="button-area button-area-responsive">
                    <p class="text text-right text-hidden">削除する</p>
                    <input class="button button-red button-responsive" type="button" name="" value="削除する" @click="deleteCategory(editCategoryId)">
                </div>
            </div>


      </form>


      <div class="list-container list-container-select-page" v-if="!updateCategoryFlg && !createCategoryFlg">
  
              <div class="list-item list-item-transparent" v-for="(category, idx) in categorys" :key="idx" @click="selectCategory(category)">
                 <div class="list-item-left">
                   <div class="circle-area circle-area-list" v-bind:class="category.color">
                       <i class="fa-solid fa-calendar-day icon icon-white"></i>
                   </div>
                   <p class="text">{{category.name}}</p>
                 </div>
                 <div class="list-item-right">
                   <div class="angle-area">
                     <i class="fa-solid fa-check icon icon-right-margin icon-blue" v-if="category.isChecked"></i>
                   </div>
                 </div>
              </div>

       </div>
         
  </div>

</template>

<script>
import axios from 'axios';

 export default{
    props: {
      todoCategoryName: {
        type: String,
      },
       createTodoFlg: {
        type:Boolean,
        default: false,
       },
       createListFlag: {
        type:Boolean,
        default: false,
       },
       updateCategoryFlg:{
        type:Boolean,
        default:false,
       },
       createCategoryFlg:{
        type:Boolean,
        default:false,
       },
       editCategoryId:{
        type:Number,
        default:0,
       },
       editCategoryName:{
        type:String,
        default:'',
       },
       editCategoryColor:{
        type:String,
        default:'',
       },
       createListId:{
        Type:Number,
        default:0,
       },
       createListName:{
        Type:Number,
        default:0,
       }

    },


    data: function(){
      return {
        selectIconColor: "circle-area-blue",
        createCategory: {
          name: '',
          userId: '',
          listId:'',
          color: '',
          fixedFlg: false,
          deleteFlg: false,
        },
        categorys: [{}],
        selectCategoryName:'',
        selectCategoryId: '',
        showEditCategoryColor:'',
      }
    },
    
    methods: {
      async deleteCategory(id){
        if(confirm('このカテゴリーを削除しますか？')){
          await this.$store.dispatch('category/delete',id)
          if(this.apiStatus){
            await this.fetchCategorys()
            await this.$store.dispatch('category/getAllCategorys')
            const response = await axios.post('/api/deleteTodoRelateCategory',{categoryId:id})
            this.closeUpdateCategory()
          }
        }
      },
      updateName(){
        if(this.editCategoryName != ''){
          this.createCategory.name = this.editCategoryName
          return this.createCategory.name
        }else{
          return false
        } 
      },
      countCategoryName(e){
          this.createCategory.name = e.target.value
        },
      updateColor(){
        if(this.editCategoryColor != ''){
          this.selectIconColor = this.editCategoryColor
          return this.selectIconColor
        }else{
          return false
        }
      },  
      closeUpdateCategory(){
        this.$emit('close')
      },
      closeCreateCategory(){
        this.$emit('close')
      },
      close(){
        var selectData = this.categorys.filter(function(item){
          return item.isChecked == true;
        })
        if(selectData.length){
        var selectCategory= selectData.shift();
        }else{
          var selectCategory = {name: '',circleColor:'circle-area-gray',isChecked: false}
        }
        this.$emit('connectData', selectCategory.name)
      },
      userId() {
           this.createCategory.userId =  this.$store.getters['auth/id']
         },
      async selectCategory(item){
        if(!item.isChecked){
        for( var element of this.categorys){
          element.isChecked = false
        }
        item.isChecked = !item.isChecked;
        this.selectCategoryName = item.name
        this.selectCategoryId = item.id
        await this.$store.dispatch('todo/selectCategory', this.selectCategoryId) 
        this.close()
        }else if(item.isChecked = true){
          item.isChecked = !item.isChecked;
          this.selectCategoryName = "選択したカテゴリー"
          await this.$store.dispatch('todo/selectCategory', "")
        }
      },
      async updateCategory(){
        this.userId()
        this.showEditCategoryColor = this.selectIconColor
        this.selectColor()
        this.createCategory.id = this.editCategoryId
        await this.$store.dispatch('category/update',this.createCategory) 

        if(this.apiStatus){
            await this.fetchCategorys()
            await this.$store.dispatch('category/getAllCategorys')
            this.closeUpdateCategory()
        }
      },
      async registerCategory() {
        if(!this.createCategoryFlg){
        this.userId()
        this.selectColor()
        this.createCategory.listId = this.$store.getters['category/listId']
        await this.$store.dispatch('category/register', this.createCategory)
      
        if(this.apiStatus){
          await this.fetchCategorys() 
          await this.$store.dispatch('category/getAllCategorys')
          this.createCategory.name =''
        }
        }else if(this.createCategoryFlg){
          this.userId()
          this.selectColor()
          await this.$store.dispatch('category/selectList', this.createListId)
          this.createCategory.listId = this.$store.getters['category/listId']
          await this.$store.dispatch('category/register', this.createCategory)
        
          if(this.apiStatus){
            await this.fetchCategorys()
            await this.$store.dispatch('category/getAllCategorys')
            this.createCategory.name =''

            this.closeCreateCategory()
          }
        }
      },
      async fetchCategorys(){
        this.fetchListId = this.$store.getters['category/listId']
        this.selectCategoryId = this.$store.getters['todo/category']
        const data = {fetchListId: this.fetchListId}
        const response = await axios.post('/api/categorys', data)
        if(response.status !== 200){
          this.$store.commit('error/setCode', response.status)
          return false
        }
        if(response.status === 200){
          for(let i = 0; i<response.data.length; i++ ){
            if(response.data[i]["id"] === this.selectCategoryId){
              response.data[i]["isChecked"] = true
            }else{
              response.data[i]["isChecked"] = false
            }

           if(response.data[i]["color"] === 1){
              response.data[i]["color"] = "circle-area-red"
           }else if(response.data[i]["color"] === 2){
              response.data[i]["color"] = "circle-area-pink"
           }else if(response.data[i]["color"] === 3){
              response.data[i]["color"] = "circle-area-orange"
           }else if(response.data[i]["color"] === 4){
              response.data[i]["color"] = "circle-area-yellow"
           }else if(response.data[i]["color"] === 5){
              response.data[i]["color"] = "circle-area-green"
           }else if(response.data[i]["color"] === 6){
              response.data[i]["color"] = "circle-area-sky"
           }else if(response.data[i]["color"] === 7){
              response.data[i]["color"] = "circle-area-blue"
           }else if(response.data[i]["color"] === 8){
              response.data[i]["color"] = "circle-area-purple"
           }else if(response.data[i]["color"] === 9){
              response.data[i]["color"] = "circle-area-brown"
           }else if(response.data[i]["color"] === 10){
              response.data[i]["color"] = "circle-area-gray"
           }else if(response.data[i]["color"] === 11){
              response.data[i]["color"] = "circle-area-black"
           }else if(response.data[i]["color"] === 12){
              response.data[i]["color"] = "circle-area-peach"
           }else{
              response.data[i]["color"] = "circle-area-blue"
           }
          }
          this.categorys = response.data

        }
      },
      selectColor(){
          switch(this.selectIconColor){
            case 'circle-area-red':
              this.createCategory.color = 1
              break;
            case 'circle-area-pink':
              this.createCategory.color = 2
              break;
            case 'circle-area-orange':
              this.createCategory.color = 3
              break;
            case 'circle-area-yellow':
              this.createCategory.color = 4
              break;
            case 'circle-area-green':
              this.createCategory.color = 5
              break;
            case 'circle-area-sky':
              this.createCategory.color = 6
              break;
            case 'circle-area-blue':
              this.createCategory.color = 7
              break;
            case 'circle-area-purple':
              this.createCategory.color = 8
              break;
            case 'circle-area-brown':
              this.createCategory.color = 9
              break;
            case 'circle-area-gray':
              this.createCategory.color = 10
              break;
            case 'circle-area-black':
              this.createCategory.color = 11
              break;
            case 'circle-area-peach':
              this.createCategory.color = 12
              break;
            default:
              this.createList.color = ''
          }
        },
    },
    mounted: async function(){
      await this.fetchCategorys()
 
      if(this.todoCategoryName === ""){
        this.selectCategoryName = "選択したカテゴリー"
      }else{
        this.selectCategoryName = this.todoCategoryName
      }
      if(this.updateCategoryFlg == true){
        this.updateName()
        this.updateColor()
      }
      this.$nextTick(function(){
          const input = this.$refs.categoryTitle
          input.addEventListener('keyup',this.countCategoryName)
          input.addEventListener('compositioned',this.countCategoryName)
      })

    },
    computed: {
        apiStatus(){
          return this.$store.state.category.apiStatus
          },
        registerErrors(){
          return this.$store.state.category.registerErrorMessages
          },       
    },
    watch: {
      $route: {
        async handler(){
          await this.fetchCategorys()
        },
        immediate:true
      },
      categorys: {
        handler(){
          //何もしない
          console.log(this.categorys)
        },
        deep: true,
      }

    }

 }
</script>
