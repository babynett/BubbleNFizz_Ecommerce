@extends('layouts.navbar')

@section('main-content')
    <div id="ProductPage" data-id="{{ $id }}" data-user="{{ Auth::user() }}"></div>
@endsection