<template>
        <div class="modal-container modal-container-detail modal-container-detail-priority">
            <div class="task-nav-container task-nav-container-detail">
              <div class="nav-left">
                <p class="text-nav text-hover" @click="closeRoutine">&lt 詳細</p>
              </div>
              <div class="nav-center">
                <p class="text-nav">繰り返し</p>
              </div>
              <div class="nav-right">
              </div>
            </div>
            <div class="modal-item modal-item-first area-hover"  @click="isChecked(0)">
               <div class="list-item-left">
                 <p class="text">なし</p>
               </div>
               <div class="list-item-right">
                <div class="angle-area">
                        <i class="fa-solid fa-check icon icon-right-margin icon-blue icon-m" v-if="isCheckedRoutine === 0"></i>
                   </div>
               </div>
            </div>
            <div class="modal-item modal-item-middle area-hover" @click="isChecked(1)">
              <div class="list-item-left">
                 <p class="text">毎日</p>
               </div>
               <div class="list-item-right">
                <div class="angle-area">
                        <i class="fa-solid fa-check icon icon-right-margin icon-blue icon-m" v-if="isCheckedRoutine === 1"></i>
                   </div>
               </div>
            </div>
            <div class="modal-item modal-item-middle area-hover"  @click="isChecked(2)">
              <div class="list-item-left">
                 <p class="text">月～金</p>
               </div>
               <div class="list-item-right">
                <div class="angle-area">
                        <i class="fa-solid fa-check icon icon-right-margin icon-blue icon-m" v-if="isCheckedRoutine === 2"></i>
                   </div>
               </div>
            </div>
            <div class="modal-item modal-item-middle area-hover"  @click="isChecked(3)">
              <div class="list-item-left">
                 <p class="text">土日</p>
               </div>
               <div class="list-item-right">
                        <i class="fa-solid fa-check icon icon-right-margin icon-blue icon-m" v-if="isCheckedRoutine === 3"></i>
               </div>
            </div>
            <div class="modal-item modal-item-middle area-hover"  @click="isChecked(4)">
              <div class="list-item-left">
                 <p class="text">日曜日</p>
               </div>
               <div class="list-item-right">
                        <i class="fa-solid fa-check icon icon-right-margin icon-blue icon-m" v-if="isCheckedRoutine === 4"></i>
               </div>
            </div>
            <div class="modal-item modal-item-middle area-hover"  @click="isChecked(5)">
              <div class="list-item-left">
                 <p class="text">月曜日</p>
               </div>
               <div class="list-item-right">
                        <i class="fa-solid fa-check icon icon-right-margin icon-blue icon-m" v-if="isCheckedRoutine === 5"></i>
               </div>
            </div>
            <div class="modal-item modal-item-middle area-hover"  @click="isChecked(6)">
              <div class="list-item-left">
                 <p class="text">火曜日</p>
               </div>
               <div class="list-item-right">
                        <i class="fa-solid fa-check icon icon-right-margin icon-blue icon-m" v-if="isCheckedRoutine === 6"></i>
               </div>
            </div>
            <div class="modal-item modal-item-middle area-hover"  @click="isChecked(7)">
              <div class="list-item-left">
                 <p class="text">水曜日</p>
               </div>
               <div class="list-item-right">
                        <i class="fa-solid fa-check icon icon-right-margin icon-blue icon-m" v-if="isCheckedRoutine === 7"></i>
               </div>
            </div>
            <div class="modal-item modal-item-middle area-hover"  @click="isChecked(8)">
              <div class="list-item-left">
                 <p class="text">木曜日</p>
               </div>
               <div class="list-item-right">
                        <i class="fa-solid fa-check icon icon-right-margin icon-blue icon-m" v-if="isCheckedRoutine === 8"></i>
               </div>
            </div>
            <div class="modal-item modal-item-middle area-hover"  @click="isChecked(9)">
              <div class="list-item-left">
                 <p class="text">金曜日</p>
               </div>
               <div class="list-item-right">
                        <i class="fa-solid fa-check icon icon-right-margin icon-blue icon-m" v-if="isCheckedRoutine === 9"></i>
               </div>
            </div>
            <div class="modal-item modal-item-middle area-hover"  @click="isChecked(10)">
              <div class="list-item-left">
                 <p class="text">土曜日</p>
               </div>
               <div class="list-item-right">
                        <i class="fa-solid fa-check icon icon-right-margin icon-blue icon-m" v-if="isCheckedRoutine === 10"></i>
               </div>
            </div>
            <div class="modal-item modal-item-middle area-hover"  @click="isChecked(11)">
              <div class="list-item-left">
                 <p class="text">毎週</p>
               </div>
               <div class="list-item-right">
                        <i class="fa-solid fa-check icon icon-right-margin icon-blue icon-m" v-if="isCheckedRoutine === 11"></i>
               </div>
            </div>
            <div class="modal-item modal-item-middle area-hover"  @click="isChecked(12)">
              <div class="list-item-left">
                 <p class="text">毎月</p>
               </div>
               <div class="list-item-right">
                        <i class="fa-solid fa-check icon icon-right-margin icon-blue icon-m" v-if="isCheckedRoutine === 12"></i>
               </div>
            </div>
            <div class="modal-item modal-item-last area-hover"  @click="isChecked(13)">
              <div class="list-item-left">
                 <p class="text">毎年</p>
               </div>
               <div class="list-item-right">
                        <i class="fa-solid fa-check icon icon-right-margin icon-blue icon-m" v-if="isCheckedRoutine === 13"></i>
               </div>
            </div>


        </div>
        
</template>

<script>

 export default{
    props: {
      sendRoutine:{
        type:Number,
        default:0
      }
    },
    
    data: function(){
      return{
        isCheckedRoutine:0,
      }
    },
    methods:{
      closeRoutine(){
        this.$emit('close',this.isCheckedRoutine)
      },
      isChecked(routine){
        if(this.isCheckedRoutine === routine){
          this.isCheckedRoutine = 0
        }else if(this.isCheckedRoutine !== routine){
          this.isCheckedRoutine = routine
        }
        this.closeRoutine()
      },
    },
    created:function(){
      this.isCheckedRoutine = this.sendRoutine
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