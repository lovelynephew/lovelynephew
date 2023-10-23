
let regularPriceArray = new Array();
let discountPriceArray = new Array();

load();


function load() {
    // principal.js 에서 가져옴
    const userCode = getUser().user_code;

    $.ajax({
		async: false,
		type: "get",
		url: `/mypage/cart/${userCode}`,
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
    const itemContainer = document.querySelector(".item-container");
    const totalCnt = document.querySelector(".select-total");
    const itemTotal = document.querySelector(".item-total");

    // cartItem.innerHTML = "";
    itemContainer.innerHTML = "";

    itemTotal.textContent = `${data[0].itemCount}`;

    for(let i = 0; i < data.length; i++) {
        let imgURL = null;

        if(data[i].prdMainImg != null) {
            imgURL = `${data[i].prdMainImg}`;
        }else {
            imgURL = "/static/user/images/non-img.png";
        }

        itemContainer.innerHTML += `
                <div class="div-citem1"></div>
        `;

        const item = document.querySelector(".div-citem1:nth-last-child(1)");

        item.innerHTML = `
                <div class="div-citem2">
                    <div class="div-citem3">
                        <label class="label-citem1">
                            <input type="checkbox" class="input-cart2">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#D2D5D6">
                                <path d="M12 2C17.5197 2 22 6.48032 22 12C22 17.5197 17.5197 22 12 22C6.48032 22 2 17.5197 2 12C2 6.48032 6.48032 2 12 2Z" stroke="currentColor" stroke-width="2"></path>
                            </svg>
                        </label>
                        <div class="div-citem4">
                            <div class="div-citem5">
                                <figure class="figure-citem1">
                                    <img src="${imgURL}" class="img-cart1">
                                </figure>
                                <div class="div-citem6">
                                    <h4 class="body_14 h4-citem1" value="${data[i].cartId}">${data[i].prdName}</h4>
                                    <div class="div-citem8">
                                        <div class="div-citem10">
                                            <svg width="16" height="16" fill="none" viewBox="0 0 32 32" color="#A1A9AD" class="css-eslpka e170kbym0">
                                                <path fill="currentColor" fill-rule="evenodd" d="M26 16c0 5.523-4.477 10-10 10S6 21.523 6 16 10.477 6 16 6s10 4.477 10 10Zm-9.834-4.25c-1.224 0-2.216 1.083-2.216 2.05h-1.5c0-1.833 1.7-3.55 3.716-3.55 1.592 0 2.687.987 3.147 1.77.751 1.28.404 2.759-.635 3.728l-.998.932-.004.004-.022.022a3.757 3.757 0 0 0-.377.447c-.226.315-.36.621-.36.847h-1.5c0-.708.364-1.335.639-1.72.147-.205.293-.375.402-.494l.196-.2 1-.934c.602-.562.71-1.285.366-1.872a2.197 2.197 0 0 0-1.854-1.03ZM15.45 20v2h1.5v-2h-1.5Z" clip-rule="evenodd"></path>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <div class="div-citem14">
                                <div class="div-citem15">
                                        <svg width="20" height="20" fill="none" viewBox="0 0 32 32" color="#697175" class="css-1n1x2t e170kbym0">
                                            <path stroke="currentColor" stroke-linejoin="round" d="M9 23 24 8M9 8l7.5 7.5L24 23"></path>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="div-amount1">
                        <div class="div-amount2">
                            <svg width="16" height="16" fill="none" viewBox="0 0 32 32" color="#B8BFC2" class="counter_btn css-1weaxp5 e170kbym0 sub-button">
                                <path stroke="currentColor" d="M6 16h20"></path>
                            </svg>
                            <div class="div-amount3">
                                <input class="span-amount1" value="${data[i].cartProductCount}">
                            </div>
                            <svg width="16" height="16" fill="none" viewBox="0 0 32 32" color="#121314" class="counter_btn css-1x0xddi e170kbym0 add-button">
                                <path stroke="currentColor" d="M6 16h20M16 6v20"></path>
                            </svg>
                        </div>
                        <span class="body_15 span-amount2">

                        </span>
                    </div>
                </div>
        `

        const priceInput = item.querySelector(".span-amount2");
        let regularPrice1 = 0;
        let discountPrice1 = 0;

        regularPrice1 = data[i].prdRegularPrice;
        discountPrice1 = data[i].prdDiscountPrice;

        priceInput.innerHTML = "";
        if(data[i].prdDiscountPrice != 0) {
            regularPriceArray[i] = regularPrice1;
            discountPriceArray[i] = discountPrice1;
            priceInput.innerHTML = `
                    <span class="span-amount3">
                        <p>${priceToString(data[i].prdRegularPrice * data[i].cartProductCount)}</p>
                        <span class="span-amount4">원</span>
                    </span>
                    <div class="div-amount4">
                        <span class="span-amount5">Z할인가</span>
                        <span class="body_15 span-amount6">
                            <p>${priceToString(data[i].prdDiscountPrice * data[i].cartProductCount)}</p>
                            <span class="body_15 span-amount7">원</span>
                        </span>
                    </div>
            `;
        }else {
            regularPriceArray[i] = 0;
            discountPriceArray[i] = regularPrice1;
            priceInput.innerHTML = `
                    <span class="span-amount3">
                        <p></p>
                    </span>
                    <div class="div-amount4">
                        <span class="span-amount5"></span>
                        <span class="body_15 span-amount6">
                            <p>${priceToString(data[i].prdRegularPrice * data[i].cartProductCount)}</p>
                            <span class="body_15 span-amount7">원</span>
                        </span>
                    </div>
            `;
        }
    }
}


// 숫자 쉼표 찍기(가격(ex.100,000))
function priceToString(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}




const buyButton = document.querySelector(".buy-button");

buyButton.onclick = () => {
    location.href = "/payment";
}


document.addEventListener("DOMContentLoaded", function () {

    const inputCheck = document.querySelectorAll(".input-cart2");
    /** 선택한 상품 개수*/
    const selectTotal = document.querySelector(".select-total");
    const itemTotal = document.querySelector(".item-total");

    const productBox = document.querySelectorAll(".div-citem1");
    const finalPrice = document.querySelectorAll(".div-cprice1 p");
    let selectValue = 0;
    let totalValue = itemTotal.textContent;

    let totalPrice = 0;

    inputCheck.forEach((input, idx) => {
        input.onclick = () => {
            if(idx == 0) {
                // 전체 상품 클릭
                if(input.checked) {
                    for(let i = 0; i < inputCheck.length - 1; i++) {
                        selectValue = totalValue;
                        selectTotal.innerHTML = selectValue;
                        console.log("전체체크");
                        inputCheck[i + 1].checked = true;
                    }
                }else {
                    for(let i = 0; i < inputCheck.length - 1; i++) {
                        selectValue = 0;
                        selectTotal.innerHTML = selectValue;
                        console.log("전체체크해제");
                        inputCheck[i + 1].checked = false;
                    }
                }
            } else {
                // 하나의 상품 클릭
                if(input.checked) {
                    selectValue += 1;
                    selectTotal.innerHTML = selectValue;
                    console.log("체크");
                }else {
                    selectValue -= 1;
                    selectTotal.innerHTML = selectValue;
                    console.log("체크해제");
                }
            }
            loadPrice();
        }
    })


    const addButton = document.querySelectorAll(".add-button");
    const subButton = document.querySelectorAll(".sub-button");
    const itemValue = document.querySelectorAll(".span-amount1");
    const regularPrice = document.querySelectorAll(".span-amount3 p");
    const discountPrice = document.querySelectorAll(".span-amount6 p");
    const priceCheck = document.querySelectorAll(".span-amount5");

    const cartValue = document.querySelectorAll(".h4-citem1");

    // let regularPriceArray = new Array();
    // let discountPriceArray = new Array();
    let priceValue1 = 0;
    let priceValue2 = 0;

    addButton.forEach((btn, idx) => {
        console.log("add버튼진입");
        btn.onclick = () => {
            console.log("add버튼클릭");
            if(itemValue[idx].value == 1) {
                subButton[idx].style.color = "#121314";
                subButton[idx].disabled = false;
                //기본 가격
                // if(priceCheck[idx].textContent !== '') {
                //     regularPriceArray[idx] = parseInt(regularPrice[idx].textContent.replaceAll(",", ""));
                // } else {
                //     regularPriceArray[idx] = null;
                // }
                // discountPriceArray[idx] = parseInt(discountPrice[idx].textContent.replaceAll(",", ""));
            }
            itemValue[idx].value = parseInt(itemValue[idx].value) + 1;
            if(priceCheck[idx].textContent !== '') {
                // 원가
                priceValue1 = regularPriceArray[idx] * parseInt(itemValue[idx].value);
                regularPrice[idx].textContent = priceToString(priceValue1);
            }

            console.log("priceValue: " + parseInt(discountPriceArray[idx]));
            console.log("priceValue: " + parseInt(itemValue[idx].value));
            console.log("priceValue type: " + idx + typeof parseInt(discountPriceArray[idx]));
            console.log("priceValue type: " + idx + typeof parseInt(itemValue[idx].value));
            // 최종 가격
            priceValue2 = parseInt(discountPriceArray[idx]) * parseInt(itemValue[idx].value);
            discountPrice[idx].textContent = priceToString(priceValue2);

            updateCart(idx);
            loadPrice();
        }
    })

    subButton.forEach((btn, idx) => {
        console.log("sub버튼진입");
        btn.onclick = () => {
            console.log("sub버튼클릭");
            if(itemValue[idx].value == 2) {
                btn.style.color = "#B8BFC2";
                btn.disabled = true;
            }
            if(itemValue[idx].value > 1) {
                itemValue[idx].value = parseInt(itemValue[idx].value) - 1;
                if(priceCheck[idx].textContent !== '') {
                    priceValue1 = regularPriceArray[idx] * parseInt(itemValue[idx].value);
                    regularPrice[idx].textContent = priceToString(priceValue1);
                }

                priceValue2 = discountPriceArray[idx] * parseInt(itemValue[idx].value);
                discountPrice[idx].textContent = priceToString(priceValue2);
            }

            updateCart(idx);
            loadPrice();
        }
    })

    
    
    function loadPrice() {
        // console.log("regular: " + regularPriceArray[idx]);
        // console.log("regularItemValue: " + parseInt(itemValue[idx].value));
        totalPrice = 0;
        for(let i = 0; i < productBox.length; i++) {
            if(inputCheck[i + 1].checked) {
                totalPrice += parseInt(discountPrice[i].textContent.replaceAll(",", ""));
                console.log(totalPrice);
            }
        }

        finalPrice[0].textContent = priceToString(totalPrice);
        finalPrice[2].textContent = priceToString(totalPrice);
    }

    function updateCart(idx) {
        console.log("상품 개수 변경됨");
        const cartId = cartValue[idx].getAttribute("value");
        const productCount = itemValue[idx].value;
    
        console.log("cartId: " + cartId);
        console.log("productCount: " + productCount);
    
        $.ajax({
            async: false,
            type: "put",
            url: `/mypage/cart/${cartId}/${productCount}`, // URL 템플릿 리터럴 수정
            dataType: "json",
            success: (response) => {
                console.log(response.data);
            },
            error: (error) => {
                if (error.status == 400) {
                    alert(JSON.stringify(error.responseJSON.data));
                } else {
                    console.log("요청실패");
                    console.log(error);
                }
            }
        });
    }
});
