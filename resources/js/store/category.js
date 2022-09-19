import axios from "axios"
import {OK, CREATED, UNPROCESSABLE_ENTITY} from "../util"

const state = {
    category: null,
    apiStatus : null,
    registerErrorMessages: null,
    listId: null,
    indexAllCategorys:null,
}
const getters = {
    listId: state => state.listId ? state.listId : '',
    indexAllCategorys: state => state.indexAllCategorys ? state.indexAllCategorys : '',
}
const mutations = {
    setApiStatus(state, status){
        state.apiStatus = status
    },
    setCategory(state, category){
        state.category = category
    },
    setRegisterErrorMessages(state, messages){
        state.registerErrorMessages = messages
    },
    setList(state, list){
        console.log('setList')
        console.log(list)
        state.listId = list
        console.log(state.listId) 
    },
    setIndexAllCategorys(state,categorys){
        state.indexAllCategorys = categorys
    }
}
const actions = {
   async register(context, data){
        console.log(data)
        const newCategory = {
            name: data.name,
            userId: data.userId,
            listId: data.listId, 
            color: data.color,
            fixedFlg: data.fixedFlg,
            deleteFlg: data.deleteFlg,
        }
        console.log(newCategory)
        context.commit('setApiStatus', null)
        const response = await axios.post('/api/registerCategory', newCategory)

        if(response.status === OK){
            context.commit('setApiStatus', true)
            context.commit('setCategory', response.data)
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
        console.log(data)
        const updateCategory = {
            id:data.id,
            name: data.name,
            color: data.color,
            fixedFlg: data.fixedFlg,
            deleteFlg: data.deleteFlg,
        }
        context.commit('setApiStatus', null)
        const response = await axios.post('/api/updateCategory', updateCategory)

        if(response.status === OK){
            context.commit('setApiStatus', true)
            context.commit('setCategory', response.data)
            return false
        }
        context.commit('setApiStatus', false)

        if(response.status === UNPROCESSABLE_ENTITY){
            context.commit('setRegisterErrorMessages', response.data.errors)
            
        }else{
            context.commit('error/setCode', response.status, {root:true})
        }
    },
    async delete(context,data){
        context.commit('setApiStatus',null)
        const deleteCategory = {
            id:data,
            deleteFlg: true,
        }
        const response = await axios.post('/api/deleteCategory',deleteCategory)

        if(response.status === OK){
            context.commit('setApiStatus', true)
            context.commit('setCategory', response.data)
            return false
        }
        context.commit('setApiStatus', false)

        if(response.status === UNPROCESSABLE_ENTITY){
            context.commit('setRegisterErrorMessages', response.data.errors)
            
        }else{
            context.commit('error/setCode', response.status, {root:true})
        }

        
    },
   async selectList(context,data){
        console.log(data)
        await context.commit('setList',data)
        
   },
   async getAllCategorys(context){
    context.commit('setApiStatus',null)
    const response = await axios.post('/api/allCategorys')

    console.log('response')
    console.log(response.data)

    if(response.status === OK){
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
        context.commit('setIndexAllCategorys',response.data)
        return false
    }        
    context.commit('setApiStatus', false)

    if(response.status === UNPROCESSABLE_ENTITY){
        context.commit('setRegisterErrorMessages', response.data.errors)
        
    }else{
        context.commit('error/setCode', response.status, {root:true})
    }

   },

}

export default {
    namespaced : true,
    state,
    getters,
    mutations,
    actions,
}