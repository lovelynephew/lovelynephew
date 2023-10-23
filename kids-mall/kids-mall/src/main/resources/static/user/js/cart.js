const buyButton = document.querySelector(".buy-button");

buyButton.onclick = () => {
    location.href = "/payment";
}


document.addEventListener("DOMContentLoaded", function () {

    const inputCheck = document.querySelectorAll(".input-cart2");
    /** 선택한 상품 개수*/
    const selectTotal = document.querySelector(".select-total");
    const itemTotal = document.querySelector(".item-total");
    let selectValue = 0;
    let totalValue = itemTotal.textContent;


    inputCheck.forEach((input, idx) => {
        input.onclick = () => {
            if(idx == 0) {
                // 전체 상품 클릭
                if(input.checked) {
                    for(let i = 0; i < inputCheck.length; i++) {
                        selectValue = totalValue;
                        selectTotal.innerHTML = selectValue;
                        console.log("전체체크");
                        inputCheck[i + 1].checked = true;
                    }
                }else {
                    for(let i = 0; i < inputCheck.length; i++) {
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
        }
    })


    const addButton = document.querySelectorAll(".add-button");
    const subButton = document.querySelectorAll(".sub-button");
    const itemValue = document.querySelectorAll(".span-amount1");
    const regularPrice = document.querySelectorAll(".span-amount3 p");
    const discountPrice = document.querySelectorAll(".span-amount6 p");

    let regularPriceArray = new Array();
    let discountPriceArray = new Array();
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
                regularPriceArray[idx] = parseInt(regularPrice[idx].textContent.replace(",", ""));
                discountPriceArray[idx] = parseInt(discountPrice[idx].textContent.replace(",", ""));
            }
            itemValue[idx].value = parseInt(itemValue[idx].value) + 1;
            priceValue1 = regularPriceArray[idx] * parseInt(itemValue[idx].value);
            regularPrice[idx].textContent = priceToString(priceValue1);

            priceValue2 = discountPriceArray[idx] * parseInt(itemValue[idx].value);
            discountPrice[idx].textContent = priceToString(priceValue2);

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
                priceValue1 = regularPriceArray[idx] * parseInt(itemValue[idx].value);
                regularPrice[idx].textContent = priceToString(priceValue1);

                priceValue2 = discountPriceArray[idx] * parseInt(itemValue[idx].value);
                discountPrice[idx].textContent = priceToString(priceValue2);
            }
        }
    })

});
