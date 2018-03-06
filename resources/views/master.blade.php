<!doctype html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=no">
        <link rel="stylesheet" href="{{ asset('css/metaphor.css') }}">
        <link rel="stylesheet" href="{{ asset('css/app.css') }}">
    </head>

    <body>
        <div class="container" id='app'>
        <nav-bar></nav-bar>
        <div>
            @if ( $errors->count() > 0 )
                @foreach( $errors->all() as $message )
                    <span>{{ $message }}</span>
                @endforeach
            @endif
        </div>
            @yield('content')
        </div>

        <script src="{{ asset('js/metaphor.js') }}"></script>
        <script src="{{ asset('js/app.js') }}"></script>
    </body>
</html>
