@extends('layouts.navbar')

@section('main-content')
    <div id="EditProfile" data-user="{{ Auth::user() }}"></div>
@endsection