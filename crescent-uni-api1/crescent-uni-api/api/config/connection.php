<?php
error_reporting(E_ALL ^ E_NOTICE ^ E_DEPRECATED ^ E_WARNING);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Authorization, Origin, X-Requested-With, Content-Type, Accept, apiKey");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header('Content-Type: application/json; charset=UTF-8');

////////////for local connect 
// $_HOST_NAME = "26.139.204.196";  
// $_DB_USERNAME="fortune";
// $_DB_PASSWORD="fortune";

$_HOST_NAME = "localhost";  
$_DB_USERNAME="root";
$_DB_PASSWORD="";

$conn = mysqli_connect($_HOST_NAME, $_DB_USERNAME, $_DB_PASSWORD)or die("Unable to connect to MySQL");
mysqli_select_db($conn,"cresent_uni_db");
/////////////////////////////////////////////////////
?>

<?php include 'functions.php'; ?>
<?php include 'constants.php'; ?>
