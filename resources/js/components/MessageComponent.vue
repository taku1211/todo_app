<template>
   <transition name="fade"> 
    <div class="message-container" v-if="message">
      {{ message }}
    </div>
   </transition>
  </template>
  
  <script>
    import { mapState } from 'vuex'
  
    export default {
      computed: {
        ...mapState({
          message: state => state.message.content
        })
      }
    }
  </script>