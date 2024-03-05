<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Scripts -->
    <script src="{{ asset('js/app.js') }}" defer></script>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.24.0/axios.min.js" integrity="sha512-u9akINsQsAkG9xjc1cnGF4zw5TFDwkxuc9vUp5dltDWYCSmyd0meygbvgXrlc/z7/o4a19Fb5V0OUE58J7dcyw==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <link
        href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
        rel="stylesheet">
        <script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>

    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
</head>

<body>
    <div id="app">
        <!-- component -->
        <div class="flex min-h-screen flex-row bg-gray-100 text-white">
            @if (Auth::user()->user_role != 3)
                
            <aside id="sidebar"
                class="sidebar w-60 -translate-x-full transform bg-black py-4 transition-transform duration-150 ease-in md:translate-x-0 md:shadow-md">
                <div class="my-4 w-full border-b-2 border-indigo-100 text-center pb-5">
                    <span class="font-bold text-xl">BUBBLE N FIZZ</span>
                </div>
                <div class="m-4 border-b-2">
                    <div class="my-4">
                        <a href="/home" class="text-sm font-bold cursor-pointer hover:text-amber-500">> DASHBOARD</a>
                    </div>
                    <div class="my-4">
                        <a href="/home" class="text-sm font-bold cursor-pointer hover:text-amber-500">> SETTINGS</a>
                    </div>
                </div>
                <div class="m-4 border-b-2">
                    <div class="text-sm font-bold">ORDER MANAGEMENT</div>
                    <ul class="ml-4 translate-y-0">
                        <li class="my-2">
                            <a href="#" class="text-xs no-underline hover:text-amber-500">> Refunds</a>
                        </li>
                        <li class="my-2">
                            <a href="#" class="text-xs no-underline hover:text-amber-500">> Canceled Orders</a>
                        </li>
                        <li class="my-2">
                            <a href="/orders" class="text-xs no-underline hover:text-amber-500">> Pending Delivery/Shipping</a>
                        </li>
                        <li class="my-2">
                            <a href="#" class="text-xs no-underline hover:text-amber-500">> Pending Payments</a>
                        </li>
                    </ul>
                </div>
                <div class="m-4 border-b-2">
                    <div class="text-sm font-bold">PRODUCT INVENTORY</div>
                    <ul class="ml-4">
                        <li class="my-2">
                            <a href="/productsmanagement" class="text-xs no-underline hover:text-amber-500">> Product Management</a>
                        </li>
                        <li class="my-2">
                            <a href="#" class="text-xs no-underline hover:text-amber-500">> Deleted Products</a>
                        </li>
                    </ul>
                </div>
                <div class="m-4 border-b-2">
                    <div class="text-sm font-bold">SALES REPORT AND PRODUCT RATINGS</div>
                    <ul class="ml-4">
                        <li class="my-2">
                            <a href="/analyticsboard" class="text-xs no-underline hover:text-amber-500">> Analytics Board</a>
                        </li>
                        <li class="my-2">
                            <a href="#" class="text-xs no-underline hover:text-amber-500">> Ratings and Reviews</a>
                        </li>
                    </ul>
                </div>
                <div class="m-4 border-b-2">
                    <div class="text-sm font-bold">ACCOUNT MANAGEMENT</div>
                    <ul class="ml-4">
                        <li class="my-2">
                            <a href="/customersaccounts" class="text-xs no-underline hover:text-amber-500">> Customers
                                Accounts</a>
                        </li>
                        <li class="my-2">
                            <a href="/employeesaccounts" class="text-xs no-underline hover:text-amber-500">> Employees
                                Accounts</a>
                        </li>
                    </ul>
                </div>
                <div class="m-4 border-b-2">
                    <div class="text-sm font-bold">CASH DRAWER</div>
                    <ul class="ml-4">
                        <li class="my-2">
                            <a href="#" class="text-xs no-underline hover:text-amber-500">>
                                Deposit/Withdrawals</a>
                        </li>
                        <li class="my-2">
                            <a href="#" class="text-xs no-underline hover:text-amber-500">> Balance</a>
                        </li>
                        <li class="my-2">
                            <a href="#" class="text-xs no-underline hover:text-amber-500">> Payment Register</a>
                        </li>
                    </ul>
                </div>
                {{-- <div class="m-4 border-b-2">
                    <div class="text-sm font-bold">SETTINGS</div>
                    <ul class="ml-4">
                        <li class="my-2">
                            <a href="#" class="text-xs no-underline hover:text-amber-500">> News Feed</a>
                        </li>
                        <li class="my-2">
                            <a href="#" class="text-xs no-underline hover:text-amber-500">> Store Page</a>
                        </li>
                        <li class="my-2">
                            <a href="#" class="text-xs no-underline hover:text-amber-500">> Main Settings</a>
                        </li>
                    </ul>
                </div> --}}
            </aside>
            @endif
            <main id="mainContent"
                class="main -ml-60 flex flex-grow flex-col transition-all duration-150 ease-in md:ml-0">
                <div class="flex h-full bg-white flex-col shadow-md">
                    @yield('content')
                </div>
            </main>
        </div>
    </div>
    <script type="text/javascript">
        const show = document.getElementById('arrowRight')
        const hide = document.getElementById('arrowLeft')
        const mainContent = document.getElementById('mainContent')
        const sidebar = document.getElementById('sidebar')

        show.addEventListener('click', () => {
            sidebar.classList.remove('-translate-x-full')
            mainContent.classList.remove('-ml-60')
            show.classList.add('hidden')
            hide.classList.remove('hidden')
        })
        hide.addEventListener('click', () => {
            sidebar.classList.add('-translate-x-full')
            mainContent.classList.add('-ml-60')
            show.classList.remove('hidden')
            hide.classList.add('hidden')
        })
        @if (Auth::user()->user_role == 3)
            $(document).ready(() => {
                const userId = "{{ Auth::user()->id }}"
                axios.get(`api/shopping/getusercartcount?user_id=${userId}`)
                    .then(response => {
                        $('#cartItems').html(`${response.data}`)
                    })
                    .catch(err => {
                        console.log(err.response)
                    })
            })
        @endif
    </script>
</body>

</html>
