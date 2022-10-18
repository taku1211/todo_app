import axios from "axios"
import {OK, CREATED, UNPROCESSABLE_ENTITY} from "../util"

const state = {
    list: null,
    apiStatus: null,
    registerErrorMessages: null,
    indexAllLists: null,
}
const getters = {
    indexAllLists:state=> state.indexAllLists ? state.indexAllLists: null
}

const mutations = {
    setApiStatus(state, status){
        state.apiStatus = status
    },
    setList(state, list){
        state.list = list
    },
    setRegisterErrorMessages(state, messages){
        state.registerErrorMessages = messages
    },
    setIndexAllLists(state, data){
        state.indexAllLists = data
    }
}

const actions = {
    async register(context, data){
        
        const newList = {
            name: data.name,
            userId: data.userId,
            color: data.color,
            fixedFlg: data.fixedFlg,
            deleteFlg: data.deleteFlg,
        }

        context.commit('setApiStatus', null)
        const response = await axios.post('/api/registerList', newList)

        if(response.status === OK){
            context.commit('setApiStatus', true)
            context.commit('setList', response.data)
            return false
        }
        context.commit('setApiStatus', false)

        if(response.status === UNPROCESSABLE_ENTITY){
            context.commit('setRegisterErrorMessages', response.data.errors)
            
        }else{
            context.commit('error/setCode', response.status, {root:true})
        }
    },
    async update(context, data){
        const updateList = {
            id:data.id,
            name: data.name,
            userId: data.userId,
            color: data.color,
            fixedFlg: data.fixedFlg,
            deleteFlg: data.deleteFlg,
          }
        context.commit('setApiStatus', null)
        const response = await axios.post('/api/updateList', updateList)

        if(response.status === OK){
            context.commit('setApiStatus', true)
            context.commit('setList', response.data)
            return false
        }
        context.commit('setApiStatus', false)

        if(response.status === UNPROCESSABLE_ENTITY){
            context.commit('setRegisterErrorMessages', response.data.errors)
            
        }else{
            context.commit('error/setCode', response.status, {root:true})
        }
    },
    async deleteList(context,data){
        const deleteList = {
            id:data,
            deleteFlg:true,
        }
        context.commit('setApiStatus',null)
        const response = await axios.post('/api/deleteList',deleteList)

        if(response.status === OK){
            context.commit('setApiStatus', true)
            context.commit('setList', response.data)
            return false
        }
        context.commit('setApiStatus', false)

        if(response.status === UNPROCESSABLE_ENTITY){
            context.commit('setRegisterErrorMessages', response.data.errors)
            
        }else{
            context.commit('error/setCode', response.status, {root:true})
        }
    },
    async getAllLists(context){
        context.commit('setApiStatus', null)
        const response = await axios.get('/api/lists')
        
        if(response.status === OK){
            context.commit('setApiStatus', true)

            for(let i = 0; i<response.data.length; i++ ){
               
               if(response.data[i]["color"] === 1){
                  response.data[i]["color"] = "circle-area-red"
               }else if(response.data[i]["color"] === 2){
                  response.data[i]["color"] = "circle-area-pink"
               }else if(response.data[i]["color"] === 3){
                  response.data[i]["color"] = "circle-area-orange"
               }else if(response.data[i]["color"] === 4){
                  response.data[i]["color"] = "circle-area-yellow"
               }else if(response.data[i]["color"] === 5){
                  response.data[i]["color"] = "circle-area-green"
               }else if(response.data[i]["color"] === 6){
                  response.data[i]["color"] = "circle-area-sky"
               }else if(response.data[i]["color"] === 7){
                  response.data[i]["color"] = "circle-area-blue"
               }else if(response.data[i]["color"] === 8){
                  response.data[i]["color"] = "circle-area-purple"
               }else if(response.data[i]["color"] === 9){
                  response.data[i]["color"] = "circle-area-brown"
               }else if(response.data[i]["color"] === 10){
                  response.data[i]["color"] = "circle-area-gray"
               }else if(response.data[i]["color"] === 11){
                  response.data[i]["color"] = "circle-area-black"
               }else if(response.data[i]["color"] === 12){
                  response.data[i]["color"] = "circle-area-peach"
               }else{
                  response.data[i]["color"] = "circle-area-blue"
               }
              }
    
            context.commit('setIndexAllLists', response.data)
            return false
        }
        context.commit('setApiStatus', false)

        if(response.status === UNPROCESSABLE_ENTITY){
            context.commit('setRegisterErrorMessages', response.data.errors)
            
        }else{
            context.commit('error/setCode', response.status, {root:true})
        }
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
}