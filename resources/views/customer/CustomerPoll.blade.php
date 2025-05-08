@extends('layouts.navbar')

@section('main-content')
<?php
if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['submitbutton'])) {
    // Database connection details
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "bubble_n_fizz"; // Replace with your database name

    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Retrieve and decode the JSON data for the answers
    $answersJson = $_GET['allAnswers'];
    $answersArray = json_decode($answersJson, true);

    // Loop through sets from 1 to 5
    for ($set = 1; $set <= 5; $set++) {
        for ($q = 1; $q <= 5; $q++) {
            $key = "set{$set}-q{$q}";

            // If the key doesn't exist, set it to 0
            if (!isset($answersArray[$key])) {
                $answersArray[$key] = 0;
            }
        }
    }


    // Check the updated array
    echo '<pre>';
    print_r($answersArray);
    echo '</pre>';
    // Get other form inputs
    $birthday = $_GET['birthday'];
    $address = $_GET['address'];
    $city = $_GET['city'];
    $contactno = $_GET['contactnumber'];
    $postalcode = $_GET['postalcode'];
    $user_id = Auth::user()->id; // Assuming this is Laravel's Auth system
    $datesss = date("Y-m-d H:i:s"); // Current date and time
    $allergy = $_GET['allergy'];
    // Insert data into the database
    // Insert user profile information
    $query = "INSERT INTO user_profiles (user_id, birthday, address, city, postal_code, contact_no, created_at, updated_at)
              VALUES ('$user_id', '$birthday', '$address', '$city', '$postalcode', '$contactno', '$datesss', '$datesss')";

    if ($conn->query($query) === TRUE) {
       // echo "User profile inserted successfully." . $user_id;
        // Create the insert query
        $query = "INSERT INTO user_answers
            (user_id, set1_q1, set1_q2, set1_q3, set1_q4, set1_q5,
            set2_q1, set2_q2, set2_q3, set2_q4, set2_q5,
            set3_q1, set3_q2, set3_q3, set3_q4, set3_q5,
            set4_q1, set4_q2, set4_q3, set4_q4, set4_q5,
            set5_q1, set5_q2, set5_q3, set5_q4, set5_q5, created_at, allergy)
            VALUES ('$user_id',
                    '{$answersArray['set1-q1']}', '{$answersArray['set1-q2']}', '{$answersArray['set1-q3']}', '{$answersArray['set1-q4']}', '{$answersArray['set1-q5']}',
                    '{$answersArray['set2-q1']}', '{$answersArray['set2-q2']}', '{$answersArray['set2-q3']}', '{$answersArray['set2-q4']}', '{$answersArray['set2-q5']}',
                    '{$answersArray['set3-q1']}', '{$answersArray['set3-q2']}', '{$answersArray['set3-q3']}', '{$answersArray['set3-q4']}', '{$answersArray['set3-q5']}',
                    '{$answersArray['set4-q1']}', '{$answersArray['set4-q2']}', '{$answersArray['set4-q3']}', '{$answersArray['set4-q4']}', '{$answersArray['set4-q5']}',
                    '{$answersArray['set5-q1']}', '{$answersArray['set5-q2']}', '{$answersArray['set5-q3']}', '{$answersArray['set5-q4']}', '{$answersArray['set5-q5']}',
                    '$datesss', '$allergy')";

        // Execute the query
        if (mysqli_query($conn, $query)) {
            header('Location: /shopping');
            exit();
        } else {
            echo "Error: " . mysqli_error($conn);
        }
    } else {
        echo "Error inserting user profile: " . $conn->error;
    }
    // Close the connection
    $conn->close();
}
?>



<style>
/* Fading Effects */
.fade {
    opacity: 0;
    transition: opacity 0.5s ease-in-out;
}

.fade-in {
    opacity: 1;
}

.fade-out {
    opacity: 0;
    transition: opacity 0.5s ease-in-out;
}

/* Hide elements initially */
#dry-skin-questions, #oily-skin-questions {
    display: none; /* Initially hide both sub-question sections */
}

/* Button Styles */
.scale-buttons {
    margin-top: 20px;
}

.scale-btn {
    width: 60px;
    height: 60px;
    margin: 5px;
    background-color: #f2f2f2;
    border: 1px solid #ddd;
    border-radius: 50%;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.3s ease;
}

.scale-btn:hover {
    background-color: #4CAF50;
    color: white;
    transform: scale(1.1);
}

.scale-btn:active {
    background-color: #45a049;
    color: white;
}

.scale-btn.selected {
    background-color: #4CAF50;
    color: white;
}

