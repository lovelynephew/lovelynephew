
load();



function load() {
    // principal.js 에서 가져옴
    const userCode = getUser().user_code;

    $.ajax({
		async: false,
		type: "get",
		url: `/mypage/order/history/${userCode}`,
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
    const mainBox= document.querySelector(".main-box");
    
    mainBox.innerHTML = "";
    let i = 0;
    for(let order of data) {
        let date = order.createDate.replaceAll("-", ".");
        let imgURL = null;

        if(order.prdMainImg != null) {
            imgURL = `${order.prdMainImg}`;
        }else {
            imgURL = "/static/user/images/non-img.png";
        }

        let orderStatus = null;
        if(order.orderStatus == 1) {
            orderStatus = "배송준비중";
        } else if(order.orderStatus == 2) {
            orderStatus = "배송보류";
        } else if(order.orderStatus == 3) {
            orderStatus = "배송대기";
        } else if(order.orderStatus == 4) {
            orderStatus = "배송중";
        } else if(order.orderStatus == 5) {
            orderStatus = "배송완료";
        } else if(order.orderStatus == 6) {
            orderStatus = "구매확정";
        }

        mainBox.innerHTML += `
                <section>
                    <div class="order-wrap">
                        <div class="section-title-wrap">
                            <div class="section-title">${date}</div>
                            <div class="section-title">주문상세</div>
                        </div>
                        <div class="order-item">
                            <div class="order-item-header">
                                <div class="item-header">
                                    ${orderStatus}
                                </div>
                            </div>
                            <div class="order-item-body">
                                <img class="order-img" src="${imgURL}">
                                <div class="order-product-wrap">
                                    <div class="order-product">
                                        <div class="product-name">${order.prdName}</div>
                                        <div class="product-sale">${order.discountPercentage}% sale</div>
                                        <div class="product-option">${order.regularPrice}원/<span>1개</span></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
        `;
        
    }
    const itemBody = document.querySelectorAll(".order-item-body");
    for(let i = 0; i < itemBody.length; i++) {
        itemBody[i].onclick = () => {
            // const queryString = `?prdName=${order.prdName}&orderCode=${order.orderCode}&prdImg=${order.prdMainImg}&regularPrice=${order.regularPrice}&discountPrice=${order.discountPrice}&orderStatus=${orderStatus}&orderDate=${order.createDate}`;
            const queryString = `?orderCode=${data[i].orderCode}`;
            location.href = "/mypage/myshopping-info/detail" + encodeURI(queryString);
        }
    }
}

// function dataChange(data) {
//     let orderStatus = null;
//     if(data.orderStatus == 1) {
//         orderStatus = "배송준비중";
//     } else if(data.orderStatus == 2) {
//         orderStatus = "배송보류";
//     } else if(data.orderStatus == 3) {
//         orderStatus = "배송대기";
//     } else if(data.orderStatus == 4) {
//         orderStatus = "배송중";
//     } else if(data.orderStatus == 5) {
//         orderStatus = "배송완료";
//     } else if(data.orderStatus == 6) {
//         orderStatus = "구매확정";
//     }

//     return orderStatus;
// }


// const itemBody = document.querySelectorAll(".order-item-body");
// //  `?gender=${data.gender}&age=${data.age}&kidStyle=${data.kidStyle}&priceMin=${data.priceMin}&priceMax=${data.priceMax}`;

// itemBody.forEach((order, index) => {
//     order[index].onclick = () => {
//         const queryString = `?prdName=${order.prdName}`;
//         location.href = "/mypage/myshopping-info/detail" + encodeURI(queryString);
//     }
// });