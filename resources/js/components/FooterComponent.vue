
<template>
<footer class="footer-container">
  <nav class="nav-container">
    <ul class="menu">
      <li class="menu-item">
      <router-link v-bind:to="{name: 'HomeMainComponent'}">
      <i class="fa-solid fa-house-chimney icon icon-footer"></i>
      </router-link>
      </li>
      <li class="menu-item"><i class="fa-solid fa-list-check icon icon-footer"><a href="#"></a></i></li>
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

</template>



<script>
  export default{}
</script>
