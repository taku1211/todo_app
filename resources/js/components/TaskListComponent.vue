
<template>
<div class="body-container">
  <transition name="fade">
    <OverLayComponent v-if="showToolMenu" @close="toggleTool"></OverLayComponent>
  </transition>
  <transition name="slide-bottom">
    <ModalCreateListComponent v-if="showModalCreateList" @connectData="receiveEditListData" @closeList="closeTool" :editListId="editListId" 
    :editListName="editListName" :editListFlg="true" :editListColor="editListColor"></ModalCreateListComponent>
    <ModalCreateListComponent v-if="showModalList" @closeList="closeTool"></ModalCreateListComponent>
  </transition>

  <transition name="slide-bottom">
    <ModalTodoComponent v-if="showUpdateTodo" @close="close" :updateTodoFlg="updateTodoFlg" :editTodoData="editTodoData"
     :updateListName="selectedListName" :updateCategoryName="selectedCategoryName"></ModalTodoComponent>
  </transition>

  <transition name="slide-right">
    <ModalTodoCategoryComponent v-if="showUpdateCategory" :updateCategoryFlg="showUpdateCategory" @close="closeUpdateCategory"
    :editCategoryId="editCategoryId" :editCategoryName="editCategoryName" :editCategoryColor="editCategoryColor"></ModalTodoCategoryComponent>
  </transition>
  <transition name="slide-right">
    <ModalTodoCategoryComponent v-if="showCreateCategory" :createCategoryFlg="showCreateCategory" @close="closeCreateCategory"
    :createListId="listId" :createListName="listName"></ModalTodoCategoryComponent>
  </transition>


  
    <main class="flex-container">
       <section class="main-container main-container-list"><!-- flexの左側-->
          <div class="task-nav-container"><!-- flexの左側メニュー部分-->
            <div class="nav-left">
              <router-link to="/home">
                  <span class="text-nav text-hover">ホームへ</span>
              </router-link>
            </div>
            <div class="nav-center nav-list" v-if="listId !== null">
              <p class="text-nav">{{editListName}}</p>
            </div>
            <div  class="nav-center nav-day" v-else-if="listId == null">
              <p class="text-nav" v-if="listType == 'list' || url === '/list'">全てのTODO</p>
              <p class="text-nav" v-else-if="listType == 'today' || url === '/list/today'">今日のTODO</p>
              <p class="text-nav" v-else-if="listType == 'scheduled' || url === '/list/scheduled'">期限ありのTODO</p>
              <p class="text-nav" v-else-if="listType == 'expired' || url === '/list/expired'">期限切れのTODO</p>

            </div>
            <div class="nav-right">
              <i class="fa-solid fa-comment-dots icon icon-tasknav icon-select" @click="toggleTool"></i>
            </div>
          </div>

        <transition name="fade" mode="out-in">
          <div class="tool-container" v-if="showToolMenu">
              <div class="list-item list-item-no-padding"  @click="showModalCreateList=true" v-if="listId !== null">
                <div class="list-item-left list-item-left-left-margin">
                  リスト情報を表示・編集
                </div>
                <div class="list-item-right">
                  <i class="fa-solid fa-pencil icon"></i>
                </div>
            </div>
            <div class="list-item list-item-no-padding"  @click="showModalList=true" v-if="listId == null">
                <div class="list-item-left list-item-left-left-margin">
                  リストを追加する
                </div>
                <div class="list-item-right">
                  <i class="fa-solid fa-pencil icon"></i>
                </div>
            </div>
            <div class="list-item list-item-no-padding" v-if="listId !== null" @click="showModalCreateCategory">
                <div class="list-item-left list-item-left-left-margin">
                  新規カテゴリーを追加する
                </div>
                <div class="list-item-right">
                  <i class="fa-solid fa-highlighter icon"></i>
                </div>
            </div>
            <div class="list-item list-item-no-padding" @click="toggleTodoOrder">
              <div class="list-item-left list-item-left-left-margin">
                表示順序   ---- {{selectOrderRule}}
                </div>
              <div class="list-item-right"><i class="fa-solid fa-arrows-up-down icon"></i></div>
            </div>
            <div class="list-item list-item-no-padding" v-if="showTodoOrder == true" @click="changeOrderRule(standard)">
              <div class="list-item-left list-item-left-left-margin">・標準</div>
              <div class="list-item-right"><i class="fa-solid fa-highlighter icon icon-hidden"></i></div>
            </div>
            <div class="list-item list-item-no-padding" v-if="showTodoOrder == true" @click="changeOrderRule(limitUp)">
              <div class="list-item-left list-item-left-left-margin">・期限が古い順</div>
              <div class="list-item-right"><i class="fa-solid fa-highlighter icon icon-hidden"></i></div>
            </div>
            <div class="list-item list-item-no-padding" v-if="showTodoOrder == true" @click="changeOrderRule(limitDown)">
              <div class="list-item-left list-item-left-left-margin">・期限が新しい順</div>
              <div class="list-item-right"><i class="fa-solid fa-highlighter icon icon-hidden"></i></div>
            </div>
            <div class="list-item list-item-no-padding" v-if="showTodoOrder == true" @click="changeOrderRule(createUp)">
              <div class="list-item-left list-item-left-left-margin">・作成日が古い順</div>
              <div class="list-item-right"><i class="fa-solid fa-highlighter icon icon-hidden"></i></div>
            </div>
            <div class="list-item list-item-no-padding" v-if="showTodoOrder == true" @click="changeOrderRule(createDown)">
              <div class="list-item-left list-item-left-left-margin">・作成日が新しい順</div>
              <div class="list-item-right"><i class="fa-solid fa-highlighter icon icon-hidden"></i></div>
            </div>
            <div class="list-item list-item-no-padding" v-if="showTodoOrder == true" @click="changeOrderRule(nameUp)">
              <div class="list-item-left list-item-left-left-margin">・TODO名昇順</div>
              <div class="list-item-right"><i class="fa-solid fa-highlighter icon icon-hidden"></i></div>
            </div>
            <div class="list-item list-item-no-padding" v-if="showTodoOrder == true" @click="changeOrderRule(nameDown)">
              <div class="list-item-left list-item-left-left-margin">・TODO名降順</div>
              <div class="list-item-right"><i class="fa-solid fa-highlighter icon icon-hidden"></i></div>
            </div>
            <div class="list-item list-item-no-padding" v-if="showTodoOrder == true" @click="changeOrderRule(priorityUp)">
              <div class="list-item-left list-item-left-left-margin">・優先度が高い順</div>
              <div class="list-item-right"><i class="fa-solid fa-highlighter icon icon-hidden"></i></div>
            </div>
            <div class="list-item list-item-no-padding" v-if="showTodoOrder == true" @click="changeOrderRule(priorityDown)">
              <div class="list-item-left list-item-left-left-margin">・優先度が低い順</div>
              <div class="list-item-right"><i class="fa-solid fa-highlighter icon icon-hidden"></i></div>
            </div>
            <div class="list-item list-item-no-padding" @click="toggleTodoDoneShow" v-if="!showTodoDone">
              <div class="list-item-left list-item-left-left-margin">実行済みを表示</div>
              <div class="list-item-right"><i class="fa-solid fa-eye icon"></i></div>
            </div>
            <div class="list-item list-item-no-padding" @click="toggleTodoDoneShow" v-if="showTodoDone">
              <div class="list-item-left list-item-left-left-margin">実行済みを非表示</div>
              <div class="list-item-right"><i class="fa-solid fa-eye-slash icon"></i></div>
            </div>

            <div class="list-item list-item-no-padding list-item-red" v-if="listId !== null" @click="deleteList">
              <div class="list-item-left list-item-left-left-margin ">リストを削除する</div>
              <div class="list-item-right"><i class="fa-solid fa-trash-can icon"></i></div>
            </div>  
          </div>
        </transition>
          
         <div class="search-box-container">
           <i class="fa fa-search icon icon-search" aria-hidden="true"></i>
           <input type="text" class="searchbox" v-model="searchText" @keydown="search(searchText)" placeholder="絞り込みたいキーワードを入力" >
         </div>
