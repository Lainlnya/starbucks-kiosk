<?php 
header("Content-Type: application/json"); 
$method = $_SERVER['REQUEST_METHOD']; 
$name = ""; 
$email = ""; 
if($method == "GET") { 
    // 1. 자바스크립트 객체 또는 serialize() 로 전달 
    $name = $_GET['name']; 
    $email = $_GET['email']; 
    echo(json_encode(array("mode" => $_REQUEST['mode'], "name" => $name, "email" => $email)));
    // 2. JSON.stirngify() 함수로 전달 
    //$data = json_decode($_GET['data']); 
    //echo(json_encode(array("mode" => $_REQUEST['mode'], "name" => $data->name, "email" => $data->email))); 
    } else if($method == "POST") { 
        // 1. 자바스크립트 객체 또는 serialize() 로 전달 
        $name = $_POST['name']; 
        $email = $_POST['email']; 
        echo(json_encode(array("mode" => $_REQUEST['mode'], "name" => $name, "email" => $email))); 
        // 2. JSON.stirngify() 함수로 전달 
        //$data = json_decode($_POST['data']); 
        //echo(json_encode(array("mode" => $_REQUEST['mode'], "name" => $data->name, "email" => $data->email))); 
    } 
?>