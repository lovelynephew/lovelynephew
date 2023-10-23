let productName = "";
let productMaker= "";
let productRegularPrice = "";
let productDiscountPrice = "";

load(1);
//chiceOption();
//제품 띄우기
function load(productCode) {
    $.ajax({
        type: "GET",
        url: "/productInfo",
        data: {
            "prdCode": productCode
        },
        success: (response) => {
            //결제하기에 정보 가져가기 위함 
            productName = response.data.prdName;
            productMaker = response.data.prdMaker;
            productRegularPrice = response.data.prdRegularPrice;
            productDiscountPrice = response.data.prdDiscountPrice;
            //함수호출
            mainRating(productCode);
            reviewAmount(productCode);
            mainRating(productCode);
            prdReviewAll(productCode);
            prdReviewPic(productCode);
            viewAll(productCode);
            document.getElementById("product_main_img_id").src = response.data.prdMainImage;
            document.getElementById("pdp_title_id").innerHTML = response.data.prdName;
            document.getElementById("pdp_detail_explain_id").innerHTML = response.data.prdBrifExplain;
            document.getElementById("pdp_price_discountLate_id").innerHTML = response.data.prdDiscountPercentage+"%";
            document.getElementById("pdp_price_discount_price_id").innerHTML = response.data.prdDiscountPrice;
            document.getElementById("pdp_price_regular_price_id").innerHTML = response.data.prdRegularPrice;
            document.getElementById("prd_detail_img_id").src=response.data.prdDetailExplain;
            
        },  
        error: (error) => {
        }
    });
}

//메인별점
function mainRating(productCode) {
    $.ajax({
        type: "GET",
        url: "/rating",
        data: {
            "prdCode" : productCode
        },
        success: (response) => {
            let rating = response.data;
            if (isNaN(rating) || !isFinite(rating)) {
                rating = 0;
            }
            console.log("rating:" +response.data);
        
            document.getElementById("review_score").innerHTML = rating;
            document.getElementById("middle_star_score").innerHTML = rating;
           
            if(rating>4.4) {
                document.getElementById("top_star1").innerHTML = "⭐️";
                document.getElementById("top_star2").innerHTML = "⭐️";
                document.getElementById("top_star3").innerHTML = "⭐️";
                document.getElementById("top_star4").innerHTML = "⭐️";
                document.getElementById("top_star5").innerHTML = "⭐️";
        
                document.getElementById("middle_star1").innerHTML = "⭐️";
                document.getElementById("middle_star2").innerHTML = "⭐️";
                document.getElementById("middle_star3").innerHTML = "⭐️";
                document.getElementById("middle_star4").innerHTML = "⭐️";
                document.getElementById("middle_star5").innerHTML = "⭐️";
        
                document.getElementById("star1").innerHTML = "⭐️";
                document.getElementById("star2").innerHTML = "⭐️";
                document.getElementById("star3").innerHTML = "⭐️";
                document.getElementById("star4").innerHTML = "⭐️";
                document.getElementById("star5").innerHTML = "⭐️";
        
        
            }else if(rating>3.4){
                document.getElementById("top_star1").innerHTML = "⭐️";
                document.getElementById("top_star2").innerHTML = "⭐️";
                document.getElementById("top_star3").innerHTML = "⭐️";
                document.getElementById("top_star4").innerHTML = "⭐️";
        
                document.getElementById("middle_star1").innerHTML = "⭐️";
                document.getElementById("middle_star2").innerHTML = "⭐️";
                document.getElementById("middle_star3").innerHTML = "⭐️";
                document.getElementById("middle_star4").innerHTML = "⭐️";
        
                document.getElementById("star1").innerHTML = "⭐️";
                document.getElementById("star2").innerHTML = "⭐️";
                document.getElementById("star3").innerHTML = "⭐️";
                document.getElementById("star4").innerHTML = "⭐️";
            }
            else if(rating>2.4){
                document.getElementById("top_star1").innerHTML = "⭐️";
                document.getElementById("top_star2").innerHTML = "⭐️";
                document.getElementById("top_star3").innerHTML = "⭐️";
        
                document.getElementById("middle_star1").innerHTML = "⭐️";
                document.getElementById("middle_star2").innerHTML = "⭐️";
                document.getElementById("middle_star3").innerHTML = "⭐️";
        
                document.getElementById("star1").innerHTML = "⭐️";
                document.getElementById("star2").innerHTML = "⭐️";
                document.getElementById("star3").innerHTML = "⭐️";
            }
            else if(rating>1.4){
                document.getElementById("top_star1").innerHTML = "⭐️";
                document.getElementById("top_star2").innerHTML = "⭐️";
        
                document.getElementById("middle_star1").innerHTML = "⭐️";
                document.getElementById("middle_star2").innerHTML = "⭐️";
        
                document.getElementById("star1").innerHTML = "⭐️";
                document.getElementById("star2").innerHTML = "⭐️";
            }else if(rating>0.4){
                document.getElementById("top_star1").innerHTML = "⭐️";
                
                document.getElementById("middle_star1").innerHTML = "⭐️";
        
                document.getElementById("star1").innerHTML = "⭐️";
            }else {
        
            }
        },
        error: (error) => {
            if(error.status == 400) {//서버가 요청을 이해하지 못함 
                alert(JSON.stringify(error.responseJSON.data));
            }else {
                console.log("요청실패");
                console.log(error);
            }
        }
    });
}


