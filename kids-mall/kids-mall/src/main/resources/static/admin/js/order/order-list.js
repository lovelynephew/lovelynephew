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


loadOrderListRequest(nowPage, searchValue);

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
			loadOrderListRequest(getPage, searchValue);
		}
    };
});


function loadOrderListRequest(nowPage, searchValue) {
    $.ajax({
        async: false,
        type: "get",
        url: "/admin/order/datalist",
        data: {
            "page": nowPage,
            "searchValue": searchValue
        },
        dataType: "json",
        success: (response) => {
			console.log(response.data);
			getOrderDataList(response.data);
        },
        error: (error) => {
            console.log(error);
        }
    });
    
}


function getOrderDataList(data) {
    const orderDatalist = document.querySelector(".order-data-list");
	orderDatalist.innerHTML = "";

	if(data != null) {
		for(let i = 0; i < data.length; i++) {
			console.log("getPage: " + getPage);
            let no = ((getPage - 1) * 5 + 1) + i;
            console.log("no"+no);

            let price = priceToString(data[i].paymentAmount);
            let paymentStatus = null;
            if(data[i].paymentStatus == 1) {
                paymentStatus = "입금전";
            }else if(data[i].paymentStatus == 2) {
                paymentStatus = "입금완료";
            }else if(data[i].paymentStatus == 3) {
                paymentStatus = "결제완료";
            }else {
                alert("payment_status 결제상태 에러");
            }

			orderDatalist.innerHTML += `
			    <tr>
                    <td style="width: 32px;">
                        <input type="checkbox">
                    </td>
                    <td style="width: 50px;">${no}</td>
                    <td style="width: 120px;">${data[i].createDate}</td>
                    <td style="width: 120px;">${data[i].orderCode}</td>
                    <td style="width: 95px;">${data[i].userName}</td>
                    <td style="width: 120px;">${data[i].prdName}</td>
                    <td style="width: 105px;">KRW ${price}</td>
                    <td style="width: 105px;">KRW ${price}</td>
                    <td style="width: 105px;">KRW ${price}</td>
                    <td style="width: 70px;">${data[i].paymentMethod}</td>
                    <td style="width: 70px;">${paymentStatus}</td>
                    <td style="width: 45px;">0</td>
                    <td style="width: 45px;">0</td>
                    <td style="width: 60px;">2</td>
                    <td style="width: 60px;">1</td>
                    <td style="width: 45px;">0</td>
                    <td style="width: 45px;">0</td>
                    <td style="width: 45px;">0</td>
                    <td style="width: 90px;">-</td>
                    <td style="width: 35px;">메모</td>
			    </tr>
			`
		}
	} else {
		orderDatalist.innerHTML = `
	        <tr>
	            <td colspan="19">검색된 회원내역이 없습니다.</td>
	        </tr>
		`
	}

	//**처음 페이지 로딩 시에만 호출 */
	if(call == 0) {
        paging(data);
    }

    call++;
}


//데이터 개수에 따른 페이지 개수
function totalCnt(total) {
    //**한페이지 데이터 개수 */
    let pageCount = 10
    totalPage = total % pageCount == 0 ? total / pageCount : Math.floor(total / pageCount) + 1;
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

// 숫자 쉼표 찍기
function priceToString(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}