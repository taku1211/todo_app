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

  <body class="">

      <div id="Main">
        <index-component></index-component>
      </div>

  </body>

  <script src="{{ mix('/js/app.js') }}" defer></script>
</html>