//리뷰 개수
function reviewAmount(productCode){
    $.ajax({
        type: "GET",
        url: "/reviewAmount",
        data: {
            "prdCode" : productCode
        },
        success: (response) => {
            console.log(response.data);
            document.getElementById("review_amount_id").innerHTML="("+response.data+")";
            document.getElementById("caption_review_id").innerHTML=""+response.data+"개의 리뷰 보기";
            document.getElementById("review_preview_amount_id").innerHTML = response.data;
            document.getElementById("review_amount_id").innerHTML = response.data;  
            document.getElementById("reveiw_all_review_amount_id").innerHTML = response.data;
        },
        error: (error) => {
            if(error.status == 400) {//서버가 요청을 이해하지 못함 
                alert(JSON.stringify(error.responseJSON.data));
            }else {
                console.log("요청실패");
                console.log(error);
            }
        }
    });
}
//전체리뷰 보기
function viewAll(prdCode) {
    const viewAllA  = document.getElementById("viewAll");
    viewAllA.href = `/productAllReview/${prdCode}`;
}



//best상품 띄우기
function getBestPrd() {
    const bestPrdUl = document.querySelector(".best_prd_ul");
    $.ajax({
        type: "GET",
        url: "/bestPrd",
        data: {
            "catecory" : 3
        },
        success: (response) => {
    
           for(let i = 0; i<response.data.length; i++) {
            bestPrdUl.innerHTML += `
            <li class="best_prd_li"> 
                <div class="best_prd_img_wrapper01">
                    <picture class="best_prd_img_wrapper02">
                        <img src="https://cf.product-image.s.zigzag.kr/original/d/2023/5/26/14365_202305261355360494_59466.gif?width=300&height=300&quality=80&format=jpeg" alt="베스트 메뉴 사진">
                    </picture>
                    <button class="best_prd_img_heart">
                        <img src="https://content.zigzag.kr/_icon/card/card_heart_bordered.png" alt="하트">
                    </button>
                </div>
                <div id="bestPrd_num">${i+1}</div>
                <div>
                    <div id="bestPrd_brand">
                       ${response.data[i].prdMaker}
                    </div>
                    <div id="bestPrd_name">
                        ${response.data[i].prdName}
                    </div>
                    <div>
                        <span id="bestPrd_discountRate">${response.data[i].prdDiscountPercentage}%</span>
                        <span id="bestPrd_disPrice">${response.data[0].prdDiscountPrice}</span>
                    </div>
                    <div>
                        <span>★</span>
                        <span id="bestPrd_rating">${response.data[i].rating}</span>
                        <span id="bestPrd_riviewAmount"> (${response.data[i].reviewAmount})</span>
                    </div>
                </div>
            </li> `
    
           }
    
        },
        error: (error) => {
            if(error.status == 400) {//서버가 요청을 이해하지 못함 
                alert(JSON.stringify(error.responseJSON.data));
            }else {
                console.log("요청실패");
                console.log(error);
            }
        }
    });
}


