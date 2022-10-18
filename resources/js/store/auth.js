import axios from "axios"
import {OK, CREATED, UNPROCESSABLE_ENTITY} from "../util"

const state = {
    user: null,
    apiStatus: null,
    loginErrorMessages: null,
    registerErrorMessages: null,
    updateErrorMessages:null,
}
const getters = {
    check: state => !! state.user,
    username: state => state.user ? state.user.name : '',
    id: state => state.user ? state.user.id : '',
    email: state => state.user ? state.user.email:'',
    password: state => state.user ? state.user.password:'',
}
const mutations = {
    setUser(state, user){
        state.user = user
    },
    setApiStatus(state, status){
        state.apiStatus = status
    },
    setLoginErrorMessages(state, messages){
        state.loginErrorMessages = messages
    },
    setRegisterErrorMessages(state, messages){
        state.registerErrorMessages = messages
    },
    setUpdateErrorMessages(state, messages){
        state.updateErrorMessages = messages
    },

}
const actions = {
    async register(context, data){
        const newData = {
            name: data.name,
            email: data.email,
            password: data.password, 
            password_confirmation: data.password_confirmation,   
        }

        context.commit('setApiStatus', null)
        const response = await axios.post('/api/register', newData)

        if(response.status === CREATED){
            context.commit('setApiStatus', true)
            context.commit('setUser', response.data)
            return false
        }
        context.commit('setApiStatus', false)

        if(response.status === UNPROCESSABLE_ENTITY){
            context.commit('setRegisterErrorMessages', response.data.errors)
        }else{
            context.commit('error/setCode', response.status, {root:true})
        }
    },
    async login(context, data){
        const loginData= {
            email:data.email,
            password:data.password,
            remember:data.checked,
        }
        const response = await axios.post('/api/login', loginData)

        if(response.status === OK){
            context.commit('setApiStatus', true)
            context.commit('setUser', response.data)
            return false
        }
        context.commit('setApiStatus', false)

        if(response.status === UNPROCESSABLE_ENTITY){
            context.commit('setLoginErrorMessages', response.data.errors)
        }else{
            context.commit('error/setCode', response.status, {root:true})
        }

    },
    async logout(context){
        context.commit('setApiStatus', null)
        const response = await axios.post('/api/logout')

        if(response.status === OK){
            context.commit('setUser', null)
            context.commit('setApiStatus', true)
            return false
        }
        context.commit('setApiStatus', false)
        context.commit('error/setCode', response.status, {root:true})
    },
    async deleteUser(context,data){
        context.commit('setApiStatus', null)
        const deleteUser = {
            id:data
        }
        const response = await axios.post('/api/deleteUser',deleteUser)

        if(response.status === OK){
            context.commit('setUser', null)
            context.commit('setApiStatus', true)
            return false
        }
        context.commit('setApiStatus', false)
        context.commit('error/setCode', response.status, {root:true})

    },
    async csrfRefresh(context){
        context.commit('setUser', null)
    },
    async currentUser(context, data){
            context.commit('setApiStatus', null)
            const response = await axios.post('/api/user', data).catch(err => err.response || error )
            const user = response.data || null

            if(response.status === OK){
                context.commit('setUser', user)
                context.commit('setApiStatus', true)
                return false
            }
            context.commit('setApiStatus', false)
            context.commit('error/setCode', response.status, {root:true})
    },
    async updateName(context, data){
        context.commit('setApiStatus',null)
        const updateName = {
            name: data.userName,
        } 
        const response = await axios.post('/api/updateName',updateName)
        if(response.status === OK){
            context.commit('setApiStatus', true)
            context.commit('setUser', response.data)
            return false
        }
        context.commit('setApiStatus', false)

        if(response.status === UNPROCESSABLE_ENTITY){
            context.commit('setUpdateErrorMessages', response.data.errors)
        }else{
            context.commit('error/setCode', response.status, {root:true})
        }
    },
    async updateEmail(context, data){
        context.commit('setApiStatus',null)
        const updateEmail = {
            email: data.userEmail
        } 

        const response = await axios.post('/api/updateEmail',updateEmail)
        if(response.status === OK){
            context.commit('setApiStatus', true)
            context.commit('setUser', response.data)
            return false
        }
        context.commit('setApiStatus', false)

        if(response.status === UNPROCESSABLE_ENTITY){
            context.commit('setUpdateErrorMessages', response.data.errors)
        }else{
            context.commit('error/setCode', response.status, {root:true})
        }
    },
    async updatePassword(context, data){
        context.commit('setApiStatus',null)
        const updatePassword = {
            currentPassword:data.currentPassword,
            password:data.password,
            password_confirmation:data.password_confirmation,
        } 

        const response = await axios.post('/api/updatePassword',updatePassword)
        if(response.status === OK){
            context.commit('setApiStatus', true)
            context.commit('setUser', response.data)
            return false
        }
        context.commit('setApiStatus', false)

        if(response.status === UNPROCESSABLE_ENTITY){
            context.commit('setUpdateErrorMessages', response.data.errors)
        }else{
            context.commit('error/setCode', response.status, {root:true})
        }
    },
    async forgetPassword(context, data){
        context.commit('setApiStatus',null)
        const forgetPassword = {
            name:data.name,
            email:data.email,
            password:data.password,
            password_confirmation:data.password_confirmation,
        } 

        const response = await axios.post('/api/forgetPassword',forgetPassword)
        if(response.status === OK){
            context.commit('setApiStatus', true)
            context.commit('setUser', response.data)
            return false
        }
        context.commit('setApiStatus', false)

        if(response.status === UNPROCESSABLE_ENTITY){
            context.commit('setUpdateErrorMessages', response.data.errors)
        }else{
            context.commit('error/setCode', response.status, {root:true})
        }
    },





}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
}