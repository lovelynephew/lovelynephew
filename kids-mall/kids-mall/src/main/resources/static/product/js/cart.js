const headerCart = document.querySelector(".div-price-bar");
const itemInnerHtml = document.querySelector(".item-container");
let totalPrice = 0;
const checkedPrdInfo = []; // 선택된 물건 정보를 담을 배열

let selectedPrd = 0; //선택된 물건 개수
const selectTotal = document.getElementById("selectTotal");

getCartInfo("40");
toPayment();

//장바구니 정보 들고오기
function getCartInfo(userId) {
    $.ajax({
        type: "GET",
        url:` /mypage/cart/${userId}`,
        success: (response) => {
           console.log(response.data); 

            //장바구니 정보 뿌리기 
            for(let i =0; i < response.data.length; i++) {
               getProductInfo(response.data[i].prdCode);         
            }   

            //선택 전체 개수 표시
            const itemTotal = document.getElementById("itemTotal");
            itemTotal.innerText = response.data.length;

            price(totalPrice); 
            checkbox();
        },
        error: (error) => {
            if(error.status == 400) {
                alert(JSON.stringify(error.responseJSON.data));
            }else {
                console.log("요청실패");
                console.log(error);
            }
        }
    });
}


//물건 상세정보 들고옴
function getProductInfo (productCode) {
    $.ajax({
        type: "GET",
        url: `/productInfo/${productCode}`,
        
        success: (response) => {
            itemInnerHtml.innerHTML += `
                <div class="div-citem1">
                    <div class="div-citem2">
                        <div class="div-citem3">
                            <label class="label-citem1">
                                <input type="checkbox" name="product" class="input-cart2" id = "prdChoice-${productCode}" value= "prd-${productCode}">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#D2D5D6">
                                    <path d="M12 2C17.5197 2 22 6.48032 22 12C22 17.5197 17.5197 22 12 22C6.48032 22 2 17.5197 2 12C2 6.48032 6.48032 2 12 2Z" stroke="currentColor" stroke-width="2"></path>
                                </svg>
                            </label>
                            <div class="div-citem4">
                                <div class="div-citem5">
                                    <figure class="figure-citem1">
                                        <img src="${response.data.prdMainImage}" class="img-cart1" id="prdMainImg-${productCode}">
                                    </figure>
                                    <div class="div-citem6">
                                        <input type="hidden" id= "prdMaker-${productCode}" name="prdMaker" value= "${response.data.prdMaker}">
                                        <h4 class="body_14 h4-citem1" id ="prdName-${productCode}" >${response.data.prdName}</h4>
                                        <div class="div-citem7">
                                            
                                        </div>
                                        <div class="div-citem8">
                                           
                                            <div class="div-citem10">
                                                <svg width="16" height="16" fill="none" viewBox="0 0 32 32" color="#A1A9AD" class="css-eslpka e170kbym0">
                                                    <path fill="currentColor" fill-rule="evenodd" d="M26 16c0 5.523-4.477 10-10 10S6 21.523 6 16 10.477 6 16 6s10 4.477 10 10Zm-9.834-4.25c-1.224 0-2.216 1.083-2.216 2.05h-1.5c0-1.833 1.7-3.55 3.716-3.55 1.592 0 2.687.987 3.147 1.77.751 1.28.404 2.759-.635 3.728l-.998.932-.004.004-.022.022a3.757 3.757 0 0 0-.377.447c-.226.315-.36.621-.36.847h-1.5c0-.708.364-1.335.639-1.72.147-.205.293-.375.402-.494l.196-.2 1-.934c.602-.562.71-1.285.366-1.872a2.197 2.197 0 0 0-1.854-1.03ZM15.45 20v2h1.5v-2h-1.5Z" clip-rule="evenodd"></path>
                                                </svg>
                                                <!-- <div class="body_15 div-citem11">
                                                    <div class="div-citem12">
                                                        <div class="div-citem13">발송 예정일은 판매자가 설정한 정보이며, 판매자 사정에 따라 변경 또는 지연될 수 있습니다.</div>
                                                        <div style="margin-left: 4px;" class="div-citem13">
                                                            <svg width="20" height="20" fill="none" viewBox="0 0 32 32" color="#FFFFFF" class="css-1jnore5 e170kbym0">
                                                                <path stroke="currentColor" stroke-linejoin="round" d="M9 23 24 8M9 8l7.5 7.5L24 23"></path>
                                                            </svg>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <svg width="30" height="6" viewBox="0 0 30 6" fill="none" xmlns="http://www.w3.org/2000/svg" direction="up" position="right" class="css-uwbfzl e8fb3wz0">
                                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M15 6L21 0H9L15 6Z" fill="#8F82FF"></path>
                                                        </svg>
                                                    </div>
                                                </div> -->
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
                                    <input class="span-amount1"  id = "amount-${productCode}" value="1">
                                </div>
                                <svg width="16" height="16" fill="none" viewBox="0 0 32 32" color="#121314" class="counter_btn css-1x0xddi e170kbym0 add-button">
                                    <path stroke="currentColor" d="M6 16h20M16 6v20"></path>
                                </svg>
                            </div>
                            <span class="body_15 span-amount2">
                                <span class="span-amount3">
                                    <p id = "prdregularPrice-${productCode}">${response.data.prdRegularPrice}</p>
                                    <span class="span-amount4">원</span>
                                </span>
                                <div class="div-amount4">
                                    <span class="span-amount5">Z할인가</span>
                                    <span class="body_15 span-amount6">
                                        <p id = "prdDiscountPrice-${productCode}"  class="prdDisPrice">${response.data.prdDiscountPrice}</p>
                                        <span class="body_15 span-amount7">원</span>
                                    </span>
                                </div>
                            </span>
                        </div>
                    </div>
                </div>
                `;
            
        },
        error: (error) => {
            if(error.status == 400) {
                alert(JSON.stringify(error.responseJSON.data));
            }else {
                console.log("요청실패");
                console.log(error);
            }
        }
    });
}

