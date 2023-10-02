
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


const newUserCnt = document.querySelector(".new-user");
const visitedUserCnt = document.querySelector(".visited-user");
const outUserCnt = document.querySelector(".out-user");
const totalUserCnt = document.querySelector(".total-user");

loadUserCntRequest();

function loadUserCntRequest() {
    $.ajax({
        async: false,
        type: "get",
        url: "/admin/client/userlist",
        data: {
            "page": 0,
            "searchValue": null
        },
        dataType: "json",
        success: (response) => {
            console.log(response.data);
            getUserCnt(response.data);
        },
        error: (error) => {
            console.log(error);
        }
    });
}

// 신규, 전체 회원 수
function getUserCnt(data) {
    newUserCnt.innerHTML = "";
    newUserCnt.innerHTML = data[0].newUserCount;

    // visitedUserCnt.innerHTML = "";
    // visitedUserCnt.innerHTML = data[0].visitedCount;

    totalUserCnt.innerHTML = "";
    totalUserCnt.innerHTML = data[0].totalCount;

	console.log("userCnt완료");

	getNewUserSimpleData(data);
	console.log("simpleData가져오기 성공");
}


// 신규 회원 데이터
function getNewUserSimpleData(data) {
	const simpleData = document.querySelector(".new-user-simple-data");
	simpleData.innerHTML = "";

	if(data != null) {
		for(let i = 0; i < data.length; i++) {
			simpleData.innerHTML += `
				<tr>
					<td>${data[i].user_insertdate}</td>
					<td>${data[i].userId}</td>
					<td>${data[i].userName}</td>
					<td>메모</td>
				</tr>
			`
		}
	}
}