<!--すべてのTODOリストの一覧表示-->
         <div class="item-container"  v-if="listTypeSelect === 'list' || url === '/list'">
           <div class="task-category">
            <div class="category-title-area">
              <div class="category-title-area category-title-area-left">
                <div class="circle-area circle-area-list circle-area-blue circle-area-s">
                    <i class="fa-solid fa-list-check icon icon-white icon-s"></i>
                </div>
                <h3 class="title title-category title-category-s-margin">リスト登録なし</h3>
              </div>
            </div>
                <div v-for="todo in indexAllTodo" :key="todo.id" >
                    <div class="list-item list-item-task" v-if="todo.list_id === null"   :ref="todo.id"  
                    @touchstart="touchStart($event,todo.id)" 
                    @touchmove="touchMove($event,todo.id)"
                    @touchend="touchEnd(todo.id)">
                    
                        <div class="list-item-task-swipe list-item-task-swipe-green" :ref="'fixed'+todo.id "  @touchstart.stop="fixedTodo($event,todo)" 
                            :style="todo.id === swipeData.moveId?{transform:`translate(${swipeData.moveX},0)`}:{transform:`translate(0,0)`}">
                              <i class="fa-solid fa-thumbtack icon icon-white"></i>
                        </div>
                            <div class="list-item-task-in " :ref="'todo'+todo.id" 
                              :style="todo.id === swipeData.moveId?{transform:`translate(${swipeData.moveTodo},0)`}:{transform:`translate(0,0)`}">
                              <i class="fa-regular fa-circle icon icon-item icon-sm" @touchstart.stop="completedTodo(todo)" v-if="todo.complete_flg == false"></i>
                              <i class="fa-solid fa-check icon icon-item icon-item-green icon-sm" @touchstart.stop="completedTodo(todo)" v-else-if="todo.complete_flg == true"></i>
                              <i class="fa-regular fa-circle icon icon-item icon-pc" @click.stop="completedTodo(todo)" v-if="todo.complete_flg == false"></i>
                              <i class="fa-solid fa-check icon icon-item icon-item-green icon-pc" @click.stop="completedTodo(todo)" v-else-if="todo.complete_flg == true"></i>
                              <p class="text text-no-leftmargin">
                                <span v-if="todo.fixed_flg == true"><i class="fa-solid fa-thumbtack icon icon-incline"></i></span>
                                {{todo.name}}
                                <span class="text text-xs">{{todo.todo_date}}</span>
                              </p>
                              <i class="fa-solid fa-thumbtack icon icon-blue icon-pc" :ref="'fixed'+todo.id "  @click.stop="fixedTodoPC(todo)"></i>
                              <i class="fa-solid fa-pencil icon icon-pc" :ref="'detail'+todo.id" @click.stop="updateTodoPC(todo)"></i>
                              <i class="fa-solid fa-trash-can icon icon-red icon-pc" :ref="'delete'+todo.id" @click.stop="deleteTodoPC(todo)"></i>

                            </div>
                            <div>
                              
                            </div>
                            <div class="list-item-task-swipe list-item-task-swipe-gray" :ref="'detail'+todo.id" 
                          :style="todo.id === swipeData.moveId?{transform:`translate(${swipeData.moveX},0)`}:{transform:`translate(0,0)`}"
                          @touchstart.stop="updateTodo($event,todo)">
                            詳細
                          </div>
                          <div class="list-item-task-swipe list-item-task-swipe-red" :ref="'delete'+todo.id"
                            :style="todo.id === swipeData.moveId?{transform:`translate(${swipeData.moveX},0)`}:{transform:`translate(0,0)`}"
                            @touchstart.stop="deleteTodo($event,todo)">
                            削除
                          </div>
                    </div>
                </div>
           </div>
           <div class="task-category" v-for="(list, idx) in indexAllLists" :key="idx">
            <div class="category-title-area"  v-if="listcounter(list.id)">
              <div class="category-title-area category-title-area-left"  >
                <div class="circle-area circle-area-list circle-area-s" :class="list.color">
                    <i class="fa-solid fa-list-check icon icon-white icon-s"></i>
                </div>
                <h3 class="title title-category title-category-s-margin">{{list.name}}</h3>
                <i class="fa-solid fa-pencil icon icon-s icon-select" @click="openEditList(list)"></i>
              </div>
              <div>
                    <i class="fa-solid fa-plus icon icon-s icon-select" @click="showModalTodorelateList(list)"></i>
              </div>
            </div>
                <div v-for="(todo, idx) in indexAllTodo" :key="idx">
                    <div class="list-item list-item-task" v-if="todo.list_id === list.id" :ref="todo.id"
                          @touchstart="touchStart($event,todo.id)" 
                          @touchmove="touchMove($event,todo.id)"
                          @touchend="touchEnd(todo.id)">
                      <div class="list-item-task-swipe list-item-task-swipe-green" :ref="'fixed'+todo.id "  @touchstart.stop="fixedTodo($event,todo)" 
                            :style="todo.id === swipeData.moveId?{transform:`translate(${swipeData.moveX},0)`}:{transform:`translate(0,0)`}">
                      <i class="fa-solid fa-thumbtack icon icon-white"></i>
                    </div>
                      <div class="list-item-task-in " :ref="'todo'+todo.id" 
                       :style="todo.id === swipeData.moveId?{transform:`translate(${swipeData.moveTodo},0)`}:{transform:`translate(0,0)`}">
                      <i class="fa-regular fa-circle icon icon-item" @touchstart.stop="completedTodo(todo)" v-if="todo.complete_flg == false"></i>
                      <i class="fa-solid fa-check icon icon-item icon-item-green" @touchstart.stop="completedTodo(todo)" v-else-if="todo.complete_flg == true"></i>
                      <p class="text text-no-leftmargin">
                        <span v-if="todo.fixed_flg == true"><i class="fa-solid fa-thumbtack icon icon-incline"></i></span>
                        {{todo.name}}
                        <span class="text text-xs">{{todo.todo_date}}</span>
                      </p>
                      <i class="fa-solid fa-thumbtack icon icon-blue icon-pc" :ref="'fixed'+todo.id "  @click.stop="fixedTodoPC(todo)"></i>
                      <i class="fa-solid fa-pencil icon icon-pc" :ref="'detail'+todo.id" @click.stop="updateTodoPC(todo)"></i>
                      <i class="fa-solid fa-trash-can icon icon-red icon-pc" :ref="'delete'+todo.id" @click.stop="deleteTodoPC(todo)"></i>

                      </div>
                      <div class="list-item-task-swipe list-item-task-swipe-gray" :ref="'detail'+todo.id" 
                       :style="todo.id === swipeData.moveId?{transform:`translate(${swipeData.moveX},0)`}:{transform:`translate(0,0)`}"
                       @touchstart.stop="updateTodo($event,todo)">
                        詳細
                      </div>
                      <div class="list-item-task-swipe list-item-task-swipe-red" :ref="'delete'+todo.id"
                        :style="todo.id === swipeData.moveId?{transform:`translate(${swipeData.moveX},0)`}:{transform:`translate(0,0)`}"
                        @touchstart.stop="deleteTodo($event,todo)">
                        削除
                      </div>
                    </div>
                </div>
           </div>
         </div>