//총 가격 들고오기
function price(totalPrice) {
    let prdPlusdeli = totalPrice + 3000;
    headerCart.innerHTML =``;
    headerCart.innerHTML += `
    <div class="body_13 div-cprice1">
        <div>
            <span class="span-cprice1">
                    상품
                    <p>${totalPrice}</p>
                    원
            </span>
            <span class="span-cprice1">
                    + 배송비
                    <p>3000</p>
                    원
            </span>
            <span class="span-cprice1"> = </span>
            <span class="span-cprice3">
                    총
                    <p>${prdPlusdeli}</p>
                    원
            </span>
        </div>
    </div>`
    ;
}


function checkbox() {
    // .item-container 요소에 클릭 이벤트 리스너를 추가
    itemInnerHtml.addEventListener("click", function(event) {
        // 클릭된 요소가 체크박스인 경우에만 처리
        if (event.target.classList.contains("input-cart2")) {
            const checkbox = event.target;
            const i = checkbox.getAttribute("value").replace("prd-", "");

            if (checkbox.checked) {
                const prdName = document.getElementById(`prdName-${i}`).innerText;
                const prdMaker = document.getElementById(`prdMaker-${i}`).value;
                let prdRPrice = document.getElementById(`prdregularPrice-${i}`).innerText;
                let prdDPrice = document.getElementById(`prdDiscountPrice-${i}`).innerHTML;
                let EA = document.getElementById(`amount-${i}`).value;
                let mainImg = document.getElementById(`prdMainImg-${i}`).src;
                
                checkedPrdInfo.push({
                    "productCode" : `${i}`,
                    "name" : prdName ,
                    "maker": prdMaker,
                    "productRegularPrice" : prdRPrice,
                    "productDiscountPrice" : prdDPrice,
                    "prdMainImg" : mainImg,
                     EA: EA
                });
               
                selectedPrd += 1;
                selectTotal.innerText = ``;
                selectTotal.innerText += selectedPrd;//물건 선택 개수 수정 

                totalPrice += parseInt(prdDPrice, 10);
                price(totalPrice);

            } else {
                console.log(`체크박스 ${i}가 선택 해제되었습니다.`);
                const prdCode = i; 
                const EA = document.getElementById(`amount-${i}`).value;;
                let prdDPrice = document.getElementById(`prdDiscountPrice-${i}`).innerHTML;

                const index = checkedPrdInfo.findIndex(item => item.productCode === prdCode);
               
                if (index > -1) {
                    checkedPrdInfo.splice(index, 1);
                }
                
                console.log(checkedPrdInfo);

                selectedPrd -= 1;
                selectTotal.innerText = ``;
                selectTotal.innerText += selectedPrd;//물건 선택 개수 수정 

                totalPrice -= parseInt(prdDPrice, 10); // 총 상품 금액
                price(totalPrice);
            }
        }
    });
}


