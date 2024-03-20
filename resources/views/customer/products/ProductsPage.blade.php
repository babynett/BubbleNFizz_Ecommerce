@extends('layouts.navbar')

@section('main-content')
    <div id="ProductPage" data-id="{{ $id }}" data-user="
    @auth
    {{ Auth::user() }}
    @endauth
    " @guest
    data-guest="true"
    @endguest></div>
@endsection