<!--今日のTODOリストの一覧表示-->
         <div class="item-container" v-if="listTypeSelect === 'today' || url === '/list/today'">
           <div class="task-category">
            <div class="category-title-area">
              <div class="category-title-area category-title-area-left">
                <div class="circle-area circle-area-list circle-area-blue circle-area-s">
                    <i class="fa-solid fa-list-check icon icon-white icon-s"></i>
                </div>
                <h3 class="title title-category title-category-s-margin">リスト登録なし</h3>
              </div>
              <div>
                <i class="fa-solid fa-plus icon icon-s icon-select" @click="showModalTodo(noneCategory)"></i>
              </div>
            </div>
                <div v-for="(todo, idx) in indexAllTodo" :key="idx">
                    <div class="list-item list-item-task" v-if="todo.list_id === null && todo.todo_date === toDay" :ref="todo.id"
                        @touchstart="touchStart($event,todo.id)" 
                        @touchmove="touchMove($event,todo.id)"
                        @touchend="touchEnd(todo.id)">

                        <div class="list-item-task-swipe list-item-task-swipe-green" :ref="'fixed'+todo.id "  @touchstart.stop="fixedTodo($event,todo)" 
                        :style="todo.id === swipeData.moveId?{transform:`translate(${swipeData.moveX},0)`}:{transform:`translate(0,0)`}">
                          <i class="fa-solid fa-thumbtack icon icon-white"></i>
                        </div>
                        <div class="list-item-task-in " :ref="'todo'+todo.id" 
                          :style="todo.id === swipeData.moveId?{transform:`translate(${swipeData.moveTodo},0)`}:{transform:`translate(0,0)`}">
                          <i class="fa-regular fa-circle icon icon-item" @touchstart.stop="completedTodo(todo)" v-if="todo.complete_flg == false"></i>
                          <i class="fa-solid fa-check icon icon-item icon-item-green" @touchstart.stop="completedTodo(todo)" v-else-if="todo.complete_flg == true"></i>
                          <p class="text text-no-leftmargin">
                            <span v-if="todo.fixed_flg == true"><i class="fa-solid fa-thumbtack icon icon-incline"></i></span>
                            {{todo.name}}
                            <span class="text text-xs">{{todo.todo_date}}</span>
                          </p>
                          <i class="fa-solid fa-thumbtack icon icon-blue icon-pc" :ref="'fixed'+todo.id "  @click.stop="fixedTodoPC(todo)"></i>
                          <i class="fa-solid fa-pencil icon icon-pc" :ref="'detail'+todo.id" @click.stop="updateTodoPC(todo)"></i>
                          <i class="fa-solid fa-trash-can icon icon-red icon-pc" :ref="'delete'+todo.id" @click.stop="deleteTodoPC(todo)"></i>

                        </div>
                        <div class="list-item-task-swipe list-item-task-swipe-gray" :ref="'detail'+todo.id" 
                       :style="todo.id === swipeData.moveId?{transform:`translate(${swipeData.moveX},0)`}:{transform:`translate(0,0)`}"
                       @touchstart.stop="updateTodo($event,todo)">
                        詳細
                      </div>
                      <div class="list-item-task-swipe list-item-task-swipe-red" :ref="'delete'+todo.id"
                        :style="todo.id === swipeData.moveId?{transform:`translate(${swipeData.moveX},0)`}:{transform:`translate(0,0)`}"
                        @touchstart.stop="deleteTodo($event,todo)">
                        削除
                      </div>

                    </div>
                </div>
           </div>

           <div class="task-category" v-for="(list, idx) in indexAllLists" :key="idx">
            <div class="category-title-area"  v-if="listcounter(list.id)">
              <div class="category-title-area category-title-area-left"  >
                <div class="circle-area circle-area-list circle-area-s" :class="list.color">
                    <i class="fa-solid fa-list-check icon icon-white icon-s"></i>
                </div>
                <h3 class="title title-category title-category-s-margin">{{list.name}}</h3>
                <i class="fa-solid fa-pencil icon icon-s icon-select" @click="openEditList(list)"></i>
              </div>
              <div>
                    <i class="fa-solid fa-plus icon icon-s icon-select" @click="showModalTodorelateList(list)"></i>
              </div>
            </div>
                <div v-for="(todo, idx) in indexAllTodo" :key="idx">
                    <div class="list-item list-item-task" v-if="todo.list_id === list.id && todo.todo_date === toDay" :ref="todo.id"
                          @touchstart="touchStart($event,todo.id)" 
                          @touchmove="touchMove($event,todo.id)"
                          @touchend="touchEnd(todo.id)">
                      <div class="list-item-task-swipe list-item-task-swipe-green" :ref="'fixed'+todo.id "  @touchstart.stop="fixedTodo($event,todo)" 
                            :style="todo.id === swipeData.moveId?{transform:`translate(${swipeData.moveX},0)`}:{transform:`translate(0,0)`}">
                      <i class="fa-solid fa-thumbtack icon icon-white"></i>
                    </div>
                      <div class="list-item-task-in " :ref="'todo'+todo.id" 
                       :style="todo.id === swipeData.moveId?{transform:`translate(${swipeData.moveTodo},0)`}:{transform:`translate(0,0)`}">
                      <i class="fa-regular fa-circle icon icon-item" @touchstart.stop="completedTodo(todo)" v-if="todo.complete_flg == false"></i>
                      <i class="fa-solid fa-check icon icon-item icon-item-green" @touchstart.stop="completedTodo(todo)" v-else-if="todo.complete_flg == true"></i>
                      <p class="text text-no-leftmargin">
                        <span v-if="todo.fixed_flg == true"><i class="fa-solid fa-thumbtack icon icon-incline"></i></span>
                        {{todo.name}}
                        <span class="text text-xs">{{todo.todo_date}}</span>
                      </p>
                      <i class="fa-solid fa-thumbtack icon icon-blue icon-pc" :ref="'fixed'+todo.id "  @click.stop="fixedTodoPC(todo)"></i>
                      <i class="fa-solid fa-pencil icon icon-pc" :ref="'detail'+todo.id" @click.stop="updateTodoPC(todo)"></i>
                      <i class="fa-solid fa-trash-can icon icon-red icon-pc" :ref="'delete'+todo.id" @click.stop="deleteTodoPC(todo)"></i>

                      </div>
                      <div class="list-item-task-swipe list-item-task-swipe-gray" :ref="'detail'+todo.id" 
                       :style="todo.id === swipeData.moveId?{transform:`translate(${swipeData.moveX},0)`}:{transform:`translate(0,0)`}"
                       @touchstart.stop="updateTodo($event,todo)">
                        詳細
                      </div>
                      <div class="list-item-task-swipe list-item-task-swipe-red" :ref="'delete'+todo.id"
                        :style="todo.id === swipeData.moveId?{transform:`translate(${swipeData.moveX},0)`}:{transform:`translate(0,0)`}"
                        @touchstart.stop="deleteTodo($event,todo)">
                        削除
                      </div>


                    </div>
                </div>
           </div>
         </div>