/* Next Button */
#next-btn {
    padding: 10px 20px;
    font-size: 16px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

#next-btn:hover {
    background-color: #45a049;
}

#next-btn:active {
    background-color: #388e3c;
}

/* Question Styles */
.question {
    font-size: 6vh;
}

.questiontriangle {
    margin-top: -5vh;
}

.questionp {
    font-size: 2vh;
}

#next-btn:hover {
    background-color: #45a049;
}

#next-btn:active {
    background-color: #388e3c;
}


    /* Heading Styles */
    .MuiTypography-root.MuiTypography-h4 {
        font-size: 24px;
        font-weight: 600;
        color: #333;
        margin-bottom: 20px;
    }

    /* Input fields container */
    .MuiFormControl-root {
        margin-bottom: 20px;
    }

    /* Input Labels */
    .MuiFormLabel-root {
        font-size: 16px;
        font-weight: 500;
        color: #555;
        margin-bottom: 8px;
        display: block;
    }

    /* Input styles */
    .MuiInputBase-root {
        width: 100%;
        height: 40px;
        padding: 10px;
        font-size: 16px;
        border-radius: 4px;
        border: 1px solid #ddd;
        box-sizing: border-box;
        margin-bottom: 10px;
    }

    /* Focus input styles */
    .MuiInputBase-root:focus-within {
        border-color: #4CAF50;
    }

    /* Placeholder styling */
    .MuiInputBase-input::placeholder {
        color: #aaa;
    }

    /* Fieldset border */
    .MuiOutlinedInput-notchedOutline {
        border: none;
    }

    /* Submit Button */
    .MuiButton-root {
        width: 100%;
        padding: 12px;
        background-color: #4CAF50;
        color: white;
        border: none;
        border-radius: 4px;
        font-size: 16px;
        font-weight: bold;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }

    .MuiButton-root:hover {
        background-color: #45a049;
    }

    /* Button Ripple Effect */
    .MuiTouchRipple-root {
        display: none;
    }

        .MuiOutlinedInput-input {
        font: inherit;
        letter-spacing: inherit;
        color: currentColor;
        padding: 4px 0 5px;
        border: 0;
        box-sizing: content-box;
        background: none;
        height: 1.4375em;
        margin: 0;
        -webkit-tap-highlight-color: transparent;
        display: block;
        min-width: 0;
        width: 100%;
        -webkit-animation-name: mui-auto-fill-cancel;
        animation-name: mui-auto-fill-cancel;
        -webkit-animation-duration: 10ms;
        animation-duration: 10ms;
        padding: 16.5px 14px;
        margin-left: -1.5vh;
        margin-top: -2.2vh;
    }
    .question{
        font-size:6vh;
    }
    .questiontriangle{
        margin-top:-5vh;
    }
    .questionp{
        font-size:2vh;
    }
