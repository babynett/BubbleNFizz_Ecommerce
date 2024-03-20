@extends('layouts.navbar')

@section('main-content')
    <div class="w-full">
        <img src="{{ asset('images/static/aboutus1.png') }}" class="absolute top-10 left-0 hidden lg:block" alt=""
            srcset="">
        <img src="{{ asset('images/static/aboutus2.png') }}" class="absolute bottom-10 right-0 hidden lg:block" alt=""
            srcset="">
        <div class="my-10 lg:mx-96 mx-24 w-full">
            <div class="text-4xl text-amber-500 font-semibold">About</div>
            <div class="text-7xl text-slate-700 font-bold">BUBBLE N FIZZ</div>
            <div class="div text-xl whitespace-break-spaces text-justify">
Bubble N Fizz is a sole proprietorship that sells a variety of
handcrafted soaps such as bath bombs, bubble baths, bath
salts, and body scrubs. The business sells its products through
well-known e-commerce platforms such as Facebook,
Instagram, Lazada, and Shopee. Together with our brick-andmortar 
store in SM Fairview and Productionfacility in
Novaliches. The brand focuses on providing a quality and
affordable product for the bath and beauty sector that can
stand out in the market on a different approach.
            </div>
        </div>
        <div class="my-10 lg:mx-96 mx-24 w-full">
            <div class="text-4xl text-amber-500 font-semibold">Vision &</div>
            <div class="text-7xl text-slate-700 font-bold">MISSION</div>
            <div class="text-4xl mt-12 lg:mt-24 font-bold">
                Vision
            </div>
            <div class="div text-xl text-justify whitespace-break-spaces mt-4">
Bubble N Fizz’s mission is to produce and sell affordable bath bombs to the
local market, having started in online stores, but as we branch out our services
through brick and mortar, our horizons would also expand as we also seek to
sell and provide for customers residing beyond the reaches of our borders. We
aim to constantly improve and diversify our bath bombs among the rest of our
products to their liking, meshing their endless expectations with the relaxing
and vibrant experience which we’ve always promised and fulfilled the day we
started this business.
            </div>
            <div class="text-4xl mt-12 font-bold">
                Mission
            </div>
            <div class="div text-xl text-justify whitespace-break-spaces mt-4">
Bubble N Fizz’s mission is to produce and sell affordable bath bombs to the
local market, having started in online stores, but as we branch out our services
through brick and mortar, our horizons would also expand as we also seek to
sell and provide for customers residing beyond the reaches of our borders. We
aim to constantly improve and diversify our bath bombs among the rest of our
products to their liking, meshing their endless expectations with the relaxing
and vibrant experience which we’ve always promised and fulfilled the day we
started this business.
            </div>
        </div>
    </div>
@endsection
