<?php
// DB연결 $db_conn = mysqli_connect("localhost", "데이타베이스이름", "DB 접속 비밀번호", "데이타베이스 접속정보");
include '../inc/db.inc';
    //가져 온 값 insert
    $user_new_number = $_GET['user_new_number'];
    $sql_query = 'INSERT INTO `user_info` ( `user_phone`, `user_point`) VALUES("'.$user_new_number.'", 0)';
    //db 접속    
    $db_conn = mysqli_connect($db_server, $db_id, $db_pw, $db_db);
    if(!$db_conn){ 
        echo '<script>alert("DB접속 실패");</script>';
    }
    //SQL 명령어 실행
    $sql_result = mysqli_query($db_conn, $sql_query);

    mysqli_close($db_conn);
?> 