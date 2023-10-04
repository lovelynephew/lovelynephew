const btnMail = document.querySelector(".btn-mail");
const inputUserid = document.querySelector(".input-userid");

btnMail.onclick = () => {
	checkUserById();
}

function emailSend() {
    let params = {
        email : inputUserid.value
    }
	
    $.ajax({
        async: false,
        type: "post",
        url: "/email/password",
        contentType: "application/json",
        data: JSON.stringify(params),
        dataType: "json",
        success: (response) => {
            location.replace("/signin");
        },
        error: (error) => {
            console.log(error);
        }
    });
}

/* 이메일이 회원의 이메일인지 확인 */
function checkUserById() {
	const idRegex = /^[a-zA-Z]{1}[a-zA-Z0-9]{4,19}/;
	const userId = inputUserid.value;
	
	if (idRegex.test(userId)) {
		$.ajax({
		async: false,
		type:"get",
		url: "/finduser/userId",
		data: {userId : userId},
		success: (response) => {
			console.log(response.data);
			if(response.data != null) {
				alert("가입된 회원입니다. 이메일을 확인해주세요.")
				localStorage.setItem("userId", userId);
				emailSend();
			} else {
				alert("가입된 회원이 아닙니다. 아이디를 다시 입력해주세요.")
			}
		},
			error: (error) => {
				console.log(error);
			}
		});
	} else {
	  alert("유효하지 않은 아이디 형식입니다.");
	  
	}
}







