//하트 누름 
function putHeard(likePrdCode){
    const wishIcon = document.querySelector(".buy_bar_heart");

    wishIcon.onclick = () => {
    console.log("하트 버튼을 누른다. in js");
    let wishListData = {
        userId: "test_USERID",
        prdCode: 3
    }
    
        $.ajax({
            async: false,
            type: "post",
            url: "/wishList",
            contentType: "application/json",
            data: JSON.stringify(wishListData),
            dataType: "json",
            success: (response) => {
                console.log(response.data);
            },
            error: (error) => {
                if(error.status == 400) {//서버가 요청을 이해하지 못함 
                    alert(JSON.stringify(error.responseJSON.data));
                }else {
                    console.log("요청실패");
                    console.log(error);
                }
            }
        
        })
    }
}



//상품정보 더보기 
document.addEventListener('DOMContentLoaded', function(){
const morePrdInfo = document.querySelector(".prd_detail_wrapper02");
const moreprdInfoBtn = document.getElementById("moreprdInfoBtn");

let isInfoVisible = false;

moreprdInfoBtn.addEventListener('click', function() {
    
    if (!isInfoVisible) {
       morePrdInfo.style.height='auto'; // 정보를 펼침
       moreprdInfoBtn.querySelector('span').textContent = '상품정보 숨기기 ∧';
    } else {
        morePrdInfo.style.height='1600px'; // 정보를 숨김
        moreprdInfoBtn.querySelector('span').textContent = '상품정보 더 보기 ∨';
    }
    
    isInfoVisible = !isInfoVisible; // 상태를 토글
});
})

//찜 하트 색상변경
const heartButton = document.querySelector(".buy_bar_heart");
const heartSvg = document.querySelector(".heart");

let isRed = false; 

heartButton.addEventListener("click", function () {
    if (isRed) {
        heartSvg.style.fill = "#a4a3a3"; 
    } else {
        heartSvg.style.fill = "#ff0000"; 
    }
    isRed = !isRed; 
});

//load(x)에 대한 리뷰정보를 3개만 들고오고 더 보기를 누르면 review-detail.html에 가기
//사진 리뷰의 개수와, 사진 들어있는 리뷰만 들고오기 
// 더보기 누르면 review_detaie.html에 똑같은 포맷에 뿌리기