<!--期限ありリストの一覧表示-->
         <div class="item-container" v-if="listTypeSelect === 'scheduled' || url === '/list/scheduled'">
           <div class="task-category">
            <div class="category-title-area">
              <div class="category-title-area category-title-area-left">
                <div class="circle-area circle-area-list circle-area-blue circle-area-s">
                    <i class="fa-solid fa-list-check icon icon-white icon-s"></i>
                </div>
                <h3 class="title title-category title-category-s-margin">リスト登録なし</h3>
              </div>
              <div>
                <i class="fa-solid fa-plus icon icon-s icon-select" @click="showModalTodo(noneCategory)"></i>
              </div>
            </div>
                <div v-for="(todo, idx) in indexAllTodo" :key="idx">
                    
                    <div class="list-item list-item-task" v-if="todo.list_id === null && todo.todo_date !== null"  :ref="todo.id"
                        @touchstart="touchStart($event,todo.id)" 
                        @touchmove="touchMove($event,todo.id)"
                        @touchend="touchEnd(todo.id)">
                        <div class="list-item-task-swipe list-item-task-swipe-green" :ref="'fixed'+todo.id "  @touchstart.stop="fixedTodo($event,todo)" 
                        :style="todo.id === swipeData.moveId?{transform:`translate(${swipeData.moveX},0)`}:{transform:`translate(0,0)`}">
                          <i class="fa-solid fa-thumbtack icon icon-white"></i>
                        </div>
                        <div class="list-item-task-in " :ref="'todo'+todo.id" 
                          :style="todo.id === swipeData.moveId?{transform:`translate(${swipeData.moveTodo},0)`}:{transform:`translate(0,0)`}">
                          <i class="fa-regular fa-circle icon icon-item" @touchstart.stop="completedTodo(todo)" v-if="todo.complete_flg == false"></i>
                          <i class="fa-solid fa-check icon icon-item icon-item-green" @touchstart.stop="completedTodo(todo)" v-else-if="todo.complete_flg == true"></i>
                          <p class="text text-no-leftmargin">
                            <span v-if="todo.fixed_flg == true"><i class="fa-solid fa-thumbtack icon icon-incline"></i></span>
                            {{todo.name}}
                            <span class="text text-xs">{{todo.todo_date}}</span>
                          </p>
                          <i class="fa-solid fa-thumbtack icon icon-blue icon-pc" :ref="'fixed'+todo.id "  @click.stop="fixedTodoPC(todo)"></i>
                          <i class="fa-solid fa-pencil icon icon-pc" :ref="'detail'+todo.id" @click.stop="updateTodoPC(todo)"></i>
                          <i class="fa-solid fa-trash-can icon icon-red icon-pc" :ref="'delete'+todo.id" @click.stop="deleteTodoPC(todo)"></i>

                        </div>
                        <div class="list-item-task-swipe list-item-task-swipe-gray" :ref="'detail'+todo.id" 
                       :style="todo.id === swipeData.moveId?{transform:`translate(${swipeData.moveX},0)`}:{transform:`translate(0,0)`}"
                       @touchstart.stop="updateTodo($event,todo)">
                        詳細
                      </div>
                      <div class="list-item-task-swipe list-item-task-swipe-red" :ref="'delete'+todo.id"
                        :style="todo.id === swipeData.moveId?{transform:`translate(${swipeData.moveX},0)`}:{transform:`translate(0,0)`}"
                        @touchstart.stop="deleteTodo($event,todo)">
                        削除
                      </div>

                      </div>
                </div>
           </div>

           <div class="task-category" v-for="(list, idx) in indexAllLists" :key="idx">
            <div class="category-title-area"  v-if="listcounter(list.id)">
              <div class="category-title-area category-title-area-left"  >
                <div class="circle-area circle-area-list circle-area-s" :class="list.color">
                    <i class="fa-solid fa-list-check icon icon-white icon-s"></i>
                </div>
                <h3 class="title title-category title-category-s-margin">{{list.name}}</h3>
                <i class="fa-solid fa-pencil icon icon-s icon-select" @click="openEditList(list)"></i>
              </div>
              <div>
                    <i class="fa-solid fa-plus icon icon-s icon-select" @click="showModalTodorelateList(list)"></i>
              </div>
            </div>
                <div v-for="(todo, idx) in indexAllTodo" :key="idx">
                    <div class="list-item list-item-task" v-if="todo.list_id === list.id && todo.todo_date !== null" :ref="todo.id"
                        @touchstart="touchStart($event,todo.id)" 
                        @touchmove="touchMove($event,todo.id)"
                        @touchend="touchEnd(todo.id)">
                      <div class="list-item-task-swipe list-item-task-swipe-green" :ref="'fixed'+todo.id "  @touchstart.stop="fixedTodo($event,todo)" 
                            :style="todo.id === swipeData.moveId?{transform:`translate(${swipeData.moveX},0)`}:{transform:`translate(0,0)`}">
                      <i class="fa-solid fa-thumbtack icon icon-white"></i>
                    </div>
                      <div class="list-item-task-in " :ref="'todo'+todo.id" 
                       :style="todo.id === swipeData.moveId?{transform:`translate(${swipeData.moveTodo},0)`}:{transform:`translate(0,0)`}">
                      <i class="fa-regular fa-circle icon icon-item" @touchstart.stop="completedTodo(todo)" v-if="todo.complete_flg == false"></i>
                      <i class="fa-solid fa-check icon icon-item icon-item-green" @touchstart.stop="completedTodo(todo)" v-else-if="todo.complete_flg == true"></i>
                      <p class="text text-no-leftmargin">
                        <span v-if="todo.fixed_flg == true"><i class="fa-solid fa-thumbtack icon icon-incline"></i></span>
                        {{todo.name}}
                        <span class="text text-xs">{{todo.todo_date}}</span>
                      </p>
                      <i class="fa-solid fa-thumbtack icon icon-blue icon-pc" :ref="'fixed'+todo.id "  @click.stop="fixedTodoPC(todo)"></i>
                      <i class="fa-solid fa-pencil icon icon-pc" :ref="'detail'+todo.id" @click.stop="updateTodoPC(todo)"></i>
                      <i class="fa-solid fa-trash-can icon icon-red icon-pc" :ref="'delete'+todo.id" @click.stop="deleteTodoPC(todo)"></i>

                      </div>
                      <div class="list-item-task-swipe list-item-task-swipe-gray" :ref="'detail'+todo.id" 
                       :style="todo.id === swipeData.moveId?{transform:`translate(${swipeData.moveX},0)`}:{transform:`translate(0,0)`}"
                       @touchstart.stop="updateTodo($event,todo)">
                        詳細
                      </div>
                      <div class="list-item-task-swipe list-item-task-swipe-red" :ref="'delete'+todo.id"
                        :style="todo.id === swipeData.moveId?{transform:`translate(${swipeData.moveX},0)`}:{transform:`translate(0,0)`}"
                        @touchstart.stop="deleteTodo($event,todo)">
                        削除
                      </div>
                    </div>
                </div>
           </div>
         </div>
