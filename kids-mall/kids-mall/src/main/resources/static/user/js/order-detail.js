const orderNumber = document.querySelector(".order-number p");
const orderDate = document.querySelector(".order-number span");

const productName1 = document.querySelector(".product-name1");
const productName2 = document.querySelector(".product-name2");
const priceBox = document.querySelector(".price-box span");
const orderStatus = document.querySelector(".order-status");
const userName = document.querySelector(".recipient");
const userPhone = document.querySelector(".phone-number");
const userAddress = document.querySelector(".detail-address");

const productPrice = document.querySelector(".product-price");
const discountPrice = document.querySelector(".discount-price");
const paymentPrice = document.querySelector(".payment-price");
const paymentStatus = document.querySelector(".payment-status");
const cardPrice = document.querySelector(".card-price");

const productImg = document.querySelector(".prd-main-image");


load();


function load() {

    const lastIndex = location.search.lastIndexOf("=");
    const orderCode = location.search.substring(lastIndex + 1);
    
    $.ajax({
		async: false,
		type: "get",
		url: `/mypage/order/detail/${orderCode}`,
		dataType: "json",
		success: (response) => {
			console.log(response.data);
            getData(response.data);
		},
		error: (error) => {
			if(error.status == 400) {
				alert(JSON.stringify(error.responseJSON.data));
			}else {
				console.log("요청실패");
				console.log(error);
			}
		}
	})
}

function getData(data) {
    orderNumber.innerHTML = `No.${data.orderCode}`;

    let date = data.createDate.replaceAll("-", ".");
    orderDate.innerHTML = `${date}`;
    
    productName1.innerHTML = `${data.prdName}`;
    productName2.innerHTML = `${data.prdName}`;
    productImg.src = `${data.prdMainImage}`;
    priceBox.innerHTML = `${priceToString(data.prdRegularPrice)}`;

    let orderStatusText = null;
    if (data.orderStatus == 1) {
        orderStatusText = "배송준비중";
    } else if (data.orderStatus == 2) {
        orderStatusText = "배송보류";
    } else if (data.orderStatus == 3) {
        orderStatusText = "배송대기";
    } else if (data.orderStatus == 4) {
        orderStatusText = "배송중";
    } else if (data.orderStatus == 5) {
        orderStatusText = "배송완료";
    } else if (data.orderStatus == 6) {
        orderStatusText = "구매확정";
    }
    orderStatus.innerHTML = `${orderStatusText}`;

    userName.innerHTML = `${data.userName}`;

    userPhone.innerHTML = `${data.userPhone}`;

    userAddress.innerHTML = `${data.userDetailAddress}`;

    productPrice.innerHTML = `${priceToString(data.prdRegularPrice)}`;

    let discountPriceValue = data.prdRegularPrice - data.prdDiscountPrice;
    console.log("할인금액: " + discountPriceValue);
    discountPrice.innerHTML = `${priceToString(discountPriceValue)}`;

    paymentPrice.innerHTML = `${priceToString(data.paymentAmount)}`;

    paymentStatus.innerHTML = `${data.paymentMethod}`;

    cardPrice.innerHTML = `${priceToString(data.paymentAmount)}`;

}

// 숫자 쉼표 찍기(가격(ex.100,000))
function priceToString(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
