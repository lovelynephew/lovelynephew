let noticeNum = location.pathname.substring(location.pathname.lastIndexOf("/") + 1);
load("/admin/notice/noticelist/");

function load(adress) {
	$.ajax({
		async: false,
		type: "get",
		url: adress + noticeNum,
		dataType: "json",
		success: function(response) {
			getNotice(response.data);
		},
		error: function(error) {
			console.log(error);
		}
		
	})
}

function getNotice(notice) {
	const noticeVeiwSubject = document.querySelector(".notice-view-subject");
	const noticeViewWriter = doccument.querySelector(".notice-view-writer");
	const noticeViewUpdate = doucment.querySelector(".notice-view-update");
	const noticeViewContent = document.querySelector("notice-view-content");
	
	noticeNum = notice.noticeNum;
	noticeVeiwSubject.innerHTML = notice.noticeSubject;
	noticeViewWriter.innerHTMl = notice.noticeWriter;
	noticeViewUpdate.innerHTML = notice.noticeUpdate;
	noticeViewContent.innerHTML = `<p>
                            ${notice.noticeContent}
                        </p>`;
}