<!--期限切れリストの一覧表示-->
         <div class="item-container" v-if="listTypeSelect === 'expired' || url === '/list/expired'">
           <div class="task-category">
            <div class="category-title-area">
              <div class="category-title-area category-title-area-left">
                <div class="circle-area circle-area-list circle-area-blue circle-area-s">
                    <i class="fa-solid fa-list-check icon icon-white icon-s"></i>
                </div>
                <h3 class="title title-category title-category-s-margin">リスト登録なし</h3>
              </div>
              <div>
                <i class="fa-solid fa-plus icon icon-s icon-select" @click="showModalTodo(noneCategory)"></i>
              </div>
            </div>
                <div v-for="(todo, idx) in indexAllTodo" :key="idx">
                    <div class="list-item list-item-task" v-if="todo.list_id === null && todo.todo_date < toDay" :ref="todo.id"
                        @touchstart="touchStart($event,todo.id)" 
                        @touchmove="touchMove($event,todo.id)"
                        @touchend="touchEnd(todo.id)">
                        <div class="list-item-task-swipe list-item-task-swipe-green" :ref="'fixed'+todo.id "  @touchstart.stop="fixedTodo($event,todo)" 
                        :style="todo.id === swipeData.moveId?{transform:`translate(${swipeData.moveX},0)`}:{transform:`translate(0,0)`}">
                          <i class="fa-solid fa-thumbtack icon icon-white"></i>
                        </div>
                        <div class="list-item-task-in " :ref="'todo'+todo.id" 
                          :style="todo.id === swipeData.moveId?{transform:`translate(${swipeData.moveTodo},0)`}:{transform:`translate(0,0)`}">
                          <i class="fa-regular fa-circle icon icon-item" @touchstart.stop="completedTodo(todo)" v-if="todo.complete_flg == false"></i>
                          <i class="fa-solid fa-check icon icon-item icon-item-green" @touchstart.stop="completedTodo(todo)" v-else-if="todo.complete_flg == true"></i>
                          <p class="text text-no-leftmargin">
                            <span v-if="todo.fixed_flg == true"><i class="fa-solid fa-thumbtack icon icon-incline"></i></span>
                            {{todo.name}}
                            <span class="text text-xs">{{todo.todo_date}}</span>
                          </p>
                          <i class="fa-solid fa-thumbtack icon icon-blue icon-pc" :ref="'fixed'+todo.id "  @click.stop="fixedTodoPC(todo)"></i>
                          <i class="fa-solid fa-pencil icon icon-pc" :ref="'detail'+todo.id" @click.stop="updateTodoPC(todo)"></i>
                          <i class="fa-solid fa-trash-can icon icon-red icon-pc" :ref="'delete'+todo.id" @click.stop="deleteTodoPC(todo)"></i>

                        </div>
                        <div class="list-item-task-swipe list-item-task-swipe-gray" :ref="'detail'+todo.id" 
                       :style="todo.id === swipeData.moveId?{transform:`translate(${swipeData.moveX},0)`}:{transform:`translate(0,0)`}"
                       @touchstart.stop="updateTodo($event,todo)">
                        詳細
                      </div>
                      <div class="list-item-task-swipe list-item-task-swipe-red" :ref="'delete'+todo.id"
                        :style="todo.id === swipeData.moveId?{transform:`translate(${swipeData.moveX},0)`}:{transform:`translate(0,0)`}"
                        @touchstart.stop="deleteTodo($event,todo)">
                        削除
                      </div>

                    </div>
                </div>
           </div>

           <div class="task-category" v-for="(list, idx) in indexAllLists" :key="idx">
            <div class="category-title-area"  v-if="listcounter(list.id)">
              <div class="category-title-area category-title-area-left"  >
                <div class="circle-area circle-area-list circle-area-s" :class="list.color">
                    <i class="fa-solid fa-list-check icon icon-white icon-s"></i>
                </div>
                <h3 class="title title-category title-category-s-margin">{{list.name}}</h3>
                <i class="fa-solid fa-pencil icon icon-s icon-select" @click="openEditList(list)"></i>
              </div>
              <div>
                    <i class="fa-solid fa-plus icon icon-s icon-select" @click="showModalTodorelateList(list)"></i>
              </div>
            </div>
                <div v-for="(todo, idx) in indexAllTodo" :key="idx">
                    <div class="list-item list-item-task" v-if="todo.list_id === list.id && todo.todo_date < toDay" :ref="todo.id"
                      @touchstart="touchStart($event,todo.id)" 
                      @touchmove="touchMove($event,todo.id)"
                      @touchend="touchEnd(todo.id)">
                      <div class="list-item-task-swipe list-item-task-swipe-green" :ref="'fixed'+todo.id "  @touchstart.stop="fixedTodo($event,todo)" 
                    :style="todo.id === swipeData.moveId?{transform:`translate(${swipeData.moveX},0)`}:{transform:`translate(0,0)`}">
                      <i class="fa-solid fa-thumbtack icon icon-white"></i>
                    </div>
                      <div class="list-item-task-in " :ref="'todo'+todo.id" 
                       :style="todo.id === swipeData.moveId?{transform:`translate(${swipeData.moveTodo},0)`}:{transform:`translate(0,0)`}">
                      <i class="fa-regular fa-circle icon icon-item" @touchstart.stop="completedTodo(todo)" v-if="todo.complete_flg == false"></i>
                      <i class="fa-solid fa-check icon icon-item icon-item-green" @touchstart.stop="completedTodo(todo)" v-else-if="todo.complete_flg == true"></i>
                      <p class="text text-no-leftmargin">
                        <span v-if="todo.fixed_flg == true"><i class="fa-solid fa-thumbtack icon icon-incline"></i></span>
                        {{todo.name}}
                        <span class="text text-xs">{{todo.todo_date}}</span>
                      </p>
                      <i class="fa-solid fa-thumbtack icon icon-blue icon-pc" :ref="'fixed'+todo.id "  @click.stop="fixedTodoPC(todo)"></i>
                      <i class="fa-solid fa-pencil icon icon-pc" :ref="'detail'+todo.id" @click.stop="updateTodoPC(todo)"></i>
                      <i class="fa-solid fa-trash-can icon icon-red icon-pc" :ref="'delete'+todo.id" @click.stop="deleteTodoPC(todo)"></i>

                      </div>
                      <div class="list-item-task-swipe list-item-task-swipe-gray" :ref="'detail'+todo.id" 
                       :style="todo.id === swipeData.moveId?{transform:`translate(${swipeData.moveX},0)`}:{transform:`translate(0,0)`}"
                       @touchstart.stop="updateTodo($event,todo)">
                        詳細
                      </div>
                      <div class="list-item-task-swipe list-item-task-swipe-red" :ref="'delete'+todo.id"
                        :style="todo.id === swipeData.moveId?{transform:`translate(${swipeData.moveX},0)`}:{transform:`translate(0,0)`}"
                        @touchstart.stop="deleteTodo($event,todo)">
                        削除
                      </div>
                    </div>
                </div>
           </div>
         </div>
