@extends('layouts.navbar')

@section('main-content')
<style>
    .label-styleget {
  left:28% !important;
  top: 322px;
  position: absolute; /* Add this if needed for positioning */
  background-color:white;
  padding-left:5px;
  padding-right:5px;
}

</style>
    <div id="EditProfile" data-user="{{ $user }}"></div>
@endsection
