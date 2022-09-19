<template>
    <div class="system-error-container">
        <p class="text">セッションエラーが発生しました。</p>
        
        
            <p class="text text-underline text-hover" @click="logout">ログインページへ戻る</p>
        
    </div>
</template>

<script>
    export default{
        methods:{
            async logout(){
                   
                   await axios.get('/api/refresh-token')
                   this.$store.commit('auth/setUser', null)
                   await this.$store.dispatch('auth/logout')
                    this.$router.push('/')
                
        },

        }
    }
</script>