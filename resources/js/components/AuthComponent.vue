<template>
  <div>
    
    <div class="auth-container">
        
        <ul class="tab">
            <li  class="tab-item" @click="changeToLogin" :class=" tab === 1 ? 'tab-item-selected' : ''">Login</li>
            <li class="tab-item" @click="changeToRegister" :class=" tab === 2 ? 'tab-item-selected' : ''">Register</li>
        </ul>
        <transition name="fade">
        <div class="form-container form-container-login" v-if="tab === 1">
            <form class="form" @submit.prevent="login">
               <label for="login-email">Email</label>
                    <div v-if="loginErrors" >
                        <ul v-if="loginErrors.email" class="errors">
                            <li v-for="msg in loginErrors.email" :key="msg">{{ msg }}</li>
                        </ul>
                    </div>
                    <input type="text" class="form-item" name="login-email" id="login-email" autocomplete="email"
                         v-model="loginForm.email">
               
                <label for="login-password">Password</label>
                    <div v-if="loginErrors" >
                        <ul v-if="loginErrors.password" class="errors">
                            <li v-for="msg in loginErrors.password" :key="msg">{{ msg }}</li>
                        </ul>
                    </div>

                    <input type="password" class="form-item" name="login-password" id="login-password"
                         autocomplete="current-password" v-model="loginForm.password">
                
                <div class="form-check">
                        <input type="checkbox" name="remember_me" class="margin-right-s hover" id="remember_me" v-model="loginForm.checked">
                        <label class="font-s text-hover" for="remember_me">ログイン状態を維持する</label>
                </div>
                
                <div class="form-button">
                    <button type="submit" class="button button-responsive button-black button-square button-auth">Login</button>
                </div>
                <p class="text-underline font-s text-hover" @click="openRemindPassword">パスワードを忘れた方はこちら</p>
            </form>
        </div>
        <div class="form-container form-container-register" v-else>
            <form class="form" @submit.prevent="register">
                <label for="register-name">User Name</label>
                    <div v-if="registerErrors" >
                        <ul v-if="registerErrors.name" class="errors">
                            <li v-for="msg in registerErrors.name" :key="msg">{{ msg }}</li>
                        </ul>
                    </div>
                    <input type="text"  class="form-item" name="register-name" id="register-name"  
                        v-model="registerForm.name">
               <label for="register-email">Email</label>
                    <div v-if="registerErrors" >
                        <ul v-if="registerErrors.email" class="errors">
                            <li v-for="msg in registerErrors.email" :key="msg">{{ msg }}</li>
                        </ul>
                    </div>
                    <input type="text" class="form-item" name="register-email" id="register-email" 
                        autocomplete="email" v-model="registerForm.email">
               
                <label for="register-password">Password</label>
                    <div v-if="registerErrors" >
                        <ul v-if="registerErrors.password" class="errors">
                            <li v-for="msg in registerErrors.password" :key="msg">{{ msg }}</li>
                        </ul>
                    </div>
                    <input type="password" class="form-item" name="register-password" id="register-password" 
                         v-model="registerForm.password">
                <label for="register-password-re">Password Confirm</label>
                    <input type="password" class="form-item" name="register-password-re" id="register-password-re" 
                         v-model="registerForm.password_confirmation">

                <div class="form-button">
                    <button type="submit" class="button button-responsive button-black button-square button-auth">Register</button>
                </div>
            </form>
        </div>
    </transition>

    
        <RemindPasswordComponent v-if="showRemindPassword" @close="closeRemindPassword"></RemindPasswordComponent>
    
    </div>
  </div>

</template>

<script>
import RemindPasswordComponent from "./RemindPasswordComponent";

export default {
    components:{
    RemindPasswordComponent,
},
    data: function(){
        return {
            tab : 1,
            loginForm: {
                email: '',
                password: '',
                checked: '',
            },
            registerForm: {
                name: '',
                email: '',
                password: '',
                password_confirmation: '',
            },
            showRemindPassword:false,
            loading:true,
        }
    },
    methods: {
        changeToLogin(){
            this.tab = 1
            this.clearError()
            this.clearData()
        },
        changeToRegister(){
            this.tab = 2
            this.clearError()
            this.clearData()
        },
        openRemindPassword(){
            this.showRemindPassword = true
        },
        closeRemindPassword(){
            this.showRemindPassword = false
            this.clearError()
            this.clearData()
        },
        async login(){
            this.loading = true;
            await this.$store.dispatch('auth/login', this.loginForm)
          

            if(this.apiStatus){
                await this.$store.dispatch('todo/count')
                if(this.apiStatus){
                     await this.$store.dispatch('list/getAllLists')
                     if(this.apiStatus){
                        this.$store.commit('message/setContent', {
                              content: 'ログインしました。',
                              timeout: 2000
                             })
                        this.$router.push('/home')
                     } 
                }
            }
        },
        async register(){
            this.loading = true;
            await this.$store.dispatch('auth/register', this.registerForm)

            if(this.apiStatus){
                await this.$store.dispatch('todo/count')
                if(this.apiStatus){
                     await this.$store.dispatch('list/getAllLists')
                     if(this.apiStatus){
                        this.$store.commit('message/setContent', {
                              content: '新規登録が完了しました。',
                              timeout: 2000
                             })

                        this.$router.push('/home')
                     } 
                }
            }

        },
        clearError(){
            this.$store.commit('auth/setLoginErrorMessages', null)
            this.$store.commit('auth/setRegisterErrorMessages', null)
        },
        clearData(){
            this.loginForm = [],
            this.registerForm = []
        }
    },
    created: async function(){
        await this.$store.dispatch('todo/count')
    },
    computed: {
        apiStatus(){
            return this.$store.state.auth.apiStatus
        },
        loginErrors(){
            return this.$store.state.auth.loginErrorMessages
        },
        registerErrors(){
            return this.$store.state.auth.registerErrorMessages
        },
    },
    created(){
        this.clearError()
    },
}
</script>