</style>

    <div class="flex justify-center w-full items-center flex-col py-6" id="polldiv" style="height:100vh;">
        <div class="w-2/3">
            <div id="question-container" class="text-center questiontriangle">
                <!-- Main Question 1: Dry Skin -->
                <div id="question1" class="question fade">
                    <h4>Do you frequently experience tightness or discomfort on your body due to dry skin?</h4>
                    <div class="scale-buttons" id="q1-buttons">
                        <button class="scale-btn" onclick="selectMainAnswer('q1', 'yes')">Yes</button>
                        <button class="scale-btn" onclick="selectMainAnswer('q1', 'no')">No</button>
                    </div>
                </div>

                <!-- Main Question 2: Oily Skin -->
                <div id="question2" class="question fade" style="display: none;">
                <h4>Do you often notice an oily or greasy feeling on your back, chest, or other parts of your body?</h4>
                    <div class="scale-buttons" id="q2-buttons">
                        <button class="scale-btn" onclick="selectMainAnswer('q2', 'yes')">Yes</button>
                        <button class="scale-btn" onclick="selectMainAnswer('q2', 'no')">No</button>
                    </div>
                </div>

                <!-- Main Question 3: Redness/Irritation -->
                <div id="question3" class="question fade" style="display: none;">
                <h4>Do you notice that some areas of your body are oily while other areas are dry or normal?</h4>
                    <div class="scale-buttons" id="q3-buttons">
                        <button class="scale-btn" onclick="selectMainAnswer('q3', 'yes')">Yes</button>
                        <button class="scale-btn" onclick="selectMainAnswer('q3', 'no')">No</button>
                    </div>
                </div>

                <!-- Main Question 4: Balanced Skin -->
                <div id="question4" class="question fade" style="display: none;">
                <h4>Do you find that your skin is generally well-balanced, without frequent dryness or oiliness?</h4>
                    <div class="scale-buttons" id="q4-buttons">
                        <button class="scale-btn" onclick="selectMainAnswer('q4', 'yes')">Yes</button>
                        <button class="scale-btn" onclick="selectMainAnswer('q4', 'no')">No</button>
                    </div>
                </div>

                <!-- Main Question 5: Irritation from Products -->
                <div id="question5" class="question fade" style="display: none;">
                <h4>Do you often experience redness, itching, or irritation on your body after using certain skincare products or after showering?</h4>
                    <div class="scale-buttons" id="q5-buttons">
                        <button class="scale-btn" onclick="selectMainAnswer('q5', 'yes')">Yes</button>
                        <button class="scale-btn" onclick="selectMainAnswer('q5', 'no')">No</button>
                    </div>
                </div>
            </div>
            <div id="sub-container" class="text-center questiontriangle">

                <div id="set1-questions" style="display: none;">
                    <!-- Question 1: Water Intake -->
                    <div id="set1-q1" class="question fade-in">
                        <h4>From a scale of 1-10, how often do you drink water daily?</h4>
                        <div class="scale-buttons" id="set1-q1-buttons">
                            @for ($i = 1; $i <= 10; $i++)
                                <button class="scale-btn" onclick="selectAnswer('set1-q1', {{ $i }})">{{ $i }}</button>
                            @endfor
                        </div>
                        <p id="set1-q1-answer" class="questionp"></p>
                    </div>

                    <!-- Question 2: Flakiness -->
                    <div id="set1-q2" class="question fade-in" style="display: none;">
                        <h4>Do you experience flakiness around specific areas like the nose, cheeks, or elbows?</h4>
                        <div class="scale-buttons" id="set1-q2-buttons">
                            @for ($i = 1; $i <= 10; $i++)
                                <button class="scale-btn" onclick="selectAnswer('set1-q2', {{ $i }})">{{ $i }}</button>
                            @endfor
                        </div>
                        <p id="set1-q2-answer" class="questionp"></p>
                    </div>

                    <!-- Question 3: Fine Lines or Cracks -->
                    <div id="set1-q3" class="question fade-in" style="display: none;">
                        <h4>From a scale of 1-10, have you noticed fine lines or cracks appearing on your skin, even without aging?</h4>
                        <div class="scale-buttons" id="set1-q3-buttons">
                            @for ($i = 1; $i <= 10; $i++)
                                <button class="scale-btn" onclick="selectAnswer('set1-q3', {{ $i }})">{{ $i }}</button>
                            @endfor
                        </div>
                        <p id="set1-q3-answer" class="questionp"></p>
                    </div>

                    <!-- Question 4: Skin Redness or Irritation -->
                    <div id="set1-q4" class="question fade-in" style="display: none;">
                        <h4>Do you find that your skin becomes red or irritated easily when exposed to certain products or weather conditions?</h4>
                        <div class="scale-buttons" id="set1-q4-buttons">
                            @for ($i = 1; $i <= 10; $i++)
                                <button class="scale-btn" onclick="selectAnswer('set1-q4', {{ $i }})">{{ $i }}</button>
                            @endfor
                        </div>
                        <p id="set1-q4-answer" class="questionp"></p>
                    </div>

                    <!-- Question 5: Tightness after Washing -->
                    <div id="set1-q5" class="question fade-in" style="display: none;">
                        <h4>Do you often feel your skin is tight, especially after washing or showering?</h4>
                        <div class="scale-buttons" id="set1-q5-buttons">
                            @for ($i = 1; $i <= 10; $i++)
                                <button class="scale-btn" onclick="selectAnswer('set1-q5', {{ $i }})">{{ $i }}</button>
                            @endfor
                        </div>
                        <p id="set1-q5-answer" class="questionp"></p>
                    </div>
                </div>
                <!-- set2 Skin Questions -->
                <div id="set2-questions" style="display: none;">
                    <!-- Question 1: Greasy or set2 Skin after Cleansing -->
                    <div id="set2-q1" class="question fade-in">
                        <h4>From a scale of 1-10, does your skin feel greasy or set2 just a few hours after cleansing?</h4>
                        <div class="scale-buttons" id="set2-q1-buttons">
                            @for ($i = 1; $i <= 10; $i++)
                                <button class="scale-btn" onclick="selectAnswer('set2-q1', {{ $i }})">{{ $i }}</button>
                            @endfor
                        </div>
                        <p id="set2-q1-answer" class="questionp"></p>
                    </div>

                    <!-- Question 2: Greasy or Shiny Feeling on Back or Chest -->
                    <div id="set2-q2" class="question fade-in" style="display: none;">
                        <h4>How often do you notice that your back or chest often feels greasy or shiny?</h4>
                        <div class="scale-buttons" id="set2-q2-buttons">
                            @for ($i = 1; $i <= 10; $i++)
                                <button class="scale-btn" onclick="selectAnswer('set2-q2', {{ $i }})">{{ $i }}</button>
                            @endfor
                        </div>
                        <p id="set2-q2-answer" class="questionp"></p>
                    </div>

                    <!-- Question 3: Clogged Pores or Breakouts -->
                    <div id="set2-q3" class="question fade-in" style="display: none;">
                        <h4>How frequent do you experience clogged pores or breakouts on areas like your back, chest, or shoulders?</h4>
                        <div class="scale-buttons" id="set2-q3-buttons">
                            @for ($i = 1; $i <= 10; $i++)
                                <button class="scale-btn" onclick="selectAnswer('set2-q3', {{ $i }})">{{ $i }}</button>
                            @endfor
                        </div>
                        <p id="set2-q3-answer" class="questionp"></p>
                    </div>

                    <!-- Question 4: Exposure to Humid Weather -->
                    <div id="set2-q4" class="question fade-in" style="display: none;">
                        <h4>How often do you go outside in humid (hot weather) air?</h4>
                        <div class="scale-buttons" id="set2-q4-buttons">
                            @for ($i = 1; $i <= 10; $i++)
                                <button class="scale-btn" onclick="selectAnswer('set2-q4', {{ $i }})">{{ $i }}</button>
                            @endfor
                        </div>
                        <p id="set2-q4-answer" class="questionp"></p>
                    </div>

                    <!-- Question 5: Oil Stains on Clothes or Bedding -->
                    <div id="set2-q5" class="question fade-in" style="display: none;">
                        <h4>How often do you find oil stains on your clothing, bedsheets, or furniture from areas like your back or shoulders?</h4>
                        <div class="scale-buttons" id="set2-q5-buttons">
                            @for ($i = 1; $i <= 10; $i++)
                                <button class="scale-btn" onclick="selectAnswer('set2-q5', {{ $i }})">{{ $i }}</button>
                            @endfor
                        </div>
                        <p id="set2-q5-answer" class="questionp"></p>
                    </div>
                </div>
                <!-- Combination Skin Questions -->
                <div id="set3-questions" style="display: none;">
                    <!-- Question 1: Stress Level -->
                    <div id="set3-q1" class="question fade-in">
                        <h4>From a scale of 1-10, do you often feel stressed?</h4>
                        <div class="scale-buttons" id="set3-q1-buttons">
                            @for ($i = 1; $i <= 10; $i++)
                                <button class="scale-btn" onclick="selectAnswer('set3-q1', {{ $i }})">{{ $i }}</button>
                            @endfor
                        </div>
                        <p id="set3-q1-answer" class="questionp"></p>
                    </div>

                    <!-- Question 2: Occasional Breakouts on Face -->
                    <div id="set3-q2" class="question fade-in" style="display: none;">
                        <h4>How often do you experience occasional breakouts in certain areas of your face, while other areas remain clear?</h4>
                        <div class="scale-buttons" id="set3-q2-buttons">
                            @for ($i = 1; $i <= 10; $i++)
                                <button class="scale-btn" onclick="selectAnswer('set3-q2', {{ $i }})">{{ $i }}</button>
                            @endfor
                        </div>
                        <p id="set3-q2-answer" class="questionp"></p>
                    </div>

                    <!-- Question 3: Difficulty Finding Skincare Products -->
                    <div id="set3-q3" class="question fade-in" style="display: none;">
                        <h4>On a scale of 1 to 10, do you find it challenging to find skincare products that work for your entire face because different areas have different needs?</h4>
                        <div class="scale-buttons" id="set3-q3-buttons">
                            @for ($i = 1; $i <= 10; $i++)
                                <button class="scale-btn" onclick="selectAnswer('set3-q3', {{ $i }})">{{ $i }}</button>
                            @endfor
                        </div>
                        <p id="set3-q3-answer" class="questionp"></p>
                    </div>

                    <!-- Question 4: Exposure to Humid Weather -->
                    <div id="set3-q4" class="question fade-in" style="display: none;">
                        <h4>How often do you go out when the air is humid and hot?</h4>
                        <div class="scale-buttons" id="set3-q4-buttons">
                            @for ($i = 1; $i <= 10; $i++)
                                <button class="scale-btn" onclick="selectAnswer('set3-q4', {{ $i }})">{{ $i }}</button>
                            @endfor
                        </div>
                        <p id="set3-q4-answer" class="questionp"></p>
                    </div>

                    <!-- Question 5: Exposure to Cold Weather -->
                    <div id="set3-q5" class="question fade-in" style="display: none;">
                        <h4>How often do you go out when the air is cold?</h4>
                        <div class="scale-buttons" id="set3-q5-buttons">
                            @for ($i = 1; $i <= 10; $i++)
                                <button class="scale-btn" onclick="selectAnswer('set3-q5', {{ $i }})">{{ $i }}</button>
                            @endfor
                        </div>
                        <p id="set3-q5-answer" class="questionp"></p>
                    </div>
                </div>
                <!-- Normal Skin Questions -->
                <div id="set4-questions" style="display: none;">
                    <!-- Question 1: Drinking 8 or More Glasses of Water -->
                    <div id="set4-q1" class="question fade-in">
                        <h4>From a scale of 1-10, do you drink 8 or more glasses of water a day?</h4>
                        <div class="scale-buttons" id="set4-q1-buttons">
                            @for ($i = 1; $i <= 10; $i++)
                                <button class="scale-btn" onclick="selectAnswer('set4-q1', {{ $i }})">{{ $i }}</button>
                            @endfor
                        </div>
                        <p id="set4-q1-answer" class="questionp"></p>
                    </div>

                    <!-- Question 2: Skin Feels Balanced Throughout the Day -->
                    <div id="set4-q2" class="question fade-in" style="display: none;">
                        <h4>Does your skin feel balanced—not too oily or too dry—throughout the day?</h4>
                        <div class="scale-buttons" id="set4-q2-buttons">
                            @for ($i = 1; $i <= 10; $i++)
                                <button class="scale-btn" onclick="selectAnswer('set4-q2', {{ $i }})">{{ $i }}</button>
                            @endfor
                        </div>
                        <p id="set4-q2-answer" class="questionp"></p>
                    </div>

                    <!-- Question 3: Rarely Experiencing Breakouts or Clogged Pores -->
                    <div id="set4-q3" class="question fade-in" style="display: none;">
                        <h4>Do you rarely experience breakouts or clogged pores?</h4>
                        <div class="scale-buttons" id="set4-q3-buttons">
                            @for ($i = 1; $i <= 10; $i++)
                                <button class="scale-btn" onclick="selectAnswer('set4-q3', {{ $i }})">{{ $i }}</button>
                            @endfor
                        </div>
                        <p id="set4-q3-answer" class="questionp"></p>
                    </div>

                    <!-- Question 4: Skin Unaffected by Weather -->
                    <div id="set4-q4" class="question fade-in" style="display: none;">
                        <h4>Does your skin remain unaffected by changes in weather, such as humidity or dryness?</h4>
                        <div class="scale-buttons" id="set4-q4-buttons">
                            @for ($i = 1; $i <= 10; $i++)
                                <button class="scale-btn" onclick="selectAnswer('set4-q4', {{ $i }})">{{ $i }}</button>
                            @endfor
                        </div>
                        <p id="set4-q4-answer" class="questionp"></p>
                    </div>

                    <!-- Question 5: Frequency of Purchasing Skincare Products -->
                    <div id="set4-q5" class="question fade-in" style="display: none;">
                        <h4>How frequently do you purchase skincare products to maintain the health and appearance of your skin?</h4>
                        <div class="scale-buttons" id="set4-q5-buttons">
                            @for ($i = 1; $i <= 10; $i++)
                                <button class="scale-btn" onclick="selectAnswer('set4-q5', {{ $i }})">{{ $i }}</button>
                            @endfor
                        </div>
                        <p id="set4-q5-answer" class="questionp"></p>
                    </div>
                </div>
                <!-- Sensitive Skin Questions -->
                <div id="set5-questions" style="display: none;">
                    <!-- Question 1: Frequency of Exfoliating -->
                    <div id="set5-q1" class="question fade-in">
                        <h4>How often do you exfoliate during bath every day?</h4>
                        <div class="scale-buttons" id="set5-q1-buttons">
                            @for ($i = 1; $i <= 10; $i++)
                                <button class="scale-btn" onclick="selectAnswer('set5-q1', {{ $i }})">{{ $i }}</button>
                            @endfor
                        </div>
                        <p id="set5-q1-answer" class="questionp"></p>
                    </div>

                    <!-- Question 2: Skin Reaction to Harsh Weather -->
                    <div id="set5-q2" class="question fade-in" style="display: none;">
                        <h4>Does your skin react poorly to harsh weather conditions, like extreme cold or heat?</h4>
                        <div class="scale-buttons" id="set5-q2-buttons">
                            @for ($i = 1; $i <= 10; $i++)
                                <button class="scale-btn" onclick="selectAnswer('set5-q2', {{ $i }})">{{ $i }}</button>
                            @endfor
                        </div>
                        <p id="set5-q2-answer" class="questionp"></p>
                    </div>

                    <!-- Question 3: Stinging, Burning, or Itching Sensations from New Products -->
                    <div id="set5-q3" class="question fade-in" style="display: none;">
                        <h4>On a scale of 1 to 10, do you sometimes experience stinging, burning, or itching sensations when applying new products to your skin?</h4>
                        <div class="scale-buttons" id="set5-q3-buttons">
                            @for ($i = 1; $i <= 10; $i++)
                                <button class="scale-btn" onclick="selectAnswer('set5-q3', {{ $i }})">{{ $i }}</button>
                            @endfor
                        </div>
                        <p id="set5-q3-answer" class="questionp"></p>
                    </div>

                    <!-- Question 4: Intake of Skin-Sensitizing Ingredients -->
                    <div id="set5-q4" class="question fade-in" style="display: none;">
                        <h4>How often do you intake ingredients (like alcohol, fragrances, or acids) daily?</h4>
                        <div class="scale-buttons" id="set5-q4-buttons">
                            @for ($i = 1; $i <= 10; $i++)
                                <button class="scale-btn" onclick="selectAnswer('set5-q4', {{ $i }})">{{ $i }}</button>
                            @endfor
                        </div>
                        <p id="set5-q4-answer" class="questionp"></p>
                    </div>

                    <!-- Question 5: Skin’s Reaction to Different Products or Brands -->
                    <div id="set5-q5" class="question fade-in" style="display: none;">
                        <h4>Do you notice that your skin’s reactions vary depending on the products or brands you use?</h4>
                        <div class="scale-buttons" id="set5-q5-buttons">
                            @for ($i = 1; $i <= 10; $i++)
                                <button class="scale-btn" onclick="selectAnswer('set5-q5', {{ $i }})">{{ $i }}</button>
                            @endfor
                        </div>
                        <p id="set5-q5-answer" class="questionp"></p>
                    </div>
                </div>
            </div>

            <form action="" Method="GET" id="formation">
    <input type="hidden" id="allAnswers" name="allAnswers" value="">
            <div class="flex justify-center w-full items-center flex-col py-6" id="profilediv" style="display:none;">
                <div class="">
                    <div class="text-center">
                        <h4 class="MuiTypography-root MuiTypography-h4 css-khfo4f-MuiTypography-root" style="font-size:5vh; margin-top:-2vh;">
                            Complete your profile!
                        </h4>
                    </div>

                    <!-- Birthday Field -->
                    <div class="MuiFormControl-root MuiFormControl-fullWidth MuiTextField-root css-n5zogd-MuiFormControl-root-MuiTextField-root" style="margin-top: 15px; margin-bottom: 15px;">
                        <label class="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiInputLabel-sizeMedium MuiInputLabel-outlined MuiFormLabel-colorPrimary MuiFormLabel-filled" for="mui-1" id="mui-1-label">
                            Birthday
                        </label>
                        <div class="MuiInputBase-root MuiOutlinedInput-root MuiInputBase-colorPrimary MuiInputBase-fullWidth MuiInputBase-formControl">
                            <input required name="birthday" aria-invalid="false" autocomplete="off" placeholder="MM/DD/YYYY" type="date" inputmode="text" class="MuiInputBase-input MuiOutlinedInput-input" value="01/27/2025" id="mui-1">
                        </div>
                    </div>

                    <!-- Address Field -->
                    <div class="MuiFormControl-root MuiFormControl-fullWidth MuiTextField-root css-wb57ya-MuiFormControl-root-MuiTextField-root" style="margin-top: 15px; margin-bottom: 15px;">
                        <label class="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-sizeMedium MuiInputLabel-outlined MuiFormLabel-colorPrimary" for="mui-2" id="mui-2-label">
                            Address
                        </label>
                        <div class="MuiInputBase-root MuiOutlinedInput-root MuiInputBase-colorPrimary MuiInputBase-fullWidth MuiInputBase-formControl">
                            <input required name="address" aria-invalid="false" autocomplete="off" type="text" class="MuiInputBase-input MuiOutlinedInput-input" value="" id="mui-2">
                        </div>
                    </div>

                    <!-- City Field -->
                    <div class="MuiFormControl-root MuiFormControl-fullWidth MuiTextField-root css-wb57ya-MuiFormControl-root-MuiTextField-root" style="margin-top: 15px; margin-bottom: 15px;">
                        <label class="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-sizeMedium MuiInputLabel-outlined MuiFormLabel-colorPrimary" for="mui-3" id="mui-3-label">
                            City
                        </label>
                        <div class="MuiInputBase-root MuiOutlinedInput-root MuiInputBase-colorPrimary MuiInputBase-fullWidth MuiInputBase-formControl">
                            <input required name="city" aria-invalid="false" autocomplete="off" type="text" class="MuiInputBase-input MuiOutlinedInput-input" value="" id="mui-3">
                        </div>
                    </div>

                    <!-- Postal Code Field -->
                    <div class="MuiFormControl-root MuiFormControl-fullWidth MuiTextField-root css-wb57ya-MuiFormControl-root-MuiTextField-root" style="margin-top: 15px; margin-bottom: 15px;">
                        <label class="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-sizeMedium MuiInputLabel-outlined MuiFormLabel-colorPrimary" for="mui-4" id="mui-4-label">
                            Postal Code
                        </label>
                        <div class="MuiInputBase-root MuiOutlinedInput-root MuiInputBase-colorPrimary MuiInputBase-fullWidth MuiInputBase-formControl">
                            <input required name="postalcode" aria-invalid="false" autocomplete="off" type="text" class="MuiInputBase-input MuiOutlinedInput-input" value="" id="mui-4">
                        </div>
                    </div>

                    <!-- Contact Number Field -->
                    <div class="MuiFormControl-root MuiFormControl-fullWidth MuiTextField-root css-wb57ya-MuiFormControl-root-MuiTextField-root" style="margin-top: 15px; margin-bottom: 15px;">
                        <label class="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-sizeMedium MuiInputLabel-outlined MuiFormLabel-colorPrimary" for="mui-5" id="mui-5-label">
                            Contact Number
                        </label>
                        <div class="MuiInputBase-root MuiOutlinedInput-root MuiInputBase-colorPrimary MuiInputBase-fullWidth MuiInputBase-formControl">
                            <input required name="contactnumber" aria-invalid="false" autocomplete="off" type="text" class="MuiInputBase-input MuiOutlinedInput-input" value="" id="mui-5">
                        </div>
                    </div>

                    <!-- Allergy to Coconut, Palm, and Olive Oil Field -->
                    <div class="MuiFormControl-root MuiFormControl-fullWidth MuiTextField-root css-wb57ya-MuiFormControl-root-MuiTextField-root" style="margin-top: 15px; margin-bottom: 15px;">
                        <label class="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-sizeMedium MuiInputLabel-outlined MuiFormLabel-colorPrimary" for="allergy-select" id="allergy-select-label">
                            Are you allergic to coconut, palm, and olive oil?
                        </label>
                        <div class="MuiInputBase-root MuiOutlinedInput-root MuiInputBase-colorPrimary MuiInputBase-fullWidth MuiInputBase-formControl">
                            <select required name="allergy" id="allergy-select" class="MuiInputBase-input MuiOutlinedInput-input">
                                <option value="">Please select</option>
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                            </select>
                        </div>
                    </div>

                    <!-- Submit Button -->
                    <button type="submit" name="submitbutton" id="submitbutton" class="MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-fullWidth" tabindex="0" type="button">
                        SUBMIT
                        <span class="MuiTouchRipple-root css-8je8zh-MuiTouchRipple-root"></span>
                    </button>
                </div>
            </div>

