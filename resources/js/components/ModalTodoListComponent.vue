<template>
          <div class="modal-container modal-container-list">
            <transition name="slide-bottom">
               <ModalCreateListComponent v-if="showModalCreateList" @closeList="closeCreateModalList"></ModalCreateListComponent>
            </transition>

            <div class="task-nav-container task-nav-container-list">
              <div class="nav-left">
                <p class="text-nav text-hover"  @click="close()">&lt 戻る</p>
              </div>
              <div class="nav-center">
                <p class="text-nav">リスト名</p>
              </div>
              <div class="nav-right">
                <input class="text-nav text-hover" type="button" name="" value="新規作成" @click="showModalCreateList = true">
              </div>

            </div>
            <p class="text text-center text-margin-top">新規TODOは"{{selectListName}}"に作成されます。</p>

            <div class="list-container list-container-select-page">

              <div class="list-item list-item-transparent" v-for="(list, idx) in lists" :key="idx" @click="selectList(list)">
                 <div class="list-item-left">
                   <div class="circle-area circle-area-list" v-bind:class="list.color">
                       <i class="fa-solid fa-list-check icon icon-white"></i>
                   </div>
                   <p class="text">{{ list.name }}</p>
                 </div>
                 <div class="list-item-right">
                   <div class="angle-area">
                     <i class="fa-solid fa-check icon icon-right-margin icon-blue"  v-if="list.isChecked"></i>
                   </div>
                 </div>
              </div>
     
 

            </div>
          </div>

</template>

<script>
  import ModalCreateListComponent from "./ModalCreateListComponent";

   export default{
    props: ['todoListName'],
    data: function(){
        return{
          showModalCreateList: false,
          lists: [{}],
          selectListName: '選択したリスト名',
          selectListId: "",
        }
    },
    methods: {
      close(){
        var selectData = this.lists.filter(function(list){
          return list.isChecked == true;
        })
        if(selectData.length){
        var selectList= selectData.shift();
        }else{
          var selectList = { name : '',circleColor:'circle-area-gray',isChecked: false }
        }
        this.$emit('connectData', selectList.name);
      },
      async closeCreateModalList(){
        await this.fetchLists()
        this.showModalCreateList = false
      },
      async selectList(item){
        if(!item.isChecked){
        for( var element of this.lists){
          element.isChecked = false;
        }
        item.isChecked = !item.isChecked
          this.selectListName = item.name
          this.selectListId = item.id
          console.log(this.selectListId)
          await this.$store.dispatch('category/selectList', this.selectListId)
          await this.$store.dispatch('todo/selectList', this.selectListId)
          this.close()
        }else if(item.isChecked = true){
          item.isChecked = !item.isChecked
          this.selectListName = "選択したリスト名"
          await this.$store.dispatch('category/selectList', "")
          await this.$store.dispatch('todo/selectList', "")
        }
      },
      async fetchLists(){
        const response  = await axios.get('/api/lists') 

        if(response.status !== 200){
          this.$store.commit('error/setCode', response.status)
          return false
        }
        if(response.status === 200){
          for(let i = 0; i<response.data.length; i++ ){
            let data = response.data[i]
           response.data[i]["isChecked"] = false
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
              
           }
          }
          this.lists = response.data
        }
      }
    },
    components: {
      ModalCreateListComponent,
    },
    mounted: async function(){
       await this.fetchLists()
      for(var element of this.lists){
        if(element.name === this.todoListName){
          element.isChecked = true
        }       
      }
      if(this.todoListName === ""){
          this.selectListName = "選択したリスト名"
        }else{
          this.selectListName = this.todoListName
        }
    },
    watch: {
      $route: {
        async handler(){
          await this.fetchLists()
        },
        immediate:true
      }
    },
   }
</script>
