<?php include '../config/connection.php'; ?>

<?php
if($apiKey!=$expected_api_key){
    $response['code']=100;
    $response['success']=false;
    $response['message']="ACCESS DENIED! You are not authiorized to call this API";

}else{
    $access_key=trim($_GET['access_key']);
    $fetch=$callclass->_validate_accesskey($conn,$access_key);
    $array = json_decode($fetch, true);
    $check=$array[0]['check'];

    $response['check']=$check;
    if($check==0){
        $response['response']=101; 
        $response['success']=false;
        $response['message']='Invalid AccessToken. Please LogIn Again.'; 
    }else{

        $student_id=($_POST['student_id']);
        $status_id=($_POST['status_id']);
        $search_txt=($_POST['search_txt']);
        
        $search_like="(student_id like '%$search_txt%' OR 
        fullname like '%$search_txt%' OR
        email_address like '%$search_txt%' OR
        mobileno like '%$search_txt%')";
        
        if ($student_id == '') {
            $query = mysqli_query($conn, "SELECT a.*, b.status_name, c.department_name, d.faculty_name, e.entry_name, e.entry_code, f.level_code, SUBSTRING_INDEX(fullname, ' ', 1) AS firstname, SUBSTRING_INDEX(a.fullname, ' ', -1) AS lastname, CASE WHEN LENGTH(fullname) - LENGTH(REPLACE(fullname, ' ', '')) > 1 THEN TRIM(SUBSTRING_INDEX(SUBSTRING_INDEX(a.fullname, ' ', -2), ' ', 1)) ELSE '' END AS middlename FROM student_tab a JOIN setup_status_tab b ON a.status_id = b.status_id JOIN department_tab c ON c.department_id = a.department_id JOIN faculty_tab d ON d.faculty_id = c.faculty_id JOIN entry_tab e ON e.entry_id = a.entry_id JOIN setup_level_tab f ON f.level_id = a.level_id AND a.status_id LIKE '%$status_id%' AND $search_like") or die(mysqli_error($conn));
        
            if (mysqli_num_rows($query) > 0) {
                $response['response']=102;
                $response['success'] = true;
                $response['data'] = [];
                
                while ($row = mysqli_fetch_assoc($query)) {
                    $row['documentStoragePath'] = "$documentStoragePath/student_picture";
                    $response['data'][] = $row;
                }

            } else {
                $response['response']=103;
                $response['success'] = false;
                $response['message'] = "NO RECORD FOUND!!!";
            }

        } else {
            $query = mysqli_query($conn, "SELECT a.*, b.status_name, c.department_name, d.faculty_name, e.entry_name, e.entry_code, f.level_code, SUBSTRING_INDEX(fullname, ' ', 1) AS firstname, SUBSTRING_INDEX(a.fullname, ' ', -1) AS lastname, CASE WHEN LENGTH(fullname) - LENGTH(REPLACE(fullname, ' ', '')) > 1 THEN TRIM(SUBSTRING_INDEX(SUBSTRING_INDEX(a.fullname, ' ', -2), ' ', 1)) ELSE '' END AS middlename FROM student_tab a JOIN setup_status_tab b ON a.status_id = b.status_id JOIN department_tab c ON c.department_id = a.department_id JOIN faculty_tab d ON d.faculty_id = c.faculty_id JOIN entry_tab e ON e.entry_id = a.entry_id JOIN setup_level_tab f ON f.level_id = a.level_id AND a.status_id LIKE '%$status_id%' AND a.student_id='$student_id' AND $search_like") or die(mysqli_error($conn));
        
            if (mysqli_num_rows($query) > 0) {
                $response['response']=104;
                $response['success'] = true;
                while($row=mysqli_fetch_assoc($query)){
                    $row['documentStoragePath'] = "$documentStoragePath/student_picture";
                    $response['data'] = $row;
                }
            } else {
                $response['response']=105;
                $response['success'] = false;
                $response['message'] = "NO RECORD FOUND!!!";
            }
        }

    }
}

echo json_encode($response);
?>