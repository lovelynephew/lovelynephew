let codeExecuted = false;
let privacy = {};

$(document).ready(function() {
//상품금액
	let prdRegularP = 0;
	let prdDiscountP = 0;
	let totalPrice= 0;

    if (!codeExecuted) {
//글자수세기
		$("#ord_receiver_memo").keyup(function(e) {
			var content = $(this).val();
			$("#textLengthCheck").text("(" + content.length + " / 최대 50자)"); //실시간 글자수 카운팅
				if (content.length > 50) {
					alert("최대 50자까지 입력 가능합니다.");
					$(this).val(content.substring(0, 50));
					$('#textLengthCheck').text("(50 / 최대 50자)");
				}
		});



// 로컬 저장소에서 정보를 가져옴
		const productsData = localStorage.getItem('productsData');
		
		if (productsData) {
// JSON 문자열을 파싱하여 Products 객체로 변환
			const products = JSON.parse(productsData);
			console.log(products);
//구매물품 정보 뿌리기
			const paymentInnerHTml = document.querySelector(".payment_personal_prd_wrapper01");

			for (const pcode in products) {
//총 가격처리 위함				
				prdRegularP += parseInt(products[pcode].productRegularPrice, 10);
				prdDiscountP += parseInt(products[pcode].productDiscountPrice, 10);
				//totalPrice += prdRegularP;
								
				paymentInnerHTml.innerHTML += `
				<section class="payment_personal_prd_wrapper02">
					<header class="payment_personal_prd_wrapper03">
						<div class="payment_personal_prd_top_wrapper01">
							<div class="payment_personal_prd_brd_name">
								${products[pcode].name}
							</div>
						</div>
						<div class="shoppring_fee">
							<span class="shopping_fee_text">배송비</span>
							<span class="shopping_fee_price"><span>3,000원</span></span>
						</div>
					</header>
					<div class="payment_prd_info_wrapper01">
						<div class="payment_prd_info_wrapper02"> 
							<div class="payment_prd_info_wrapper03">
								<figure>
									<img class="payment_prd_info_img" src="https://cf.product-image.s.zigzag.kr/original/d/2023/8/25/25938_202308251727060762_56489.gif?width=400&height=400&quality=80&format=webp" alt="">
								</figure>
								<div class="payment_prd_info_wrapper04">
									<h4 class="payment_prd_name">
										<input type="text" name="good_name" value="${products[pcode].name}" size="100" />
									</h4>
									<div class="payment_prd_wrapper05">
										<span class="payment_prd_op_wrapper01">
											1개
											<span></span>
										</span>
									</div>
									<span class="payment_prd_regular_price">${products[pcode].productRegularPrice}<span>원</span></span>
									<div class="payment_prd_dis_price_wrapper01">
										<div class="payment_prd_dis_price_wrapper02">
											<span class="payment_prd_text">Z할인가</span>
											<span class="payment_prd_dis_price">${products[pcode].productDiscountPrice}<span>원</span></span>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
				`;
			}	
		}else {
			alert("정보를 불러오지 못했습니다.")
		}
//가격 정보 뿌리기
	document.getElementById("payment_total_info_reguralPrice").innerHTML = prdRegularP +" 원";
	document.getElementById("payment_total_info_discountPrice").innerHTML = "(-)" + (prdRegularP - prdDiscountP);
	document.getElementById("payment_total_info_totaltPrice").value= prdDiscountP+3000;
	
    codeExecuted =false; // 코드가 한 번 실행되었음을 표시
    }	

	openAgreeMomal();
	
	const payBtn = document.querySelector(".pay_btn");
	payBtn.addEventListener("click", function() {
		deliveryRequest();
		console.log("함수 실행 됨");
	})

	console.log("함수 실행 되고 끝남");

});

//약관 동의 모달창
function openAgreeMomal() {
	const agree01 = document.querySelector(".payment_agreement_info01_wrap03");
	const buyAgreePopupBackground01 = document.querySelector(".buy_agree_popup_background01");
	const buyAgreePopupCloseBtn01 = document.querySelector(".buy_agree_popup_close_btn01");

	const agree02 = document.querySelector(".payment_agreement_info02_wrap01");
	const buyAgreePopupBackground02 = document.querySelector(".buy_agree_popup_background02");
	const buyAgreePopupCloseBtn02 = document.querySelector(".buy_agree_popup_close_btn03");

	agree01.addEventListener('click', () => {
		buyAgreePopupBackground02.style.display = 'none';
		buyAgreePopupBackground01.style.display = 'block';
	});
	
	buyAgreePopupCloseBtn01.addEventListener('click', () => {
		buyAgreePopupBackground01.style.display = 'none';
	});


	agree02.addEventListener('click', () => {
		buyAgreePopupBackground01.style.display = 'none';
		buyAgreePopupBackground02.style.display = 'block';

	 });
	
	buyAgreePopupCloseBtn02.addEventListener('click', () => {
		buyAgreePopupBackground02.style.display = 'none';
	});
}

//배송 요청사항
function deliveryRequest () {
	const productsData = localStorage.getItem('productsData');
    const products = JSON.parse(productsData);

    // select 요소를 가져옵니다.
    const selectRequestElement = document.querySelector(".payment_delivery_Req_wrapper02");
    const selectRequest = selectRequestElement.value;

    const textRequestElement = document.querySelector(".payment_delivery_req_text");
    const textRequest = textRequestElement.value;

    // 새로운 정보 추가
    products[0]["selectRequest"] = selectRequest;
    products[0]["textRequest"] = textRequest;
    console.log(products);

    // 업데이트된 데이터를 다시 로컬 스토리지에 저장
    localStorage.setItem('productsData', JSON.stringify(products));
}


{/* <section class="payment_personal_prd_wrapper02">
					<header class="payment_personal_prd_wrapper03">
						<div class="payment_personal_prd_top_wrapper01">
							<div class="payment_personal_prd_brd_name">
								${products[pcode].name}
							</div>
						</div>
						<div class="shoppring_fee">
							<span class="shopping_fee_text">배송비</span>
							<span class="shopping_fee_price"><span>3,000원</span></span>
						</div>
					</header>
					<div class="payment_prd_info_wrapper01">
						<div class="payment_prd_info_wrapper02"> 
							<div class="payment_prd_info_wrapper03">
								<figure>
									<img class="payment_prd_info_img" src="https://cf.product-image.s.zigzag.kr/original/d/2023/8/25/25938_202308251727060762_56489.gif?width=400&height=400&quality=80&format=webp" alt="">
								</figure>
								<div class="payment_prd_info_wrapper04">
									<h4 class="payment_prd_name">
										<input type="text" name="good_name" value="${products[pcode].name}" size="100" />
									</h4>
									<div class="payment_prd_wrapper05">
										<span class="payment_prd_op_wrapper01">
											<span>
											${products[pcode].characterSelect}/${products[pcode].wrappingSelect}/${products[pcode].gasSelect}/${products[pcode].letteringSelect}
											</span>
											${products[pcode].prdAmount}개
											<span></span>
										</span>
									</div>
									<span class="payment_prd_regular_price">${products[pcode].productRegularPrice}<span>원</span></span>
									<div class="payment_prd_dis_price_wrapper01">
										<div class="payment_prd_dis_price_wrapper02">
											<span class="payment_prd_text">Z할인가</span>
											<span class="payment_prd_dis_price">${products[pcode].productDiscountPrice}<span>원</span></span>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section> */}

