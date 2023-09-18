
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
loadUserListRequest(searchValue);
function loadUserListRequest(searchValue) {

    $.ajax({
        async: false,
        type: "get",
        url: "/admin/client/userlist",
        data: {
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


}






















