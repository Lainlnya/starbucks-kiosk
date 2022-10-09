<?php
     include '../inc/db.inc';

     $db_conn = mysqli_connect($db_server,$db_id,$db_pw,$db_db);
     if(!$db_conn){ 
          echo '<script> alert("DB접속 실패 ! ");'; 
     } else {
          
          $category = $_GET['category'];
          $sql_query = 'SELECT * FROM `kioskmenu` where `category`="'.$category.'"';
          $sql_result = mysqli_query($db_conn, $sql_query);
     
          $categoryJson = array();
          while($row = mysqli_fetch_assoc($sql_result)) {
               $hashMap = array(
               'no'=>urlencode($row['no']), 
               'category' => urlencode($row['category']),
               'product' => urlencode($row['product']),
               'price' => urlencode($row['price']),
               'picture' => urlencode($row['picture']));

               array_push($categoryJson, $hashMap);
          }
          mysqli_free_result($sql_result);
          mysqli_close($db_conn);

          $output =  urldecode(json_encode($categoryJson));
          echo $output;
     }
?>