//리뷰불러오기
function prdReviewAll(productCode) {
    $.ajax({
        type: "GET",
        url: "/prdReviewAll",
        data: {
            "prdCode": productCode
        },
        success: (response) => {
            let review_dom= document.getElementById("product_review_id");

            // for(let i =0; i<3; i++) {
            // if(response.data[i].option_lettering==null) {
            //         response.data[i].option_lettering="레터링안함";
            // }
            // if(response.data[i].optionChar==null) {
            //     response.data[i].optionChar="캐릭터선택안함";
            // }
            // if(response.data[i].optionRapping==null) {
            //     response.data[i].optionRapping="포장지선택안함";
            // }
            // if(response.data[i].optionGas==null) {
            //     response.data[i].optionGas="가스선택안함";
            // }
            // }

        for(let i = 0; i < 3; i++){
            if(i==1) {
                review_dom= document.getElementById("product_review_id");
            }else if(i==2){
                review_dom=document.getElementById("product_review_id2");
            }else {
                review_dom=document.getElementById("product_review_id3");
            }

            let starAmoun = response.data[i].rating;
            let starsHTML = '';
            for (let i = 0; i < starAmoun; i++) {
                starsHTML += '⭐️';
            }

            if(response.data[i].reviewPhoto==null || response.data[i].reviewPhoto== "" ){
                review_dom.innerHTML +=`
                <div class="review_all_feed_data_wrapper02">
                    <div class="review_all_feed_data_wrapper03">
                        <span class="review_all_userId" >${response.data[i].userId}</span>
                        <span class="review_all_date">${response.data[i].reviewUpdate}</span>
                    </div>
                    <div class="review_all_star_wrapper01">
                        <div class="review_all_star_wrapper02">
                           ${starsHTML}
                        </div>
                    </div>
                </div>
                <div class="review_all_img_wrapper01-2">
                    <div class="review_all_img_wrapper02">
                        <div class="review_all_img_wrapper03">
                            
                        </div>
                    </div>
                </div>
            <div style="border-bottom: 2px solid rgb(245, 246, 248);">
                <div class="review_all_option_wrapper">
                    <div class="review_all_option">
                        <span>선택 옵션</span>
                        <div>${response.data[i].option_lettering} ${response.data[i].optionChar} ${response.data[i].optionRapping} ${response.data[i].optionGas}</div>
                    </div>
                </div>
                <div class="review_all_text">
                    ${response.data[i].reviewContent}
                </div>
            </div>  
             
            `;
                }else{
                review_dom.innerHTML +=`
                <div class="review_all_feed_data_wrapper02">
                    <div class="review_all_feed_data_wrapper03">
                        <span class="review_all_userId" >${response.data[i].userId}</span>
                        <span class="review_all_date">${response.data[i].reviewUpdate}</span>
                    </div>
                    <div class="review_all_star_wrapper01">
                        <div class="review_all_star_wrapper02">
                        ${starsHTML}
                        </div>
                    </div>
            </div>
            <div class="review_all_img_wrapper01-2">
                <div class="review_all_img_wrapper02">
                    <div class="review_all_img_wrapper03">
                        <div class="review_all_img_wrapper04">
                        <img src="${response.data[i].reviewPhoto}" alt="리뷰사진">
                        </div>
                           
                        </div>
                        
                    </div>
                    <div class="review_all_img_sqs_icon">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </div>
            <div style="border-bottom: 2px solid rgb(245, 246, 248);">
                <div class="review_all_option_wrapper">
                    <div class="review_all_option">
                        <span>선택 옵션</span>
                        <div>${response.data[i].option_lettering} ${response.data[i].optionChar} ${response.data[i].optionRapping} ${response.data[i].optionGas}</div>
                    </div>
                </div>
                <div class="review_all_text">
                ${response.data[i].reviewContent}
                </div>
            </div>   
            `}
        }
        error: (error) => {
            if(error.status == 400) {//서버가 요청을 이해하지 못함 
                alert(JSON.stringify(error.responseJSON.data));
            }else {
                console.log("요청실패");
                console.log(error);
            }
        }}
    });
}


//사진리뷰
function prdReviewPic (productCode) {
    $.ajax({
        type: "GET",
        url: "/prdReviewPic",
        data: {
            "prdCode": productCode
        },
        success: (response) => {
            document.getElementById("photo_review_amount_id").innerHTML = response.data[0].recordCount;
            const photoReviewUlId = document.getElementById("photo_review_ul_id");
           
            if(response.data[0].recordCount<5){
                for(let i=0; i<response.data.length; i++) {
                    photoReviewUlId.innerHTML += `
                    <a href="https://zigzag.kr/review/list/110939788?feedType=photo&top_id=29936007">
                        <li class="photo_review_li">
                            <img class="photo_review_img" src="${response.data[i].reviewPhoto}" alt="사진리뷰">
                        </li>
                    </a> 
                    `; 
                } 
            }else {
                for(let i=0; i<3; i++) {
                    photoReviewUlId.innerHTML += `
                    <a href="https://zigzag.kr/review/list/110939788?feedType=photo&top_id=29936007">
                        <li class="photo_review_li">
                            <img class="photo_review_img" src="${response.data[i].reviewPhoto}" alt="사진리뷰">
                        </li>
                    </a> 
                    `; 
                }
                photoReviewUlId.innerHTML += `
                    <a href="http://localhost:8888/pruductPicReview">
                    <li class="photo_review_li">
                        <img class="photo_review_img" src="${response.data[3].reviewPhoto}" alt="사진리뷰">
                    
                        <div class="photo_review_more_wrapper01">
                            <div class="photo_review_more_wrapper02">
                                +
                                4
                                <br>
                                더 보기
                            </div>
                        </div>
                    </li>
                    </a>`

            }

        },  
        error: (error) => {
        }
    });
} 


