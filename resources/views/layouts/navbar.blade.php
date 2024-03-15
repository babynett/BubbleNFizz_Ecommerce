@extends('layouts.app')

@section('content')
    <!-- component -->
    <script src="https://cdn.jsdelivr.net/gh/alpinejs/alpine@v2.x.x/dist/alpine.min.js" defer></script>
    <div class="w-full text-gray-700 bg-white dark-mode:text-gray-200 dark-mode:bg-gray-800">
        <div x-data="{ open: false }"
            class="flex flex-col max-w-screen-xl px-4 mx-auto md:items-center md:justify-between md:flex-row md:px-6 lg:px-8">
            <div class="p-4 flex flex-row items-center justify-between">
                {{-- <a href="#" class="text-lg font-semibold tracking-widest text-gray-900 uppercase rounded-lg dark-mode:text-white focus:outline-none focus:shadow-outline"></a> --}}
                <button class="md:hidden rounded-lg focus:outline-none focus:shadow-outline">
                    <svg fill="currentColor" viewBox="0 0 20 20" class="w-6 h-6">
                        <path fill-rule="evenodd" class="" id="arrowRight"
                            d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8" />
                        <path fill-rule="evenodd" class="hidden" id="arrowLeft"
                            d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
                        {{-- <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path> --}}
                    </svg>
                </button>
                <div></div>
                <button class="md:hidden rounded-lg focus:outline-none focus:shadow-outline" @click="open = !open">
                    <svg fill="currentColor" viewBox="0 0 20 20" class="w-6 h-6">
                        <path x-show="!open" fill-rule="evenodd"
                            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
                            clip-rule="evenodd"></path>
                        <path x-show="open" fill-rule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clip-rule="evenodd"></path>
                    </svg>
                </button>
            </div>
            <div class="flex justify-center items-center space-x-8 @guest
