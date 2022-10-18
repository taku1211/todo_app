<template>
        <div class="modal-container modal-container-detail modal-container-detail-priority">
            <div class="task-nav-container task-nav-container-detail">
              <div class="nav-left">
                <p class="text-nav text-hover" @click="closePriority">&lt 詳細</p>
              </div>
              <div class="nav-center">
                <p class="text-nav">優先順位</p>
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
                        <i class="fa-solid fa-check icon icon-right-margin icon-blue icon-m" v-if="isCheckedPriorityNone"></i>
                   </div>
               </div>
            </div>
            <div class="modal-item modal-item-middle area-hover" @click="isChecked(1)">
              <div class="list-item-left">
                 <p class="text">低</p>
               </div>
               <div class="list-item-right">
                <div class="angle-area">
                        <i class="fa-solid fa-check icon icon-right-margin icon-blue icon-m" v-if="isCheckedPriorityLow"></i>
                   </div>
               </div>
            </div>
            <div class="modal-item modal-item-middle area-hover"  @click="isChecked(2)">
              <div class="list-item-left">
                 <p class="text">中</p>
               </div>
               <div class="list-item-right">
                <div class="angle-area">
                        <i class="fa-solid fa-check icon icon-right-margin icon-blue icon-m" v-if="isCheckedPriorityMiddle"></i>
                   </div>
               </div>
            </div>
            <div class="modal-item modal-item-last area-hover"  @click="isChecked(3)">
              <div class="list-item-left">
                 <p class="text">高</p>
               </div>
               <div class="list-item-right">
                        <i class="fa-solid fa-check icon icon-right-margin icon-blue icon-m" v-show="isCheckedPriorityHigh"></i>
               </div>
            </div>


        </div>
        
</template>

<script>

 export default{
    props: {
      sendPriority:{
        type:Number,
        default:null
      }
    },
    
    data: function(){
      return{
        isCheckedPriorityNone:true,
        isCheckedPriorityHigh:false,
        isCheckedPriorityMiddle:false,
        isCheckedPriorityLow:false,
        selectPriority:0,
      }
    },
    methods:{
      closePriority(){
        if(this.isCheckedPriorityHigh){
          this.selectPriority = 3
        }else if(this.isCheckedPriorityMiddle){
          this.selectPriority =2
        }else if(this.isCheckedPriorityLow){
          this.selectPriority = 1
        }else{
          this.selectPriority = null
        }

        this.$emit('close',this.selectPriority)

      },
      isChecked(priority){
        if(priority === 0){
          this.isCheckedPriorityNone = !this.isCheckedPriorityNone
          this.isCheckedPriorityHigh = false
          this.isCheckedPriorityMiddle = false
          this.isCheckedPriorityLow = false
        }else if(priority === 1){
          this.isCheckedPriorityNone = false
          this.isCheckedPriorityHigh = false
          this.isCheckedPriorityMiddle = false
          this.isCheckedPriorityLow = !this.isCheckedPriorityLow
        }else if(priority === 2){
          this.isCheckedPriorityNone = false
          this.isCheckedPriorityHigh = false
          this.isCheckedPriorityMiddle = !this.isCheckedPriorityMiddle
          this.isCheckedPriorityLow = false
        }else if(priority === 3){
          this.isCheckedPriorityNone = false
          this.isCheckedPriorityHigh = !this.isCheckedPriorityHigh
          this.isCheckedPriorityMiddle = false
          this.isCheckedPriorityLow = false
        }
        if(!this.isCheckedPriorityNone && !this.isCheckedPriorityHigh && !this.isCheckedPriorityMiddle && !this.isCheckedPriorityLow){
          //何も処理を行わない
        }else{
          this.closePriority()
        }

      },
    },
    created:function(){
        if(this.sendPriority === 0){
          this.isCheckedPriorityNone = true
        }else if(this.sendPriority === 1){
          this.isCheckedPriorityLow = true
          this.isCheckedPriorityNone = false
        }else if(this.sendPriority === 2){
          this.isCheckedPriorityMiddle = true
          this.isCheckedPriorityNone = false
        }else if(this.sendPriority === 3 ){
          this.isCheckedPriorityHigh = true
          this.isCheckedPriorityNone = false
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