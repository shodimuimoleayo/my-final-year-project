<?php
class allClass{

    function _get_sequence_count($conn, $item){
	$count=mysqli_fetch_array(mysqli_query($conn,"SELECT count_value FROM setup_master_count WHERE count_id = '$item' FOR UPDATE"));
	$num=$count[0]+1;
	mysqli_query($conn,"UPDATE `setup_master_count` SET `count_value` = '$num' WHERE count_id = '$item'")or die (mysqli_error($conn));
	if ($num<10){$no='00'.$num;}elseif($num>=10 && $num<100){$no='0'.$num;}else{$no=$num;}
	return '[{"num":"'.$num.'","no":"'.$no.'"}]';
}

function _validate_accesskey($conn,$access_key){
	$query=mysqli_query($conn,"SELECT * FROM staff_tab WHERE access_key='$access_key' AND status_id=1;")or die (mysqli_error($conn));
	$count = mysqli_num_rows($query);
		if ($count>0){
			$fetch_query=mysqli_fetch_array($query);
			$staff_id=$fetch_query['staff_id'];
			$role_id=$fetch_query['role_id'];
			$check=1; 
		}else{
			$check=0;
		}
		return '[{"staff_id":"'.$staff_id.'","check":"'.$check.'","role_id":"'.$role_id.'"}]';
	}


	function _validate_user_accesskey($conn,$access_key){
		$query = mysqli_query($conn,"SELECT * FROM student_tab WHERE access_key='$access_key' AND status_id=1;")or die (mysqli_error($conn));
		$count = mysqli_num_rows($query);
			if ($count > 0){
				$fetch_query=mysqli_fetch_array($query);
				$student_id=$fetch_query['student_id'];
				$check=1; 
			}else{
				$check=0;
			}
			return '[{"student_id":"'.$student_id.'","check":"'.$check.'"}]';

		}


		function _get_staff($conn, $staff_id){
			$query=mysqli_query($conn,"SELECT * FROM staff_tab WHERE staff_id = '$staff_id'");
			$fetch_query=mysqli_fetch_array($query);
			$staff_id=$fetch_query['staff_id'];
			$fullname=$fetch_query['fullname'];
			$email_address=$fetch_query['email_address'];
			$phoneno=$fetch_query['phoneno'];
			$role_id=$fetch_query['role_id'];
			$status_id=$fetch_query['status_id'];
			$password=$fetch_query['password'];
			$otp=$fetch_query['otp'];
			$date=$fetch_query['date'];
			$last_login=$fetch_query['last_login'];
			$passport=$fetch_query['passport'];
			
			 return '[{"staff_id":"'.$staff_id.'","fullname":"'.$fullname.'","email_address":"'.$email_address.'","phoneno":"'.$phoneno.'","role_id":"'.$role_id.'","status_id":"'.$status_id.'","password":"'.$password.'","otp":"'.$otp.'","date":"'.$date.'","last_login":"'.$last_login.'","passport":"'.$passport.'"}]';
		}


		function _get_student($conn, $student_id){
			$query=mysqli_query($conn,"SELECT * FROM student_tab WHERE student_id = '$student_id'");
			$fetch_query=mysqli_fetch_array($query);
			$student_id=$fetch_query['student_id'];
			$fullname=$fetch_query['fullname'];
			$email_address=$fetch_query['email_address'];
			$phone_number=$fetch_query['phone_number'];
			$status_id=$fetch_query['status_id'];
			$password=$fetch_query['password'];
			$otp=$fetch_query['otp'];
			$date=$fetch_query['date'];
			$last_login=$fetch_query['last_login'];
			
			return '[{"student_id":"'.$student_id.'","fullname":"'.$fullname.'","email_address":"'.$email_address.'","mobileno":"'.$mobileno.'","status_id":"'.$status_id.'","password":"'.$password.'","otp":"'.$otp.'","date":"'.$date.'","last_login":"'.$last_login.'","passport":"'.$passport.'"}]';
		}
	


		function checkExistingField($conn, $field, $value) {
			$query = mysqli_query($conn, "SELECT * FROM staff_tab WHERE $field = '$value'");
			return mysqli_num_rows($query) > 0;
		}
	
		function validateTextInput($input) {
			$input = trim($input);
			return empty($input) || preg_match("/^[a-zA-Z\s]+$/", $input);
		}
		

		function validatePhoneNumber($input) {
			$input = trim($input);
			return preg_match("/^[\d\s()+-]+$/", $input); // Allow digits, spaces, parentheses, and dashes
		}

}$callclass=new allClass();
?>