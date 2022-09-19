<template>
    <div class="auth-container auth-container-password">

        <div class="task-nav-container task-nav-container-create-list task-nav-container-account" >
            <div class="nav-left">
            </div>
            <div class="nav-center">
                <p class="text-nav">パスワード再登録</p>
            </div>
            <div class="nav-right">
                <input class="text-nav text-hidden" type="submit" name="" value="更新">
            </div>
          </div>

        <div class="form-container form-container-register">
            <form class="form" >
                <div class="update-form">
                <div class="update-flex">
                    <div class="list-item-left"><label for="name">ユーザー名の入力</label></div>
                </div>

                <div v-if="updateErrors" >
                    <ul v-if="updateErrors.name" class="errors">
                        <li v-for="msg in updateErrors.name" :key="msg">{{ msg }}</li>
                    </ul>
                </div>
                <input type="text"  class="form-item" id="name" v-model="updateForm.name"  
                    placeholder="ユーザー名を入力">
            </div>

            <div class="update-form">
                <div class="update-flex">
                    <div class="list-item-left"><label for="email">メールアドレスの入力</label></div>
                </div>

                <div v-if="updateErrors" >
                    <ul v-if="updateErrors.email" class="errors">
                        <li v-for="msg in updateErrors.email" :key="msg">{{ msg }}</li>
                    </ul>
                </div>
                <input type="text"  class="form-item" id="email" v-model="updateForm.email"  
                    placeholder="現在のメールアドレスを入力">
            </div>
            <div class="update-form">
                <div class="update-flex">
                    <div class="list-item-left"><label for="update-password">パスワードの更新</label></div>
                </div>

                <div v-if="updateErrors" >
                    <ul v-if="updateErrors.password" class="errors">
                        <li v-for="msg in updateErrors.password" :key="msg">{{ msg }}</li>
                    </ul>
                </div>

                <label for="update-password" class="text-xs" form="update-password">※新しいパスワード</label>
                <input type="password"  class="form-item" id="update-password" v-model="updateForm.password"
                    placeholder="新しいパスワードを入力">
                <label for="update-password-confirm" class="text-xs" form="update-password-confirm">※新しいパスワード（再入力）</label>
                <input type="password"  class="form-item" id="update-password-confirm" v-model="updateForm.password_confirmation"
                    placeholder="新しいパスワードを再入力">
            </div>
            <div class="form-button form-button-space-right">
                <button type="button" class="button button-responsive button-black button-square button-auth"
                @click.stop="forgetPassword">更新</button>
            </div>
            <p class="text-underline font-s space-left text-hover" @click="close">ログインページへ戻る</p>




            </form>
        </div>
    </div>

</template>

<script>

export default{
    data:function(){
        return{
            updateForm:{
                name:'',
                email:'',
                password:'',
                password_confirmation:'',
            },
        }
    },
    methods:{
        close(){
            this.$emit('close')
        },
        async forgetPassword(){
            console.log(this.updateForm)
            await this.$store.dispatch('auth/forgetPassword',this.updateForm)
            if(this.apiStatus){
                console.log('OK')
                this.$store.commit('message/setContent', {
                              content: 'パスワードを再設定しました。',
                              timeout: 5000
                             })

                this.close()
            }
        },

    },
    created:function(){
        this.$store.commit('auth/setUpdateErrorMessages', null)
    },
    computed: {
    apiStatus(){
      return this.$store.state.auth.apiStatus
    },
    updateErrors(){
            return this.$store.state.auth.updateErrorMessages
    },
  }
}
</script>