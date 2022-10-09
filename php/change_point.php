<?php
// DB연결 $db_conn = mysqli_connect("localhost", "데이타베이스이름", "DB 접속 비밀번호", "데이타베이스 접속정보");
include '../inc/db.inc';
$db_conn = mysqli_connect($db_server, $db_id, $db_pw, $db_db);

if(!$db_conn){ 
    echo '<script>alert("DB접속 실패");</script>';
}
    //DB 조회 쿼리문
    $user_number = $_GET['user_number'];
    $sql_query = 'SELECT * FROM `user_info` where `user_phone`="'.$user_number.'"';
    
    //SQL 명령어 실행
    $sql_result = mysqli_query($db_conn, $sql_query);
    if (!$sql_result) {
        echo '<script>alert("sql접속 실패");</script>';
        exit;
    }
    if (mysqli_num_rows($sql_result) === 0) {
        echo "no data";
        exit;
    }
    //DB에서 가져온 데이터를 PHP 배열에 각각 넣어서 JSON으로 전달해 주기 위한 변수선언
    $user_info_json = array();
    //같은 칼럼값끼리 배열에 담는 반복문
    while($row = mysqli_fetch_array($sql_result)){
        $list = array(
            'user_no' => $row['user_no'],
            'user_phone' => $row['user_phone'], 
            'user_point' => $row['user_point']
        );
        array_push($user_info_json, $list);
    };

    mysqli_free_result($sql_result);
    mysqli_close($db_conn);

    //최종 결과를 json으로 전달
    $output = json_encode($user_info_json);
    echo $output;


?> 