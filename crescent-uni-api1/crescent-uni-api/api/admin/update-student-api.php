<?php include '../config/connection.php'; ?>

<?php
if($apiKey!=$expected_api_key){
    $response['code']=100;
    $response['success']=false;
    $response['message']="ACCESS DENIED! You are not authiorized to call this API";

}else{
    $access_key=trim($_GET['access_key']);
    ///////////auth/////////////////////////////////////////
    $fetch=$callclass->_validate_accesskey($conn,$access_key);
    $array = json_decode($fetch, true);
    $check=$array[0]['check'];
   
    $response['check']=$check;
    if($check==0){
        $response['response']=101; 
        $response['success']=false;
        $response['message']='Invalid AccessToken. Please LogIn Again.'; 
    }else{

        $student_id=trim($_POST['student_id']);
        $fullname=strtoupper(trim($_POST['fullname']));
        $dob=strtoupper(trim($_POST['dob']));
        //$gender=trim($_POST['gender']);
        $nationality=strtoupper(trim($_POST['nationality']));
        $address=strtoupper(trim($_POST['address']));
        $email_address=trim($_POST['email_address']);
        $mobileno=trim($_POST['mobileno']);
        $parent_name = (trim($_POST['parent_name']));
        $parent_mobileno = (trim($_POST['parent_mobileno']));
        $department_id = (trim($_POST['department_id']));
        $level_id = (trim($_POST['level_id']));

        if (empty($student_id) || empty($fullname) || empty($email_address) || empty($mobileno) || empty($department_id) || empty($level_id)){

            $response = [
                'response' => 102,
                'success' => false,
                'message' => "Fill all fields to continue."
            ];

        }else{

            $validate_fullname = $callclass->validateTextInput($fullname);
            $validate_nationality = $callclass->validateTextInput($nationality);
            $validate_phone = $callclass->validatePhoneNumber($mobileno);

            if (!$validate_fullname){

                $response = [
                    'response' => 103,
                    'success' => false,
                    'message' => "Digit is not allowed in fullname input"
                ];

            }elseif (!$validate_nationality){

                $response = [
                    'response' => 104,
                    'success' => false,
                    'message' => "Digit is not allowed in nationality input"
                ];

            }elseif (!$validate_phone){

                $response = [
                    'response' => 105,
                    'success' => false,
                    'message' => "Please ensure you enter a valid phone numner"
                ];

            }else{

                if (!filter_var($email_address, FILTER_VALIDATE_EMAIL)){

                    $response = [
                        'response' => 106,
                        'success' => false,
                        'message' => "Invalid Email Address."
                    ];

                }else{

                    $query=mysqli_prepare($conn,"SELECT * FROM `student_tab` WHERE email_address=? AND student_id!=? LIMIT 1") or die (mysqli_error($conn));
                    mysqli_stmt_bind_param($query, 'ss', $email_address, $student_id);
                    mysqli_stmt_execute($query);
                    $result = mysqli_stmt_get_result($query);

                    if (mysqli_num_rows($result)>0){
                        $response = [
                            'response' => 107,
                            'success' => false,
                            'message' => "Email Address already exists."
                        ];

                    }else{
                        
                        $query = mysqli_prepare($conn, "UPDATE student_tab SET fullname=?, dob=?, address=?, email_address=?, mobileno=?, nationality=?, department_id=?, level_id=? WHERE student_id=?") or die(mysqli_error($conn));
                        mysqli_stmt_bind_param($query, 'ssssssiis', $fullname, $dob, $address, $email_address, $mobileno, $nationality, $department_id, $level_id, $student_id);

                        if (mysqli_stmt_execute($query)){
                            $response = [
                                'response' => 108,
                                'success' => true,
                                'message' => "Student Data Successfully Updated."
                            ];
                        } else {
                            $response = [
                                'response' => 109,
                                'success' => false,
                                'message' => "Error updating data: " . mysqli_error($conn)
                            ];
                        }
                        

                    }
                }
            }
        }

    }
}

echo json_encode($response);
?>