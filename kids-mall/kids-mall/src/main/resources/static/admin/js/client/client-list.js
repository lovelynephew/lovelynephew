
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
let getPage = 1;

let type = 0;

// 한 화면에 보여질 페이지 그룹 크기
let pageSize = 5;

// 현재 페이지 그룹의 시작과 끝 계산
let startPage = Math.floor((nowPage - 1) / pageSize) * pageSize + 1;
let endPage = startPage + pageSize - 1;


loadUserListRequest(nowPage, searchValue);




const firstButton = document.querySelector(".first-page");
const preButton = document.querySelector(".pre-page");

const nextButton = document.querySelector(".next-page");
const lastButton = document.querySelector(".last-page");

// 페이지 버튼 요소를 선택합니다.
const pageButtons = document.querySelectorAll(".pages");

preButton.onclick = () => {
    console.log("이전 버튼 클릭");
    type = 0;
    getPage = nowPage - 1;
    if (nowPage > 1) {
        if (startPage > getPage) {
            startPage = startPage - pageSize;
            endPage = startPage + pageSize - 1;
            type = 1;
            loadUserListRequest(getPage, searchValue);

        }else {
            loadUserListRequest(getPage, searchValue);
        }
        nowPage = getPage;
    }
}

nextButton.onclick = () => {
    console.log("다음 버튼 클릭");
    getPage = nowPage + 1;
    type = 0;
    if (nowPage < totalPage) {
        if (getPage > endPage) {
            type = 2;
            loadUserListRequest(getPage, searchValue);
            startPage = Math.floor((getPage - 1) / pageSize) * pageSize + 1;
            endPage = startPage + pageSize - 1;
        }else {
            loadUserListRequest(getPage, searchValue);
        }
        nowPage = getPage;
    }
}

firstButton.onclick = () => {
    type = 0; // 타입 초기화
    getPage = 1; // 첫 번째 페이지로 이동
    startPage = 1; // 시작 페이지도 첫 번째 페이지로 설정
    endPage = startPage + pageSize - 1; // 끝 페이지 업데이트
    
    loadUserListRequest(getPage, searchValue);
    nowPage == getPage;
}

lastButton.onclick = () => {
    getPage = totalPage;
    if(nowPage < totalPage) {
        type = 4;
        startPage = Math.floor((getPage - 1) / pageSize) * pageSize + 1;
        endPage = totalPage;
        loadUserListRequest(getPage, searchValue);
        
        console.log("lastButton클릭: " + startPage);
        console.log(endPage);
    }
    nowPage = getPage;
}

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

	//처음 페이지 로딩 시에만 호출
    if(call == 0 || type == 0) {
        call = 0;
        paging(data);
    }else if(type != 0) {      
        paging(data);
    }

    console.log("call: " + call);
    call++;

    // 페이지 버튼 요소를 선택합니다.
    const pageButtons = document.querySelectorAll(".pages");

    // 각 페이지 버튼에 대한 클릭 이벤트.
    pageButtons.forEach((button, index) => {
        button.onclick = () => {
            getPage = startPage + index;
            console.log("page getPage: " + getPage);
            // 클릭한 페이지 index와 현재 페이지가 다를 경우에만 동작
            if(getPage != nowPage) {
                type = 0;
                console.log("클릭");
                console.log(index);
                loadUserListRequest(getPage, searchValue);
            }
        };
    });
    nowPage = getPage;
}


//데이터 개수에 따른 페이지 개수
function totalCnt(total) {
    //**한페이지 데이터 개수 */
    let pageCount = 10;
    totalPage = total % pageCount == 0 ? total / pageCount : Math.floor(total / pageCount) + 1;
    console.log("totalPage: " + totalPage);
    console.log("total: " + total);
}

//데이터 개수에 맞는 페이지 버튼 넣기
function paging(data) {
    const page = document.querySelector(".page-number");
    totalCnt(data[0].totalCount);
    console.log("paging totalPage: " + totalPage);

    page.innerHTML = "";

    console.log("타입 이전");
    console.log("type: " + type);
    
    for(let i = startPage; i <= endPage && i <= totalPage; i++) {
        let prePage = (getPage - pageSize) + i;
        let nextPage = i + pageSize;
        let iPage = 
        console.log("startPage: " + startPage);
        if(call == 0) {
            page.innerHTML += `<strong class="pages">${i}</strong>`;
            console.log("첫 페이지 등록")

        // 이전 버튼 클릭 시 이벤트
        }else if(type == 1 && getPage != 1) {
            page.innerHTML += `<strong class="pages">${prePage}</strong>`;
            console.log("prePage: " + prePage);
            
        }else if(type == 2 && nextPage <= totalPage) {
            page.innerHTML += `<strong class="pages">${nextPage}</strong>`;
            console.log("nextPage: " + nextPage);
            
        }else if(type === 4 && nowPage < endPage) {
            page.innerHTML += `<strong class="pages">${i}</strong>`;
            console.log("i: " + i);
        }
    }

    
    
}

// 숫자 쉼표 찍기
function priceToString(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

