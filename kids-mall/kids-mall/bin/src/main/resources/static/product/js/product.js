//찜 하트 색상변경
    const heartButton = document.querySelector(".buy_bar_heart");
    const heartSvg = document.querySelector(".heart");

    let isRed = false; 

    heartButton.addEventListener("click", function () {
        if (isRed) {
            heartSvg.style.fill = "#a4a3a3"; 
        } else {
            heartSvg.style.fill = "#ff0000"; 
        }
        isRed = !isRed; 
    });


//구매하기 모달 창 띄우기
const buyBtn= document.querySelector(".buy_bar_buy");
const buyModal = document.querySelector(".buy_modal_wrapper01");

buyBtn.addEventListener('click', () => {
    buyModal.style.display = 'block';
});