<?php
include '../config/connection.php';

if ($apiKey != $expected_api_key) {

    $response = [
        'response' => 100,
        'success' => false,
        'message' => "ACCESS DENIED! You are not authorized to call this API"
    ];

} else {

    $access_key=trim($_GET['access_key']);
	///////////auth/////////////////////////////////////////
	$fetch=$callclass->_validate_accesskey($conn,$access_key);
	$array = json_decode($fetch, true);
	$check=$array[0]['check'];
	$login_staff_id=$array[0]['staff_id'];

	if($check==0){ 
		$response['response']=101; 
		$response['success']=false;
		$response['message']='Invalid AccessToken. Please LogIn Again.'; 

	}else{
		$query = "SELECT 
		(SELECT COUNT(*) FROM staff_tab WHERE staff_id!='$login_staff_id') AS staff_count, 
		(SELECT COUNT(*) FROM student_tab) AS student_count, 
		(SELECT COUNT(*) FROM faculty_tab) AS faculty_count,
		(SELECT COUNT(*) FROM department_tab) AS department_count,
		(SELECT COUNT(*) FROM course_tab) AS course_count";
		

		$fetch_query = mysqli_fetch_array(mysqli_query($conn, $query));

		if ($fetch_query>0){

			$response = [
				'response' => 102,
				'success' => true,
				'message' => "All counts successfully fetched",
				'data' => $fetch_query
			];
		}


        
    }
}

echo json_encode($response);
?>
