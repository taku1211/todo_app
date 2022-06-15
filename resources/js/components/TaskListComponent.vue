
<template>
<div>
    <main class="flex-container">
       <section class="main-container"><!-- flexの左側-->
          <div class="tasknav-container"><!-- flexの左側メニュー部分-->
            <div class="nav-left">
              <router-link to="/home">
                  <i class="fa-solid fa-angle-left icon icon-tasknav"></i>
                  <span class="text text-nav">リストへ</span>
              </router-link>
            </div>
            <div class="nav-right">
              <i class="fa-solid fa-comment-dots icon icon-tasknav"></i>
            </div>
          </div>


          <div class="mylist-container">
            <h2 class="title title-list">LIST NAME</h2>
            <div class="button-area">
              <button type="button" class="button button-blue"name="button">TODO追加</button>
            </div>
         </div>
         <div class="search-box-container">
           <i class="fa fa-search icon icon-search" aria-hidden="true"></i>
           <input type="text" class="serachbox"name="" value="" placeholder="ここに絞り込みたいキーワードを入力">
         </div>
         <div class="item-container">
           <div class="task-category">
             <h3 class="title title-category">美容</h3>
             <div class="list-item list-item-task">
               <i class="fa-regular fa-circle icon icon-item"></i>
               <p class="text">10kgやせる</p>
             </div>
             <div class="list-item list-item-task">
               <i class="fa-regular fa-circle icon icon-item"></i>
               <p class="text">10kgやせる</p>
             </div>
             <div class="list-item list-item-task">
               <i class="fa-regular fa-circle icon icon-item"></i>
               <p class="text">10kgやせる</p>
             </div>

           </div>
           <div class="task-category">
             <h3 class="title title-category">投資</h3>
             <div class="list-item list-item-task">
               <i class="fa-regular fa-circle icon icon-item"></i>
               <p class="text">お金を増やす</p>
             </div>
             <div class="list-item list-item-task">
               <i class="fa-regular fa-circle icon icon-item"></i>
               <p class="text">お金を増やす</p>
             </div>
             <div class="list-item list-item-task">
               <i class="fa-regular fa-circle icon icon-item"></i>
               <p class="text">お金を増やす</p>
             </div>

           </div>
         </div>
       </section>


       <aside class="side-container side-container-task-page">
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
             <p class="text text-sidemenu">TODOを編集・削除する</p>
           </div>
           <div class="list-item list-item-sidemenu">
             <p class="text text-sidemenu">TODOをピン止めする</p>
           </div>
           <div class="list-item list-item-sidemenu">
             <p class="text text-sidemenu">今日のTODO</p>
           </div>
           <div class="list-item list-item-sidemenu">
             <p class="text text-sidemenu">日時指定ありのTODO</p>
           </div>
           <div class="list-item list-item-sidemenu">
             <p class="text text-sidemenu">すべてのTODO</p>
           </div>
           <div class="list-item list-item-sidemenu">
             <p class="text text-sidemenu">期限切れのTODO</p>
           </div>
         </div>
       </aside>


    </main>
    <section class="responsive-button-container">
      <div class="button-area button-area-responsive">
        <button type="button" class="button button-blue button-responsive"name="button">TODO追加</button>
      </div>
    </section>
</div>

</template>





<script>
  export default{}
</script>
