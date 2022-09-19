<template>
  <div class="home-menu-container" @click="close()">
    <div class="menu-flex">
        <div class="menu-text">HOME</div>
        <div class="menu-text" @click.stop="showEditAccount()">ACCOUNT</div>
        <div class="menu-text" @click.stop="logout">LOGOUT</div>
    </div>
  </div>
    
</template>

<script>



export default{
    components:{
},
    data:function(){
        return{
            showAccountPage:false,
        }
    },
    methods:{
        async logout(){
            if(confirm('ログアウトしますか？')){
                await this.$store.dispatch('auth/logout')

                if(this.apiStatus){
                  this.$store.commit('message/setContent', {
                              content: 'ログアウトしました。',
                              timeout: 2000
                             })
                    this.$router.push('/')
                }
            }
        },
        close(){
            this.$emit('close')
        },
        showEditAccount(){
            this.showAccountPage = true
            this.$emit('showAccountPage')
        }
    },
    computed: {
    isLogin(){
        return this.$store.getters['auth/check']
      },
    username() {
      return this.$store.getters['auth/username']
    },
    id() {
      return this.$store.getters['auth/id']
    },
    apiStatus(){
      return this.$store.state.auth.apiStatus
    },

    }
}
</script>