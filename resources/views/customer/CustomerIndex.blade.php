@extends('layouts.navbar')

@section('main-content')
    @guest
    <div id="ShoppingPage" data-image="{{ json_encode([asset('images/static/slideshit.png'), asset('images/static/sugarscrub.png'), asset('images/static/coffeescrub.png'), asset('images/static/image 261.png'), asset('images/static/image 262.png'), asset('images/static/image 263.png')]) }}"></div>
    @endguest
    @auth
    <div id="ShoppingPage" data-user="{{ Auth::user() }}" data-image="{{ json_encode([asset('images/static/slideshit.png'), asset('images/static/sugarscrub.png'), asset('images/static/coffeescrub.png'), asset('images/static/image 261.png'), asset('images/static/image 262.png'), asset('images/static/image 263.png')]) }}"></div>
    @endauth
@endsection