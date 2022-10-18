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
        
        //今日の日付を取得
        const dt = new Date();
        const day = dt.getDay()
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
        if(data.fileName !== ""){
            const formData = new FormData()
            formData.append('fileName',data.fileName)
            formData.append('name',data.name)
            formData.append('userId',data.userId)

            if(data.listId !== null) {
                formData.append('listId',data.listId)
            }else{
                formData.append('listId', '')
            }
            if(data.categoryId !== null){
                formData.append('categoryId',data.categoryId)
            }else{
                formData.append('categoryId','')
            }
            
            formData.append('detail',data.detail)
            formData.append('todoDate',data.todoDate)
            formData.append('todoTime',data.todoTime)
            formData.append('cycle',data.cycle)
            formData.append('place',data.place)
            formData.append('priority',data.priority)

            context.commit('setApiStatus', null)
            let config = {headers:{
                'Content-Type' : 'multipart/form-data'
            }}
            const response = await axios.post('/api/registerTodoWithImg', formData, config )
            if(response.status === OK || response.status === 201){
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

        }else{
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

        
            if(response.status === OK || response.status === 201){
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
            fileName: data.fileName,
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
        if(typeof(data.fileName) === 'object' && data.fileName !== null){
            const formData = new FormData()
            formData.append('fileName',data.fileName)
            formData.append('name',data.name)
            formData.append('userId',data.userId)

            if(data.listId !== null) {
                formData.append('listId',data.listId)
            }else{
                formData.append('listId', '')
            }
            if(data.categoryId !== null){
                formData.append('categoryId',data.categoryId)
            }else{
                formData.append('categoryId','')
            }
            
            formData.append('detail',data.detail)
            formData.append('todoDate',data.todoDate)
            formData.append('todoTime',data.todoTime)
            formData.append('cycle',data.cycle)
            formData.append('place',data.place)
            formData.append('priority',data.priority)
            formData.append('deleteFlg',data.deleteFlg)
            formData.append('completeFlg',data.completeFlg)
            formData.append('fixedFlg',data.fixedFlg)
            formData.append('databaseImg',data.databaseImg)
            formData.append('id',data.id)

            context.commit('setApiStatus', null)
            let config = {headers:{
                'Content-Type' : 'multipart/form-data'
            }}
            const response = await axios.post('/api/updateTodoWithImg', formData, config )
            if(response.status === OK || response.status === 201){
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
        }else if(typeof(data.fileName) === 'string' || data.fileName === null){
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
                fileName: data.fileName,
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