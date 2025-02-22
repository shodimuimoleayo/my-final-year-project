<?php 
include '../config/connection.php';

if($apiKey != $expected_api_key) {
    $response['code'] = 100;
    $response['success'] = false;
    $response['message'] = "ACCESS DENIED! You are not authorized to call this API";
} else {
    $access_key = trim($_GET['access_key']);

    $fetch = $callclass->_validate_accesskey($conn, $access_key);
    $array = json_decode($fetch, true);
    $check = $array[0]['check'];

    $response['check'] = $check; 

    if($check == 0) { 
        $response['response'] = 101; 
        $response['success'] = false;
        $response['message'] = 'Invalid Access Token. Please Log In Again.';
    } else {
        $course_code = strtoupper(trim($_POST['course_code']));
        $course_title = (strtoupper(trim($_POST['course_title'])));
        $course_unit = strtoupper(trim($_POST['course_unit']));

        if (empty($course_code) || empty($course_title) || empty($course_unit)){

            $response = [
                'response' => 102,
                'success' => false,
                'message' => "Fill all fields to continue."
            ];

        }else{

            $sequence = $callclass->_get_sequence_count($conn, 'C');
            $array = json_decode($sequence, true);
            $no = $array[0]['no'];
            $course_id = 'C'. $no;

            $add_course=mysqli_prepare($conn, "INSERT INTO `course_tab`(`course_id`, `course_code`, `course_title`, `course_unit`, `created_time`) VALUES(?, ?, ?, ?, NOW())");
            mysqli_stmt_bind_param($add_course, 'ssss', $course_id, $course_code, $course_title, $course_unit);
            mysqli_stmt_execute($add_course);

            $response = [
                'response' => 103,
                'success' => true,
                'message' => "COURSE SUCCESSFULLY ADDED!"
            ];

        }
                        
    }
}

echo json_encode($response);
?>
