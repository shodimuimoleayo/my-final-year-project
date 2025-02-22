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
    $login_role_id = $array[0]['role_id'];

    $response['check'] = $check; 

    if ($login_role_id>1){
        if($check == 0) { 
            $response['response'] = 101; 
            $response['success'] = false;
            $response['message'] = 'Invalid Access Token. Please Log In Again.';
        } else {
            $faculty_name = strtoupper(trim($_POST['faculty_name']));
    
            if (empty($faculty_name)){
    
                $response = [
                    'response' => 102,
                    'success' => false,
                    'message' => "Fill all fields to continue."
                ];
    
            }else{

                $validate_text = $callclass->validateTextInput($faculty_name);

                if (!$validate_text){

                    $response = [
                        'response' => 103,
                        'success' => false,
                        'message' => "Please ensure there are no digits included in the faculty name input"
                    ];

                }else{

                    $sequence = $callclass->_get_sequence_count($conn, 'F');
                    $array = json_decode($sequence, true);
                    $no = $array[0]['no'];
                    $faculty_id = 'F'. $no;
        
                    $add_faculty=mysqli_prepare($conn, "INSERT INTO `faculty_tab`(`faculty_id`, `faculty_name`, `created_time`) VALUES(?, ?, NOW())");
                    mysqli_stmt_bind_param($add_faculty, 'ss', $faculty_id, $faculty_name);
                    mysqli_stmt_execute($add_faculty);
        
                    $response = [
                        'response' => 103,
                        'success' => true,
                        'message' => "FACULTY SUCCESSFULLY ADDED!"
                    ];
                }
    
            }
                            
        }
    }
}

echo json_encode($response);
?>
