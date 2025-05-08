@extends('layouts.navbar')


<?php
    // Fetch database connection values from .env file
    $servername = env('DB_HOST', '127.0.0.1');    // Default: 127.0.0.1
    $username = env('DB_USERNAME', 'root');        // Default: root
    $password = env('DB_PASSWORD', '');            // Default: empty string
    $dbname = env('DB_DATABASE', 'bubble_n_fizz'); // Default: bubble_n_fizz
    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    // Fetch product stock from the database
    $user_id = Auth::user()->id;
?>
@section('main-content')
    <div id="ProductPage" data-id="{{ $id }}" data-user="
    @auth
    {{ Auth::user() }}
    @endauth
    " @guest
    data-guest="true"
    @endguest>
</div>
<?php

    // Fetch product stock from the database
    $user_id = Auth::user()->id;
    $total_carted = 0;
    $total_stock = 0;

    $productStockQuery = "SELECT SUM(cart_quantity) as total_get FROM carts WHERE user_id = '$user_id' AND product_id = '$id'";
    $result = $conn->query($productStockQuery);

    $productStock = 0; // Default value if no product found
    if ($result->num_rows > 0) {
        // Output the product stock
        while ($row = $result->fetch_assoc()) {
            $total_carted = $row['total_get'];
        }
    }

    $productStockQuery = "SELECT product_stock FROM products WHERE id = '$id'";
    $result = $conn->query($productStockQuery);

    $productStock = 0; // Default value if no product found
    if ($result->num_rows > 0) {
        // Output the product stock
        while ($row = $result->fetch_assoc()) {
            $total_stock = $row['product_stock'];
        }
    }

    if($total_carted >= $total_stock){
?>
<script>
    document.addEventListener("DOMContentLoaded", () => {
        const addToCartButton = document.getElementById("addToCartButton");
        let totalCarted = <?php echo $total_carted; ?>;

        // Disable the button and change its appearance
        addToCartButton.disabled = true;
        addToCartButton.style.backgroundColor = "#ccc";

        // Update the button text
        addToCartButton.innerText = `You have already added the maximum stock of this product to your cart.`;
    });
</script>

    <?php } ?>
@endsection
