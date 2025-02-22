<?php
include '../config/connection.php';

$action = $_GET['action'];

if ($apiKey != $expected_api_key) {

    $response = [
        'response' => 100,
        'success' => false,
        'message' => "ACCESS DENIED! You are not authorized to call this API"
    ];

} else {

    $staff_id = trim($_POST['staff_id']);
    
    $otp = rand(111111,999999);
    $query = mysqli_prepare($conn, "UPDATE staff_tab SET otp='$otp' WHERE staff_id ='$staff_id'");
    mysqli_stmt_bind_param($query, 'is', $otp, $staff_id);
    mysqli_stmt_execute($query);

    $response = [
        'response' => 105,
        'success' => true,
        'message' => "OTP Resent Successfully!"
    ];
}

echo json_encode($response);
?>
