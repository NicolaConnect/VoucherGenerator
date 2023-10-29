<!doctype html>
<html lang="en" class="text-gray-900 leading-tight">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>Intesa Wi-Fi</title>

    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">

    <!-- Styles -->
    @vite(['resources/css/app.css', 'resources/js/app.jsx'])
</head>
<body class="antialiased text-sm overflow-x-hidden">
    <div id="root" class="overflow-x-hidden"></div>
    @stack('scripts')
</body>
</html>
