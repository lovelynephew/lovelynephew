// 로컬 스토리지에서 JSON 데이터를 가져와서 파싱
const productsData = JSON.parse(localStorage.getItem('productsData'));

console.log(productsData); 
const orderCode = document.getElementById("orderCode").innerHTML; //주문번호 
const userCode = 2;
const prdCode = [];
for(let i =0; i<productsData.length; i++) {
    prdCode[i] = productsData[i].productCode;
}//결제한 물건 번호
console.timeLog(prdCode);


document.getElementById("prdName").innerHTML= productsData["0"].name;//제품이름
document.getElementById("paidPrdName").innerHTML= productsData["0"].name;
document.getElementById("regPrice").innerHTML = productsData["0"].productRegularPrice;//정가
document.getElementById("prdPrice").innerHTML = productsData["0"].productRegularPrice;//할인가
document.getElementById("prdDisPrice").innerHTML = "(-)" + (productsData["0"].productRegularPrice-productsData["0"].productDiscountPrice);//할인받은 금액


// 결제 정보 db에 넣음

const orderInfo = {
    "orderCode": orderCode,
    "userCode": 1,
    "prdCode": prdCode,
    "eventCode": 3,
    "paymentStatus": 4,
    "orderStatus": 5,
    "csStatus": 6,
    "paymentMethod": "신용카드",
    "paymentAmount": 8,
    "deliveryRequest": "하ㅎㅏ"
};
$.ajax({
    async: false,
    type: "post",
    url: "/payment/order",
    contentType: "application/json",
    data: JSON.stringify(productsData),
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