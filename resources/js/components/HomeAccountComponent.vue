<template>
    <div class="account-container">

        <div class="task-nav-container task-nav-container-create-list task-nav-container-account" >
            <div class="nav-left">
                <p class="text-nav text-hover" @click="close">戻る</p>
            </div>
            <div class="nav-center">
                <p class="text-nav">アカウント情報</p>
            </div>
            <div class="nav-right">
                <input class="text-nav text-hidden" type="submit" name="" value="更新">
            </div>
          </div>

        <div class="form-container form-container-register form-container-register-edit">

            <form class="form" >
              <div class="list-item list-item-clear">
                    <div class="list-item-left">
                    User Name
                    </div>
                    <div class="list-item-right">
                    {{currentData.name}}
                    </div>
              </div>
              <div class="list-item list-item-clear">
                    <div class="list-item-left">
                    Email
                    </div>
                    <div class="list-item-right">
                    {{currentData.email}}
                    </div>
              </div>
              <div class="list-item list-item-clear">
                    <div class="list-item-left">
                    PASSWORD
                    </div>
                    <div class="list-item-right">
                    登録済
                    </div>
              </div>

            <div class="update-form update-form-first">
                <div class="update-flex">
                    <div class="list-item-left"><label for="name">ユーザー名の更新</label></div>
                    <div>
                      <button type="button" class="button button-responsive button-black button-square button-square-s button-auth"
                        @click.stop="updateUserName">更新</button>
                   </div>
                </div>

                <div v-if="updateErrors" >
                    <ul v-if="updateErrors.name" class="errors">
                        <li v-for="msg in updateErrors.name" :key="msg">{{ msg }}</li>
                    </ul>
                </div>
                <input type="text"  class="form-item" id="name" v-model="updateForm.name" 
                    placeholder="変更するユーザー名を入力してください。">
            </div>
            <div class="update-form">
                <div class="update-flex">
                    <div class="list-item-left"><label for="email">メールアドレスの更新</label></div>
                    <div>
                      <button type="button" class="button button-responsive button-black button-square button-square-s button-auth"
                       @click.stop="updateUserEmail">更新</button>
                   </div>
                </div>

                <div v-if="updateErrors" >
                    <ul v-if="updateErrors.email" class="errors">
                        <li v-for="msg in updateErrors.email" :key="msg">{{ msg }}</li>
                    </ul>
                </div>
                <input type="text"  class="form-item" id="email" v-model="updateForm.email"  
                    placeholder="新しいメールアドレスを入力してください。">
            </div>
            <div class="update-form">
                <div class="update-flex">
                    <div class="list-item-left"><label for="current-password">パスワードの更新</label></div>
                    <div>
                      <button type="button" class="button button-responsive button-black button-square button-square-s button-auth"
                        @click.stop="updateUserPassword">更新</button>
                   </div>
                </div>

                <div v-if="updateErrors" >
                    <ul v-if="updateErrors.currentPassword" class="errors">
                        <li v-for="msg in updateErrors.currentPassword" :key="msg">{{ msg }}</li>
                    </ul>
                </div>
                <div v-if="updateErrors" >
                    <ul v-if="updateErrors.password" class="errors">
                        <li v-for="msg in updateErrors.password" :key="msg">{{ msg }}</li>
                    </ul>
                </div>

                <label for="current-password" class="text-xs">※現在のパスワード</label>
                <input type="password"  class="form-item" name="" id="current-password" v-model="updateForm.currentPassword"
                    placeholder="現在のパスワードを入力してください。">
                <label for="update-password" class="text-xs">※新しいパスワード</label>
                <input type="password"  class="form-item" name="" id="update-password" v-model="updateForm.password"
                    placeholder="新しいパスワードを入力してください。">
                <label for="update-password-confirm" class="text-xs">※新しいパスワード（再入力）</label>
                <input type="password"  class="form-item" name="" id="update-password-confirm" v-model="updateForm.password_confirmation"
                    placeholder="新しいパスワードを再入力してください。">

            </div>



            </form>
            <div class="responsive-button-container">
                <div class="button-area button-area-responsive">
                    <p class="text text-right text-hidden">アカウントを削除する</p>
                    <input class="button button-red button-responsive" type="button" name="" value="アカウント削除" @click="deleteAccount()">
                </div>
          </div>

        </div>
    </div>

</template>

<script>

export default{
    data:function(){
        return{
            currentData: {
                name: this.$store.getters['auth/username'],
                email: this.$store.getters['auth/email'],
            },
            updateForm:{
                name:this.$store.getters['auth/username'],
                email:this.$store.getters['auth/email'],
                currentPassword:'',
                password:'',
                password_confirmation:'',

            },
        }
    },
    methods:{
        close(){
            this.$emit('close')
        },
        async deleteAccount(){
            if(confirm('このアカウントを削除しますか？')){
                const deleteUserId = this.$store.getters['auth/id']

                    await this.$store.dispatch('auth/deleteUser',deleteUserId)

                    if(this.apiStatus){
                        await this.$store.dispatch('auth/logout')
                        this.$store.commit('message/setContent', {
                              content: 'アカウントの削除が完了しました。',
                              timeout: 2000
                             })

                        this.$router.push('/')
                    }
                }
        },
        async updateUserName(){
            //console.log(this.updateForm.name)
            await this.$store.dispatch('auth/updateName',{userName:this.updateForm.name})
            if(this.apiStatus){
                //console.log('OK')
                this.$store.commit('message/setContent', {
                              content: 'ユーザー名の変更が完了しました。',
                              timeout: 2000
                             })

                this.close()
            }
        },
        async updateUserEmail(){
            //console.log(this.updateForm.email)
            await this.$store.dispatch('auth/updateEmail',{userEmail:this.updateForm.email})
            if(this.apiStatus){
                this.$store.commit('message/setContent', {
                              content: 'メールアドレスの変更が完了しました。',
                              timeout: 2000
                             })

                this.close()
            }
        },
        async updateUserPassword(){
            //console.log(this.updateForm)
            await this.$store.dispatch('auth/updatePassword',this.updateForm)
                if(this.apiStatus){
                    this.$store.commit('message/setContent', {
                              content: 'パスワードの更新が完了しました。',
                              timeout: 2000
                             })

                this.close()
            }
        },

    },
    created:function(){
        this.$store.commit('auth/setUpdateErrorMessages', null)
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
    email() {
      return this.$store.getters['auth/email']
    },
    apiStatus(){
      return this.$store.state.auth.apiStatus
    },
    updateErrors(){
            return this.$store.state.auth.updateErrorMessages
    },
  }
}
</script>