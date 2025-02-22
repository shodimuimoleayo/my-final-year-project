<?php include '../config/connection.php'; ?>

<?php

if ($apiKey != $expected_api_key) {
    $response['code'] = 100;
    $response['success'] = false;
    $response['message'] = "ACCESS DENIED! You are not authorized to call this API";
} else {
    $access_key = trim($_GET['access_key']);
    
    ///////////auth/////////////////////////////////////////
    $fetch = $callclass->_validate_accesskey($conn, $access_key);
    $array = json_decode($fetch, true);
    $check = $array[0]['check'];
    ////////////////////////////////////////////////////////
    
    $response['check'] = $check;
    
    if ($check == 0) {
        $response['response'] = 101; 
        $response['success'] = false;
        $response['message'] = 'Invalid AccessToken. Please LogIn Again.'; 

    } else {

        $staff_id=trim(strtoupper($_POST['staff_id']));
        $profile_pix=$_FILES['profile_pix']['name'];

        $allowedExts = array("jpg", "jpeg", "JPEG", "JPG", "gif", "png","PNG","GIF","webp","WEBP");
        $extension = pathinfo($_FILES['profile_pix']['name'], PATHINFO_EXTENSION);

        // Define maximum file size (30KB)
        $maxFileSize = 30 * 1024; // 30KB

        // Check if file size exceeds the limit
        if ($_FILES['profile_pix']['size'] > $maxFileSize) {
            $response['response'] = 102; 
            $response['success'] = false;
            $response['message'] = "FILE SIZE EXCEEDS LIMIT! Maximum allowed size is 30KB."; 
        } elseif (in_array($extension, $allowedExts)) {

            $datetime = date("Ymdhi");
            $profile_pix = $staff_id . '' . $datetime . '' . $profile_pix;
            $uploadPath = '../../../uploaded-files/dev/picture/staff_picture/' . $profile_pix;

            if (move_uploaded_file($_FILES["profile_pix"]["tmp_name"], $uploadPath)) {
                
                $staff_array = $callclass->_get_staff($conn, $staff_id);
                $staff_detail_array = json_decode($staff_array, true);
                $db_passport = $staff_detail_array[0]['passport'];
        
                if ($db_passport != 'friends.png') {
                    unlink('../../../uploaded-files/dev/picture/staff_picture/' . $db_passport);
                }
                
                mysqli_query($conn, "UPDATE staff_tab SET passport='$profile_pix' WHERE staff_id='$staff_id'") or die(mysqli_error($conn));

                $response['response'] = 200; 
                $response['success'] = true;
                $response['message'] = "Staff picture updated successfully!";
            } else {
                $response['response'] = 103; 
                $response['success'] = false;
                $response['message'] = "PICTURE UPLOAD ERROR! Contact your Engineer For Help"; 
            }
        } else {
            $response['response'] = 104; 
            $response['success'] = false;
            $response['message'] = "INVALID PICTURE FORMAT! Check the picture format and try again."; 
        }
    }
}

echo json_encode($response);
?>
