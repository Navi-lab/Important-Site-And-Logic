<?php 
session_start();
// MySQL SELECT statemen
function sqlSelect($columns, $table){  
	include_once('connection.php');
    $selectresult = "SELECT " . $columns . " FROM " . $table;
    $result = mysqli_query($con, $selectresult) or die(mysqli_error($conn));
    return $result;
}

// MySQL INSERT statement
function sqlInsert( $tble, $cols, $values ){
	include_once('connection.php');	
    $insertquery = "INSERT INTO `" . $tble . "` (".$cols.") VALUES (" . $values . ")";
    $insertresult = mysqli_query($con, $insertquery) or die(mysqli_error($conn));
    return $insertresult;
}
?>