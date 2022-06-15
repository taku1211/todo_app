<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>TODO APP</title>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css2?family=Viga&display=swap" rel="stylesheet">
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" rel="stylesheet">
        <link rel="stylesheet" href="https://unpkg.com/ress@4.0.0/dist/ress.min.css">
        <link href="{{ mix('/css/app.css') }}" rel="stylesheet">
  </head>

  <body>


  <div id="Main">
      <router-view></router-view>

      <footer class="footer-container">
        <nav class="nav-container">
          <ul class="menu">
            <li class="menu-item">
              <router-link to="/home">
                <i class="fa-solid fa-house-chimney icon icon-footer"></i>
              </router-link>
            </li>
            <li class="menu-item">
              <router-link to="/list">
                <i class="fa-solid fa-list-check icon icon-footer"></i>
              </router-link>
            </li>
            <li class="menu-item"><i class="fa-solid fa-calendar-day icon icon-footer"><a href="#"></a></i></li>
            <li class="menu-item"><i class="fa-solid fa-triangle-exclamation icon icon-footer"><a href="#"></a></i></li>
            <li class="menu-item"><i class="fa-solid fa-circle-xmark icon icon-footer"></i><a href="#"></a></i></li>
          </ul>
          <ul class="menu">
            <li class="menu-item">ホーム</li>
            <li class="menu-item">MYLIST</li>
            <li class="menu-item">TODAY</li>
            <li class="menu-item">期限有り</li>
            <li class="menu-item">期限切れ</li>
          </ul>

        </nav>
      </footer>

  </div>




  </body>

  <script src="{{ mix('/js/app.js') }}" defer></script>
</html>