//버튼 누른것만 결제창으로 정보 넘기기
function toPayment() {
    const buyBtn = document.querySelector(".buy-button");

    buyBtn.addEventListener("click", function() {
        localStorage.setItem('productsData', JSON.stringify(checkedPrdInfo));
        window.location.href = '/payment';
    });

}

//전체 선택, 전체 해제 
const checkedAll = document.getElementById("all");
console.log(checkedAll.checked);
const eachChecked = document.getElementsByName("product");

checkedAll.addEventListener("click", function() {
totalPrice = 0;
   
    if(checkedAll.checked) {
       //전체 가격 구하기
        document.querySelectorAll(".prdDisPrice").forEach(function(price) {
        console.log(price.textContent);
        totalPrice += parseInt(price.textContent, 10);
        });
        price(totalPrice);

        //체크 값 변경
        eachChecked.forEach(function(product){
            product.checked = true;
        });

		//물건 선택 개수 수정 
        selectedPrd = document.getElementById("itemTotal").innerText;
        selectTotal.innerText = ``;
        selectTotal.innerText += selectedPrd;
        
        //정보 로컬저장소에 넣기
        for(let i =0; i< eachChecked.length; i++) {
			let prdCode = eachChecked[i].getAttribute("value").replace("prd-", "");
			
			const prdName = document.getElementById(`prdName-${prdCode}`).innerText;
                const prdMaker = document.getElementById(`prdMaker-${prdCode}`).value;
                let prdRPrice = document.getElementById(`prdregularPrice-${prdCode}`).innerText;
                let prdDPrice = document.getElementById(`prdDiscountPrice-${prdCode}`).innerHTML;
                let EA = document.getElementById(`amount-${prdCode}`).value;
                let mainImg = document.getElementById(`prdMainImg-${prdCode}`).src;
                
                checkedPrdInfo.push({
                    "productCode" : `${prdCode}`,
                    "name" : prdName ,
                    "maker": prdMaker,
                    "productRegularPrice" : prdRPrice,
                    "productDiscountPrice" : prdDPrice,
                    "prdMainImg" : mainImg,
                     EA: EA
                });
		}
        selectTotal.innerText = ``;
        selectTotal.innerText = selectedPrd;//물건 선택 개수 수정 

        totalPrice += parseInt(prdPrice, 10);
        price(totalPrice);

    }else {
        //전체가격 구하기
        totalPrice = 0;
        price(totalPrice);

        //체크값 변경
        eachChecked.forEach(function(product){
            product.checked =false;
        });

        selectedPrd = 0;
        selectTotal.innerText = ``;
        selectTotal.innerText =0;//물건 선택 개수 수정 
        
        //로컬 저장소의 정보 지우기 
        checkedPrdInfo.splice(0,checkedPrdInfo.length);
    }
})