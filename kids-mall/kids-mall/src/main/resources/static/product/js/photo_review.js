prdReviewPic(1);

//사진리뷰
function prdReviewPic (productCode) {
    $.ajax({
        type: "GET",
        url: "/prdReviewPic",
        data: {
            "prdCode": productCode
        },
        success: (response) => {
            for(let i =0; i<response.data.length; i++) {
                if(response.data[i].option_lettering==null) {
                        response.data[i].option_lettering="레터링안함";
                }
                if(response.data[i].optionChar==null || "") {
                    response.data[i].optionChar="캐릭터선택안함";
                }
                if(response.data[i].optionRapping==null || "") {
                    response.data[i].optionRapping="포장지선택안함";
                }
                if(response.data[i].optionGas==null || "") {
                    response.data[i].optionGas="가스선택안함";
                }
                }
    
            const picReview = document.getElementById("reivew_all_div");
            for(let i =0; i<response.data.length; i++) {
            //     picReview.innerHTML += `
            //     <div class="review_all_star_wrapper01">
            //     <div class="review_all_star_wrapper02">
            //         <div>⭐️</div>
            //         <div>⭐️</div>
            //         <div>⭐️</div>
            //         <div>⭐️</div>
            //         <div>⭐️</div>
            //     </div>
            // </div>
            
            // <div class="review_all_feed_data_wrapper01-1">
            //     <div class="review_all_feed_data_wrapper02">
            //         <div class="review_all_feed_data_wrapper03">
            //             <span class="review_all_userId" >${response.data[i].userId}</span>
            //             <span class="review_all_date">${response.data[i].reviewUpdate}</span>
            //         </div>
            //     </div>
            //     <div>
            //         <div class="review_all_option_wrapper">
            //             <div class="review_all_option">
            //                 <span>선택 옵션</span>
            //                 <div>${response.data[i].option_lettering} ${response.data[i].optionChar} ${response.data[i].optionRapping} ${response.data[i].optionGas}</div>
            //             </div>
            //         </div>
            //         <div class="review_all_text">
            //             ${response.data[i].reviewContent}
            //         </div>
            //     </div>   
            // </div>
            //     `;
            let starAmoun = response.data[i].rating;
            let starsHTML = '';
            for (let i = 0; i < starAmoun; i++) {
                starsHTML += '⭐️';
            }
            picReview.innerHTML += `
            <div class="review_all_feed_data_wrapper02">
                <div class="review_all_feed_data_wrapper03">
                    <span class="review_all_userId" >${response.data[i].userId}</span>
                    <span class="review_all_date">${response.data[i].reviewUpdate}</span>
                </div>
                <div class="review_all_star_wrapper01">
                    <div class="review_all_star_wrapper02">
                    ${starsHTML}
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
            <div>
                <div class="review_all_option_wrapper">
                    <div class="review_all_option">
                        <span>선택 옵션</span>
                        ${response.data[i].option_lettering} ${response.data[i].optionChar} ${response.data[i].optionRapping} ${response.data[i].optionGas}
                    </div>
                </div>
                <div class="review_all_text">
                ${response.data[i].reviewContent}
                </div>
            </div>   
            `;
            }
        },  
        error: (error) => {
        }
    });


} 