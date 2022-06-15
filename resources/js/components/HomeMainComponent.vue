<template>
<div>
    <header class="header-container">
      <router-link to="/home">
      <h1 class="title title-header">TODO APP</h1>
      </router-link>
      <nav class="nav-container">
        <ul class="menu">
          <li class="menu-item">
            <router-link to="/home">
            <i class="fa-solid fa-house-chimney icon icon-header"></i>
            </router-link>
          </li>
          <li class="menu-item"><i class="fa-solid fa-gear icon icon-header"><a href="#"></a></i></li>
          <li class="menu-item"><i class="fa-solid fa-bars icon icon-header"><a href="#"></a></i></li>
        </ul>
      </nav>
    </header>

    <main class="flex-container">
       <section class="main-container">
         <div class="user-container user-container-responsive">
            <h2 class="title title-username">TAKUMA</h2>
            <div class="circle-area circle-area-list circle-area-orange">
              <img class="img img-user" src="/img/prof1.png" alt="user-img">
            </div>
         </div>

         <div class="todo-container">
           <div class="grid-container grid-container-white">
             <div class="circle-area  circle-area-category circle-area-blue">
               <i class="fa-solid fa-calendar-day icon icon-white"></i>
             </div>
             <div class="task-count-area ">
               5
             </div>
               <p class="text text-gray">今日</p>
           </div>

           <div class="grid-container grid-container-white">
             <div class="circle-area  circle-area-category circle-area-red">
               <i class="fa-solid fa-triangle-exclamation icon icon-white"></i>
             </div>
             <div class="task-count-area ">
               10
             </div>
               <p class="text text-gray">日時指定あり</p>
           </div>

           <div class="grid-container grid-container-white">
             <div class="circle-area circle-area-category circle-area-orange">
               <i class="fa-solid fa-file icon icon-white"></i>
             </div>
             <div class="task-count-area ">
               122
             </div>
               <p class="text text-gray">すべて</p>
          </div>

           <div class="grid-container grid-container-white">
             <div class="circle-area circle-area-category circle-area-gray">
               <i class="fa-solid fa-xmark icon icon-white"></i>
             </div>
             <div class="task-count-area ">
               15
             </div>
               <p class="text text-gray">期限切れ</p>
           </div>
         </div>

         <div class="mylist-container">
            <h2 class="title title-list">My List</h2>
            <div class="button-area">
              <button type="button" class="button button-blue"name="button">TODO追加</button>
              <button type="button" class="button button-orange"name="button">リスト追加</button>
            </div>
         </div>
         <div class="list-container">

           <div class="list-item">
              <div class="list-item-left">
                <div class="circle-area circle-area-list circle-area-gray">
                    <i class="fa-solid fa-list-check icon icon-white"></i>
                </div>
                <p class="text">リマインダー</p>
              </div>
              <div class="list-item-right">
                <p class="text text-gray">0</p>
                <div class="angle-area">
                  <i class="fa-solid fa-angle-right icon icon-angle"></i>
                </div>
              </div>
           </div>
           <div class="list-item">
              <div class="list-item-left">
                <div class="circle-area circle-area-list circle-area-blue">
                    <i class="fa-solid fa-list-check icon icon-white"></i>
                </div>
                <p class="text">22年度の目標</p>
              </div>
              <div class="list-item-right">
                <p class="text text-gray">8</p>
                <div class="angle-area">
                  <i class="fa-solid fa-angle-right icon icon-angle"></i>
                </div>
              </div>
           </div>
           <div class="list-item">
              <div class="list-item-left">
                <div class="circle-area circle-area-list circle-area-blue">
                    <i class="fa-solid fa-list-check icon icon-white"></i>
                </div>
                <p class="text">プライベート</p>
              </div>
              <div class="list-item-right">
                <p class="text text-gray">8</p>
                <div class="angle-area">
                  <i class="fa-solid fa-angle-right icon icon-angle"></i>
                </div>
              </div>
           </div>
           <div class="list-item">
              <div class="list-item-left">
                <div class="circle-area circle-area-list circle-area-blue">
                    <i class="fa-solid fa-list-check icon icon-white"></i>
                </div>
                <p class="text">仕事でやるべきこと</p>
              </div>
              <div class="list-item-right">
                <p class="text text-gray">8</p>
                <div class="angle-area">
                  <i class="fa-solid fa-angle-right icon icon-angle"></i>
                </div>
              </div>
           </div>
           <div class="list-item">
              <div class="list-item-left">
                <div class="circle-area circle-area-list circle-area-orange">
                    <i class="fa-solid fa-list-check icon icon-white"></i>
                </div>
                <p class="text">TODOリスト</p>
              </div>
              <div class="list-item-right">
                <p class="text text-gray">15</p>
                <div class="angle-area">
                  <i class="fa-solid fa-angle-right icon icon-angle"></i>
                </div>
              </div>
           </div>

         </div>
       </section>

       <aside class="side-container">
         <div class="user-container">
            <h2 class="title title-username">TAKUMA</h2>
            <div class="circle-area circle-area-list circle-area-orange">
              <img class="img img-user" src="/img/prof1.png" alt="user-img">
            </div>
         </div>
         <div class="list-container">
           <div class="list-item list-item-sidemenu">
             <p class="text text-sidemenu">TODOを追加する</p>
           </div>
           <div class="list-item list-item-sidemenu">
             <p class="text text-sidemenu">リストを追加する</p>
           </div>
           <div class="list-item list-item-sidemenu">
             <p class="text text-sidemenu">リストを編集・削除する</p>
           </div>
           <div class="list-item list-item-sidemenu">
             <p class="text text-sidemenu">リストをピン止めする</p>
           </div>
         </div>
       </aside>
    </main>
    <section class="responsive-button-container">
      <div class="button-area button-area-responsive">
        <button type="button" class="button button-blue button-responsive"name="button">TODO追加</button>
        <button type="button" class="button button-orange button-responsive"name="button">リスト追加</button>
      </div>
    </section>
</div>
</template>

<script>
 export default{}
</script>
