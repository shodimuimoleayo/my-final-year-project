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
        $department_id = trim($_POST['department_id']);
        $course_id = trim($_POST['course_id']);

        if (empty($department_id) || empty($course_id)){

            $response = [
                'response' => 102,
                'success' => false,
                'message' => "Fill all fields to continue."
            ];

        }else{

            $sequence = $callclass->_get_sequence_count($conn, 'DC');
            $array = json_decode($sequence, true);
            $no = $array[0]['no'];
            $department_course_id = 'DC'. $no;

            $add_course=mysqli_prepare($conn, "INSERT INTO `department_course_tab`(`department_course_id`, `course_id`, `department_id`, `created_time`) VALUES(?, ?, ?, NOW())");
            mysqli_stmt_bind_param($add_course, 'sss', $department_course_id, $course_id, $department_id);
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
