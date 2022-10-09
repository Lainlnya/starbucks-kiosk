USE `c14st17`;
DROP TABLE IF EXISTS `user_info`;
CREATE TABLE `user_info` (
    `user_no` int(4) NOT NULL AUTO_INCREMENT,
    `user_phone` char(8)NOT NULL,
    `user_point` int(11)NOT NULL,
    PRIMARY KEY(`user_no`),
    UNIQUE KEY `user_no`(`user_no`)
)AUTO_INCREMENT=8;
INSERT INTO `user_info` (`user_no` , `user_phone` , `user_point`) VALUES(1 , "90024823" , 11209);
INSERT INTO `user_info` (`user_no` , `user_phone` , `user_point`) VALUES(2 , "72239970" , 5420);
INSERT INTO `user_info` (`user_no` , `user_phone` , `user_point`) VALUES(3 , "45106968" , 8815);
INSERT INTO `user_info` (`user_no` , `user_phone` , `user_point`) VALUES(4 , "34346978" , 44214);
INSERT INTO `user_info` (`user_no` , `user_phone` , `user_point`) VALUES(5 , "56141498" , 23122);
INSERT INTO `user_info` (`user_no` , `user_phone` , `user_point`) VALUES(6 , "55989197" , 83122);
INSERT INTO `user_info` (`user_no` , `user_phone` , `user_point`) VALUES(7 , "77777777" , 70000);