<!--各リストの一覧表示-->
<div class="item-container"  v-if="listId">
           <div class="task-category">
            <div class="category-title-area">
              <div class="category-title-area category-title-area-left">
                <div class="circle-area circle-area-list circle-area-blue circle-area-s">
                    <i class="fa-solid fa-calendar-day icon icon-white icon-s"></i>
                </div>
                <h3 class="title title-category title-category-s-margin">リスト登録なし</h3> 
              </div>
              <div>
                <i class="fa-solid fa-plus icon icon-s icon-select" @click="showModalTodo(noneCategory)"></i>
              </div>
            </div>
                <div v-for="todo in indexAllTodo" :key="todo.id" >
                    <div class="list-item list-item-task" v-if="todo.list_id === listId && todo.category_id == null"   :ref="todo.id"  
                    @touchstart="touchStart($event,todo.id)" 
                    @touchmove="touchMove($event,todo.id)"
                    @touchend="touchEnd(todo.id)">
                    <div class="list-item-task-swipe list-item-task-swipe-green" :ref="'fixed'+todo.id "  @touchstart.stop="fixedTodo($event,todo)" 
                    :style="todo.id === swipeData.moveId?{transform:`translate(${swipeData.moveX},0)`}:{transform:`translate(0,0)`}">
                      <i class="fa-solid fa-thumbtack icon icon-white"></i>
                    </div>
                      <div class="list-item-task-in " :ref="'todo'+todo.id" 
                       :style="todo.id === swipeData.moveId?{transform:`translate(${swipeData.moveTodo},0)`}:{transform:`translate(0,0)`}">
                      <i class="fa-regular fa-circle icon icon-item" @touchstart.stop="completedTodo(todo)" v-if="todo.complete_flg == false"></i>
                      <i class="fa-solid fa-check icon icon-item icon-item-green" @touchstart.stop="completedTodo(todo)" v-else-if="todo.complete_flg == true"></i>
                      <p class="text text-no-leftmargin">
                        <span v-if="todo.fixed_flg == true"><i class="fa-solid fa-thumbtack icon icon-incline"></i></span>
                        {{todo.name}}
                        <span class="text text-xs">{{todo.todo_date}}</span>
                      </p>
                      <i class="fa-solid fa-thumbtack icon icon-blue icon-pc" :ref="'fixed'+todo.id "  @click.stop="fixedTodoPC(todo)"></i>
                      <i class="fa-solid fa-pencil icon icon-pc" :ref="'detail'+todo.id" @click.stop="updateTodoPC(todo)"></i>
                      <i class="fa-solid fa-trash-can icon icon-red icon-pc" :ref="'delete'+todo.id" @click.stop="deleteTodoPC(todo)"></i>

                    </div>
                      <div class="list-item-task-swipe list-item-task-swipe-gray" :ref="'detail'+todo.id" 
                       :style="todo.id === swipeData.moveId?{transform:`translate(${swipeData.moveX},0)`}:{transform:`translate(0,0)`}"
                       @touchstart.stop="updateTodo($event,todo)">
                        詳細
                      </div>
                      <div class="list-item-task-swipe list-item-task-swipe-red" :ref="'delete'+todo.id"
                        :style="todo.id === swipeData.moveId?{transform:`translate(${swipeData.moveX},0)`}:{transform:`translate(0,0)`}"
                        @touchstart.stop="deleteTodo($event,todo)">
                        削除
                      </div>
                    </div>
                </div>
           </div>
           <div class="task-category" v-for="(category, idx) in indexAllCategorys" :key="idx">
            <div class="category-title-area" v-if="category.list_id === listId">
                <div class="category-title-area category-title-area-left"  >
                    <div class="circle-area circle-area-list circle-area-s" :class="category.color">
                        <i class="fa-solid fa-calendar-day icon icon-white icon-s"></i>
                    </div>
                    <h3 class="title title-category title-category-s-margin">{{category.name}}</h3>
                    <i class="fa-solid fa-pencil icon icon-s icon-select" @click="showModalCategory(category)"></i>
                </div>
                <div>
                    <i class="fa-solid fa-plus icon icon-s icon-select" @click="showModalTodo(category)"></i>
                </div>
            </div>
            <div v-for="todo in indexAllTodo" :key="todo.id" >
                    <div class="list-item list-item-task" v-if="todo.list_id === listId && todo.category_id == category.id"   :ref="todo.id"  
                    @touchstart="touchStart($event,todo.id)" 
                    @touchmove="touchMove($event,todo.id)"
                    @touchend="touchEnd(todo.id)">
                    <div class="list-item-task-swipe list-item-task-swipe-green" :ref="'fixed'+todo.id "  @touchstart.stop="fixedTodo($event,todo)" 
                    :style="todo.id === swipeData.moveId?{transform:`translate(${swipeData.moveX},0)`}:{transform:`translate(0,0)`}">
                      <i class="fa-solid fa-thumbtack icon icon-white"></i>
                    </div>
                      <div class="list-item-task-in " :ref="'todo'+todo.id" 
                       :style="todo.id === swipeData.moveId?{transform:`translate(${swipeData.moveTodo},0)`}:{transform:`translate(0,0)`}">
                      <i class="fa-regular fa-circle icon icon-item" @touchstart.stop="completedTodo(todo)" v-if="todo.complete_flg == false"></i>
                      <i class="fa-solid fa-check icon icon-item icon-item-green" @touchstart.stop="completedTodo(todo)" v-else-if="todo.complete_flg == true"></i>
                      <p class="text text-no-leftmargin">
                        <span v-if="todo.fixed_flg == true"><i class="fa-solid fa-thumbtack icon icon-incline"></i></span>
                        {{todo.name}}
                        <span class="text text-xs">{{todo.todo_date}}</span>
                      </p>
                      <i class="fa-solid fa-thumbtack icon icon-blue icon-pc" :ref="'fixed'+todo.id "  @click.stop="fixedTodoPC(todo)"></i>
                      <i class="fa-solid fa-pencil icon icon-pc" :ref="'detail'+todo.id" @click.stop="updateTodoPC(todo)"></i>
                      <i class="fa-solid fa-trash-can icon icon-red icon-pc" :ref="'delete'+todo.id" @click.stop="deleteTodoPC(todo)"></i>

                      </div>
                      <div class="list-item-task-swipe list-item-task-swipe-gray" :ref="'detail'+todo.id" 
                       :style="todo.id === swipeData.moveId?{transform:`translate(${swipeData.moveX},0)`}:{transform:`translate(0,0)`}"
                       @touchstart.stop="updateTodo($event,todo)">
                        詳細
                      </div>
                      <div class="list-item-task-swipe list-item-task-swipe-red" :ref="'delete'+todo.id"
                        :style="todo.id === swipeData.moveId?{transform:`translate(${swipeData.moveX},0)`}:{transform:`translate(0,0)`}"
                        @touchstart.stop="deleteTodo($event,todo)">
                        削除
                      </div>
                    </div>
                </div>

           </div>
         </div>


       </section>




    </main>

  </div>

</template>