//구매하기 모달창 띄우기
const buyModalBtn = document.querySelector(".buy_bar_buy");
const modal = document.querySelector(".buy_modal_wrapper01");

buyModalBtn.onclick = () => {
    modal.style.display = "flex";
}
window.addEventListener("click", (event) => {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});


//물품 정보
const products = {}; //선택한 물품 담기
// products[pcode] = {
//                 "name" : productName ,
//                 "maker": productMaker,
//                 "productRegularPrice" : productRegularPrice,
//                 "productDiscountPrice" : productDiscountPrice,
    
//                 "characterSelect": characterSelect.value,
//                 "wrappingSelect": wrappingSelect.value,
//                 "gasSelect": gasSelect.value,
//                 "letteringSelect": "레터링있음",
//                 "prdAmount": 1 
// };



dirPayment();
addCart(1);
//바로구매 버튼을 눌렀을 때
function dirPayment(){
    const nowBuyBtn = document.querySelector(".now_buy_btn");
        nowBuyBtn.addEventListener("click", function () {
            products[0] = {
                "name" : productName ,
                "maker": productMaker,
                "productRegularPrice" : productRegularPrice,
                "productDiscountPrice" : productDiscountPrice,
            };
            window.location.href = "/payment";

            // 정보를 로컬 저장소에 저장
            localStorage.setItem('productsData', JSON.stringify(products));

            // 다른 페이지로 이동
            window.location.href = '/payment';
        });     
}


//장바구니 눌렀을때 
function addCart (prdCode) {
    const cartBtn = document.querySelector(".cart_btn");
    cartBtn.addEventListener("click", function() {
        console.log("장바구니 버튼을 누름");
        $.ajax({
            async: false,
            type: "post",
            url: "/product/cart",
            contentType: "application/json",
            data: JSON.stringify({
                "userId" : "userId",
                "prdCode" : prdCode
            }),
            dataType: "json",
            success: (response) => {
                console.log(response.data);
                console.log("찜하기 완료");
            },
            error: (error) => {
                if(error.status == 400) {//서버가 요청을 이해하지 못함 
                    alert(JSON.stringify(error.responseJSON.data));
                }else {
                    console.log("요청실패");
                    console.log(error);
                }
            }
        
        })
    });
}








//모달창에서 메뉴 선택
//let pcode = 1; //선택한 물품을 담을순서
// const products = {}; //선택한 물품 담기
// const totalPrdAmount = document.getElementById("total_prd_amount");
// const totalPrdPrice = document.getElementById("total_prd_price");

//function chiceOption() {
    // const characterSelect = document.getElementById("character");
    // const wrappingSelect = document.getElementById("wrapping");
    // const gasSelect = document.getElementById("gas");
    // const letteringSelect = document.getElementById("lettering");
    // const optionText02 = document.getElementById("option_text02_id");//레터링 있음시 innerhtml
    // const prdOptionInnerHtml = document.getElementById("prdOption_innerHtml");//선택후 innerhtml
    

    // 두 번째 세번째 select 요소를 비활성화
    // wrappingSelect.disabled = true;
    // gasSelect.disabled = true;

    // 첫 번째 select 요소의 변경 이벤트를 감지
    // characterSelect.addEventListener("change", function() {
    //     // 두 번째 select 요소를 활성화 또는 비활성화
    //     if (characterSelect.value !== "캐릭터 선택" || "캐릭터 선택안함") {
    //         wrappingSelect.disabled = false;
    //     } else {
    //         wrappingSelect.disabled = true;
    //     }
    // });

    // 두 번째 select 요소의 변경 이벤트를 감지
    // wrappingSelect.addEventListener("change", function() {
    //     // 세 번째 select 요소를 활성화 또는 비활성화
    //     if (wrappingSelect.value !== "포장지 선택" || "포장지 선택안함") {
    //         gasSelect.disabled = false;
    //     } else {
    //         gasSelect.disabled = true;
    //     }
    // });

    // 세 번째 select 요소의 변경 이벤트를 감지
    // gasSelect.addEventListener("change", function() {
    //     // 네 번째 select 요소를 활성화 또는 비활성화
    //     if (gasSelect.value !== "공기선택") {
    //         letteringSelect.disabled = false;
    //     } else {
    //         letteringSelect.disabled = true;
    //     }
    // });

