<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>TODO APP</title>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" rel="stylesheet">
        <link rel="stylesheet" href="https://unpkg.com/ress@4.0.0/dist/ress.min.css">
        <link href="{{ mix('/css/app.css') }}" rel="stylesheet">
  </head>
  <body>

    <header class="header-container">
      <h2 class="title title-header">TODO APP</h2>
      <nav class="nav-container">
        <ul class="menu">
          <li class="menu-item"><i class="fa-solid fa-house-chimney icon icon-header"><a href="#"></a></i></li>
          <li class="menu-item"><i class="fa-solid fa-gear icon icon-header"><a href="#"></a></i></li>
          <li class="menu-item"><i class="fa-solid fa-bars icon icon-header"><a href="#"></a></i></li>
        </ul>
      </nav>
    </header>
    <main class="flex-container">
       <section class="main-container">
         <div class="todo-container">
           <div class="grid-container grid-container-white">
             <div class="circle-area circle-area-blue">
               <i class="fa-solid fa-calendar-day icon icon-white"></i>
             </div>
             <div class="task-count-area ">
               5
             </div>
               <p class="category-text category-text-gray">今日</p>
           </div>

           <div class="grid-container grid-container-white">
             <div class="circle-area circle-area-red">
               <i class="fa-solid fa-calendar-days icon icon-white"></i>
             </div>
             <div class="task-count-area ">
               10
             </div>
               <p class="category-text category-text-gray">日時指定あり</p>
           </div>

           <div class="grid-container grid-container-white">
             <div class="circle-area circle-area-orange">
               <i class="fa-solid fa-file icon icon-white"></i>
             </div>
             <div class="task-count-area ">
               122
             </div>
               <p class="category-text category-text-gray">すべて</p>
          </div>

           <div class="grid-container grid-container-white">
             <div class="circle-area circle-area-gray">
               <i class="fa-solid fa-triangle-exclamation icon icon-white"></i>
             </div>
             <div class="task-count-area ">
               15
             </div>
               <p class="category-text category-text-gray">期限切れ</p>
           </div>
         </div>

       </section>

       <aside class="side-container">
         <div class="user-container">
            <h2 class="title title-username">TAKUMA</h2>
            <img class="img img-user" src="" alt="user-img">
         </div>
       </aside>

    </main>


    <footer class="l-footer">
    </footer>

  </body>
  <script src="{{ mix('/js/app.js') }}" defer></script>
</html>
