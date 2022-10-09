$(function(){
    //================================================================전역 변수
    let no_menu_temp = true;
    let main_answer = ''; // 포장, 매장
    let time_temp = true; //시간
    let click_tab = ""; //클릭 탭
    let menu_order_list_obj = {
        "New" : [],
        "Coffee" : [],
        "Frappuccino" : [],
        "Tea" : [],
        "Etc" : []
    };
    let option_name_list = [];   //옵션 이름만 저장하는 배열
    let list_op = [];
    let list_op_temp = []; //리스트 옵션의 템프임
    let payment_list = []; //물건 이름, 옵션1, 옵션2, 옵션3, 옵션4, 옵션5, 옵션가격, count
    let list_op_payment = []; 

    const option_list = {
        "얼음" : [{ "name": "없음", "price": 0, "src":"./image/option_icon/ice/none.png", "id":"ice"},
                    {"name": "보통", "price": 0, "src":"./image/option_icon/ice/nomal.png" },
                    {"name": "적게", "price": 0, "src":"./image/option_icon/ice/less.png"},
                    {"name": "많이", "price": 0, "src":"./image/option_icon/ice/much.png"}],
        "샷" : [{ "name": "기본", "price": 0, "src":"./image/option_icon/shot/nomal.png", "id":"shot"},
                    {"name": "+1샷", "price": 500, "src":"./image/option_icon/shot/shot1.png"},
                    {"name": "+2샷", "price": 1000, "src":"./image/option_icon/shot/shot2.png"},
                    {"name": "+3샷", "price": 1500, "src":"./image/option_icon/shot/shot3.png"}],
        "시럽" : [{ "name": "없이", "price": 0, "src":"./image/option_icon/ice/none.png", "id":"syrup"},
                    {"name": "라이트", "price": 0, "src":"./image/option_icon/ice/none.png"},
                    {"name": "일반", "price": 0 , "src":"./image/option_icon/ice/none.png"},
                    {"name": "추가", "price": 500 , "src":"./image/option_icon/ice/none.png"}],
        "우유" : [{ "name": "일반", "price": 0,"src":"./image/option_icon/ice/none.png", "id":"milk"},
                    {"name": "저지방", "price": 0, "src":"./image/option_icon/ice/none.png"},
                    {"name": "무지방", "price": 0, "src":"./image/option_icon/ice/none.png"},
                    {"name": "두유", "price": 500, "src":"./image/option_icon/ice/none.png"}],
        "휘핑" : [{ "name": "없음", "price": 0, "src":"./image/option_icon/whipping/none.png", "id":"whipping"},
                    {"name": "적게", "price": 0, "src":"./image/option_icon/whipping/less.png"},
                    {"name": "일반", "price": 0, "src":"./image/option_icon/whipping/nomal.png"},
                    {"name": "많이", "price": 500, "src":"./image/option_icon/whipping/much.png"}],
    }


    let customize_list = document.querySelector(".mpopup_customize");

    //현재 선택한 옵션 담는 객체
    let paymentArr={
        "얼음" : {"name": "", "price" : ""},
        "샷" : {"name": "", "price" : ""},
        "시럽" : {"name": "", "price" : ""},
        "우유" : {"name": "", "price" : ""},
        "휘핑" : {"name": "", "price" : ""}
    };
    let opSumPrice = 0;
    let list_op_temp_count = 0;



    //================================================================ 함수
    //콤마 함수
    function thounsandComma(inputN){
        let inputNum = String(inputN);
        let tempString = [];
        let resultTemp = "";
        let countN = 0;

        for(let i=inputNum.length-1; i>=0; i--) {
            countN++;
            if( countN % 3 == 0 && i != 0 ) {
                    tempString.unshift(inputNum[i]);
                    tempString.unshift(",");
            } else {
                    tempString.unshift(inputNum[i])
            }
        }

        for(let j=0; j<tempString.length; j++) { 
            resultTemp += tempString[j]; 
        }
        return resultTemp;
    }
    //콤마 지우는 함수
    let get_number_func = (target_string)=>{
        //숫자만 추출하는 정규식
        target_string = String(target_string);
        let num_regex = /[^0-9]/g;
        return Number(target_string.replace(num_regex,""));
    }
    //타이머 함수
    function timerOn(countNum){     
        function timeMinus(){
            if(time_temp) countNum--;
            if(countNum < 1 ){
                    clearInterval(eventH); 
                    location.href = "./menu.html";
            }
            $(".order_time").html(countNum);
        }
        let eventH = setInterval(timeMinus, 1000);
    };
    function categoryForm(){
        //메뉴 불러오는 아작스
        $.ajax({
            type:"get",
            url: "./php/menuApi.php", //output읽어야하니까 Api주소
            data: $('#categoryForm').serialize(), //데이터 직렬화 
            dataType:'json',
            success:function(data){
                    let temp_first_ul_first ='';
                    let temp_first_ul_second ='';
                    let temp_first_ul_third ='';

                    let temp_second_ul_first ='';
                    let temp_second_ul_second ='';
                    let temp_second_ul_third ='';

                    let tempCount = 0;

                    $('.xi-angle-right-min').on('click',function(){
                        if($(this).parent().parent().hasClass('first_menu')){
                            $(this).parent().parent().parent().css('margin-left',"-700px");
                        }else if($(this).parent().parent().hasClass('second_menu')){
                            $(this).parent().parent().parent().css('margin-left',"-1400px");
                        }
                    });
                    $('.xi-angle-left-min').on('click',function(){
                        if($(this).parent().parent().hasClass('second_menu')){
                            $(this).parent().parent().parent().css('margin-left',"0");
                        }else if($(this).parent().parent().hasClass('third_menu')){
                            $(this).parent().parent().parent().css('margin-left',"-700px");
                        }
                    });


                    //메뉴 뿌림
                    data.forEach(item => {
                        let menu_order_list_temp = true; 
                        let list_count = 0;
                        let temp_name = "";

                        if(tempCount<4){ // 0 1 2 3 
                            temp_first_ul_first +=`
                                <li>
                                        <figure class="figure_area">
                                            <div class="menu_image" style="background-image:url('./image/${item.picture}')"></div>
                                            <figcaption class="menu_name">${item.product}</figcaption>
                                            <figcaption class="menu_price_wrap">
                                                <span class="menu_price">${thounsandComma(item.price)}</span>
                                                <span class="menu_pricewon">원</span>
                                            </figcaption>
                                        </figure>
                                </li>
                            `; 
                        tempCount++;
                        }
                        else if(tempCount<8){ // 4 5 6 7
                            temp_second_ul_first +=`
                                <li>
                                        <figure class="figure_area">
                                            <div class="menu_image" style="background-image:url('./image/${item.picture}')"></div>
                                            <figcaption class="menu_name">${item.product}</figcaption>
                                            <figcaption class="menu_price_wrap">
                                                <span class="menu_price">${thounsandComma(item.price)}</span>
                                                <span class="menu_pricewon">원</span>
                                            </figcaption>
                                        </figure>
                                </li>
                            `;
                            tempCount++;
                        }
                        else if(tempCount<12){ // 8 9 10 11
                            temp_first_ul_second +=`
                                <li>
                                        <figure class="figure_area">
                                            <div class="menu_image" style="background-image:url('./image/${item.picture}')"></div>
                                            <figcaption class="menu_name">${item.product}</figcaption>
                                            <figcaption class="menu_price_wrap">
                                                <span class="menu_price">${thounsandComma(item.price)}</span>
                                                <span class="menu_pricewon">원</span>
                                            </figcaption>
                                        </figure>
                                </li>
                            `;     
                            tempCount++;
                        }else if(tempCount<16){ //12 13 14 15
                            temp_second_ul_second +=`
                                <li>
                                        <figure class="figure_area">
                                            <div class="menu_image" style="background-image:url('./image/${item.picture}')"></div>
                                            <figcaption class="menu_name">${item.product}</figcaption>
                                            <figcaption class="menu_price_wrap">
                                                <span class="menu_price">${thounsandComma(item.price)}</span>
                                                <span class="menu_pricewon">원</span>
                                            </figcaption>
                                        </figure>
                                </li>
                            `;     
                            tempCount++;
                        }else if(tempCount<20){ // 16 17 18 19
                            temp_first_ul_third +=`
                                <li>
                                        <figure class="figure_area">
                                            <div class="menu_image" style="background-image:url('./image/${item.picture}')"></div>
                                            <figcaption class="menu_name">${item.product}</figcaption>
                                            <figcaption class="menu_price_wrap">
                                                <span class="menu_price">${thounsandComma(item.price)}</span>
                                                <span class="menu_pricewon">원</span>
                                            </figcaption>
                                        </figure>
                                </li>
                            `;     
                            tempCount++;
                        }else if(tempCount<24){ // 20 21 22 23 
                            temp_second_ul_third +=`
                                <li>
                                        <figure class="figure_area">
                                            <div class="menu_image" style="background-image:url('./image/${item.picture}')"></div>
                                            <figcaption class="menu_name">${item.product}</figcaption>
                                            <figcaption class="menu_price_wrap">
                                                <span class="menu_price">${thounsandComma(item.price)}</span>
                                                <span class="menu_pricewon">원</span>
                                            </figcaption>
                                        </figure>
                                </li>
                            `;
                        }
                    });
                    $('.menu_wrap > .reset').html('');
                    $('.menu_wrap > .reset').html('');
                    $('.menu_wrap.first_menu > .first_ul').append(temp_first_ul_first);
                    $('.menu_wrap.first_menu > .second_ul').append(temp_second_ul_first);
                    $('.menu_wrap.second_menu > .first_ul.second').append(temp_first_ul_second);
                    $('.menu_wrap.second_menu > .second_ul.second').append(temp_second_ul_second);
                    $('.menu_wrap.third_menu > .first_ul.third').append(temp_first_ul_third);
                    $('.menu_wrap.third_menu > .second_ul.third').append(temp_second_ul_third);

                    if($("#category").val() == "New"){
                        $(".all_menu_wrap ul li").css("background-color", "rgb(219, 214, 193)");
                        $(".menu_name").css("color", "rgb(0, 30, 30)")
                    }

                    //값 불러오고      
                    let menu_name_Array = document.getElementsByClassName("menu_name"); //메뉴 이름
                    let menu_price_Array = document.getElementsByClassName("menu_price"); //메뉴 가격
                    let menu_image_Array = document.getElementsByClassName("menu_image"); //메뉴 이미지
                    let menu_order_list_ul = document.querySelector(".menu_order_list_ul"); //메뉴 리스트 부모 박스


                    
                    //메뉴를 리스트에 담는 함수
                    function menu_list_create(list_number){
                        menu_order_list_ul.innerHTML += `
                            <li class="menu_order_li">
                                <div class="menu_order_name">${menu_name_Array[list_number].innerHTML}</div>
                                <div class="menu_order_option">op</div>
                                <div class="menu_order_minus"><span class="xi-caret-down-circle-o"></span></div>
                                <span class="menu_order_count">1</span>
                                <div class="menu_order_plus"><span class="xi-caret-up-circle-o"></span></div>
                                <p class="menu_order_price"><span>${thounsandComma(menu_price_Array[list_number].innerHTML)}</span> 원</p>
                                <div class="menu_list_delete_box"><span class="xi-close-square-o list_close_btn"></span></div>
                            </li>
                        `
                    }

                    
                    for(let i=0; i<menu_name_Array.length; i++){
                        menu_image_Array[i].addEventListener("click", function(e){
                            menu_order_list_temp = true;
                            // 탭의 이름을 인덱스로 하는 객체를 생성 후, 해당 탭을 인덱스로 하는 값에 e.target을 담는다.
                            // 현재 탭을 불러와, 객체에서 현재 탭을 이름으로 하는 인덱스의 의 값 중 e.target 이 있는지 확인.
                            // 없으면 담고, 있으면 temp를 false로 변환해 담지 않도록 한다.
                            $.each(menu_order_list_obj, function(index, value){
                                if(click_tab == index){
                                        if(menu_order_list_temp){
                                            value.push(e.target);
                                            menu_list_create(i);
                                        }
                                }
                            });
                            // 각 리스트에 x버튼을 누르면 그 리스트가 지워지기 위한 코드
                            // 리스트가 생성 될때 마다 리스트를 배열로 불러와야 해서, 여기에 코딩.
                            
                            // X버튼
                            $(".list_close_btn").on("click", function(e){
                                if(no_menu_temp){
                                        let list_close_temp = true;
                                        let list_close_btn = document.getElementsByClassName("list_close_btn");
                                        let menu_order_li = document.getElementsByClassName("menu_order_li");

                                        let menu_order_name = document.getElementsByClassName("menu_order_name");
                                        let menu_order_count = document.getElementsByClassName("menu_order_count");
                                        $.each(menu_order_li, function(index, value){
                                            if(value == e.target.parentElement.parentElement){
                                                $.each(menu_order_list_obj, function(index_a, value_a){
                                                    $.each(value_a, function(index_2, value_2){
                                                            if(list_close_temp){
                                                                if(menu_order_name[index].innerHTML == value_2.nextElementSibling.innerHTML){
                                                                    option_name_list.splice(index , 1);
                                                                    menu_order_li[index].remove();
                                                                    value_a.splice(index_2, 1);
                                                                    list_close_temp = false;
                                                                    list_op_payment.splice(index, 1);
                                                                    list_op.splice(index*5, 5);
                                                                    option_name_tempArray.splice(index*5, 5);
                                                                    payment_list.splice(index, 1);
                                                                    list_op_temp_count--;  
                                                                }
                                                            }
                                                    });
                                                });
                                            }
                                        });
                                }else{
                                    let list_close_temp = true;
                                    let list_close_btn = document.getElementsByClassName("list_close_btn");
                                    let menu_order_li = document.getElementsByClassName("menu_order_li");
                                    
                                    let menu_order_name = document.getElementsByClassName("menu_order_name");
                                    let menu_order_count = document.getElementsByClassName("menu_order_count");
                                    $.each(menu_order_li, function(index, value){
                                        if(value == e.target.parentElement.parentElement){
                                            $.each(menu_order_list_obj, function(index_a, value_a){
                                                $.each(value_a, function(index_2, value_2){
                                                    if(list_close_temp){
                                                        if(menu_order_name[index].innerHTML == value_2.nextElementSibling.innerHTML){
                                                            menu_order_li[index].remove();
                                                            value_a.splice(index_2, 1);
                                                            list_close_temp = false;
                                                        }
                                                    }
                                                });
                                            });
                                        }
                                    });
                                    no_menu_temp = true;
                                }
                            });
                        });
                    };
            }
        });
    }

    //================================================================ ready 
    //트리거
    $(document).ready(function() {
        $('#tri').trigger('click');
        
        $("#nav-1 a").on("click", function() {

            var position = $(this).parent().position();
            var width = $(this).parent().width();
            $("#nav-1 .slide1").css({ opacity: 1, left: +position.left, width: width });
        });

        $("#nav-1 a").on("mouseover", function() {
            var position = $(this).parent().position();
            var width = $(this).parent().width();
            $("#nav-1 .slide2").css({ opacity: 1, left: +position.left, width: width }).addClass("squeeze");});

        $("#nav-1 a").on("mouseout", function() {
            $("#nav-1 .slide2").css({ opacity: 0 }).removeClass("squeeze");
        });

        var currentWidth = $("#nav-1").find("li:nth-of-type(3) a").parent("li").width();
        var current = $("li:nth-of-type(3) a").position();
        $("#nav-1 .slide1").css({ left: +45.5, width: currentWidth });

    });



    //================================================================  자가실행 함수
    // view_option = () =>{
    //      $.each(option_list, function(i_index, i_value){
    //           customize_list.innerHTML+=
    //                `<ul class="mpopup_list">
    //                <figure class="mpopup_listhead">
    //                     <img src="${i_value[0]["src"]}" class="mpopup_pic">
    //                     <figcaption class="mpopup_desc">${i_index}</figcaption>
    //                </figure>
    //                <section class="mpopup_listsub">
    //                     <li class="mpopup_${i_value[0]["id"]}">${i_value[0]["name"]} <span class="mp_${i_value[0]["id"]}">${thounsandComma(i_value[0]["price"])}</span></li>
    //                     <li class="mpopup_${i_value[0]["id"]}">${i_value[1]["name"]} <span class="mp_${i_value[0]["id"]}">${thounsandComma(i_value[1]["price"])}</span></li>
    //                     <li class="mpopup_${i_value[0]["id"]}">${i_value[2]["name"]} <span class="mp_${i_value[0]["id"]}">${thounsandComma(i_value[2]["price"])}</span></li>
    //                     <li class="mpopup_${i_value[0]["id"]}">${i_value[3]["name"]} <span class="mp_${i_value[0]["id"]}">${thounsandComma(i_value[3]["price"])}</span></li>
    //                </section>
    //                </ul>`;
    //      });
    // }
    // view_option();

    view_option = () =>{
        $.each(option_list, function(i_index, i_value){
            customize_list.innerHTML+=
                    `<ul class="mpopup_list">
                        <div class="mpopup_desc">${i_index}</div>
                        <section class="mpopup_listpic">
                            <img src="${i_value[0]["src"]}" class="mpopup_pic">
                            <img src="${i_value[1]["src"]}" class="mpopup_pic">
                            <img src="${i_value[2]["src"]}" class="mpopup_pic">
                            <img src="${i_value[3]["src"]}" class="mpopup_pic">
                        </section>
                        <section class="mpopup_listsub">
                            <li class="mpopup_${i_value[0]["id"]} mpopup_pic_click"><span class="mpopup_option_name">${i_value[0]["name"]}</span><span class="mp_${i_value[0]["id"]}">${thounsandComma(i_value[0]["price"])}</span></li>
                            <li class="mpopup_${i_value[0]["id"]} mpopup_pic_click"><span class="mpopup_option_name">${i_value[1]["name"]}</span><span class="mp_${i_value[0]["id"]}">${thounsandComma(i_value[1]["price"])}</span></li>
                            <li class="mpopup_${i_value[0]["id"]} mpopup_pic_click"><span class="mpopup_option_name">${i_value[2]["name"]}</span><span class="mp_${i_value[0]["id"]}">${thounsandComma(i_value[2]["price"])}</span></li>
                            <li class="mpopup_${i_value[0]["id"]} mpopup_pic_click"><span class="mpopup_option_name">${i_value[3]["name"]}</span><span class="mp_${i_value[0]["id"]}">${thounsandComma(i_value[3]["price"])}</span></li>
                        </section>
                    </ul>`;
        });
    }
    view_option();
    //뷰 옵션 진행 후
    let mpopup_ice = document.querySelectorAll('.mpopup_ice');
    let mp_ice = document.querySelectorAll('.mp_ice');
    let mpopup_shot =document.querySelectorAll('.mpopup_shot');
    let mp_shot =document.querySelectorAll('.mp_shot');
    let mpopup_syrup =document.querySelectorAll('.mpopup_syrup');
    let mp_syrup =document.querySelectorAll('.mp_syrup');
    let mpopup_milk = document.querySelectorAll('.mpopup_milk');
    let mp_milk =document.querySelectorAll('.mp_milk');
    let mpopup_whipping = document.querySelectorAll('.mpopup_whipping');
    let mp_whipping = document.querySelectorAll('.mp_whipping');

    let temp_arrayone = [0,0,0,0,0];
    let temp_one=0;


    //옵션
    (function createOption(){
        for(let i=0; i<mpopup_ice.length; i++){
            mpopup_ice[i].addEventListener("click", function(){
                    mpopup_ice[i].style.backgroundColor= "rgb(210, 146, 95)";
                    $.each(mpopup_ice, function(i_index){
                        if(i_index !==i){
                        mpopup_ice[i_index].style.backgroundColor="rgb(0, 30, 30)";
                        }
                    })
                    temp_one=0;
                    temp_arrayone[0]=get_number_func(mp_ice[i].innerHTML);
                    for(let j=0; j<temp_arrayone.length; j++){
                        temp_one+= temp_arrayone[j];
                    };
                    $(".mpopup_price").html(thounsandComma(temp_one));
            });
            mpopup_shot[i].addEventListener("click", function(){
                    mpopup_shot[i].style.backgroundColor= "rgb(210, 146, 95)";
                    $.each(mpopup_shot, function(sh_index){
                        if(sh_index !==i){
                        mpopup_shot[sh_index].style.backgroundColor="rgb(0, 30, 30)";
                        }
                    })
                    temp_one=0;
                    temp_arrayone[1]=get_number_func(mp_shot[i].innerHTML);
                    for(let j=0; j<temp_arrayone.length; j++){
                        temp_one+= temp_arrayone[j];
                    };
                    $(".mpopup_price").html(thounsandComma(temp_one));
            })
            mpopup_syrup[i].addEventListener("click", function(){
                    mpopup_syrup[i].style.backgroundColor= "rgb(210, 146, 95)";
                    $.each(mpopup_syrup, function(s_index){
                        if(s_index !==i){
                        mpopup_syrup[s_index].style.backgroundColor="rgb(0, 30, 30)";
                        }
                    })
                    temp_one=0;
                    temp_arrayone[2]=parseInt(mp_syrup[i].innerHTML);
                    for(let j=0; j<temp_arrayone.length; j++){
                        temp_one+= temp_arrayone[j];
                    };
                    $(".mpopup_price").html(thounsandComma(temp_one));
            })
            mpopup_milk[i].addEventListener("click", function(){
                    mpopup_milk[i].style.backgroundColor= "rgb(210, 146, 95)";
                    $.each(mpopup_milk, function(m_index){
                        if(m_index !==i){
                        mpopup_milk[m_index].style.backgroundColor="rgb(0, 30, 30)";
                        }
                    })
                    temp_one=0;
                    temp_arrayone[3]=parseInt(mp_milk[i].innerHTML);
                    for(let j=0; j<temp_arrayone.length; j++){
                        temp_one+= temp_arrayone[j];
                    }
                    $(".mpopup_price").html(thounsandComma(temp_one));
            })
            mpopup_whipping[i].addEventListener("click", function(){
                    mpopup_whipping[i].style.backgroundColor= "rgb(210, 146, 95)";
                    $.each(mpopup_whipping, function(w_index){
                        if(w_index !==i){
                        mpopup_whipping[w_index].style.backgroundColor="rgb(0, 30, 30)";
                        }
                    })
                    temp_one=0;
                    temp_arrayone[4]=parseInt(mp_whipping[i].innerHTML);
                    for(let j=0; j<temp_arrayone.length; j++){
                        temp_one+= temp_arrayone[j];
                    }
                    $(".mpopup_price").html(thounsandComma(temp_one));
            });
        }
    })();


    //================================================================클릭 이벤트
    //카테고리 클릭 시 아작스 실행
    $('.nav_li').on('click',function(e){
        click_tab = e.target.innerHTML;
        
        $('#category').val(e.target.innerHTML); //선택한걸 input에 넣고있음
        // console.log(e.target.innerHTML); //안에값읽기 DB에 category 자료와 같아야함
        $('.all_menu_wrap').css('margin-left',"0");



        switch(click_tab){
            case 'New' :
                    $('.next_btn').css("display","none");
            break;
            case 'Coffee' :
                    $('.next_btn').css("display","block");
            break;
            case 'Frappuccino' :
                    $('.first_menu .next_btn').css("display","block");
                    $('.second_menu .next_btn').css("display","none");
                    $('.third_menu .next_btn').css("display","none");
                    
            break;
            case 'Tea' :
                    $('.next_btn').css("display","block");
            break;
            case 'Etc' :
                    $('.first_menu .next_btn').css("display","none");
            break;
        }
        categoryForm();

    });
    //포장, 메뉴 클릭 시 
    $("#main_in, #main_out").on("click", function(e){
        $(".container").css("display", "block");
        timerOn(120);
        main_answer = e.target.id;

    });

    //홈 버튼 눌렀을 때
    $('.home_btn').on("click",function(){
        location.href = "./menu.html";
    });

    $(document).on("click", ".menu_name", function(){
        $(this).prev().trigger("click");
    });

    $(document).on("click", ".menu_price_wrap", function(){
        $(this).prev().trigger("click");
    });

    $(document).on("click", ".mpopup_pic", function(){
        let this_inarray = $(this).parent().children().index(this) + 1;
        let this_next_text = $(this).parent().next().children(":nth-child("+this_inarray+")");
        $(this_next_text).trigger("click");
    });

    //이미지 클릭 시 옵션 메뉴로 이동
    $(document).on("click", ".menu_image", function(){
        if($("#category").val()!=="Etc"){
            $(".menu_container").css("display", "block");
            $(".mpopup_menu").html($(this).next().html());
            time_temp = false; //옵션으로 들어가면 시간 멈춤
        }else if($("#category").val() === "Etc"){
            let menu_order_option = document.getElementsByClassName("menu_order_option");
            menu_order_option[menu_order_option.length-1].style.visibility = "hidden";
            $(".mpopup_menu").html($(this).next().html());
            $(document).ready(function() {
                    $(".mpopup_input").trigger('click');
            });
        }
        menuList($(this).next().html());
        function menuList(menuname){
            $('#menuClickName').val(menuname);
        }
        $(".mpopup_syrup").parent().prev().css("display", "none");
        $(".mpopup_syrup").parent().parent().css("height", "120px");
        $(".mpopup_milk").parent().prev().css("display", "none");
        $(".mpopup_milk").parent().parent().css("height", "120px");
    });

    // 옵션 취소 버튼
    $(".mpopup_cancel").on("click", function(){
        temp_arrayone= [0,0,0,0,0];
        temp_one=0;
        $(".mpopup_price").html(temp_one);
        $(".mpopup_ice, .mpopup_shot, .mpopup_syrup, .mpopup_milk, .mpopup_whipping").css("background-color", "rgb(0, 30, 30)");
        $(".menu_container").css("display", "none");
        no_menu_temp =false;
        $('.menu_order_li:last-child .list_close_btn').trigger("click");
        time_temp = true;
        // console.log(list_op_payment);
    });

    //담기 버튼 눌렀을 때
    let option_name_tempArray = [];

    $(".mpopup_input").on("click",function(){
        time_temp = true; //전역
        opSumPrice = 0; //전역

        //지역 모음
        let select_op = document.querySelectorAll(".mpopup_listsub > li");
        let tempArray = [];
        let tempCount = 0;
        
        //옵션 순서대로 
        let select_op_name = document.querySelectorAll(".mpopup_option_name");
        let option_color_list = document.querySelectorAll(".mpopup_pic_click");
        


        for(let i = 0; i < 5; i++) {
            let check_item = false;
            let check_index = -1;
            for(let j = 0; j < 4; j++) {
                    check_index = i*4+j;
                    if(option_color_list[check_index].style.backgroundColor == "rgb(210, 146, 95)"){
                        check_item = true;
                        break;
                    }
            }
            if(check_item === true) {
                    let check_array = select_op_name[check_index].innerHTML;
                    option_name_tempArray.push(check_array);

            } else {
                    option_name_tempArray.push("");
            }
        }



        $.each(select_op, function(index, value){
            if(value.style.backgroundColor == "rgb(210, 146, 95)"){
                    tempArray.push(value);
            }
        });
        let option_name_temp = [];
        $.each(paymentArr, function(index_1, value_1){
            let  temp_list_op = [];
            let op_price_temp = "";                                                    ///여기추가
            $.each(value_1, function(index_2, value_2){
                    if(index_2 == "name"){
                        if(tempArray[tempCount] == undefined){
                            temp_list_op.push("");
                            option_name_temp.push("");  //to 4page
                        }else {
                            let tempStr = String(tempArray[tempCount].innerHTML).split("<");
                            let opPriceStr = String(tempStr[3]).split(">");                       //여기추가
                            op_price_temp = opPriceStr[1];                                            //여기추가
                            value_1[index_2] = tempStr[0]; 
                            temp_list_op.push(tempStr[0]);
                            option_name_temp.push(tempStr[0]);  //to 4page
                        }
                    }else if(index_2 == "price"){
                        if(tempArray[tempCount] == undefined){
                            temp_list_op.push("");
                        }else {
                            value_1[index_2] = tempArray[tempCount].querySelector("span").innerHTML;
                            temp_list_op.push(tempArray[tempCount].querySelector("span").innerHTML);
                            opSumPrice += get_number_func(op_price_temp);                              //여기수정
                        }
                    }
            });
            tempCount++;
            let temp = temp_list_op.join("");
            list_op.push(temp);

            $('.menu_container').css('display','none');
        });
        option_name_list.push(option_name_temp);
        let no_op_temp = true;
        list_op_payment.push(menu_list_function(list_op));
        function menu_list_function(list_op){
            let menuName=$('#menuClickName').val();
            let list_op_temp = []; //리스트 옵션의 템프임
            list_op_temp_temp = [];
            let op_null_temp = 0;         // 옵션을 아무것도 선택하지 않았을 때를 확인하는 템프
            for(let i=0; i<list_op.length; i++){
                    if(i >= 5*list_op_temp_count && i < 5*list_op_temp_count+5){
                        list_op_temp_temp.push(list_op[i]);
                        if(list_op[i] == ""){ 
                            op_null_temp++;
                        }
                    }
            }
            // 옵션이 다섯개 모두 "" 일 때, 해당 리스트의 옵션 버튼을 보이지 않게 하기 위한 코드
            if(op_null_temp == 5){ 
                    let menu_order_option = document.getElementsByClassName("menu_order_option");
                    menu_order_option[list_op_temp_count].style.visibility = "hidden";
                    no_op_temp = false;
            }

            list_op_temp_count++;
            
            list_op_temp.push(list_op_temp_temp); //리스트 옵션을 넣고
            list_op_temp.unshift(menuName);
            payment_list.push(list_op_temp);
            return list_op_temp;
        }
        
        (function comparison(){
            let opCountTemp = true;
            let now_menu = $(".mpopup_menu").html();

            $.each(list_op_payment, function(index, value){
                    let menu_order_price_span = document.querySelectorAll(".menu_order_price > span");
                    $.each(value, function(index_2, value_2){
                        if(index == list_op_payment.length-1){
                            if(opCountTemp){menu_order_price_span[index].innerHTML = thounsandComma(get_number_func(menu_order_price_span[index].innerHTML) + get_number_func(opSumPrice)); opCountTemp = false;}
                        }
                        if(index_2 == 0 && value_2 == now_menu && index != list_op_payment.length-1){
                            let temp_cc = 0;
                            $.each(value[1], function(index_3, value_4){
                                if(value_4 == list_op_temp_temp[index_3]){
                                        temp_cc++
                                        if(temp_cc == 5){
                                            let menu_order_li = document.getElementsByClassName("menu_order_li");
                                            let menu_order_count = document.getElementsByClassName("menu_order_count");
                                            let menu_price_Array = document.getElementsByClassName("menu_price");
                                            let menu_order_name = document.getElementsByClassName("menu_order_name");
                                            $.each(menu_order_list_obj, function(index_a, value_a){
                                                $.each(value_a, function(index_2, value_2){
                                                    if(menu_order_name[index].innerHTML == value_2.nextElementSibling.innerHTML){
                                                            menu_order_count[index].innerHTML++;
                                                            menu_order_li[list_op_payment.length-1].remove();
                                                            value_a.splice(list_op_payment.length-1, 1);
                                                            list_op_payment.pop();
                                                            option_name_list.pop();
                                                            menu_order_price_span[index].innerHTML = thounsandComma(get_number_func(menu_order_price_span[index].innerHTML) + get_number_func(value_2.nextElementSibling.nextElementSibling.innerHTML)  + get_number_func(opSumPrice));
                                                            opCountTemp = false;
                                                            //if(no_op_temp == false){
                                                            for(let i=0; i<5; i++){
                                                                list_op.pop();
                                                                option_name_tempArray.pop();
                                                            }
                                                            list_op_temp_count--;
                                                            //}
                                                            return false;
                                                    }
                                                });
                                            });
                                        }
                                }
                            });
                        }
                    });
            });
        })();
        temp_arrayone= [0,0,0,0,0];
        temp_one=0;
        $(".mpopup_price").html(temp_one);
        $(".mpopup_ice, .mpopup_shot, .mpopup_syrup, .mpopup_milk, .mpopup_whipping").css("background-color", "rgb(0, 30, 30)");
        $(".menu_container").css("display", "none");
    });

    // 마이너스 버튼
    $(document).on("click", ".menu_order_minus", function(e){
        let minus_temp = true;
        let menu_order_minus = document.getElementsByClassName("menu_order_minus");
        let menu_order_li = document.getElementsByClassName("menu_order_li");
        let menu_order_count = document.getElementsByClassName("menu_order_count");
        let menu_order_name = document.getElementsByClassName("menu_order_name");
        let menu_order_price_span = document.querySelectorAll(".menu_order_price > span");

        $.each(menu_order_li, function(index, value){
            if(value == e.target.parentElement.parentElement){
                    menu_order_count[index].innerHTML--;
                    //menu_order_list_obj 객체 안에 담아둔 것도 같이 지우기 위함, 그래야 다시 이미지를 눌렀을 때 리스트에 추가됨
                    $.each(menu_order_list_obj, function(index_a, value_a){
                        $.each(value_a, function(index_2, value_2){
                            // 중간에 있던게 삭제되면 다시 반복할 때 value_2.nextElementSibling 찾을 수가 없어서, 지우고 나면
                            // temp 를 false 변경해서 다시 못들어가게 함.
                            if(minus_temp){
                                // minus를 누른 메뉴의 이름과, 내가 최초에 누른 버튼의 메뉴 이름을 비교해서, 이름이 같은 것을
                                // menu_order_list_obj 에서 삭제
                                if(menu_order_name[index].innerHTML == value_2.nextElementSibling.innerHTML){
                                        menu_order_price_span[index].innerHTML =   thounsandComma(get_number_func(menu_order_price_span[index].innerHTML) / ((get_number_func(menu_order_count[index].innerHTML)+1))* get_number_func(menu_order_count[index].innerHTML)); //value_2.nextElementSibling.nextElementSibling.innerHTML;
                                        // 메뉴의 갯수가 0개 일때 그 리스트를 삭제하기 위한 코드
                                        if(menu_order_count[index].innerHTML == 0){
                                            minus_temp = false;
                                            option_name_list.splice(index , 1);
                                            menu_order_li[index].remove();
                                            value_a.splice(index_2, 1);
                                            list_op_payment.splice(index_2, 1);
                                            option_name_tempArray.splice(index*5, 5);
                                            list_op.splice(index*5, 5);
                                            
                                            payment_list.splice(index, 1);
                                            list_op_temp_count--;  
                                        }
                                        return false;
                                }
                            }
                        });
                    });
            }
        })
    });

    $(document).on("click", ".menu_order_plus", function(e){
        let menu_order_plus = document.getElementsByClassName("menu_order_plus");
        let menu_order_li = document.getElementsByClassName("menu_order_li");
        let menu_order_count = document.getElementsByClassName("menu_order_count");
        let menu_price_Array = document.getElementsByClassName("menu_price");
        let menu_order_name = document.getElementsByClassName("menu_order_name");
        let menu_order_price_span = document.querySelectorAll(".menu_order_price > span");

        $.each(menu_order_li, function(index, value){
            if(value == e.target.parentElement.parentElement){
                    menu_order_count[index].innerHTML++;

                    $.each(menu_order_list_obj, function(index_a, value_a){
                        $.each(value_a, function(index_2, value_2){
                                if(menu_order_name[index].innerHTML == value_2.nextElementSibling.innerHTML){
                                        menu_order_price_span[index].innerHTML = thounsandComma((get_number_func(menu_order_price_span[index].innerHTML) / (get_number_func(menu_order_count[index].innerHTML)-1))*  get_number_func(menu_order_count[index].innerHTML)); // + Number(value_2.nextElementSibling.nextElementSibling.innerHTML);
                                        return false;
                                }
                        });
                    });
            }
        })
    });

    // 리셋 버튼
    $(".menu_order_reset").on("click", function(){
        let menu_order_name_li = document.querySelectorAll('.menu_order_name');
        if(menu_order_name_li.length != 0){
            let menu_order_list_ul = document.querySelector(".menu_order_list_ul");
                    $(".list_order_all_clear").css("display", "block");
                    $(".list_order_all_clear_confirm").on("click", function(){
                        $(".list_close_btn").trigger("click");
                        $(".list_order_all_clear").css("display", "none");
                    });
                    $(".list_order_all_clear_cancel").on("click", function(){
                        $(".list_order_all_clear").css("display", "none");
                    });
        }               
    });

    //======================================================================= 값 넘김

    // 메뉴별 상세 옵션 확인
    (function(){
        let option_temp = false;
        $(document).on("click", ".menu_order_option", function(e){
            let menu_order_option = document.getElementsByClassName("menu_order_option");
            let menu_option_view = document.querySelector(".menu_option_view");
            menu_option_view.innerHTML = "";
            let check_index = 0;

            for(let j=0; j<menu_order_option.length; j++){
                    if(e.target == menu_order_option[j]){
                        check_index = j;
                    }
            }

            if(option_temp){
                    $(".menu_option_view").css("display", "none");
                    option_temp = false;
            } else{
                    $(".menu_option_view").css("display", "block");
                    let key_temp = 0;
                    $.each(option_name_tempArray, function(index, value){
                        console.log(option_name_tempArray);
                        for(let i=0; i<list_op.length; i++){
                            if(i >= 5*check_index && i < 5*check_index+5){
                                console.log(i);
                                if(option_name_tempArray[i] != ""){
                                        menu_option_view.innerHTML += `<div>${Object.keys(paymentArr)[key_temp]} : ${option_name_tempArray[i]}</div>`;
                                }
                                key_temp++;
                            }
                        }
                        return false;
                    });


                    option_temp = true;
            }

            $('html').on("click",function(e) {
                    if(!$(e.target).hasClass(".menu_order_option")) {
                        if($('.menu_option_view').css('display') == 'block'){
                            $('html').on("click",function(e){   
                                $('.menu_option_view').css("display","none");
                            });    
                        }
                    }
            });
        });
        //옵션 상세보기 버튼
        $(".menu_option_view").on("click", function(){
            $(".menu_option_view").css("display", "none");
            option_temp = false;
        });
        $('html').on("click",function(e){
            if(e.target.className != "menu_order_option"){
                    $(".menu_option_view").css("display", "none");
                    option_temp = false;
            }
        });
    })();

    const function_payment_insert_list =(name , count , price , option_array) => {
        if(option_array.length === 0) {
            let insert_string = `
                    <article class="payment_select_no_option">
                        <ul class="payment_menu_line">
                            <li class="payment_inline_style payment_menu_name">${name}</li>
                            <li class="payment_inline_style payment_menu_count">${count}</li>
                            <li class="payment_inline_style payment_menu_price">${price}원</li>
                        </ul>
                    </article>
            `;
            let receipt_string = `
                    <div class="receipt_select_no_option">
                        <ul class="receipt_menu_line">
                            <li class="receipt_inline_style receipt_menu_name">${name}</li>
                            <li class="receipt_inline_style receipt_menu_count">${count}</li>
                            <li class="receipt_inline_style receipt_menu_price">${price}원</li>
                        </ul>
                    </div>
            `;
            $("#receipt_orderlist").append(receipt_string);
            $("#payment_print_menu").append(insert_string);
        } else {
            let insert_option_string = "";
            for(let i = 0; i < option_array.length; i++) {
                    insert_option_string += option_array[i];
                    if(i != option_array.length-1) {
                        insert_option_string += " , ";
                    }
            }
            let insert_option = "<li>";
            insert_option += insert_option_string;
            insert_option += "</li>";
            let insert_string = `
                    <article class="payment_select_yes_option">
                        <ul class="payment_menu_line">
                            <li class="payment_inline_style payment_menu_name">${name}</li>
                            <li class="payment_inline_style payment_menu_count">${count}</li>
                            <li class="payment_inline_style payment_menu_price">${price}원</li>
                        </ul>
                        <ul class="payment_option_box">${insert_option}</ul>
                    </article>
            `;
            let receipt_string = `
                    <div class="receipt_select_yes_option">
                        <ul class="receipt_menu_line">
                            <li class="receipt_inline_style receipt_menu_name">${name}</li>
                            <li class="receipt_inline_style receipt_menu_count">${count}</li>
                            <li class="receipt_inline_style receipt_menu_price">${price}원</li>
                        </ul>
                        <ul class="receipt_option_box">${insert_option}</ul>
                    </div>
            `;
            $("#receipt_orderlist").append(receipt_string);
            $("#payment_print_menu").append(insert_string);
        }
    }
    $(".menu_order_payment").on("click", function(){
        let check_list = document.querySelectorAll(".menu_order_name");
        if(check_list.length === 0) {
            console.log("상품이 없습니다");
        } else {
            time_temp = false;
            let order_result = [];
            let result_temp = [];
            let menu_order_name = document.getElementsByClassName("menu_order_name");
            let menu_order_count = document.getElementsByClassName("menu_order_count");
            let menu_order_price = document.querySelectorAll(".menu_order_price > span");

            $.each(menu_order_name, function(index, value){
                    result_temp = [];
                    result_temp.push(menu_order_name[index].innerHTML);
                    result_temp.push(menu_order_count[index].innerHTML);
                    result_temp.push(menu_order_price[index].innerHTML);
                    for(let i=0; i<5; i++){
                        result_temp.push(list_op_payment[index][1][i]);
                    }
                    order_result.push(result_temp);
            });
            order_result.push(main_answer);

            $("#payment_area").css("display" , "block");   //결제 버튼 누르면 결제창 띄우기
            $("#payment_print_menu").empty();
            $("#receipt_orderlist").empty();
            
            let payment_total_price = 0;
            let payment_total_count = 0;
            for(let i = 0; i < order_result.length-1; i++) {
                    let payment_option_array = [];
                    for(let j = 0; j < 5; j++) {
                        switch(j) {
                            case 0 :
                                if(option_name_tempArray[i*5+j] != "") {
                                        payment_option_array.push("얼음 : " + option_name_tempArray[i*5+j]);
                                }
                                break;
                            case 1 :
                                if(option_name_tempArray[i*5+j] != "") {
                                        payment_option_array.push("샷 : " + option_name_tempArray[i*5+j]);
                                }
                                break;
                            case 2 :
                                if(option_name_tempArray[i*5+j] != "") {
                                        payment_option_array.push("시럽 : " + option_name_tempArray[i*5+j]);
                                }
                                break;
                            case 3 :
                                if(option_name_tempArray[i*5+j] != "") {
                                        payment_option_array.push("우유 : " + option_name_tempArray[i*5+j]);
                                }
                                break;
                            case 4 :
                                if(option_name_tempArray[i*5+j] != "") {
                                        payment_option_array.push("휘핑 : " + option_name_tempArray[i*5+j]);
                                }
                                break;
                        }
                    } //옵션 빈칸 체크해서 값 집어넣기
                    payment_total_count += parseInt(order_result[i][1]);
                    payment_total_price +=  get_number_func(order_result[i][2]);
                    function_payment_insert_list(order_result[i][0] , order_result[i][1] , order_result[i][2] , payment_option_array);
                    
            }
            if(order_result[order_result.length-1] === "main_out") {
                    $("#receipt_main_choice").text("포장");
            } else {
                    $("#receipt_main_choice").text("매장");
            }  //  매장인지 포장인지를 영수증에 표시
            $("#payment_total_count").text(payment_total_count);
            $("#payment_total_price").text(thounsandComma(payment_total_price)+"원");
            $("#payment_last_price").text(thounsandComma(payment_total_price - get_number_func($("#payment_use_point").text())) + "원");
        }
    });
    $("#payment_pre_btn").on("click" , function () {
        time_temp = true;
        $("#payment_area").css("display" , "none");
    });
    $("#payment_home_btn").on("click" , function () {
        location.href = "./menu.html";
    })

    // ====================================================CODE FROM SEA
    $(function(){
        //정규식 활용 =========================================================
        let get_hyphen_func = (target_number)=>{
        //핸드폰 번호에 "-"를 추가하는 정규식
            let temp_target = String(target_number);
            let dot_regex = /\B(?=(\d{4})+(?!\d))/g;
            return temp_target.replace(dot_regex,"-");
        }

        let get_number_func = (target_string)=>{
        //숫자만 추출하는 정규식
                    target_string;
                    let num_regex = /[^0-9]/g;
                    return Number(target_string.replace(num_regex,""));
        }

        let print_dot_func =(target_number)=>{
        // 뒤에서 세번째에 , 붙히는 정규식
            let temp_target = String(target_number);
            let dot_regex = /\B(?=(\d{3})+(?!\d))/g;
            return temp_target.replace(dot_regex,",");
        }

        let get_user_point = (user_point) => {
        //ajax로 가져온 포인트를 매개변수로 담아서 계산하는 함수
            let user_point_info = parseInt(user_point);
            
            $("#cumulated_point").html(print_dot_func(user_point_info));
            let temp_value = get_number_func($("#cumulated_point").html());
            
            if(Math.floor(temp_value/1000) >= 1){
            //사용포인트가 누적포인트보다 적을 때 까지 1000 단위로 사용 가능
                    let using_point = 1000  * parseInt(temp_value/1000);
                    $("#use_point").html(print_dot_func(using_point));
                    $("#left_point").html(print_dot_func(temp_value - using_point));
            }
        }


        //ajax=====================================================================
        function get_user_info(user_input_number){
        //db에 입력 한 번호가 있으면 포인트를 불러온다 
            $.ajax({
                    type: "get",		
                    url : "./php/get_point.php",
                    data: {"user_number": user_input_number},
                    success: (data)=>{
                        if(data === "no data") {
                            $.ajax({
                            type: "get",
                            url : "./php/input_point.php",
                            data: {"user_new_number": user_input_number},
                            success:(data)=>{
                                let json_data = JSON.parse(data);
                                $.each(json_data, function(data_i, data_val){
                                        get_user_point(data_val.user_point);
                                })
                            }
                            })
                            $("#point_new_number_popup").css({"display":"block"})
                            $(".point_input_box").empty();
                            $("#cumulated_point").html(0);
                            $("#use_point").html(0);
                            $("#left_point").html(0);
                            $("#input_btn").css("color" , "#d2925f");
                            $("#point_using_btn").css("color" , "#36544d");
                            $("#point_accumulate_btn").css("color" , "#36544d");
                            $("#input_btn").css("pointer-events" , "auto");
                            temp_number = "";
                        } else {
                        //json을 통해 가져온 데이타를 point_data 에 넣어준다.
                            let json_data = JSON.parse(data);
                            $.each(json_data, function(data_i, data_val){
                            get_user_point(data_val.user_point);
                            })                
                        }
                    }
            });   
        }
        //EVENT HANDLER================================================================
        $(".point_number_btn").on("mouseenter",function(){
            $(".portpolio_number_info").css("display","block");
        });
        $(".point_number_btn").on("mouseleave",function(){
            $(".portpolio_number_info").css("display","none");
        })

        $(".point_box_btn").on("mouseenter",function(){
            $(".portpolio_number_info").css("display","block");
        });
        $(".point_box_btn").on("mouseleave",function(){
            $(".portpolio_number_info").css("display","none");
        })
        let temp_number= "";
        $(".point_number_btn").on("click",function(e){
        // 번호를 입력하는 이벤트
            if($(".point_input_box").html().length < 9 && e.target.innerHTML !="입력"  && e.target.innerHTML !="초기화"){
                    temp_number += e.target.innerHTML;
                    $(".point_input_box").html(get_hyphen_func(temp_number));
            }
        })

        $("#user_plus_btn").on("click",function(){
            //+ 버튼을 눌렀을 때
                    let temp_value = get_number_func($("#cumulated_point").html());
                    let temp_calculate = 1;
                    let using_point = get_number_func($("#use_point").html());
                    if(using_point+1000 < temp_value){
                        using_point = using_point + temp_calculate*1000;
                        $("#use_point").html(print_dot_func(using_point));
                        $("#left_point").html(print_dot_func(temp_value - using_point));
                    }
            })
        
        $("#user_minus_btn").on("click",function(){
        //- 버튼을 눌렀을 때
            let temp_value = get_number_func($("#cumulated_point").html());
            let using_point = get_number_func($("#use_point").html());
            let temp_calculate = -1;
            if(using_point > 0){
                    using_point = using_point + temp_calculate*1000;
                    $("#use_point").html(print_dot_func(using_point));
                    $("#left_point").html(print_dot_func(temp_value - using_point));
            }
        });

        //사용포인트의 숫자영역 누르면 키패드가 나타나는 이벤트핸들러 
        $("#use_point").on("click",function(){
            $(".point_use_point_input_box").css("display","block");
            $("#use_point").text("0");
        })
        //사용포인트 키패드 -> 입력 & 초기화버튼 눌렀을 때 이벤트
        let point_input_temp = true;
        $(this).on("click",function(e){
        let use_point = document.querySelector(".use_point");
        let temp_value = get_number_func($("#cumulated_point").html());
        let using_point = get_number_func($("#use_point").html());
            switch(e.target.id){
                    case "use_point_input_btn":
                        document.querySelector(".point_use_point_input_box").style.display = "none";
                        $("#left_point").html(print_dot_func(temp_value - using_point));
                    break;
                    case "use_point_reset_btn":
                        use_point.innerHTML = 0;
                        point_input_temp = true;
                    break;
            }
        })


        $(".point_use_point_input_btn").on("click", function(e){
            let use_point = document.querySelector(".use_point");
            let temp_point_value = get_number_func(use_point.innerHTML);
            let cumulated_point = document.querySelector(".cumulated_point");
            if(parseInt(temp_point_value + e.target.innerHTML) <= get_number_func(cumulated_point.innerHTML)){
                    if(use_point.innerHTML === "0" && /^[0-9]$/.test(e.target.innerHTML)){
                        temp_point_value = e.target.innerHTML;
                    }else if(/^[0-9]$/.test(e.target.innerHTML)){
                        temp_point_value += e.target.innerHTML;
                    }
            }
            use_point.innerHTML = print_dot_func(temp_point_value);
        })
        $(this).on("click",function(e){
            switch(e.target.id){
            //번호를 입력했을 때 해당 번호의 포인트를 가져오는 이벤트
                    case "input_btn":
                        if(temp_number.length == 8 && $("#input_btn").css("color") === "rgb(210, 146, 95)"){
                            get_user_info(temp_number);
                            $("#input_btn").css("color" , "#36544d");
                            $("#point_using_btn").css("color" , "#dbd6c1");
                            $("#point_accumulate_btn").css("color" , "#dbd6c1");
                            $("#point_using_btn").css("pointer-events" , "auto");
                            $("#point_accumulate_btn").css("pointer-events" , "auto");
                            $("#input_btn").css("pointer-events" , "none");
                        }
                    break;
                    //초기화를 눌렀을 때 
                    case "reset_btn":
                        $(".point_input_box").empty();
                        $("#cumulated_point").html(0);
                        $("#use_point").html(0);
                        $("#left_point").html(0);
                        $("#receipt_user_phone").css("display" , "none");
                        $("#receipt_insert_point").css("display" , "none");
                        $("#receipt_total_point").css("display" , "none");
                        $("#input_btn").css("color" , "#d2925f");
                        $("#point_using_btn").css("color" , "#36544d");
                        $("#point_using_btn").css("pointer-events" , "none");
                        $("#point_accumulate_btn").css("color" , "#36544d");
                        $("#point_accumulate_btn").css("pointer-events" , "none");
                        $("#input_btn").css("pointer-events" , "auto");
                        temp_number = "";
                    break;
                    case "point_new_number_popup":
                    case "point_new_number_popup_string":
                        $("#point_new_number_popup").css("display","none");
                    break;
                    case "card_cancle_btn":
                    //입력이 완료되었습니다! 버튼을 눌렀을 때 영수증이 보여집니다.
                        let user_point = get_number_func($("#cumulated_point").text());
                        let use_point = get_number_func($("#payment_use_point").text());
                        let last_price = get_number_func($("#payment_last_price").text());
                        receipt_total_price
                        if(temp_number != "") {
                            $("#receipt_user_phone").text("010" + temp_number);
                            $("#receipt_insert_point").text(print_dot_func(Math.floor(last_price*0.1)));
                            $("#receipt_total_point").text(print_dot_func(Math.floor((user_point-use_point+(last_price*0.1)))));
                            $('.receipt_user_phone_title').parent().css('display',"block");
                            $('.receipt_user_phone_title').css('display','inline-block');
                            $("#receipt_user_phone").css("display" , "inline-block");
                            $('.point_info_wrap').css("display" , "block");
                            $('.point_info_wrap >span').css("display" , "inline-block");

                            $("#receipt_insert_point").css("display" , "inline-block");
                            $("#receipt_total_point").css("display" , "inline-block");
                            $("#receipt_total_point").css("display" , "block");
                        }
                        $("#receipt_total_count").text($("#payment_total_count").text());
                        $("#receipt_total_price").text($("#payment_total_price").text());
                        $("#receipt_user_number").text(Math.floor(Math.random()*201)+100);
                        $(".receipt_area").css("display","block");
                    //포인트 정보가 db에 넘어갑니다.
                        $.ajax({
                            type : "post",
                            url : "./php/insert_point.php",
                            data : {"user_number" : temp_number , "user_point" : get_number_func($("#payment_last_price").text())*0.1 , "use_point" : get_number_func($("#payment_use_point").text())}
                        });
                    break;
                    case "receipt_check_btn":
                    //영수증의 '확인'버튼을 누르면 새창이 보여집니다.
                        location.href = "./menu.html";
                    break;
            };
        });
        let month_temp ="";
        $("#point_using_btn").on("click",function(){
            if($("#point_using_btn").css("color") === "rgb(219, 214, 193)") {
                    $(".point_area").css("display","none");
                    let total_price = get_number_func($("#payment_total_price").text());
                    let use_point = get_number_func($("#use_point").text());
                    if(total_price - use_point < 0) {
                        use_point = total_price;
                    }
                    $("#payment_use_point").text(thounsandComma(use_point));
                    $("#payment_last_price").text(thounsandComma(total_price - use_point));
            }
            // alert("사용포인트, 잔여포인트값을 5번페이지로 가져가기");
            // $(".card_background").css("display" , "block");
        });  //결제창에서 사용포인트 적용하는 이벤트
        $("#point_accumulate_btn").on("click",function(){
            if($("#point_using_btn").css("color") === "rgb(219, 214, 193)") {
                    $(".point_area").css("display","none");
                    $("#payment_use_point").text(thounsandComma(0));
            }
            // $(".card_background").css("display" , "block");
        })
        $("#payment_point_button").on("click" , function () {
            $("#point_area").css("display" , "block");
            $(".card_background").css("display" , "none");
        });
        $("#payment_card_button").on("click" , function () {
            let total_price = get_number_func($("#payment_total_price").text());
            if(total_price > 50000){
                    $(".payment_monthly").css("display", "block");
                    $("#monthly_cancel").on("click", function(){
                        $(".payment_monthly").css("display", "none");
                    })
                    $(".month_num").on("click", function(){
                        $(".payment_monthly").css("display", "none");
                        $("#card_area").css("display", "block");
                        $(".card_background").css("display", "block");
                        month_temp = $(this).html();
                        
                        $("#receipt_installment").text(month_temp);
                        $("#receipt_installment").css('display','block');
                    })                         
            }else{
                    $("#card_area").css("display", "block");
                    $(".card_background").css("display", "block");

            }

        });
        // $("#card_close_button").on("click" , function () {
        //      $("#card_area").css("display" , "none");
        //      $(".card_background").css("display" , "none");
        // })
        // $("#point_close_button").on("click" , function () {
        //      $("#point_area").css("display" , "none");
        //      $(".card_background").css("display" , "none");
        // })
        // $("#payment_point_button").on("click" , function () {
        //      $("#point_area").css("display" , "block");
        //      $(".card_background").css("display" , "none");
        // });
        // $("#payment_card_button").on("click" , function () {
        //      $("#card_area").css("display" , "block");
        //      $(".card_background").css("display" , "block");
        // });

        $("#card_close_button").on("click" , function () {
            $("#card_area").css("display" , "none");
            $(".card_background").css("display" , "none");
        })
        $("#point_close_button").on("click" , function () {
            $("#point_area").css("display" , "none");
            $(".card_background").css("display" , "none");
        })
        $(this).on("click",function(e){
            switch(e.target.id){
                    case "payment_point_button":
                        if($("#payment_print_menu").html() != ""){
                            $("#point_area").css("display" , "block");
                            $(".card_background").css("display" , "none");
                        }
                    break;
                    case "payment_card_button":
                        let total_price = get_number_func($("#payment_total_price").text());
                        if($("#payment_print_menu").html() != "" && total_price < 50000){
                            $("#card_area").css("display" , "block");
                            $(".card_background").css("display" , "block");
                        }
                    break;
            }
        })
    })
    // ====================================================CODE FROM SEA
    ///////인쇄
    var init_body;
    function before_print (){
        let receipt_printarea = document.querySelector('.receipt_printarea');
        init_body = document.body.innerHTML;
        console.log(init_body);
        document.body.innerHTML = receipt_printarea.innerHTML;
    }
    function after_print(){
        document.body.innerHTML = init_body;
    }
    function page_print(){
        let yes_option = document.querySelectorAll(".receipt_select_yes_option");
        let no_option = document.querySelectorAll(".receipt_select_no_option");
        $(".portpolio_number_info").css("display", "none");
        $(".receipt_check_btn").css("display", "none");
        if(yes_option.length * 76.69 + no_option.length * 46 >= 230){
            $(".receipt_box").css({
                    "top": "0", "transform": "translate(0%, 0%)", 
                    "height": (546 + (yes_option.length * 76.69 + no_option.length * 46 - 230))+"px",
                    "left": "25%"
            });
            $("#receipt_orderlist").css("height", yes_option.length * 76.69 + no_option.length * 46 + "px");
            $("#receipt_orderlist").css("margin-top", "10px");
        }
        window.onbeforeprint = before_print();
        window.onafterprint = after_print();
        window.print();
        location.reload();
    }
    $("#receipt_check_btn").on("click", function(){
        page_print();
    });
});