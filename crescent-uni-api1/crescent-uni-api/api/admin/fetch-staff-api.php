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
    $login_staff_id=$array[0]['staff_id'];
    $login_role_id=$array[0]['role_id'];
  
    $response['check']=$check;

    if($check==0){
        $response['response']=101; 
        $response['success']=false;
        $response['message']='Invalid AccessToken. Please LogIn Again.'; 
    }else{

        $staff_id=($_POST['staff_id']);
        $status_id=($_POST['status_id']);
        $search_txt=($_POST['search_txt']);
        
        $search_like="(a.staff_id like '%$search_txt%' OR 
        fullname like '%$search_txt%' OR
        email_address like '%$search_txt%' OR
        mobile_no like '%$search_txt%')";
        
        if ($staff_id == '') {
            $query = mysqli_query($conn, "SELECT a.*, b.status_name, c.role_name, d.faculty_name, e.department_name, g.post_name, h.gender_name, SUBSTRING_INDEX(a.fullname, ' ', 1) AS firstname, SUBSTRING_INDEX(a.fullname, ' ', -1) AS lastname, CASE WHEN LENGTH(a.fullname) - LENGTH(REPLACE(a.fullname, ' ', '')) > 1 THEN TRIM(SUBSTRING_INDEX(SUBSTRING_INDEX(a.fullname, ' ', -2), ' ', 1)) ELSE '' END AS middlename FROM staff_tab a JOIN setup_status_tab b ON a.status_id = b.status_id JOIN setup_role_tab c ON a.role_id = c.role_id JOIN staff_department_tab f ON a.staff_id = f.staff_id JOIN department_tab e ON f.department_id = e.department_id JOIN faculty_tab d ON e.faculty_id = d.faculty_id JOIN setup_post_tab g ON a.post_id = g.post_id LEFT JOIN setup_gender_tab h ON a.gender_id = h.gender_id WHERE a.status_id LIKE '%$status_id%' AND a.role_id<'$login_role_id' AND $search_like") or die(mysqli_error($conn));
        
            if (mysqli_num_rows($query) > 0) {
                $response['response'] = 102;
                $response['success'] = true;
                $response['data'] = [];
                
                while ($row = mysqli_fetch_assoc($query)) {
                    $row['documentStoragePath'] = "$documentStoragePath/staff_picture";
                    $response['data'][] = $row;
                }
            } else {
                $response['response'] = 103;
                $response['success'] = false;
                $response['message'] = "NO RECORD FOUND!!!";
            }
            
        } else {
            $query = mysqli_query($conn, "SELECT a.*, b.status_name, c.role_name, d.faculty_name, e.department_name, g.post_name, h.gender_name, SUBSTRING_INDEX(a.fullname, ' ', 1) AS firstname, SUBSTRING_INDEX(a.fullname, ' ', -1) AS lastname, CASE WHEN LENGTH(a.fullname) - LENGTH(REPLACE(a.fullname, ' ', '')) > 1 THEN TRIM(SUBSTRING_INDEX(SUBSTRING_INDEX(a.fullname, ' ', -2), ' ', 1)) ELSE '' END AS middlename FROM staff_tab a JOIN setup_status_tab b ON a.status_id = b.status_id JOIN setup_role_tab c ON a.role_id = c.role_id JOIN staff_department_tab f ON a.staff_id = f.staff_id JOIN department_tab e ON f.department_id = e.department_id JOIN faculty_tab d ON e.faculty_id = d.faculty_id JOIN setup_post_tab g ON a.post_id = g.post_id LEFT JOIN setup_gender_tab h ON a.gender_id = h.gender_id WHERE a.status_id LIKE '%$status_id%' AND a.staff_id='$staff_id' AND $search_like") or die(mysqli_error($conn));
        
            if (mysqli_num_rows($query) > 0) {
                $response['response']=104;
                $response['success'] = true;
                while($row=mysqli_fetch_assoc($query)){
                    $row['documentStoragePath'] = "$documentStoragePath/staff_picture";
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