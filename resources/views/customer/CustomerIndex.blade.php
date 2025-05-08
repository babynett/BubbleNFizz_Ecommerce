@extends('layouts.navbar')

@section('main-content')

<div
    class="w-full h-[85vh] bg-no-repeat bg-cover bg-center bg-fixed"
    style="background-image: url('http://127.0.0.1:8000/images/static/slideshit.png');"
>
    <div class="flex justify-center items-center flex-col h-full">
        <div class="text-9xl font-bold">RICH</div>
        <div class="text-9xl font-bold">PEOPLE</div>
        <div class="text-9xl font-bold">SOAP</div>
        <div class="my-10">
            <button
                style="background-color: #000; color: #fff; font-weight: 700; font-size: 20px; padding-left: 12px; padding-right: 12px;"
            >
                BATH NOW
            </button>
        </div>
    </div>
</div>

    <?php if(Auth::check()): ?>
        <?php
            // Database connection parameters
            $servername = "localhost"; // Your server
            $username = "root";        // Your database username
            $password = "";            // Your database password
            $dbname = "bubble_n_fizz"; // Your database name

            // Create connection using MySQLi
            $conn = new mysqli($servername, $username, $password, $dbname);

            // Check connection
            if ($conn->connect_error) {
                die("Connection failed: " . $conn->connect_error);
            }
        ?>
        <div class="mx-10 my-12">
            <h4 class="MuiTypography-root MuiTypography-h4 css-1313egv-MuiTypography-root">POLL RESULT RECOMMENDED PRODUCTS</h4>
            <h6 class="MuiTypography-root MuiTypography-subtitle1 css-1jhek0z-MuiTypography-root">Here are the products that your poll result have generated!</h6>
        </div>
        <div class="mx-10">
        <div class="grid grid-cols-1 lg:grid-cols-6 gap-5">
        <?php
            // Fetch product stock from the database
            $user_idssss = Auth::user()->id;

            // Run a SELECT query
            $sql = "SELECT * FROM user_answers WHERE user_id = '$user_idssss'";
            $result = $conn->query($sql);

            $totalscore1 = 0;
            $totalscore2 = 0;
            $totalscore3 = 0;
            $totalscore4 = 0;
            $totalscore5 = 0;
            $allergic = 'No';
            // Check if there are results
            if ($result->num_rows > 0) {
                // Output data of each row
                while($row = $result->fetch_assoc()) {
                    $set1_q1 = $row['set1_q1'];
                    $set1_q2 = $row['set1_q2'];
                    $set1_q3 = $row['set1_q3'];
                    $set1_q4 = $row['set1_q4'];
                    $set1_q5 = $row['set1_q5'];

                    $set2_q1 = $row['set2_q1'];
                    $set2_q2 = $row['set2_q2'];
                    $set2_q3 = $row['set2_q3'];
                    $set2_q4 = $row['set2_q4'];
                    $set2_q5 = $row['set2_q5'];

                    $set3_q1 = $row['set3_q1'];
                    $set3_q2 = $row['set3_q2'];
                    $set3_q3 = $row['set3_q3'];
                    $set3_q4 = $row['set3_q4'];
                    $set3_q5 = $row['set3_q5'];

                    $set4_q1 = $row['set4_q1'];
                    $set4_q2 = $row['set4_q2'];
                    $set4_q3 = $row['set4_q3'];
                    $set4_q4 = $row['set4_q4'];
                    $set4_q5 = $row['set4_q5'];

                    $set5_q1 = $row['set5_q1'];
                    $set5_q2 = $row['set5_q2'];
                    $set5_q3 = $row['set5_q3'];
                    $set5_q4 = $row['set5_q4'];
                    $set5_q5 = $row['set5_q5'];

                    $totalscore1 = $set1_q1 + $set1_q2 + $set1_q3 + $set1_q4 + $set1_q5;
                    $totalscore2 = $set2_q1 + $set2_q2 + $set2_q3 + $set2_q4 + $set2_q5;
                    $totalscore3 = $set3_q1 + $set3_q2 + $set3_q3 + $set3_q4 + $set3_q5;
                    $totalscore4 = $set4_q1 + $set4_q2 + $set4_q3 + $set4_q4 + $set4_q5;
                    $totalscore5 = $set5_q1 + $set5_q2 + $set5_q3 + $set5_q4 + $set5_q5;


                    $totalscore1 = $totalscore1 / 5;
                    $totalscore2 = $totalscore2 / 5;
                    $totalscore3 = $totalscore3 / 5;
                    $totalscore4 = $totalscore4 / 5;
                    $totalscore5 = $totalscore5 / 5;

                    $allergic = $row['allergy'];
                }
            }

            $categories_torecommend = [];

            if ($totalscore1 >= 7) {
                // Add recommended products to the array if not already added
                if (!in_array("Bath Bomb", $categories_torecommend)) {
                    $categories_torecommend[] = "Bath Bomb";
                }
                if (!in_array("Bubble Bath", $categories_torecommend)) {
                    $categories_torecommend[] = "Bubble Bath";
                }
                if (!in_array("Shampoo Bars", $categories_torecommend)) {
                    $categories_torecommend[] = "Shampoo Bars";
                }
                if (!in_array("Artisan Facial and Body Soaps", $categories_torecommend)) {
                    $categories_torecommend[] = "Artisan Facial and Body Soaps";
                }
            }

            if ($totalscore2 >= 7) {
                // Add these items if not already present
                if (!in_array("Bath Bomb", $categories_torecommend)) {
                    $categories_torecommend[] = "Bath Bomb";
                }
                if (!in_array("Bubble Bath", $categories_torecommend)) {
                    $categories_torecommend[] = "Bubble Bath";
                }
                if (!in_array("Shampoo Bars", $categories_torecommend)) {
                    $categories_torecommend[] = "Shampoo Bars";
                }
            }
            if ($totalscore3 >= 7) {
                // Add these items if not already present
                if (!in_array("Bath Bomb", $categories_torecommend)) {
                    $categories_torecommend[] = "Bath Bomb";
                }
                if (!in_array("Bubble Bath", $categories_torecommend)) {
                    $categories_torecommend[] = "Bubble Bath";
                }
            }
            if ($totalscore4 >= 7) {
                // Add recommended products to the array if not already added
                if (!in_array("Bath Bomb", $categories_torecommend)) {
                    $categories_torecommend[] = "Bath Bomb";
                }
                if (!in_array("Bubble Bath", $categories_torecommend)) {
                    $categories_torecommend[] = "Bubble Bath";
                }
                if (!in_array("Shampoo Bars", $categories_torecommend)) {
                    $categories_torecommend[] = "Shampoo Bars";
                }
                if (!in_array("Artisan Facial and Body Soaps", $categories_torecommend)) {
                    $categories_torecommend[] = "Artisan Facial and Body Soaps";
                }
            }
            if ($totalscore5 >= 7) {
                // Add recommended products to the array if not already added
                if (!in_array("Bath Bomb", $categories_torecommend)) {
                    $categories_torecommend[] = "Bath Bomb";
                }
                if (!in_array("Bubble Bath", $categories_torecommend)) {
                    $categories_torecommend[] = "Bubble Bath";
                }
                if (!in_array("Shampoo Bars", $categories_torecommend)) {
                    $categories_torecommend[] = "Shampoo Bars";
                }
                if (!in_array("Artisan Facial and Body Soaps", $categories_torecommend)) {
                    $categories_torecommend[] = "Artisan Facial and Body Soaps";
                }
            }

            if ($allergic == 'Yes') {
                // Check if "Shampoo Bars" and "Artisan Facial and Body Soaps" are in the $categories_torecommend array
                if (in_array("Shampoo Bars", $categories_torecommend)) {
                    // Remove "Shampoo Bars" from the array
                    $categories_torecommend = array_diff($categories_torecommend, ["Shampoo Bars"]);
                }

                if (in_array("Artisan Facial and Body Soaps", $categories_torecommend)) {
                    // Remove "Artisan Facial and Body Soaps" from the array
                    $categories_torecommend = array_diff($categories_torecommend, ["Artisan Facial and Body Soaps"]);
                }
            }

            if (!empty($categories_torecommend)) {
            $placeholders = implode(',', array_fill(0, count($categories_torecommend), '?'));
            $sql = "SELECT product_id FROM product_categories WHERE product_category IN ($placeholders) GROUP BY product_category, product_id LIMIT 2";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param(str_repeat('s', count($categories_torecommend)), ...$categories_torecommend);
            $stmt->execute();
            $result = $stmt->get_result();
            $product_ids = [];
            while ($row = $result->fetch_assoc()) {
                $product_ids[] = $row['product_id'];
            }

            $stmt->close();
            if (!empty($product_ids)) {
                 // Prepare the SQL query to fetch product details based on product_id
                $placeholders = implode(',', array_fill(0, count($product_ids), '?'));
                $sql = "SELECT * FROM products WHERE id IN ($placeholders) AND is_deleted = '0'";

                // Prepare and execute the query
                $stmt = $conn->prepare($sql);

                // Dynamically bind the product_ids to the placeholders
                $stmt->bind_param(str_repeat('s', count($product_ids)), ...$product_ids);

                $stmt->execute();
                $product_result = $stmt->get_result();

                // Fetch product details
                $products = [];
                while ($row = $product_result->fetch_assoc()) {
       ?>

                <div class="col-span-1">
                    <a href="/shopping/<?php echo $row['id']; ?>">
                    <div class="border-2 flex justify-center items-center flex-col hover:border-amber-500">
                    <img src="https://bubblenfizz-store.com/BubbleNFizz-main/public/image/products/<?php echo $row['product_images']; ?>" height="150" width="250">
                    <div class="my-8 w-1/2 text-center"><p class="MuiTypography-root MuiTypography-body1 css-ndaqpv-MuiTypography-root"> <?php echo $row['product_name']; ?></p></div>
                    <p class="MuiTypography-root MuiTypography-body1 css-ahj2mt-MuiTypography-root"><?php echo $row['product_scent_name']; ?></p>
                    <div class="my-8 w-1/2 text-center underline">₱<?php echo $row['product_price']; ?></div>
                    </div>
                    </a>
                </div>
        <?php }
    $stmt->close(); } }?>

    </div>
        </div>
    <?php endif; ?>

    @guest
    <div id="ShoppingPage" data-image="{{ json_encode([asset('images/static/slideshit.png'), asset('images/static/sugarscrub.png'), asset('images/static/coffeescrub.png'), asset('images/static/image 261.png'), asset('images/static/image 262.png'), asset('images/static/image 263.png')]) }}"></div>
    @endguest
    @auth
    <div id="ShoppingPage" data-user="{{ Auth::user() }}" data-image="{{ json_encode([asset('images/static/slideshit.png'), asset('images/static/sugarscrub.png'), asset('images/static/coffeescrub.png'), asset('images/static/image 261.png'), asset('images/static/image 262.png'), asset('images/static/image 263.png')]) }}"></div>
    @endauth

    <style>
        .row {
            display: flex;
            flex-wrap: wrap;
        }

        /* Column base styles */
        [class*="col-"] {
            position: relative;
            width: 100%;
            padding-right: 15px;
            padding-left: 15px;
        }

        /* Extra small breakpoint (xs): Applies to all screen sizes by default */
        .col-xs-6 {
            flex: 0 0 50%; /* 50% width */
            max-width: 50%;
        }

        /* Medium breakpoint (md): Applies at ≥768px */
        @media (min-width: 768px) {
            .col-md-4 {
                flex: 0 0 33.3333%; /* 33.33% width */
                max-width: 33.3333%;
            }
        }
        .test_box {
            padding: 0;
        }
        .test_box .inner {
            background: transparent;
            display: block;
            margin: 10px;
            overflow: hidden;
        }
        .test_box .inner .test_click {
            -webkit-align-content: center;
            -ms-flex-line-pack: center;
            align-content: center;
            -webkit-align-items: center;
            -ms-flex-align: center;
            align-items: center;
            color: #fff;
            display: -webkit-flex;
            display: -ms-flexbox;
            display: flex;
            flex-wrap: wrap;
            height: 300px;
            mix-blend-mode: normal;
            text-align: center;
            text-decoration: none;
            -webkit-transition: all 300ms ease;
            transition: all 300ms ease;
        }
        .test_box .inner .test_click:hover {
            background-color: rgba(0,100,255,.5);
            mix-blend-mode: hard-light;
        }
        .flex_this {
            -webkit-align-content: center;
            -ms-flex-line-pack: center;
            align-content: center;
            display: inherit;
            flex-wrap: inherit;
            height: auto;
            margin: 0;
            padding: 10px;
            -webkit-transition: all 300ms ease;
            transition: all 300ms ease;
            width: 100%;

        }
        .test_box .inner .test_click:hover .flex_this {
            margin-top: -5px;
        }

        .test_title {
            display: block;
            font-weight: 700;
            margin: 0 0 20px;
            width: 100%;
        }
        .test_link {
            border: 2px solid #fff;
            display: inline-block;
            font-size: .8em;
            font-weight: 700;
            letter-spacing: .1em;
            margin: 0 auto;
            padding: 10px 30px;
            text-transform: uppercase;
        }

        .box-01 .inner {
            background-image: url('https://upload.wikimedia.org/wikipedia/en/thumb/2/2c/When_In_Manila_logo.svg/1200px-When_In_Manila_logo.svg.png');
            background-position: 50% 50%;
            background-repeat: no-repeat;
            background-size: 70% 90%;
        }
        .box-02 .inner {
            background-image: url('https://upload.wikimedia.org/wikipedia/commons/1/1a/Comopolitan_Magazine_Logo.svg');
            background-position: 50% 50%;
            background-repeat: no-repeat;
            background-size: 100% 100%;
        }
        .box-03 .inner {
            background-image: url('https://cdn.dribbble.com/users/3739203/screenshots/11522650/myhome_1___4x.png');
            background-position: 50% 50%;
            background-repeat: no-repeat;
            background-size: cover;
        }
        .box-04 .inner {
            background-image: url('https://northernliving.co.nz/wp-content/uploads/2021/03/Outdoor-living-nz-hero-image-1024x683.jpg?6bfec1&6bfec1');
            background-position: 50% 50%;
            background-repeat: no-repeat;
            background-size: cover;
        }
        .box-05 .inner {
            background-image: url('https://www.rosmarproductsonlineshop.com/cdn/shop/files/rosmar_logo.png?height=628&pad_color=ffffff&v=1684952376&width=1200');
            background-position: 50% 50%;
            background-repeat: no-repeat;
            background-size: cover;
        }
        .box-06 .inner {
            background-image: url('https://belomed.com/wp-content/uploads/2018/07/Belo-Logo-CA8161-0218-edited-scaled.jpg');
            background-position: 50% 50%;
            background-repeat: no-repeat;
            background-size: cover;
        }
    </style>

    <div class="row" style="margin-left:1vh; margin-left:1vh;">
		<div class="test_box box-01 col-xs-6 col-md-4">
			<div class="inner">
				<a href="#" class="test_click">
					<div class="flex_this">
					</div>
				</a>
			</div>
		</div>
		<div class="test_box box-02 col-xs-6 col-md-4">
			<div class="inner">
				<a href="#" class="test_click">
					<div class="flex_this">
					</div>
				</a>
			</div>
		</div>
		<div class="test_box box-03 col-xs-6 col-md-4">
			<div class="inner">
				<a href="#" class="test_click">
					<div class="flex_this">
					</div>
				</a>
			</div>
		</div>
		<div class="test_box box-04 col-xs-6 col-md-4">
			<div class="inner">
				<a href="#" class="test_click">
					<div class="flex_this">
					</div>
				</a>
			</div>
		</div>
		<div class="test_box box-05 col-xs-6 col-md-4">
			<div class="inner">
				<a href="#" class="test_click">
					<div class="flex_this">
					</div>
				</a>
			</div>
		</div>
		<div class="test_box box-06 col-xs-6 col-md-4">
			<div class="inner">
				<a href="#" class="test_click">
					<div class="flex_this">
					</div>
				</a>
			</div>
		</div>
    </div>
@endsection
