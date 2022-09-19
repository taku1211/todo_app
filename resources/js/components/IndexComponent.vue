<template>
    <div class="router-container">
       
         <MessageComponent></MessageComponent>
        <router-view></router-view>
      <FooterComponent></FooterComponent>

    </div>
</template>

<script>
import FooterComponent from './FooterComponent.vue'
import MessageComponent from './MessageComponent.vue'
import { INTERNAL_SERVER_ERROR,NOT_FOUND,REDIRECT } from '../util'
import { unknown_status } from '../util'



export default {
  components: {
    FooterComponent,
    MessageComponent,
  },
  computed: {
    errorCode(){
      return this.$store.state.error.code
    }
  },
  watch: {
    errorCode: {
      async handler(val){
        if(val === INTERNAL_SERVER_ERROR){
          this.$router.push('/500')
        }else if(val === unknown_status){
          this.$router.push('/419')
        }else if(val === NOT_FOUND){
          this.$router.push('/*')
        }else if(val === REDIRECT){
          this.$router.push('/*')
        }
      },
      immediate:true
    },
    $route(){
      this.$store.commit('error/setCode', null)
    }
  },

}
</script>