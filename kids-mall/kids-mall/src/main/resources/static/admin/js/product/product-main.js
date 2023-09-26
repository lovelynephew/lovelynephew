const allProdCnt = document.querySelector(".all-prod-cnt");
const saleProdCnt = document.querySelector(".sale-prod-cnt");
const outProdCnt = document.querySelector(".out-prod-cnt");
const outProdCnt2 = document.querySelector(".out-prod-cnt2");


loadItemCntRequest();


//** 상품 개수 타입별로 넣어주기(전체, 판매중, 품절(품절), 삭제(현재 미구현)) */
function getItemCnt(data) {
    allProdCnt.innerHTML = "";
    allProdCnt.innerHTML = data[0].totalCount;

    saleProdCnt.innerHTML = "";
    saleProdCnt.innerHTML = data[0].saleCount;
    
    let prodCnt = data[0].totalCount - data[0].saleCount;

    outProdCnt.innerHTML = "";
    outProdCnt.innerHTML = `${prodCnt}`;

    outProdCnt2.innerHTML = "";
    outProdCnt2.innerHTML = `(품목: ${prodCnt}개)`;
}


function loadItemCntRequest() {
    $.ajax({
        async: false,
        type: "get",
        url: "/admin/product/itemlist",
        data: {
            "page": 0,
            "searchValue": null
        },
        dataType: "json",
        success: (response) => {
            console.log(response.data);
            getItemCnt(response.data);
        },
        error: (error) => {
            console.log(error);
        }
    });

}

