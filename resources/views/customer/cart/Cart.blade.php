@extends('layouts.navbar')

@section('main-content')
    <div id="CartPage" data-user="{{ Auth::user() }}"></div>
@endsection