//레터링 선택
//letteringSelect.addEventListener("change", function() {
//     if(letteringSelect.value == "레터링선택") {
// //텍스트박스 글자수 세기
//         $(document).ready(function() {
//             $("#ord_receiver_memo").keyup(function(e) {
//                 var content = $(this).val();
//                 $("#textLengthCheck").text("(" + content.length + " / 최대 50자)"); //실시간 글자수 카운팅
//                 if (content.length > 50) {
//                     alert("최대 50자까지 입력 가능합니다.");
//                     $(this).val(content.substring(0, 50));
//                     $('#textLengthCheck').text("(50 / 최대 50자)");
//                 }
//             });
//         });

//         products[pcode] = {
//             "name" : productName ,
//             "maker": productMaker,
//             "productRegularPrice" : productRegularPrice,
//             "productDiscountPrice" : productDiscountPrice,

//             "characterSelect": characterSelect.value,
//             "wrappingSelect": wrappingSelect.value,
//             "gasSelect": gasSelect.value,
//             "letteringSelect": "레터링있음",
//             "prdAmount": 1 
//         };

//         prdOptionInnerHtml.innerHTML +=
//         `
//         <div class="prd_option_choice_wrapper02" id="personalPrdOptionChoiceWrapper02_${pcode}">
//             <div class="prd_option_choice_wrapper03">
//                 <p class="personal_prd_option">${characterSelect.value}/${wrappingSelect.value}/${gasSelect.value}/레터링 있음</p>
//             </div>
//             <button class="personal_prd_option_cancle_btn" id="cancleBtn_${pcode}">X</button>
//             <div class="personal_prd_option_change_amount_wrapper">
//                 <div class="personal_prd_option_change_amount_btn">
//                 <button class="minus_btn" id="minus_${pcode}">-</button>
//                 <div class="personal_prd_option_amount"><span id="personal_prd_option_amount_id_${pcode}">1</span></div>
//                 <button class="plus_btn" id="plus_${pcode}">+</button>
//                 </div>
//                 <div class="personal_prd_option_total_price"><span>12,000원</span></div>
//             </div>
//         </div>
//     `;

//     //totalPrdAmount.innerHTML=`${pcode}개의 상품금액`;
//     //totalPrdPrice.innerHTML=

//     prdBtn();
//     dirPayment()

//     pcode = pcode +1;
//     //선택박스 리셋
//     wrappingSelect.disabled=true;
//     gasSelect.disabled=true;
//     letteringSelect.disabled=true;
//     characterSelect.value="캐릭터 선택";
//     wrappingSelect.value="포장지 선택";
//     gasSelect.value="공기선택";
//     letteringSelect.value="레터링";
//     chiceOption();

    // }else if(letteringSelect.value == "레터링없음") {

    //     products[pcode] = {
    //         "name" : productName ,
    //         "maker": productMaker,
    //         "productRegularPrice" : productRegularPrice,
    //         "productDiscountPrice" : productDiscountPrice,

    //         "characterSelect": characterSelect.value,
    //         "wrappingSelect": wrappingSelect.value,
    //         "gasSelect": gasSelect.value,
    //         "letteringSelect": "레터링없음",
    //         "prdAmount": 1 // 초기 수량
    //     };

    //     prdOptionInnerHtml.innerHTML +=
    //     `
    //     <div class="prd_option_choice_wrapper02" id="personalPrdOptionChoiceWrapper02_${pcode}">
    //         <div class="prd_option_choice_wrapper03">
    //             <p class="personal_prd_option">${characterSelect.value}/${wrappingSelect.value}/${gasSelect.value}/레터링 없음</p>
    //         </div>
    //         <button class="personal_prd_option_cancle_btn" id="cancleBtn_${pcode}">X</button>
    //         <div class="personal_prd_option_change_amount_wrapper">
    //             <div class="personal_prd_option_change_amount_btn">
    //             <button class="minus_btn" id="minus_${pcode}">-</button>
    //             <div class="personal_prd_option_amount"><span id="personal_prd_option_amount_id_${pcode}">1</span></div>
    //             <button class="plus_btn" id="plus_${pcode}">+</button>
    //             </div>
    //             <div class="personal_prd_option_total_price"><span>12,000원</span></div>
    //         </div>
    //     </div>
    // `;

    // //상품 개수를 더해야 했음 
    // //totalPrdAmount.innerHTML=`${pcode}개의 상품금액`;
      
    // prdBtn();
    // dirPayment()
    
    // pcode = pcode +1;
    // //선택박스 리셋
    // wrappingSelect.disabled=true;
    // gasSelect.disabled=true;
    // letteringSelect.disabled=true;
    // characterSelect.value="캐릭터 선택";
    // wrappingSelect.value="포장지 선택";
    // gasSelect.value="공기선택";
    // letteringSelect.value="레터링";
    // chiceOption();
    // }      
    // });



