
load();



function load() {
    // principal.js 에서 가져옴
    const userCode = getUser().user_code;

    $.ajax({
		async: false,
		type: "get",
		url: `/mypage/board/review/${userCode}`,
		dataType: "json",
		success: (response) => {
			console.log(response.data);
            getData(response.data);
		},
		error: (error) => {
			if(error.status == 400) {
				alert(JSON.stringify(error.responseJSON.data));
			}else {
				console.log("요청실패");
				console.log(error);
			}
		}
	})
}

function getData(data) {
    const boardList = document.querySelector(".board-list");

    boardList.innerHTML = "";

    for(let i = 0; i < data.length; i++) {
        boardList.innerHTML += `
                <tr>
                    <td class="num">${i + 1}</td>
                    <td class="subject">
                        <p class="product left">${data[i].boardSubject}</p>
                        <a href="#" style="color:#555555; text-align: left;">${data[i].boardContent}</a>
                    </td>
                    <td>${data[i].userName}</td>
                    <td>${data[i].createDate}</td>
                    <td>${data[i].boardVisit}</td>
                </tr>
        `
    }
}