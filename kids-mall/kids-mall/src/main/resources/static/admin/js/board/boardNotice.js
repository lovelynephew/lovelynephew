
let noticeBtn = document.querySelector(".notice_btn");
let noticeSubject = document.querySelector(".notice-subject");
let noticeWriter = document.querySelector(".notice-writer");
let noticeContent = document.querySelector(".notice-content");

/*공지사항 글쓰기*/
noticeBtn.onclick = () => {
	
	let noticelist = {
		noticeId : 1,
		noticeSubject : noticeSubject.value,
		noticeWriter : noticeWriter.value,
		noticeContent : noticeContent.value
	}
	console.log(noticelist);
	
	addNotice(noticelist);
}

function addNotice(noticelist) {
	$.ajax ({
		type: "post",
		url: "/admin/notice/noticelist/addnotice",
		contentType: "application/json",
		data: JSON.stringify(noticelist),
		async: false,
		dataType: "json",
		success: function(response) {
			if(response.data) {
				alert("작성완료");
				location.replace("/admin/board/notice/noticelist");
			}
		},
        error: function(error) {
    		if(error.status == 400) {
				   alert(JSON.stringify(error.responseJSON.data))
			   }else {
				   console.log("요청실패");
				   console.log(error);
			   }
		}
	})
}