</form>
        </div>
    </div>

<script>
let currentQuestion = 1;
let skinAnswers = {};
let currentSetIndex = 0;  // Keeps track of the current set to display
let setsToDisplay = [];    // Keeps track of which sets the user has chosen to answer

window.onload = function() {
    // Initially show the first question with fade-in effect
    let firstQuestion = document.getElementById('question1');
    firstQuestion.classList.add('fade-in');
    firstQuestion.style.display = 'block';
};

// Handle selection of main yes/no answers
function selectMainAnswer(questionId, answer) {
    skinAnswers[questionId] = answer;

    // Fade out current question
    let currentQuestionElement = document.getElementById('question' + currentQuestion);
    currentQuestionElement.classList.add('fade-out');

    setTimeout(function() {
        currentQuestionElement.style.display = 'none'; // Hide the current question

        currentQuestion++;
        if (currentQuestion > 5) {
           nextSection();
        } else {
            let nextQuestionElement = document.getElementById('question' + currentQuestion);
            nextQuestionElement.classList.add('fade-in');
            nextQuestionElement.style.display = 'block';
        }
    }, 500); // Wait for fade-out to complete before moving to next question
}

// Function to transition to the next section (display first question of the selected sets)
function nextSection() {
    let mainQuestion1 = skinAnswers['q1'] === 'yes';
    let mainQuestion2 = skinAnswers['q2'] === 'yes';
    let mainQuestion3 = skinAnswers['q3'] === 'yes';
    let mainQuestion4 = skinAnswers['q4'] === 'yes';
    let mainQuestion5 = skinAnswers['q5'] === 'yes';

    // Create an array of sets that the user needs to answer (based on the main questions answered 'Yes')
    if (mainQuestion1) setsToDisplay.push('set1');
    if (mainQuestion2) setsToDisplay.push('set2');
    if (mainQuestion3) setsToDisplay.push('set3');
    if (mainQuestion4) setsToDisplay.push('set4');
    if (mainQuestion5) setsToDisplay.push('set5');

    // If no main questions were answered "Yes", skip to profile section
    if (setsToDisplay.length === 0) {
        document.getElementById('question-container').style.display = 'none';
        document.getElementById('sub-container').style.display = 'none';
        document.getElementById('profilediv').style.display = 'block';
        finalizeAndSubmit(); // Call the finalization function
        return; // Stop execution
    }

    // Hide the main question container and show the sub-container
    document.getElementById('question-container').style.display = 'none';
    document.getElementById('sub-container').style.display = 'block';
    //alert(setsToDisplay[currentSetIndex]);
    // Show the first question of the first set
    displaySet(setsToDisplay[currentSetIndex]);
}

