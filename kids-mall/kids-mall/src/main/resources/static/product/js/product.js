
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


//구매하기 모달 창 띄우기
const buyBtn= document.querySelector(".buy_bar_buy");
const buyModal = document.querySelector(".buy_modal_wrapper01");

buyBtn.addEventListener('click', () => {
    buyModal.style.display = 'block';
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
			if(response.data){
				alert("회원가입 완료");
				location.replace("/auth/signin");//뒤로가기 불가능 뒤로가기 눌렀응ㄹ때 defalut 주소로 감 (시큐리티설정/index)
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

    })
}