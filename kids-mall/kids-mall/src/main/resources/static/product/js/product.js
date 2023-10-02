
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



//하트 누름 
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


//구매하기 모달 창 띄우기
const forModal = document.querySelector(".for_modal");
const buyBtn= document.querySelector(".buy_bar_buy");
const buyModal = document.querySelector(".buy_modal_wrapper01");

buyBtn.addEventListener('click', () => {
console.log("버튼 누름");
console.log(buyModal);

forModal.innerHTML += buyModal;

});

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

//메인별점
$.ajax({
type: "GET",
url: "/rating",
data: {
    "prdCode" : 1
},
success: (response) => {
    console.log("rating:" +response.data);
    let rating = response.data;
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

//리뷰 개수
$.ajax({
type: "GET",
url: "/reviewAmount",
data: {
    "prdCode" : 1
},
success: (response) => {
    console.log(response.data);
    document.getElementById("review_amount_id").innerHTML="("+response.data+")";
    document.getElementById("caption_review_id").innerHTML=""+response.data+"개의 리뷰 보기";
    document.getElementById("review_preview_amount_id").innerHTML = response.data;
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