// Function to display questions from a specific set
function displaySet(setName) {
    // Hide all sets before showing the selected set
    hideAllSets();

    // Show the appropriate set based on the current set being displayed
    document.getElementById(setName + '-questions').style.display = 'block'; // Show the set's container
    document.getElementById(setName + '-q1').style.display = 'block';  // Show the first question of the set
}

// Function to hide all sets
function hideAllSets() {
    // Iterate through all possible sets and hide them
    for (let i = 1; i <= 5; i++) {
        let setName = 'set' + i;
        document.getElementById(setName + '-questions').style.display = 'none';
        // Hide all questions in the set
        for (let j = 1; j <= 5; j++) {
            document.getElementById(setName + '-q' + j).style.display = 'none';
        }
    }
}

// Function to handle the answering of a question
function selectAnswer(questionId, answer) {
    // Store the answer
    skinAnswers[questionId] = answer;

    // Hide the current question
    let currentQuestionElement = document.getElementById(questionId);
    currentQuestionElement.style.display = 'none';

    // Get the next question in the same set
    let nextQuestionId = getNextQuestionId(questionId);
    if (nextQuestionId) {
        // Show the next question
        document.getElementById(nextQuestionId).style.display = 'block';
    } else {
        // If no more questions in the current set, move to the next set
        currentSetIndex++;
        if (currentSetIndex < setsToDisplay.length) {
            displaySet(setsToDisplay[currentSetIndex]);
        } else {
            // All sets have been completed, finish the process (optional action)
            document.getElementById('sub-container').style.display = 'none';
            // You can show a final result or message here
            document.getElementById('profilediv').style.display = 'block';
            finalizeAndSubmit();
        }
    }
}

// Function to get the next question ID based on the current question ID
function getNextQuestionId(currentQuestionId) {
    let setNumber = currentQuestionId.split('-')[0];  // Extracts the set number (set1, set2, etc.)
    let questionNumber = parseInt(currentQuestionId.split('-')[1].replace('q', ''));

    // Determine the next question based on the current question
    let nextQuestionNumber = questionNumber + 1;
    if (nextQuestionNumber <= 5) { // Assuming there are 5 questions per set
        return `${setNumber}-q${nextQuestionNumber}`;
    } else {
        return null; // No more questions in this set
    }
}
function finalizeAndSubmit() {
    // Convert `skinAnswers` to a JSON string and set it to the hidden input field
    document.getElementById('allAnswers').value = JSON.stringify(skinAnswers);
}
</script>

@endsection