<script>
import OverLayComponent from "./OverLayComponent";
import ModalCreateListComponent from "./ModalCreateListComponent";
import ModalTodoComponent from "./ModalTodoComponent";
import ModalTodoCategoryComponent from "./ModalTodoCategoryComponent"

  export default{
    props: {
      listType:{
          type: String,
          default: '',
      },
      listId:{
        type: Number,
        default: null,
      },
      listName:{
        type:String,
        default:'',
      },
      listColor:{
        type:String,
        default:''
      }
    },
    components:{
        OverLayComponent,
        ModalCreateListComponent,
        ModalTodoComponent,
        ModalTodoCategoryComponent,
    },
    data: function(){
        return {
           indexAllLists:this.$store.getters['list/indexAllLists'],
           indexAllTodo:this.$store.getters['todo/indexAllTodo'],
           listTypeSelect: this.$store.getters['todo/listType'],
           indexAllCategorys:this.$store.getters['category/indexAllCategorys'],
           toDay:'',
           searchText:'',
           selectedListName:'',
           selectedCategoryName:'',
           updateTodoFlg:false,
           showUpdateTodo:false,
           showToolMenu:false,
           showTodoDone:false,
           showModalCreateList:false,
           showModalList:false,
           showTodoOrder:false,
           noneCategory:'',
           editListId:'',
           editListName:'',
           editListColor:'',
           editListFlg:'',
           showUpdateCategory:false,
           showCreateCategory:false,
           editCategoryId:'',
           editCategoryName:'',
           editCategoryColor:'',
           editTodoData:[],
           swipeData:{
            width:'',
            startX:'',
            moveX:0,
            moveTodo:0,
            moveAmount:0,
            positionDetail: -15+'%',
            positionDelete: -15+'%',
            moveId:'',
            contentLength:0
           },
           showTransition:false,
           selectOrderRule:'標準',
           orederRule:'',
           standard:1,
           limitUp:2,
           limitDown:3,
           createUp:4,
           createDown:5,
           nameUp:6,
           nameDown:7,
           priorityUp:8,
           priorityDown:9,
           sortIndexAllTodo:[],
           fixedIndexAllTodo:[],
           url:this.$route.path,
           
        }
    },
    methods: {
      openEditList(list){
        this.editListFlg = true
        this.editListId = list.id
        this.editListName = list.name
        this.editListColor = list.color
        this.showModalCreateList=true

      },
      remainOrderRule(rule){
        this.fixedIndexAllTodo = this.indexAllTodo.filter(function(object){
          return object.fixed_flg == true
        })
        this.sortIndexAllTodo = this.indexAllTodo.filter(function(object){
          return object.fixed_flg == false
        })
        switch(rule){
          case 1:
            this.selectOrderRule = '標準'
            this.indexAllTodo = this.sortIndexAllTodo.sort(function(a,b){
              let dateA = new Date(a.created_at)
              let dateB = new Date(b.created_at)
              return dateA - dateB
            })
            break
          case 2:
            this.selectOrderRule = '期限が古い順'
            this.indexAllTodo = this.sortIndexAllTodo.sort(function(a,b){
              let dateA = new Date(a.todo_date)
              let dateB = new Date(b.todo_date)
              return dateA - dateB
            })
            break
          case 3:
            this.selectOrderRule = '期限が新しい順'
            this.indexAllTodo = this.sortIndexAllTodo.sort(function(a,b){
              let dateA = new Date(a.todo_date)
              let dateB = new Date(b.todo_date)
              return dateB - dateA
            })
            break
          case 4:
            this.selectOrderRule = '作成日が古い順'
            this.indexAllTodo = this.sortIndexAllTodo.sort(function(a,b){
              let dateA = new Date(a.created_at)
              let dateB = new Date(b.created_at)
              return dateA - dateB
            })
            break
          case 5:
            this.selectOrderRule = '作成日が新しい順'
            this.indexAllTodo = this.sortIndexAllTodo.sort(function(a,b){
              let dateA = new Date(a.created_at)
              let dateB = new Date(b.created_at)
              return dateB - dateA
            })
            break
          case 6:
            this.selectOrderRule = 'TODO名昇順'
            this.indexAllTodo = this.sortIndexAllTodo.sort(function(a,b){
              return a.name.localeCompare(b.name,'ja',{accent:true})
            })
            break
          case 7:
            this.selectOrderRule = 'TODO名降順'
            this.indexAllTodo = this.sortIndexAllTodo.sort(function(a,b){
              return b.name.localeCompare(a.name,'ja',{accent:true})
            })
            break
          case 8:
            this.selectOrderRule = '優先度が高い順'
            this.indexAllTodo = this.sortIndexAllTodo.sort(function(a,b){
              return b.priority - a.priority
            })
            break
            case 9:
            this.selectOrderRule = '優先度が低い順'
            this.indexAllTodo = this.sortIndexAllTodo.sort(function(a,b){
              return a.priority - b.priority
            })
            break
          default:
            this.selectOrderRule = '標準'
        }
        for(let i=0;i<this.fixedIndexAllTodo.length;i++){
          this.indexAllTodo.unshift(this.fixedIndexAllTodo[i])
        }
        this.$store.dispatch('todo/selectOrderRule',this.selectOrderRule)

      },
      changeOrderRule(rule){
        //console.log(rule)
        this.indexAllTodo = this.$store.getters['todo/indexAllTodo']

        this.remainOrderRule(rule)
        this.showTodoOrder = false
        this.showToolMenu = false
      },
      getOrderRule(){
        switch(this.selectOrderRule){
          case '標準':
              this.remainOrderRule(1)
          break
          case '期限が古い順':
             this.remainOrderRule(2)
          break 
          case '期限が新しい順':
             this.remainOrderRule(3)
          break
          case '作成日が古い順':
             this.remainOrderRule(4)
          break 
          case '作成日が新しい順':
             this.remainOrderRule(5)
          break
          case 'TODO名昇順':
             this.remainOrderRule(6)
          break 
          case 'TODO名降順':
             this.remainOrderRule(7)
          break
          case '優先度が高い順':
              this.remainOrderRule(8)
          break
          case '優先度が低い順':
              this.remainOrderRule(9)
          break
          default:
            this.remainOrderRule(1)
        }
      },
      async deleteList(){
        if(confirm('このリストを削除しますか？')){
          await this.$store.dispatch('list/deleteList',this.listId)
          await axios.post('/api/deleteCategoryRelateList',{listId:this.listId})
          await axios.post('/api/deleteTodoRelateList',{listId:this.listId})
          this.toggleTool()
          this.$store.commit('message/setContent', {
                              content: 'このリストを削除しました。',
                              timeout: 2000
                             })

          this.$router.push('/home')
        }else{
          this.toggleTool()
        }
      },
      closeUpdateCategory(){
        this.getOrderRule()
        this.showUpdateCategory = false
      },
      closeCreateCategory(){
        this.showCreateCategory = false
        this.getOrderRule()
        this.toggleTool()
      },
      receiveEditListData(name,color){
        this.editListName = name
        this.editListColor = color
        this.getOrderRule()
      },
      showModalCategory(category){
        this.showUpdateCategory = true
        this.editCategoryId = category.id
        this.editCategoryName = category.name
        this.editCategoryColor = category.color
      },
      showModalCreateCategory(){
        this.showCreateCategory = true
      },
      close(){
        this.indexAllTodo = this.$store.getters['todo/indexAllTodo']
        this.updateTodoFlg = false
        this.getOrderRule()
        this.showUpdateTodo = false
      },
      async showModalTodorelateList(list){
        await this.$store.dispatch('todo/selectCategory', '') 
        await this.$store.dispatch('todo/selectList', list.id)
        await this.$store.dispatch('category/selectList', list.id)
        this.selectedListName = list.name
        this.selectedCategoryName = ''
        this.updateTodoFlg = false
        this.showUpdateTodo = true
      },
      async showModalTodo(category){
        if(category != ''){
        await this.$store.dispatch('todo/selectCategory', category.id) 
        await this.$store.dispatch('todo/selectList', category.list_id)
        await this.$store.dispatch('category/selectList', category.list_id)
        this.selectedListName = this.listName
        this.selectedCategoryName = category.name
        }else{
        await this.$store.dispatch('todo/selectCategory', '') 
        await this.$store.dispatch('todo/selectList', this.listId)
        await this.$store.dispatch('category/selectList', this.listId)
        this.selectedListName = this.listName
        this.selectedCategoryName = ''
        }
        this.updateTodoFlg = false
        this.showUpdateTodo = true
      },
      toggleTool(){
        this.showToolMenu = !this.showToolMenu
        this.showModalCreateList = false
        this.showTodoOrder = false
        this.searchText = ''
      },
      closeTool(){
        this.showToolMenu = false
        this.showModalList = false
        this.showModalCreateList = false
        this.showTodoOrder = false

      },
      toggleTodoDoneShow(){
        this.showTodoDone = !this.showTodoDone
        this.searchText = ''
        this.getOrderRule()
        this.showToolMenu = !this.showToolMenu
      },
      toggleTodoOrder(){
        this.showTodoOrder = !this.showTodoOrder
      },
      search(text){
        //console.log('search')
        //console.log(text)
        this.indexAllTodo = this.$store.getters['todo/indexAllTodo']
        
        const searchIndexTodo = this.indexAllTodo.filter(function(todo){
          return todo.name.indexOf(text) >-1
        })
        this.indexAllTodo = searchIndexTodo
        this.getOrderRule()
      },
      listcounter(id){
        if(!this.showTodoDone){
            const listCounterList = this.indexAllTodo.filter(function(todo){
            return todo.list_id === id && todo.delete_flg == false && todo.complete_flg == false
            })
          if(listCounterList.length >= 0){
            return true
          }else{
            return false
          }
        }else if(this.showTodoDone){
          const listCounterList = this.indexAllTodo.filter(function(todo){
            return todo.list_id === id && todo.delete_flg == false
            })
          if(listCounterList.length >0){
            return true
          }else{
            return false
          }
        }

      },
      touchStart:function(e, id){
        this.swipeData.moveX = 0
        this.swipeData.moveTodo = 0
        this.swipeData.moveAmount = 0
        this.swipeData.moveId = id

        this.swipeData.width = e.target.offsetWidth
        this.swipeData.startX = e.touches[0].pageX
      },
      touchMove:function(e, id){
        
        this.swipeData.moveAmount = e.touches[0].pageX - this.swipeData.startX
        if( 30<=this.swipeData.moveAmount && this.swipeData.moveAmount <= 100 ||
             -150<= this.swipeData.moveAmount && this.swipeData.moveAmount <=-30){
           this.swipeData.moveX = e.touches[0].pageX - this.swipeData.startX +'px'
           this.swipeData.moveTodo = e.touches[0].pageX - this.swipeData.startX +'px'
           this.swipeData.contentLength = this.swipeData.moveX
         }else if(this.swipeData.moveAmount < -150){
          this.swipeData.moveX = -200+'%'
          this.swipeData.moveTodo = -30+'%'
          this.swipeData.contentLength = 15+'%'
         }else if(100 < this.swipeData.moveAmount ){
          this.swipeData.moveX = 100+'%'
          this.swipeData.moveTodo = 15+'%'
          this.swipeData.contentLength = 15+'%'
         }else if(-30< this.swipeData.moveAmount && this.swipeData.moveAmount <30){
          this.swipeData.moveX = 0+'px'
          this.swipeData.moveTodo = 0+'px'
         }
    
      },
      touchEnd:function(id){
        if(this.swipeData.moveAmount > 70){
          this.swipeData.moveX = 100+'%'
          this.swipeData.moveTodo = 15+'%'
        }else if (this.swipeData.moveAmount < -70){
          this.swipeData.moveX = -200+'%'
          this.swipeData.moveTodo = -30+'%'
          
        }else{
          this.swipeData.moveX = 0
          this.swipeData.moveTodo = 0
        }
      },
      getToday:function(){
        const today = new Date()
        const y = today.getFullYear();
        const m = ('00' + (today.getMonth()+1)).slice(-2);
        const d = ('00' + today.getDate()).slice(-2);
        this.toDay = (y + '-' + m + '-' + d);
        },
      completedTodo:async function(todo){
        todo.complete_flg = !todo.complete_flg
        await this.$store.dispatch('todo/update', todo)
        this.getOrderRule()
      },
      fixedTodo:async function(e,todo){
        this.touchStart(e,todo.id)
        todo.fixed_flg = !todo.fixed_flg
        await this.$store.dispatch('todo/update', todo)
        this.getOrderRule()
      },
      fixedTodoPC:async function(todo){
        todo.fixed_flg = !todo.fixed_flg
        await this.$store.dispatch('todo/update', todo)
        this.getOrderRule()
      },
      updateTodo:async function(e,todo){
        this.touchStart(e,todo.id)
        this.updateTodoFlg = true
        this.editTodoData = todo
        const updateListId = todo.list_id 
        const updateCategoryId = todo.category_id
        let resultListName = ""
        let resultCategoryName = ""
        await this.$store.dispatch('category/selectList', todo.list_id)
        await this.$store.dispatch('todo/selectList', todo.list_id)
        await this.$store.dispatch('todo/selectCategory', todo.category_id)

        this.indexAllLists.forEach(function(object){
          if(object.id == updateListId){
            resultListName = object.name
            return resultListName
          }else{
            return false
          }
        })
        this.indexAllCategorys.forEach(function(object){
          if(object.id == updateCategoryId){
            resultCategoryName = object.name
            return resultCategoryName
          }else{
            return false
          }
        })
        this.selectedListName = resultListName
        this.selectedCategoryName = resultCategoryName
        this.showUpdateTodo = true
      },
      updateTodoPC:async function(todo){
        this.updateTodoFlg = true
        this.editTodoData = todo
        const updateListId = todo.list_id 
        const updateCategoryId = todo.category_id
        let resultListName = ""
        let resultCategoryName = ""
        await this.$store.dispatch('category/selectList', todo.list_id)
        await this.$store.dispatch('todo/selectList', todo.list_id)
        await this.$store.dispatch('todo/selectCategory', todo.category_id)

        this.indexAllLists.forEach(function(object){
          if(object.id == updateListId){
            resultListName = object.name
            return resultListName
          }else{
            return false
          }
        })
        this.indexAllCategorys.forEach(function(object){
          if(object.id == updateCategoryId){
            resultCategoryName = object.name
            return resultCategoryName
          }else{
            return false
          }
        })
        this.selectedListName = resultListName
        this.selectedCategoryName = resultCategoryName
        this.showUpdateTodo = true
      },
      deleteTodo:async function(e,todo){
        this.touchStart(e,todo.id)
        todo.delete_flg = !todo.delete_flg
        await this.$store.dispatch('todo/update', todo)
      },
      deleteTodoPC:async function(todo){
        //console.log('delete')
        todo.delete_flg = !todo.delete_flg
        await this.$store.dispatch('todo/update', todo)

        this.selectOrderRule = this.$store.getters['todo/orderRule']
        this.indexAllLists = this.$store.getters['list/indexAllLists']
        this.indexAllCategorys=this.$store.getters['category/indexAllCategorys']
        this.$store.dispatch('todo/registerListType', this.listType)
        this.listTypeSelect = this.listType
        this.getToday()
        if(this.showTodoDone){
          //console.log('invisible')
          this.invisibleDeletedTodo()
        }else if(!this.showTodoDone){
          //console.log('changeshowTodo')
          this.changeShowTodo()
        }

      },
      invisibleDeletedTodo:function(){
        if(this.searchText == ''){
          this.indexAllTodo = this.$store.getters['todo/indexAllTodo']
        }
        const newData = this.indexAllTodo.filter(function(object){
          return object.delete_flg == 0
        })
        this.indexAllTodo = newData
        this.getOrderRule()
        if(this.searchText !== ''){
          this.search(this.searchText)
        }
        
        
        
        
      },
      changeShowTodo:function(){
        if(this.searchText == ''){
          this.indexAllTodo = this.$store.getters['todo/indexAllTodo']
        }
        
        const newData = this.indexAllTodo.filter(function(object){
          return object.delete_flg == 0
        })
        const uncompleteData= newData.filter(function(object){
          return object.complete_flg == false
        })
        this.indexAllTodo = uncompleteData
        this.getOrderRule()
        
      },
      showEditListName(){
        return this.editListName = this.listName
      },
      showEditListColor(){
        return this.editListColor = this.listColor
      },  

    },
    created:function(){
      this.editListId = this.listId
      this.showEditListName()
      this.showEditListColor()
      this.indexAllCategorys=this.$store.getters['category/indexAllCategorys']
      this.selectOrderRule = this.$store.getters['todo/orderRule']
    },
    mounted:function(){
        
        this.$store.dispatch('todo/registerListType', this.listType)
        this.listTypeSelect = this.listType
        this.getToday()
        if(this.showTodoDone){
          this.invisibleDeletedTodo()
          this.getOrderRule()
        }else if(!this.showTodoDone){
          this.changeShowTodo()
          this.getOrderRule()
        }
        this.showTransition = true
    },
    beforeRouteLeave(to,from,next){
    this.showTransition = false
    setTimeout(()=>{
      next()
    },0)
  },

    beforeUpdate:function(){
      //console.log('beforeupdate')
      this.selectOrderRule = this.$store.getters['todo/orderRule']
      this.indexAllLists = this.$store.getters['list/indexAllLists']
      this.indexAllCategorys=this.$store.getters['category/indexAllCategorys']
        this.$store.dispatch('todo/registerListType', this.listType)
        this.listTypeSelect = this.listType
        this.getToday()
        if(this.showTodoDone){
          //console.log('invisible')
          this.invisibleDeletedTodo()
        }else if(!this.showTodoDone){
          //console.log('changeshowTodo')
          this.changeShowTodo()
        }
        
    },
    updated:function(){
      //console.log('updated')
    },
     watch: {
        $route(to, from) {
          //console.log('watch')
        this.$store.dispatch('todo/count')
        this.indexAllTodo = this.$store.getters['todo/indexAllTodo']

        this.$store.dispatch('todo/registerListType', this.listType)
        this.listTypeSelect = this.listType
        this.getToday()
        },
        indexAllTodo:function(newData,oldData){
          
        }
     },
     computed:{
      isLogin(){
        return this.$store.getters['auth/check']
      },
     },
     watch: {
    $route(to, from) {
      this.url= this.$route.path
    }
   }
  }
</script>
