@extends('layouts.navbar')
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

@section('main-content')

<?php $role = $user->user_role; ?>

    <div id="Dashboard" data-user="{{ $user }}"></div>

    <?php if($role == '1'){ ?>
    @php
            // MySQLi Connection
            $servername = "localhost";
            $username = "root";
            $password = "";
            $dbname = "bubble_n_fizz";

            // Create connection
            $conn = new mysqli($servername, $username, $password, $dbname);

            // Check connection
            if ($conn->connect_error) {
                die("Connection failed: " . $conn->connect_error);
            }

            // Perform query to get products with stock < 50
            $sql = "SELECT product_name, product_stock FROM products WHERE product_stock < 50";
            $result = $conn->query($sql);

            // Fetch products that need restocking
            $productsToRestock = [];
            if ($result->num_rows > 0) {
                while ($row = $result->fetch_assoc()) {
                    $productsToRestock[] = $row;
                }
            }

            // Perform query to calculate total_price per month
            $sql = "
                SELECT
                    DATE_FORMAT(created_at, '%Y-%m') AS month,
                    SUM(total_price) AS total_sales
                FROM orders
                WHERE payment_status = 'Paid'
                GROUP BY month
                ORDER BY month ASC
            ";
            $result = $conn->query($sql);

            // Check if there are results
            if ($result->num_rows > 0) {
                // Store results in an array
                $monthlySales = [];
                while ($row = $result->fetch_assoc()) {
                    $monthlySales[] = $row;
                }
            } else {
                $monthlySales = [];
            }

            // Close connection
            $conn->close();
    // Define all months of the year (January to December)
    $allMonths = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];

    // Prepare sales data for all months, even if sales data is 0 for a month
    $salesData = [];
    $monthsData = [];

    foreach ($allMonths as $month) {
        $salesData[] = 0; // Default sales data to 0
        $monthsData[] = $month; // Store month names
    }

    // Assign actual sales data to the corresponding months
    foreach ($monthlySales as $sales) {
        $monthIndex = array_search(date('M', strtotime($sales['month'])), $allMonths);
        if ($monthIndex !== false) {
            $salesData[$monthIndex] = $sales['total_sales'];
        }
    }

    // Format months as 'Jan-2024' instead of '2024-01'
    $formattedMonths = [];
    foreach ($monthlySales as $sales) {
        $formattedMonths[] = \Carbon\Carbon::createFromFormat('Y-m', $sales['month'])->format('M-Y');
    }
        @endphp

        <div>
            <canvas id="monthlySalesChart"></canvas>
        </div>

        @if(count($monthlySales) > 0)
            <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
            <script>
                const monthlySalesData = {
                    labels: @json($formattedMonths),// Months
                    datasets: [{
                        label: 'Total Sales (₱)',
                        data: @json(array_column($monthlySales, 'total_sales')), // Total sales per month
                        fill: false,
                        borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: [
                'rgba(75, 192, 192, 0.6)',   // Jan color
                'rgba(255, 99, 132, 0.6)',    // Feb color
                'rgba(54, 162, 235, 0.6)',    // Mar color
                'rgba(255, 159, 64, 0.6)',    // Apr color
                'rgba(153, 102, 255, 0.6)',   // May color
                'rgba(255, 205, 86, 0.6)',    // Jun color
                'rgba(75, 192, 192, 0.6)',    // Jul color
                'rgba(255, 159, 64, 0.6)',    // Aug color
                'rgba(153, 102, 255, 0.6)',   // Sep color
                'rgba(54, 162, 235, 0.6)',    // Oct color
                'rgba(75, 192, 192, 0.6)',    // Nov color
                'rgba(255, 99, 132, 0.6)'     // Dec color
            ],
            tension: 0.1
                    }]
                };

                const config = {
                    type: 'bar',
                    data: monthlySalesData,
                    options: {
                        plugins: {
                            legend: {
                                position: 'top',
                            },
                            title: {
                                display: true,
                                text: 'Monthly Sales (Paid Orders)',
                            },
                        },
                        scales: {
                            x: {
                                title: {
                                    display: true,
                                    text: 'Month'
                                }
                            },
                            y: {
                                title: {
                                    display: true,
                                    text: 'Total Sales (₱)'
                                }
                            }
                        }
                    }
                };

                const ctx = document.getElementById('monthlySalesChart').getContext('2d');
                new Chart(ctx, config);
            </script>
        @else
            <p>No sales data available for the selected period.</p>
        @endif


    <!-- Custom CSS for Modal -->
    <style>
        /* Modal styles */
        .modal {
            display: none; /* Hidden by default */
            position: fixed;
            z-index: 1;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            overflow: auto;
            background-color: rgba(0, 0, 0, 0.5); /* Black background with opacity */
        }

        .modal-content {
            background-color: #fff;
            margin: 12% auto;
            padding: 20px;
            border-radius: 10px;
            width: 100%; /* Adjust modal width */
            max-width: 700px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }

        .close-btn {
            color: #aaa;
            float: right;
            font-size: 28px;
            font-weight: bold;
            cursor: pointer;
        }

        .close-btn:hover,
        .close-btn:focus {
            color: black;
            text-decoration: none;
            cursor: pointer;
        }

        .product-list {
            list-style-type: none;
            padding: 0;
        }

        .product-list li {
            margin-bottom: 10px;
            font-size: 16px;
        }

        .product-list strong {
            color: #007bff;
        }
    </style>

           <!-- Modal to display products that need restocking -->
           @if(count($productsToRestock) > 0)
            <div class="modal fade" id="restockModal" tabindex="-1" aria-labelledby="restockModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                        <span class="close-btn" onclick="closeModal()">&times;</span>
                            <h5 class="modal-title" id="restockModalLabel" style="font-size:4vh; font-weight:bold; border-bottom:2px solid black; text-align:center;">Products Needing Restock</h5>

                        </div>
                        <div class="modal-body">
                            <ul class="list-group">
                                @foreach($productsToRestock as $product)
                                    <li class="list-group-item" style="padding:15px; border-bottom:0.5px solid gray;">
                                        <strong>{{ $product['product_name'] }}</strong> <span style="float:right;"><b>{{ $product['product_stock'] }}</b> Stocks Only</span>
                                    </li>
                                @endforeach
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <script>
                // Display the modal upon page load
                window.onload = function() {
                    var myModal = new bootstrap.Modal(document.getElementById('restockModal'), {
                        keyboard: false
                    });
                    myModal.show();
                };
            </script>
        @else
        @endif
    <!-- JavaScript to handle modal visibility -->
    <script>
        // Display the modal upon page load
        window.onload = function() {
            var modalg = document.getElementById("restockModal");
            var closeBtn = document.getElementsByClassName("close-btng")[0];

            // Show the modal
            modalg.style.display = "block";

            // Close the modal when the user clicks the close button
            closeBtn.onclick = function() {
                modalg.style.display = "none";
            };



            // Close the modal when the user clicks outside the modal
            window.onclick = function(event) {
                if (event.target == modalg) {
                    modalg.style.display = "none";
                }
            };
        };


            // Close the modal using a function
            function closeModal() {
                const modalg1 = document.getElementById('restockModal');
                modalg1.style.display = 'none';
            }
    </script>
    <?php } ?>
@endsection
