-- use `c14st04`;
-- use `c14st06`;
-- use `c14st11`;
-- use `c14st17`;
-- use `c14st100`;

use `c14st17`;
drop table if exists `kioskmenu`;
CREATE TABLE `kioskmenu`(
	no int(4) not null auto_increment,
	category char(200) not null, 
	product char(200) not null,
	price  int(50) not null,
	picture char(150) not null,
	ice enum('Y','N') not null,
	primary key(`no`)
);
insert into `kioskmenu` VALUES (1, 'New', '펌킨 라떼', '6100', 'i_pumkin_spice_C.jpg', 'Y');
insert into `kioskmenu` VALUES (2, 'New', '아이스 펌킨 라떼', '6100', 'pumkin_spice_C.jpg', 'Y');
insert into `kioskmenu` values (3, 'New', '글레이즈 라떼', '6100', 'black_glazed_C.jpeg', 'N');
insert into `kioskmenu` VALUES (4, 'New', '아이스 글레이즈 라떼', '6100', 'i_black_glazed_C.jpeg', 'Y');
insert into `kioskmenu` VALUES (5, 'New', '그린 프라푸치노', '6300', 'green_new_F.jpg', 'Y');
insert into `kioskmenu` VALUES (6, 'New', '애플 블랙 티', '5800', 'autumn_apple_T.jpg', 'N');
insert into `kioskmenu` VALUES (7, 'New', '아이스 애플 블랙 티', '5800', 'i_autumn_apple_T.jpg', 'Y');

insert into `kioskmenu` VALUES (8, 'Coffee', '아메리카노', '4100', 'americano_C.jpeg', 'N');
insert into `kioskmenu` VALUES (9, 'Coffee', '아이스 아메리카노', '4100', 'i_americano_C.jpeg', 'Y');

insert into `kioskmenu` VALUES (10, 'Coffee', '마키아또', '5600', 'caramel_C.jpeg', 'N');
insert into `kioskmenu` VALUES (11, 'Coffee', '아이스 마키아또', '5600', 'i_caramel_C.jpeg', 'Y');

insert into `kioskmenu` VALUES (12, 'Coffee', '시나몬 라뗴', '4600', 'cappuccino_C.jpeg', 'N');
insert into `kioskmenu` VALUES (13, 'Coffee', '아이스 시나몬 라떼', '4600', 'i_cappuccino_C.jpeg', 'Y');

insert into `kioskmenu` VALUES (14, 'Coffee', '카페 라떼', '4600', 'latte_C.jpeg', 'N');
insert into `kioskmenu` VALUES (15, 'Coffee', '아이스 카페 라떼', '4600', 'i_latte_C.jpeg', 'Y');

insert into `kioskmenu` VALUES (16, 'Coffee', '카페 모카', '5100', 'moca_C.jpeg', 'N');
insert into `kioskmenu` VALUES (17, 'Coffee', '아이스 카페 모카', '5100', 'i_moca_C.jpeg', 'Y');

insert into `kioskmenu` VALUES (18, 'Coffee', '화이트 모카', '5600', 'white_chomo_C.jpeg', 'N');
insert into `kioskmenu` VALUES (19, 'Coffee', '아이스 화이트 모카', '5600', 'i_white_chomo_C.jpeg', 'Y');

insert into `kioskmenu` VALUES (20, 'Coffee', '돌체 라떼', '5600', 'dolce_C.jpeg', 'N');
insert into `kioskmenu` VALUES (21, 'Coffee', '아이스 돌체 라떼', '5600', 'i_dolce_C.jpeg', 'Y');

insert into `kioskmenu` VALUES (22, 'Coffee', '바닐라 플랫 화이트', '5600', 'vanilla_flat_C.jpeg', 'N');
insert into `kioskmenu` VALUES (23, 'Coffee', '바닐라 더블 샷', '4800', 'i_vanilla_double_shot_C.jpeg', 'Y');
insert into `kioskmenu` VALUES (24, 'Coffee', '커피 더블 샷', '4800', 'i_double_shot_C.jpeg', 'Y');

insert into `kioskmenu` VALUES (25, 'Coffee', '나이트로 크림', '5900', 'i_nitro_vanilla_C.jpeg', 'Y');
insert into `kioskmenu` VALUES (26, 'Coffee', '나이트로 콜드 브루', '5800', 'i_nitro_coldbrew_C.jpeg', 'Y');

insert into `kioskmenu` VALUES (27, 'Coffee', '돌체 콜드 브루', '5800', 'i_dolce_coldbrew_C.jpeg', 'Y');
insert into `kioskmenu` VALUES (28, 'Coffee', '크림 콜드 브루', '5500', 'i_vanilla_cream_C.jpeg', 'Y');

insert into `kioskmenu` VALUES (29, 'Coffee', '에스프레소', '3600', 'esso_C.jpeg', 'N');


insert into `kioskmenu` VALUES (30, 'Frappuccino', '솔티드 카라멜 모카', '5600', 'caramel_F.jpg', 'Y');
insert into `kioskmenu` VALUES (31, 'Frappuccino', '더블 프라푸치노', '6100', 'double_esso_F.jpg', 'Y');
insert into `kioskmenu` VALUES (32, 'Frappuccino', '커피 프라푸치노', '5100', 'esso_F.jpg', 'Y');

