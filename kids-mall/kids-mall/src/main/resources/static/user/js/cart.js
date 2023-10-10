
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
    const cartItemBox = document.querySelector(".div-citem2");

    cartItemBox.innerHTML = "";

    for(let i = 0; i < data.length; i++) {
        let imgURL = null;

        if(data[i].prdMainImg != null) {
            imgURL = `${data[i].prdMainImg}`;
        }else {
            imgURL = "/static/user/images/non-img.png";
        }
        cartItemBox.innerHTML += `
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
                            <h4 class="body_14 h4-citem1">${data[i].prdName}</h4>
                            <div class="div-citem8">
                                <div class="div-citem9">09.30(토) 이내 발송 예정</div>
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
                    <svg width="16" height="16" fill="none" viewBox="0 0 32 32" color="#B8BFC2" class="counter_btn css-1weaxp5 e170kbym0">
                        <path stroke="currentColor" d="M6 16h20"></path>
                    </svg>
                    <div class="div-amount3">
                        <span class="span-amount1">${data[i].cartProductCount}</span>
                    </div>
                    <svg width="16" height="16" fill="none" viewBox="0 0 32 32" color="#121314" class="counter_btn css-1x0xddi e170kbym0">
                        <path stroke="currentColor" d="M6 16h20M16 6v20"></path>
                    </svg>
                </div>
                <span class="body_15 span-amount2">
                    <span class="span-amount3">
                        ${priceToString(data[i].prdRegularPrice)}
                        <span class="span-amount4">원</span>
                    </span>
                    <div class="div-amount4">
                        <span class="span-amount5">Z할인가</span>
                        <span class="body_15 span-amount6">
                            ${priceToString(data[i].prdDiscountPrice)}
                            <span class="body_15 span-amount7">원</span>
                        </span>
                    </div>
                </span>
            </div>
        </div>
        `
    }
}

// 숫자 쉼표 찍기(가격(ex.100,000))
function priceToString(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
