/* 전체 리스트 불러오기 */
let searchValue = "";
loadItemListRequest(searchValue);
function loadItemListRequest(searchValue) {

    $.ajax({
        async: false,
        type: "get",
        url: "/admin/product/itemlist",
        data: {
            "searchValue": searchValue
        },
        dataType: "json",
        success: (response) => {
			console.log(response.data);
			loadProductList(response.data);
        },
        error: (error) => {
            console.log(error);
        }
    });
}

function loadProductList(data) {
	const loadProlist = document.querySelector(".load-prolist");
	if(data != null) {
		for(let i = 0; i < data.length; i++) {
			console.log("hi");
			loadProlist.innerHTML += `
                <tr class="product-table-main">
                    <td class="product-check">
                        <input type="checkbox">
                    </td>
                    <td class="no">` + (i+1) + `</td>
                    <td class="product-type">기본상품</td>
                    <td class="product-code">
                        <a href="">${data[i].prdCode}</a>
                    </td>
                    <td class="product-name">
                        <img src="//img.echosting.cafe24.com/thumb/44x44.gif" width="44" height="44" alt="">
                        <a href="">${data[i].prdName}</a>
                    </td>
                    <td class="product-price">${data[i].prdRegularPrice}</td>
                    <td class="sale-price">${data[i].prdDiscountPrice}</td>
                    <td>
                        <span>${data[i].prdInventory}개</span>
                    </td>
                    <td class="order-address">
                        <input type="text" class="order-address-input">
                        <div class="order-address-atag">
                            <a href=""><span>SMS발송</span></a>
                            <a href=""><span>SNS공유</span></a>
                            <a href=""><span>주소복사</span></a>
                        </div>
                    </td>
                </tr>
			`
		}
	} else {
		loadProlist.innerHTML = `
	        <tr>
	            <td colspan="19">검색된 상품내역이 없습니다.</td>
	        </tr>
		`
	}


}