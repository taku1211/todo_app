import { createTransformContext } from "@vue/compiler-core"
import axios from "axios"
import {OK, CREATED, UNPROCESSABLE_ENTITY} from "../util"

const state = {
    todo: null,
    apiStatus: null,
    registerErrorMessages: null,
    list: null,
    category: null,
    allTodoCounts: 0,
    todayTodoCounts:0,
    scheduledTodoCounts:0,
    expiredTodoCounts:0,
    indexAllTodo:0,
    listType:'',
    orderRule:'',

}
const  getters = {
    allTodoCounts: state=> state.allTodoCounts ? state.allTodoCounts : 0,
    todayTodoCounts: state=>state.todayTodoCounts ? state.todayTodoCounts : 0,
    scheduledTodoCounts: state=>state.scheduledTodoCounts ? state.scheduledTodoCounts : 0,
    expiredTodoCounts: state=>state.expiredTodoCounts ? state.expiredTodoCounts : 0,
    indexAllTodo: state=>state.indexAllTodo ? state.indexAllTodo : null,
    list: state=>state.list ? state.list: null,
    category: state=>state.category ? state.category: null,
    listType: state=>state.listType ? state.listType: '',
    orderRule: state=>state.orderRule ? state.orderRule:'標準',

}
const mutations = {
    setApiStatus(state, status){
        state.apiStatus = status
    },
    setTodo(state, todo){
        state.todo = todo
    },
    setRegisterErrorMessages(state,messages){
        state.registerErrorMessages = messages
    },
    setList(state,listId){
        state.list = listId
    },
    setCategory(state,categoryId){
        state.category = categoryId
    },
    setAllTodoCounts(state,counts){
        state.allTodoCounts = counts
    },
    setTodayTodoCounts(state,counts){
        state.todayTodoCounts = counts
    },
    setScheduledTodoCounts(state,counts){
        state.scheduledTodoCounts = counts
    },
    setExpiredTodoCounts(state,counts){
        state.expiredTodoCounts = counts
    },
    setIndexAllTodo(state,data){
        state.indexAllTodo = data;
    },
    setListType(state, type){
        state.listType = type
    },
    setOrderRule(state,rule){
        state.orderRule = rule
    }
}
const actions = {
    selectList(context, data){
        context.commit('setList',data)
    },
    selectCategory(context, data){
        context.commit('setCategory', data)
    },
    selectOrderRule(context, rule){
        context.commit('setOrderRule', rule)
    },
    async count(context){
        context.commit('setApiStatus', null)
        const response = await axios.post('/api/countAllTodo')
        
            const dt = new Date();
            const y = dt.getFullYear();
            const m = ("00" + (dt.getMonth()+1)).slice(-2);
            const d = ("00" + dt.getDate()).slice(-2);
            const today = y + "-" + m +"-"+ d;
            
        if(response.status === OK){
            context.commit('setApiStatus', true)
            context.commit('setIndexAllTodo',response.data)         

            const allData = response.data.filter(function(object){
                if(object.delete_flg == false && object.complete_flg == false){
                    return true
                }
            })
            context.commit('setAllTodoCounts', allData.length)

            const todayData = response.data.filter(function(object){
                if(object.todo_date ==today && object.delete_flg == false && object.complete_flg == false){
                    return true
                }
            })
            context.commit('setTodayTodoCounts',todayData.length)
            
            const scheduledData = response.data.filter(function(object){
                if(object.todo_date !==null && object.delete_flg == false && object.complete_flg == false){
                    return true
                }
            })
            context.commit('setScheduledTodoCounts',scheduledData.length)
            
            const expiredTodoData = response.data.filter(function(object){
                if(object.todo_date < today && object.delete_flg == false && object.complete_flg == false){
                    return true
                }
            })
            context.commit('setExpiredTodoCounts',expiredTodoData.length)
            
            return false
        }
        context.commit('setApiStatus', false)

        if(response.status === UNPROCESSABLE_ENTITY){
            context.commit('setRegisterErrorMessages', response.data.errors)
            
        }else{
            context.commit('error/setCode', response.status, {root:true})
        }
    },
    async register(context, data){
        const newTodo = {
            name: data.name,
            userId: data.userId,
            listId: data.listId,
            categoryId: data.categoryId,
            detail: data.detail,
            todoDate: data.todoDate,
            todoTime: data.todoTime,
            cycle: data.cycle,
            place: data.place,
            priority: data.priority,
            fileName: data.fileName,
        }
        context.commit('setApiStatus', null)
        const response = await axios.post('/api/registerTodo', newTodo)

        if(response.status === OK){
            context.commit('setApiStatus', true)
            context.commit('setTodo', response.data)
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
        const updateTodo = {
            id: data.id,
            name: data.name,
            userId: data.user_id,
            listId: data.list_id,
            categoryId: data.category_id,
            detail: data.detail,
            todoDate: data.todo_date,
            todoTime: data.todo_time,
            cycle: data.cycle,
            place: data.place,
            priority: data.priority,
            fileName: data.filename,
            completeFlg: data.complete_flg,
            deleteFlg:data.delete_flg,
            fixedFlg:data.fixed_flg,
        }
        context.commit('setApiStatus', null)
        const response = await axios.post('/api/updateTodo', updateTodo)

        if(response.status === OK){
            context.commit('setApiStatus', true)
            context.commit('setTodo', response.data)
            return false
        }
        context.commit('setApiStatus', false)

        if(response.status === UNPROCESSABLE_ENTITY){
            context.commit('setRegisterErrorMessages', response.data.errors)
            
        }else{
            context.commit('error/setCode', response.status, {root:true})
        }
    },
    async edit(context, data){
        const editTodo = {
            id: data.id,
            name: data.name,
            userId: data.userId,
            listId: data.listId,
            categoryId: data.categoryId,
            detail: data.detail,
            todoDate: data.todoDate,
            todoTime: data.todoTime,
            cycle: data.cycle,
            place: data.place,
            priority: data.priority,
            fileName: data.filename,
            completeFlg: data.completeFlg,
            deleteFlg:data.deleteFlg,
            fixedFlg:data.fixedFlg,
        }
        context.commit('setApiStatus', null)
        const response = await axios.post('/api/updateTodo', editTodo)

        if(response.status === OK){
            context.commit('setApiStatus', true)
            context.commit('setTodo', response.data)
            return false
        }
        context.commit('setApiStatus', false)

        if(response.status === UNPROCESSABLE_ENTITY){
            context.commit('setRegisterErrorMessages', response.data.errors)
            
        }else{
            context.commit('error/setCode', response.status, {root:true})
        }
    },
    
    registerListType(context, data){
        context.commit('setListType', data)
    }
}


export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
}