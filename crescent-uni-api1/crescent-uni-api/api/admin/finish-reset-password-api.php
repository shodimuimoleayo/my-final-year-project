<?php
include '../config/connection.php';

if ($apiKey != $expected_api_key) {

    $response = [
        'response' => 100,
        'success' => false,
        'message' => "ACCESS DENIED! You are not authorized to call this API"
    ];

} else {

    $staff_id = trim($_POST['staff_id']);
    $otp = trim($_POST['otp']);
    $password=trim($_POST['password']);

    if (empty($otp) || empty($password)){

        $response = [
            'response' => 106,
            'success' => false,
            'message' => "Some Fields are Empty!"
        ];

    }else{

        $otpcheck=mysqli_prepare($conn,"SELECT * FROM staff_tab WHERE staff_id=? AND otp=?");
        mysqli_stmt_bind_param($otpcheck, 'si', $staff_id, $otp);
        mysqli_stmt_execute($otpcheck);
        $result = mysqli_stmt_get_result($otpcheck);
        $staffotp=mysqli_num_rows($result);

        $hashedpassword = password_hash($password, PASSWORD_DEFAULT);

        if ($staffotp>0){
            $query = mysqli_prepare($conn, "UPDATE `staff_tab` SET `password`='$hashedpassword' WHERE `staff_id`=?");
            mysqli_stmt_bind_param($query, 's', $staff_id);
            mysqli_stmt_execute($query);

            $response = [
                'response' => 107,
                'success' => true,
                'message' => "Password Reset Successfully!"
            ];

        }else{

            $response = [
                'response' => 108,
                'success' => false,
                'message' => "Invalid OTP!"
            ];

        }
    }
}

echo json_encode($response);
?>
