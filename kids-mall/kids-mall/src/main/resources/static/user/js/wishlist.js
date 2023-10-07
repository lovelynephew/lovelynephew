
load();

function load() {
    // principal.js 에서 가져옴
    const userId = getUser().user_id;

    $.ajax({
		async: false,
		type: "get",
		url: `/mypage/wishlist/${userId}`,
		dataType: "json",
		success: (response) => {
			console.log(response.data);
            if(response.data != null) {
                getData(response.data);
            }
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


function getData(productList) {
    const innerProduct = document.querySelector(".inner-product");

    innerProduct.innerHTML = "";
    for (let i = 0; i < productList.length; i++) {

        let imgURL = null;

        if(productList[i].prdMainImg != null) {
            imgURL = `${productList[i].prdMainImg}`;
        }else {
            imgURL = "/static/user/images/non-img.png";
        }

        // 한줄에 3개씩 보여준다.
        if (i % 3 == 0) {
            innerProduct.innerHTML += `
                                    <div class="recommend-box">
                                    </div>
            `;
        }


        const recommendBox = document.querySelector(".inner-product .recommend-box:nth-last-child(1)");


        // if(productList[i].prdDiscountPrice == productList[i].prdRegularPrice) {       
            recommendBox.innerHTML += ` 
                        <div class="recommend">
                            <div class="recommend-img">
                                <img class="img-goods" src="${imgURL}">
                                <p class="explain inner-explain">${productList[i].prdName}</p>
                                <p class="price inner-price">${productList[i].prdRegularPrice}원</p>
                            </div>
                            <img class="img-heart" src="/static/images/jpg/card_heart_filled.png">
                        </div>
            `;
        // }
        // else {
        //     recommendBox.innerHTML += `
        //                                 <div class="recommend">
        //                                     <div class="recommend-img">
        //                                         <img src="${imgURL}">
        //                                         <div class="sale-box">
        //                                             <div class="sale">${productList[i].prdDiscountPercentage}%</div>
        //                                             <p class="sale-price">${productList[i].prdRegularPrice}원</p>
        //                                         </div>
        //                                         <p class="explain">${productList[i].prdName}</p>
        //                                         <p class="price">${productList[i].prdDiscountPrice}원</p>
        //                                     </div>
        //                                 </div>
        //     `;
        // }
    }
}



// 할인가 있을때
    // recommendBox.innerHTML += `
    //                             <div class="recommend">
    //                                 <div class="recommend-img">
    //                                     <img src="${imgURL}">
    //                                     <div class="sale-box">
    //                                         <div class="sale">${productList[i].prdDiscountPercentage}%</div>
    //                                         <p class="sale-price">${productList[i].prdRegularPrice}원</p>
    //                                     </div>
    //                                     <p class="explain">${productList[i].prdName}</p>
    //                                     <p class="price">${productList[i].prdDiscountPrice}원</p>
    //                                 </div>
    //                             </div>
    // `;