//}


// +,-,X 버튼 처리 함수
// function prdBtn() {
//     for (let i = 1; i < pcode+1; i++) {
//         const plusButton = document.getElementById(`plus_${i}`);
//         const minusButton = document.getElementById(`minus_${i}`);
//         const cancleButton = document.getElementById(`cancleBtn_${i}`)
// //+버튼 눌렀을때
//         if (plusButton) {
//             plusButton.addEventListener("click", function () {
//                 // 상품 코드 추출
//                 const pcode = this.id.split("_")[1];
//                 // 수량 증가
//                 products[pcode].prdAmount = parseInt(products[pcode].prdAmount, 10) + 1;
//                 // 수량 업데이트
//                 const amountElement = document.getElementById(`personal_prd_option_amount_id_${pcode}`);
//                 amountElement.innerText = products[pcode].prdAmount;
            
//             });
//         }
// //-버튼 눌렀을때
//         if(minusButton){
//             minusButton.addEventListener("click", function(){
//                 // 상품 코드 추출
//                 const pcode = this.id.split("_")[1];
//                 // 수량 감소
//                 products[pcode].prdAmount = parseInt(products[pcode].prdAmount, 10) + - 1;
//                 if(products[i].prdAmount<1){
//                     products[i].prdAmount=1;
//                 }
//                 // 수량 업데이트
//                 const amountElement = document.getElementById(`personal_prd_option_amount_id_${pcode}`);
//                 amountElement.innerText = products[pcode].prdAmount;
//             })
//         }
// //x버튼 눌렀을때
//         if(cancleButton){
//             cancleButton.addEventListener("click", function(){
//                 const pcode = this.id.split("_")[1];

//                 const wrapperId = `personalPrdOptionChoiceWrapper02_${pcode}`;
//                 const wrapper = document.getElementById(wrapperId);

//                 if (wrapper) {
//                     // wrapper 요소가 존재하는 경우 삭제
//                     wrapper.remove();
        
//                     if (pcode in products) {
//                         // products 객체에서 해당 요소 제거
//                         delete products[pcode];
//                     } else {
//                         console.error(`Element with ID ${pcode} not found in products.`);
//                     }
//                 } else {
//                     console.error(`Element with ID ${wrapperId} not found.`);
//                 }


//             })
//         }
//     }   
// }



//바로구매를 눌렀을때
//페이지에 뿌려주고 그 뿌린 정보 결제까지 연동

// function dirPayment(){
//     const nowBuyBtn = document.querySelector(".now_buy_btn");
//         nowBuyBtn.addEventListener("click", function () {
//             //window.location.href = "/payment";

//             // 정보를 로컬 저장소에 저장
//             localStorage.setItem('productsData', JSON.stringify(products));

//             // 다른 페이지로 이동
//             window.location.href = '/payment';

//         });     
// }