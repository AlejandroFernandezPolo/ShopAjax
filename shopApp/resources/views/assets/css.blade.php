<meta name="csrf-token" content="{{ csrf_token() }}">
<meta name="url-base" content="{{ url('') }}">

<!-- gLightbox gallery-->
<link rel="stylesheet" href="{{ url('assets/vendor/glightbox/css/glightbox.min.css') }}">
<!-- Range slider-->
<link rel="stylesheet" href="{{ url('assets/vendor/nouislider/nouislider.min.css') }}">
<!-- Choices CSS-->
<link rel="stylesheet" href="{{ url('assets/vendor/choices.js/public/assets/styles/choices.min.css') }}">
<!-- Swiper slider-->
<link rel="stylesheet" href="{{ url('assets/vendor/swiper/swiper-bundle.min.css') }}">
<!-- Google fonts-->
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Libre+Franklin:wght@300;400;700&amp;display=swap">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Martel+Sans:wght@300;400;800&amp;display=swap">
<!-- theme stylesheet-->
<link rel="stylesheet" href="{{ url('assets/css/style.default.css') }}" id="theme-stylesheet">
<!-- Custom stylesheet - for your changes-->
<link rel="stylesheet" href="{{ url('assets/css/custom.css') }}">
<!-- Favicon-->
<link rel="shortcut icon" href="{{ url('assets/img/favicon.png') }}">
</head>

<body>
    <div class="page-holder">
        <!-- navbar-->
        <header class="header bg-white">
            <div class="container px-lg-3">
                <nav class="navbar navbar-expand-lg navbar-light py-3 px-lg-0"><a class="navbar-brand"
                        href="index.html"><span class="fw-bold text-uppercase text-dark">EnteroMark</span></a>
                    <button class="navbar-toggler navbar-toggler-end" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation"><span
                            class="navbar-toggler-icon"></span></button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto">
                            <li class="nav-item">
                                <!-- Link--><a class="nav-link" href="{{ url('') }}">Home</a>
                            </li>
                            <li class="nav-item">
                                <!-- Link--><a class="nav-link" href="{{ url('shop') }}">Shop</a>
                            </li>
                        </ul>
                        <ul class="navbar-nav ms-auto">
                            <li class="nav-item"><a class="nav-link" href="{{ url('cart') }}"> <i class="fas fa-dolly-flatbed me-1 text-gray"></i>Cart<small id="numberCart" class="text-gray fw-normal">
                                @auth
                                @php
                                    $num = 0;
                                @endphp
                                    @if(Auth::user()->cart != null)
                                        @foreach (json_decode(Auth::user()->cart) as $prod)
                                        @php
                                            $num++;
                                        @endphp
                                        @endforeach
                                    @endif
                                    ({{$num}})
                                @endauth
                            </small></a></li>
                            @auth
                            @if(Auth::user()->admin)
                            <li class="nav-item"><a class="nav-link" href="{{url('admin')}}">Admin Area</a></li>
                            @endif
                            <li class="nav-item dropdown">
                                <a id="navbarDropdown" class="nav-link dropdown-toggle" href="#" role="button"
                                    data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" v-pre>
                                    <i class="fas fa-user me-1 text-gray fw-normal"></i> {{ Auth::user()->name }}
                                </a>

                                <div class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                                    <a class="dropdown-item" href="{{ route('logout') }}" onclick="event.preventDefault();
                                                 document.getElementById('logout-form').submit();">
                                        {{ __('Logout') }}
                                    </a>

                                    <form id="logout-form" action="{{ route('logout') }}" method="POST" class="d-none">
                                        @csrf
                                    </form>
                                </div>
                            </li>
                            @else
                            <li class="nav-item dropdown">
                                <a id="navbarDropdown" class="nav-link dropdown-toggle" href="#" role="button"
                                    data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" v-pre>
                                    <i class="fas fa-user me-1 text-gray fw-normal"></i> Login
                                </a>

                                <div class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                                    <a class="dropdown-item" href="{{url('login')}}">
                                        Login
                                    </a>
                                    <a class="dropdown-item" href="{{url('register')}}">
                                      Register
                                    </a>

                                    <form id="logout-form" action="{{ route('logout') }}" method="POST" class="d-none">
                                        @csrf
                                    </form>
                                </div>
                            </li>

                            @endauth

                        </ul>
                    </div>
                </nav>
            </div>
        </header>