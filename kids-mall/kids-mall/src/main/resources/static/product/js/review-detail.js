let productCode = parseInt(window.location.pathname.match(/\d+/)[0]); //상품번호 추출ㅔㅁ
prdReviewAll(productCode);

function prdReviewAll(productCode) {
    $.ajax({
        type: "GET",
        url: "/review/all",
        data: {
            "prdCode": productCode
        },
        success: (response) => {
		console.log("디비 정보:"+ response.data);
        const reviewAllDom = document.querySelector(".product_review_id");

        for(let i =0; i<response.data.length; i++) {
            if(response.data[i].option_lettering==null) {
                    response.data[i].option_lettering="레터링안함";
            }
            if(response.data[i].optionChar==null) {
                response.data[i].optionChar="캐릭터선택안함";
            }
            if(response.data[i].optionRapping==null) {
                response.data[i].optionRapping="포장지선택안함";
            }
            if(response.data[i].optionGas==null) {
                response.data[i].optionGas="가스선택안함";
            }

            let star = response.data[i].rating;
            let starHTML = ``;

            for(let i=0; i< star; i++) {
                starHTML += '⭐️';
            }

            if(response.data[i].reviewPhoto==null || response.data[i].reviewPhoto==""){
                reviewAllDom.innerHTML += `
               
                
                    <div class="review_all_feed_data_wrapper02">
                        <div class="review_all_feed_data_wrapper03">
                            <span class="review_all_userId" style="margin-top: 10px;">${response.data[i].userId}</span>
                            <span class="review_all_date">${response.data[i].reviewRegdate}</span>
                        </div>
                        <div class="review_all_star_wrapper01">
                            <div class="review_all_star_wrapper02">
                                ${starHTML}
                            </div>
                        </div>
                    </div>
                    <div style="border-bottom: 2px solid rgb(238, 238, 238)">
                        <div class="review_all_option_wrapper">
                            <div class="review_all_option">
                                <span>선택 옵션</span>
                                <div> ${response.data[i].optionChar} / ${response.data[i].optionChar} / ${response.data[i].optionGas} / ${response.data[i].option_lettering} </div>
                            </div>
                        </div>
                        <div class="review_all_text" style="margin-bottom: 20px;">
                            ${response.data[i].reviewContent}
                           
                        </div>
                    </div>   
                      
                `;
            }else {
                reviewAllDom.innerHTML += `
                
                <div class="review_all_feed_data_wrapper02">
                <div class="review_all_feed_data_wrapper03">
                    <span class="review_all_userId" >${response.data[i].userId}</span>
                    <span class="review_all_date">${response.data[i].reviewUpdate}</span>
                </div>
                <div class="review_all_star_wrapper01">
                    <div class="review_all_star_wrapper02">
                    ${starHTML}
                    </div>
                </div>
            </div>
            <div class="review_all_img_wrapper01-2">
                <div class="review_all_img_wrapper02">
                    <div class="review_all_img_wrapper03">
                        <div class="review_all_img_wrapper04">
                        <img src="${response.data[i].reviewPhoto}" alt="리뷰사진">
                        </div>
                           
                        </div>
                        
                    </div>
                    <div class="review_all_img_sqs_icon">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </div>
            <div style="border-bottom: 2px solid rgb(238, 238, 238)">
                <div class="review_all_option_wrapper">
                    <div class="review_all_option">
                        <span>선택 옵션</span>
                        <div> ${response.data[i].optionChar} / ${response.data[i].optionChar} / ${response.data[i].optionGas} / ${response.data[i].option_lettering}</div>
                    </div>
                </div>
                <div class="review_all_text">
                ${response.data[i].reviewContent}
                </div>
            </div>    
                `;
            }
        }

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
}
