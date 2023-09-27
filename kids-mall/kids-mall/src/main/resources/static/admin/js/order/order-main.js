const todaySalePrice = document.querySelectorAll(".today-sale-price");
const todaySaleCount = document.querySelectorAll(".today-sale-count");
const monthSalePrice = document.querySelectorAll(".month-sale-price");
const monthSaleCount = document.querySelectorAll(".month-sale-count");


loadOrderDataRequest();


//** 상품 개수 타입별로 넣어주기(전체, 판매중, 품절(품절), 삭제(현재 미구현)) */
function getOrderSimpleData(data) {
    todaySalePrice[0].textContent = data[0].todaySalePrice;
    todaySalePrice[1].textContent = data[0].todaySalePrice;
    
    todaySaleCount[0].textContent = data[0].todaySaleCount;
    todaySaleCount[1].textContent = data[0].todaySaleCount;
    
    monthSalePrice[0].textContent = data[0].thisMonthSalePrice;
    monthSalePrice[1].textContent = data[0].thisMonthSalePrice;

    monthSaleCount[0].textContent = data[0].thisMonthSaleCount;
    monthSaleCount[1].textContent = data[0].thisMonthSaleCount;
}


function loadOrderDataRequest() {
    $.ajax({
        async: false,
        type: "get",
        url: "/admin/order/datalist",
        data: {
            "page": 0,
            "searchValue": null
        },
        dataType: "json",
        success: (response) => {
            console.log(response.data);
            getOrderSimpleData(response.data);
        },
        error: (error) => {
            console.log(error);
        }
    });

}