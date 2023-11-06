/*let updateBtn = document.querySelector(".update-btn a .update);
let title = document.querySelector(".notice-subject");
let writer = document.querySelector(".notice-writer");
let update = document.querySelector(".notice-update");
let content = document.querySelector(".notice-content");
let noticeNum = location.pathname.substring(location.pathname.lastIndexOf("/")+1);

updateBtn.onclick = () => {
	let noticelist = {
		noticeNum : noticeNum,
		noticeSubject : title.value,
		noticeContent : content.value,
		noticeUpdaet : update.value
	};
	
		$.ajax({
			type: "put",
			url: `/admin/notice/noticelist/detail/update/{noticeNum}`,
			date: JSON.stringfy(noticelist),
			async: false,
			dataType: "json",
		 	success: function(response) {
				 if(response.date) {
					 alert("게시물이 수정되었습니다.");
					 location.replace("/admin/board/notice/noticelist");
				 }
			 },
			 error: errorMessage
			 
		})
}

function errorMessage(request, status, error) {
    alert("요청실패");
    console.log(request.status);
    console.log(request.responseText);
    console.log(error);
}*/