insert into `kioskmenu` VALUES (33, 'Frappuccino', '모카 프라푸치노', '5600', 'moca_F.jpg', 'Y');
insert into `kioskmenu` VALUES (34, 'Frappuccino', '자바 칩 프라푸치노', '6100', 'java_F.jpg', 'Y');
insert into `kioskmenu` VALUES (35, 'Frappuccino', '화이트 프라푸치노', '5700', 'white_chomo_F.jpg', 'Y');
insert into `kioskmenu` VALUES (36, 'Frappuccino', '바닐라 프라푸치노', '4800', 'vanilla_F.jpg', 'Y');
insert into `kioskmenu` VALUES (37, 'Frappuccino', '그린티 프라푸치노', '6300', 'greentea_F.jpg', 'Y');
insert into `kioskmenu` VALUES (38, 'Frappuccino', '초콜릿 칩 프라푸치노', '5700', 'choco_F.jpg', 'Y');
insert into `kioskmenu` VALUES (39, 'Frappuccino', '타이거 프라푸치노', '6500', 'white_tiger_F.jpg', 'Y');

insert into `kioskmenu` VALUES (40, 'Tea', '라임 패션 티', '5600', 'lime_passion_T.jpg', 'N');
insert into `kioskmenu` VALUES (41, 'Tea', '아이스 라임 패션 티', '5600', 'i_lime_passion_T.jpg', 'Y');

insert into `kioskmenu` VALUES (42, 'Tea', '민트 티', '4100', 'mint_blend_T.jpg', 'N');
insert into `kioskmenu` VALUES (43, 'Tea', '아이스 민트 티', '4100', 'i_mint_blend_T.jpg', 'Y');

insert into `kioskmenu` VALUES (44, 'Tea', '얼 그레이 티', '4100', 'earl_gray_T.jpg', 'N');
insert into `kioskmenu` VALUES (45, 'Tea', '아이스 얼 그레이 티', '4100', 'i_earl_gray_T.jpg', 'Y');

insert into `kioskmenu` VALUES (46, 'Tea', '유스베리 티', '4100', 'youth_berry_T.jpg', 'N');
insert into `kioskmenu` VALUES (47, 'Tea', '아이스 유스베리 티', '4100', 'i_youth_berry_T.jpg', 'Y');

insert into `kioskmenu` VALUES (48, 'Tea', '유자민트 티', '5600', 'yuju_mint_T.jpg', 'N');
insert into `kioskmenu` VALUES (49, 'Tea', '아이스 유자민트 티', '5600', 'i_yuja_mint_T.jpg', 'Y');

insert into `kioskmenu` VALUES (50, 'Tea', '캐모마일 티', '4100', 'chamo_T.jpg', 'N');
insert into `kioskmenu` VALUES (51, 'Tea', '아이스 캐모마일 티', '4100', 'i_chamo_T.jpg', 'Y');

insert into `kioskmenu` VALUES (52, 'Tea', '히비스커스  티', '4100', 'hibi_T.jpg', 'N');
insert into `kioskmenu` VALUES (53, 'Tea', '아이스 히비스커스 티', '4100', 'i_hibi_T.jpg', 'Y');

insert into `kioskmenu` VALUES (54, 'Tea', '자몽 블랙 티', '5300', 'grapefruit_T.jpg', 'N');
insert into `kioskmenu` VALUES (55, 'Tea', '아이스 자몽 블랙 티', '5300', 'i_grapefruit_T.jpg', 'Y');

insert into `kioskmenu` VALUES (56, 'Tea', '패션프루트 티', '5600', 'passtion_fruit_T.jpg', 'N');
insert into `kioskmenu` VALUES (57, 'Tea', '아이스 패션프루트 티', '5600', 'i_passion_fruit_T.jpg', 'Y');

insert into `kioskmenu` VALUES (58, 'Etc', '하트파이', '3200', 'heart_pie.jpg', 'N');
insert into `kioskmenu` VALUES (59, 'Etc', '생크림 카스텔라', '4500', 'cream_cas.jpg', 'N');

insert into `kioskmenu` VALUES (60, 'Etc', '슈크림 바움쿠헨', '6900', 'baumkuchen.jpg', 'N');
insert into `kioskmenu` VALUES (61, 'Etc', '블루베리 치즈 케이크', '6900', 'blueberry_cheese.jpg', 'N');
insert into `kioskmenu` VALUES (62, 'Etc', '티라미수 롤', '5900', 'tiramisu_roll.jpg', 'N');
insert into `kioskmenu` VALUES (63, 'Etc', '진한 초콜릿 크림 롤', '5900', 'choco_roll.png', 'N');
insert into `kioskmenu` VALUES (64, 'Etc', '베이글 칩', '2700', 'bagel_chip.jpg', 'N');
insert into `kioskmenu` VALUES (65, 'Etc', '넛&블루베리 칩', '2100', 'nuts_berry.jpg', 'N');