
/* 전체 리스트 불러오기 */
let searchValue = "";

/** 검색 페이지 */
let nowPage = 1;

/** 전체 페이지 수 */
let totalPage = 0;
/**페이지 개수 초기화(들어올 때 한번만 페이지개수를 정한다.) */
let call = 0;
/**클릭한 페이지 버튼 number */
let getPage = 1;


loadItemListRequest(nowPage, searchValue);

// 페이지 버튼 요소를 선택합니다.
const pageButtons = document.querySelectorAll(".pages");


// 각 페이지 버튼에 대한 클릭 이벤트.
pageButtons.forEach((button, index) => {
    button.onclick = () => {
		getPage = index + 1;
        // 클릭한 페이지 index와 현재 페이지가 다를 경우에만 동작
		if(getPage != nowPage) {
			console.log("클릭");
			console.log(index);
			nowPage = getPage;
			loadItemListRequest(getPage, searchValue);
		}
    };
});

function loadItemListRequest(nowPage, searchValue) {
    $.ajax({
        async: false,
        type: "get",
        url: "/admin/product/itemlist",
        data: {
            "page": nowPage,
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
    loadProlist.innerHTML = "";
    
	if(data != null) {
		for(let i = 0; i < data.length; i++) {
            console.log("getPage: " + getPage);
            let no = ((getPage - 1) * 5 + 1) + i;
            console.log("no"+no);
			console.log("hi");
			loadProlist.innerHTML += `
                <tr class="product-table-main">
                    <td class="product-check">
                        <input type="checkbox">
                    </td>
                    <td class="no">${no}</td>
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

    //처음 페이지 로딩 시에만 호출
    if(call == 0) {
        paging(data);
    }

    call++;
}


//데이터 개수에 따른 페이지 개수
function totalCnt(total) {
    totalPage = total % 5 == 0 ? total / 5 : Math.floor(total / 5) + 1;
    console.log("totalPage: " + totalPage);
}

//데이터 개수에 맞는 페이지 버튼 넣기
function paging(data) {
    const page = document.querySelector(".page");
    totalCnt(data[0].totalCount);
    
    page.innerHTML = "";

    for(let i = 1; i <= totalPage; i++) {    
        page.innerHTML += `<strong class="pages">${i}</strong>`;
    }
}