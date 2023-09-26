
/* 사이드 바 */
const showList = document.querySelectorAll(".show-list");
const showListUl = document.querySelectorAll(".show-list-ul");
const showListBtn = document.querySelectorAll(".show-list button");
showList[0].onclick = () => {
	if(showListUl[0].style.display == 'none') {
		showListUl[0].style.display = 'block';
		showListBtn[0].style.backgroundColor = '#3C4867';
	} else if(showListUl[0].style.display == 'block') {
		showListUl[0].style.display = 'none';
		showListBtn[0].style.backgroundColor = '#2d3a58';
	}
	
}

showList[1].onclick = () => {
	if(showListUl[1].style.display == 'none') {
		showListUl[1].style.display = 'block';
		showListBtn[1].style.backgroundColor = '#3C4867';
	} else if(showListUl[1].style.display == 'block') {
		showListUl[1].style.display = 'none';
		showListBtn[1].style.backgroundColor = '#2d3a58';
	}
	
}


/* 전체 리스트 불러오기 */
let searchValue = "";
/** 검색 페이지 */
let nowPage = 1;
/** 전체 페이지 수 */
let totalPage = 0;
/**페이지 개수 초기화(들어올 때 한번만 페이지개수를 정한다.) */
let call = 0;
/**클릭한 페이지 버튼 number */
let getPage = 0;

loadUserListRequest(nowPage, searchValue);

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
			loadUserListRequest(getPage, null);
		}
    };
});

function loadUserListRequest(nowPage, searchValue) {

    $.ajax({
        async: false,
        type: "get",
        url: "/admin/client/userlist",
        data: {
			"page": nowPage,
            "searchValue": searchValue
        },
        dataType: "json",
        success: (response) => {
			console.log(response.data);
			loadUserList(response.data);
        },
        error: (error) => {
            console.log(error);
        }
    });
}

function loadUserList(data) {
	const loadUserlist = document.querySelector(".load_userlist");
	loadUserlist.innerHTML = "";
	if(data != null) {
		for(let i = 0; i < data.length; i++) {
			console.log("hi");

			loadUserlist.innerHTML += `
			    <tr style="height: 20px;">
			    	<td style="width: 24px;">
			            <input type="checkbox">
			    	</td>
			        <td style="width: 50px;">${data[i].userCode}</td>
			        <td style="width: 120px;">${data[i].user_insertdate}</td>
			        <td style="width: 120px;">${data[i].userName}</td>
			        <td style="width: 100px;">${data[i].userId}</td>
			        <td style="width: 100px;">${data[i].userPhone}</td>
			        <td style="width: 70px;">성별..</td>
			        <td style="width: 70px;">지역..</td>
			        <td style="width: 40px;">메모..</td>
			    </tr>
			`
		}
	} else {
		loadUserlist.innerHTML = `
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
    totalPage = total % 5 == 0 ? total / 5 : Math.floor(total / 5) + 1;
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




















