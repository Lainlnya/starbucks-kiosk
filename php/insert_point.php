<?
    include '../inc/db.inc';
    $user_point = $_POST["user_point"];
    $user_number = $_POST["user_number"];
    $user_use = $_POST["use_point"];

    $db_conn = mysqli_connect($db_server , $db_id , $db_pw , $db_db);
    if(!$db_conn) {
        echo "db연결 실패입니다!!"; exit;
    }
    if(!mysqli_select_db($db_conn , $db_db)) {
        echo "db 선택 실패!!"; exit;
    }
    $db_sql = 'SELECT `user_point` FROM `user_info` WHERE `user_phone`= "'.$user_number.'"';
    $db_result = mysqli_query($db_conn , $db_sql);
    if(mysqli_num_rows($db_result) === 0 ) {
        echo "없는 사용자입니다!!"; exit;
    } 
    $db_user = mysqli_fetch_assoc($db_result);
    $user_total_point = (int)$db_user["user_point"] + (int)$user_point - (int)$user_use;
    $db_insert_sql = 'UPDATE `user_info` SET `user_point`= '.$user_total_point.' WHERE `user_phone` = "'.$user_number.'"';
    mysqli_query($db_conn , $db_insert_sql);
    mysqli_free_result($db_result);
    mysqli_close($db_conn);
?>