py-6 @endguest">
                @guest
                    <a class="relative text-black font-semibold hover:text-amber-500" href="/shopping">Home</a>
                    <a class="relative text-black font-semibold hover:text-amber-500" href="/allproducts">All Products</a>
                    <a class="relative text-black font-semibold hover:text-amber-500" href="/bubblebath">Bubble Bath</a>
                    <a class="relative text-black font-semibold hover:text-amber-500" href="#">Artisan Facial N
                        Body</a>
                    <a class="relative text-black font-semibold hover:text-amber-500" href="#">Bath Salt</a>
                    <a class="relative text-black font-semibold hover:text-amber-500" href="#">Bath Bomb Sets</a>
                @endguest
                @auth
                    @if (Auth::user()->user_role == 3)
                        <a class="relative text-black font-semibold hover:text-amber-500" href="/shopping">Home</a>
                        <a class="relative text-black font-semibold hover:text-amber-500" href="/allproducts">All Products</a>
                        <a class="relative text-black font-semibold hover:text-amber-500" href="/bubblebath">Bubble Bath</a>
                        <a class="relative text-black font-semibold hover:text-amber-500" href="#">Artisan Facial N
                            Body</a>
                        <a class="relative text-black font-semibold hover:text-amber-500" href="#">Bath Salt</a>
                        <a class="relative text-black font-semibold hover:text-amber-500" href="#">Bath Bomb Sets</a>
                    @endif
                @endauth
            </div>
            <nav :class="{ 'flex': open, 'hidden': !open }"
                class="flex-col flex-grow pb-4 md:pb-0 hidden md:flex md:justify-end md:items-center md:flex-row">
                @auth
                    <div @click.away="open = false" class="relative" x-data="{ open: false }">
                        <button @click="open = !open"
                            class="flex flex-row items-center w-full px-4 py-5 mt-2 text-sm font-semibold text-left bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:focus:bg-gray-600 dark-mode:hover:bg-gray-600 md:w-auto md:inline md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline">
                            <span>{{ Auth::user()->name }}</span>
                            <svg fill="currentColor" viewBox="0 0 20 20" :class="{ 'rotate-180': open, 'rotate-0': !open }"
                                class="inline w-4 h-4 mt-1 ml-1 transition-transform duration-200 transform md:-mt-1">
                                <path fill-rule="evenodd"
                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                    clip-rule="evenodd"></path>
                            </svg>
                        </button>
                        <div x-show="open" x-transition:enter="transition ease-out duration-100"
                            x-transition:enter-start="transform opacity-0 scale-95"
                            x-transition:enter-end="transform opacity-100 scale-100"
                            x-transition:leave="transition ease-in duration-75"
                            x-transition:leave-start="transform opacity-100 scale-100"
                            x-transition:leave-end="transform opacity-0 scale-95"
                            class="absolute right-0 w-full mt-2 origin-top-right rounded-md shadow-lg md:w-48">
                            <div class="px-2 py-2 bg-white rounded-md shadow dark-mode:bg-gray-800">
                                <a class="block px-4 py-2 mt-2 text-sm font-semibold bg-white rounded-lg dark-mode:bg-white dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                                    href="/editprofile">Profile</a>
                                <a class="block px-4 py-2 mt-2 text-sm font-semibold bg-white rounded-lg dark-mode:bg-white dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                                    href="#">Notifications</a>
                                <form action="/logout" class="w-full flex justify-center" method="POST">
                                    @csrf
                                    <button
                                        class="block px-4 font-bold border-t-2 w-full py-2 mt-2 text-sm bg-white rounded-lg dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline">
                                        Logout</button>
                                </form>
                            </div>
                        </div>
                    </div>
                    @if (Auth::user()->user_role == 3)
                        <div class="relative">
                            <div class="absolute bg-amber-500 rounded-full top-3 right-1 w-4 flex justify-center items-center"
                                style="font-size: 11px" id="cartItems">
                                0
                            </div>
                            <a href="/cart"
                                class="flex flex-row items-center w-full px-4 py-5 mt-2 text-sm font-semibold text-left bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:focus:text-white dark-mode:focus:bg-gray-600  md:w-auto md:inline md:mt-0 md:ml-4  focus:text-gray-900  focus:bg-gray-200 focus:outline-none focus:shadow-outline">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#B75800"
                                    class="bi bi-cart" viewBox="0 0 16 16">
                                    <path
                                        d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                                </svg>
                            </a>
                        </div>
                    @endif
                @endauth
                @guest
                    <div class="relative">
                        <a href="/auth" class="text-amber-500 font-bold">Login</a>
                    </div>
                @endguest
            </nav>
        </div>
    </div>
    @auth
        <div class="text-black {{ Auth::user()->user_role != 3 ? 'px-6 pt-5' : '' }}">
            @yield('main-content')
        </div>
        @if (Auth::user()->user_role == 3)
            <div class="bg-black text-white mt-12">
                <div class="py-12 px-20">
                    <div class=" border-b-2 border-white pb-8 px-4">
                        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                            {{-- FIRST --}}
                            <div class="col-span-1">
                                <div class="text-xl py-5">
                                    <a href="#">
                                        Products
                                    </a>
                                </div>
                                <div class="text-xl py-5">
                                    <a href="#">
                                        About Us
                                    </a>
                                </div>
                                <div class="text-xl py-5">
                                    <a href="#">
                                        Store Locator
                                    </a>
                                </div>
                                <div class="text-xl py-5">
                                    <a href="#">
                                        Return Refund
                                    </a>
                                </div>
                            </div>
                            <div class="col-span-1">
                                <div class="text-xl">
                                    Follow Us
                                </div>
                                <div class="flex mt-3">
                                    <div class="ml-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                            fill="currentColor" class="bi bi-facebook" viewBox="0 0 16 16">
                                            <path
                                                d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951" />
                                        </svg>
                                    </div>
                                    <div class="ml-5">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                            fill="currentColor" class="bi bi-tiktok" viewBox="0 0 16 16">
                                            <path
                                                d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <div class="col-span-1">
                                <div class="text-xl font-bold mb-4">
                                    Contact Us
                                </div>
                                <div class="text-base mb-2">
                                    bnfbombs@gmail.com
                                </div>
                                <div class="text-base mb-2">
                                    bombsincbathbombs@gmail.com
                                </div>
                                <div class="text-base mb-2">
                                    0995 954 7558
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        @endif
    @endauth
    @guest
        <div class="text-black">
            @yield('main-content')
        </div>
        <div class="bg-black text-white mt-12">
            <div class="py-12 px-20">
                <div class=" border-b-2 border-white pb-8 px-4">
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                        {{-- FIRST --}}
                        <div class="col-span-1">
                            <div class="text-xl py-5">
                                <a href="#">
                                    Products
                                </a>
                            </div>
                            <div class="text-xl py-5">
                                <a href="#">
                                    About Us
                                </a>
                            </div>
                            <div class="text-xl py-5">
                                <a href="#">
                                    Store Locator
                                </a>
                            </div>
                            <div class="text-xl py-5">
                                <a href="#">
                                    Return Refund
                                </a>
                            </div>
                        </div>
                        <div class="col-span-1">
                            <div class="text-xl">
                                Follow Us
                            </div>
                            <div class="flex mt-3">
                                <div class="ml-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                        fill="currentColor" class="bi bi-facebook" viewBox="0 0 16 16">
                                        <path
                                            d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951" />
                                    </svg>
                                </div>
                                <div class="ml-5">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                        fill="currentColor" class="bi bi-tiktok" viewBox="0 0 16 16">
                                        <path
                                            d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div class="col-span-1">
                            <div class="text-xl font-bold mb-4">
                                Contact Us
                            </div>
                            <div class="text-base mb-2">
                                bnfbombs@gmail.com
                            </div>
                            <div class="text-base mb-2">
                                bombsincbathbombs@gmail.com
                            </div>
                            <div class="text-base mb-2">
                                0995 954 7558
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    @endguest
@endsection
