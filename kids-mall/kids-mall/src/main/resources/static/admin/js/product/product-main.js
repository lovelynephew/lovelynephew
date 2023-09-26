const allProdCnt = document.querySelector(".all-prod-cnt");
const saleProdCnt = document.querySelector(".sale-prod-cnt");
const outProdCnt = document.querySelector(".out-prod-cnt");
const outProdCnt2 = document.querySelector(".out-prod-cnt2");


loadItemCntRequest();

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
            "searchValue": null,
            "page": 0
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

