const innerProduct = document.querySelector(".inner-product");

innerProduct.innerHTML = "";

let flag = location.href.includes("product/main");
console.log("flag 로그: " + flag);

// 필터 미등록 시에는 내 조카 맞춤선물을 보여주지 않는다.
if (session != null) {
    console.log("filter null검사");
    innerProduct.innerHTML += `<p class="product-title">내 조카 맞춤선물</p>`;


    for (let i = 0; i < productList.length; i++) {

        let imgURL = null;

        if(productList[i].prdMainImage != null) {
            imgURL = `${productList[i].prdMainImage}`;
        }else {
            imgURL = "/static/user/images/non-img.png";
        }

        if((i >= 6 || i == productList.length - 1) && flag != true) {
            innerProduct.innerHTML += `
                    <div class="more-view-product">
                        <a href="/product/main/0">
                            <p>필터 맞춤상품 더보기</p>
                        </a>
                    </div>
            `
            break;
        }
        // 한줄에 3개씩 보여준다.
        if (i % 3 == 0) {
            innerProduct.innerHTML += `
                                    <div class="recommend-box">
                                    </div>
            `;
        }

        const recommendBox = document.querySelector(".inner-product .recommend-box:nth-last-child(1)");


        if(productList[i].prdDiscountPrice == 0) {
            recommendBox.innerHTML += ` 
                                        <div class="recommend">
                                            <div class="recommend-img">
                                                <img src=${imgURL} alt="">
                                                <p class="explain inner-explain">${productList[i].prdName}</p>
                                                <p class="price inner-price">${productList[i].prdRegularPrice}원</p>
                                            </div>
                                        </div>
            `;
        }else {
            // 할인율 계산(원가 - 할인적용한 가격 / 원가 * 100)
            let discountRate = ((`${productList[i].prdRegularPrice}` - `${productList[i].prdDiscountPrice}`) / `${productList[i].prdRegularPrice}`) * 100;
            // 할인율을 반올림
            const roundedDiscountRate = Math.round(discountRate);
            recommendBox.innerHTML += `
                                        <div class="recommend">
                                            <div class="recommend-img">
                                                <img src=${imgURL} alt="">
                                                <div class="sale-box">
                                                    <div class="sale">${roundedDiscountRate}%</div>
                                                    <p class="sale-price">${productList[i].prdRegularPrice}원</p>
                                                </div>
                                                <p class="explain inner-explain">${productList[i].prdName}</p>
                                                <p class="price inner-price">${productList[i].prdDiscountPrice}원</p>
                                            </div>
                                        </div>
            `;
        }
    }
}
