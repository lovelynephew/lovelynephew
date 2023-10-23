let page = 1;
let totalPage = 0;
let newPage = 0;
const listPage = document.querySelectorAll(".list-page ul li#num");
const boardList = document.querySelector(".board-list tbody");
const buttonLeft = document.querySelector(".button-left");
const buttonRight = document.querySelector(".button-right");
const num = document.querySelector(".num");

//page수에 맞게 page 숫자 버튼 만들기
function listlist(ppp) {
	for (let i = 0; i < ppp.length; i++) {
		ppp[i].onclick = function() {
			page = 1;
			page = page + i;

			boardList.innerHTML = '';

			load();
		}
	}
}
// 버튼 왼쪽 클릭 하면 이전 페이지 가져오기
buttonLeft.onclick = function() {
	page = page - 1;

	if (page > 0) {
		boardList.innerHTML = '';
		load();
	}
	if (page < 1) {
		page = 1;
	}
	return;
}
/*리스트 가져오기*/
function addListBtn(page) {
	let nowCount = parseInt(page / 10) + 1;
	const ListPager = document.querySelector(".list-page-details");
	ListPager.innerHTML = ``;

	for (let i = 1; i <= nowCount; i++) {
		const Btn = `
			<li id="num" class="num">
	            <button type="button">${i}</button>
	        </li>
		`
		ListPager.innerHTML += Btn;
	}
	const ppp = document.querySelectorAll(".list-page-details li#num");

	listlist(ppp);

}

/*공지사항(리스트) 데이터 가져오기*/
load();
function load() {
	$.ajax({
		type: "get",
		url: "/admin/notice/noticelist/pagingNotice",
		data: {
			"page": page,
			contentCount: 10
		},
		dataType: "json",
		async: false,
		success: function(response) {
			getNoticeList(response.data);
			addListBtn(response.data[0].totalCount);
		},
		error:
			errorMessage
	})
}

function errorMessage(request, status, error) {
	alert("요청실패");
	console.log(request.status);
	console.log(request.responseText);
	console.log(error);
}

function setTotalCount(totalCount) {
	totalPage = totalCount % 10 == 0 ? totalCount / 10 : Math.floor(totalCount / 10) + 1;
}


/*공지사항 글 화면에 넣기*/
function getNoticeList(data) {
	let r = 1;

	setTotalCount(data[0].totalCount);
	for (let content of data) {
		r--;
	
		let codeCode = content.totalCount + r;
		if(page > 1) {
			codeCode = content.totalCount + r -((page-1)*10);
		}
		

		const listContent = `
			<tr class="notice-row">
				<td>${codeCode}</td>
				<td>
					<a href="/admin/board/notice/delete/detail/${content.noticeNum}">${content.noticeSubject}</a>
				</td>
				<td>${content.noticeWriter}</td>
				<td>${content.noticeUpdate}</td>
				<td class="notice-delete">
					<a>
						<button class="delete-btn" onclick="deleteNotice(${content.noticeNum})">삭제</button>
					</a>
				</td>
			</tr>
			`
		boardList.innerHTML += listContent; 
		
		buttonRight.onclick = () => {
			page = page + 1;

			if (page <= nowCount) {

				boardList.innerHTML = ``;
				load();

			}
			if (page > nowCount) {
				page = nowCount;
			}
			return;
		}

	}
}

let noticeNum = location.pathname.substring(location.pathname.lastIndexOf("/")+1);

function deleteNotice(noticeNum) {
	console.log(noticeNum);
	
	if(confirm("삭제하시겠습니까?\n삭제된 정보는 복원 할 수 없습니다.")){
		$.ajax({
			type: "get",
			async : false,
			url: "/admin/notice/delete/" + noticeNum,
			data: {"noticeNum" : noticeNum},
			dataType: "json",
			success: function(response) {
				if(response.data) {
					boardList.innerHTML = '';
					alert("게시물이 삭제되었습니다.");
					location.replace("/admin/board/notice/noticelist");
				}
			},
			error: function(error){
				alert("요청실패");
				console.log(error);
			}
		})
	};
};
