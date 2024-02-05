// 로컬 스토리지에서 JSON 데이터를 가져와서 파싱
const productsData = JSON.parse(localStorage.getItem('productsData'));

console.log(productsData); 
const orderCodeText = document.getElementById("orderCode").innerText; //주문번호
const orderCode =  orderCodeText.slice(4);
const userCode = 2; //유저코드 

//주문 상품 코드를 배열로 설정
const prdCode = [];
for (let i = 0; i < productsData.length; i++) {
    prdCode.push(productsData[i].productCode);
}

const prdInnerHtml = document.querySelector(".main-middle");
for(let i=0; i<productsData.length; i++) {
	const textRequest = productsData["0"].textRequest;//요청사항
	const payMethod = document.getElementById("payMethod").innerText;//결제수단
	
	console.log("textRequest: "+textRequest);
	console.log("payMethod: "+payMethod);	

	console.log(productsData[0]);
	
	prdInnerHtml.innerHTML += `
	<div class="product-detail-box">
		<div class="product-box-top">
			<p id="prdName" >${productsData[i].name}</p>
		</div>
		<div class="product-box-middle">
			<span>구매확정</span>
			<div class="product-data">
				<img src="${productsData[i].prdMainImg}" id="prdMainImg">
				<div class="product-desc">
					<p id="paidPrdName">${productsData[i].name}</p>
					<div class="price-box">
						<span id="regPrice">${productsData[i].productRegularPrice}원</span>
					</div>
				</div>
			</div>
			<div class="other-service">
				<p>배송현황</p>
				<p>문의하기</p>
			</div>
		</div>
	</div>`;
}


//정가 상품 총 가격
let prdReqPrice = 0;
for(let i=0; i<productsData.length; i++) {
    prdReqPrice += parseInt(productsData[i].productRegularPrice, 10) ;
}
document.getElementById("prdPrice").innerHTML = prdReqPrice;

//총 할인된 금액
let prdDisPrice = 0;
for(let i=0; i<productsData.length; i++) {
    prdDisPrice += parseInt(productsData[i].productDiscountPrice, 10) ;
}
document.getElementById("prdDisPrice").innerHTML = "(-)" + (prdReqPrice-prdDisPrice);

//배송요청사항
document.getElementById("deleveryselectRequest").innerHTML=localStorage.getItem('deliveryOption');
document.getElementById("deleveryRequest").innerHTML =localStorage.getItem('memo2');

// 결제 정보 db에 넣음
const orderInfo = {
    "orderCode": orderCode,
    "userCode": 3,
    "prdCode": productsData.productCode,
    "eventCode": 3,
    "paymentStatus": 4,
    "orderStatus": 5,
    "csStatus": 6,
    "paymentMethod": payMethod,
    "paymentAmount": prdDisPrice+3000,
    "deliveryRequest": "textRequest"
};

$.ajax({
    async: false,
    type: "post",
    url: "/payment/order",
    contentType: "application/json",
    data: JSON.stringify(orderInfo),
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
});
