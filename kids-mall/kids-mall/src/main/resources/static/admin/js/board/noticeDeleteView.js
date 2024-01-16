let noticeNum = location.pathname.substring(location.pathname.lastIndexOf("/") + 1);
load("/admin/notice/delete/noticelist/detail/");
console.log(noticeNum);

function load(adress) {
	$.ajax({
		async: false,
		type: "get",
		url: adress + noticeNum,
		dataType: "json",
		
		success: function(response) {
			console.log(response.data);
			getNotice(response.data);
			
		},
		error: function(error) {
			console.log(error);
		}
		
	})
}

function getNotice(notice) {
	const noticeVeiwSubject = document.querySelector(".notice-view-subject");
	const noticeViewWriter = document.querySelector(".notice-view-writer");
	const noticeViewUpdate = document.querySelector(".notice-view-update");
	const noticeViewContent = document.querySelector(".notice-view-content");
	
	noticeNum = notice.noticeNum;
	
	noticeVeiwSubject.innerHTML = `<p>
                            `+ notice.noticeSubject +`
                            </br>
                        </p>`;
	noticeViewWriter.innerHTML = `<p>
                            `+ notice.noticeWriter +`
                            &nbsp;&nbsp
                        </p>`;
	noticeViewUpdate.innerHTML = `<p>
                            `+ notice.noticeUpdate +`
                        </p>`;
	noticeViewContent.innerHTML = `<p style="height=300px;" >
                            `+ notice.noticeContent +`
                        </p>`;
}