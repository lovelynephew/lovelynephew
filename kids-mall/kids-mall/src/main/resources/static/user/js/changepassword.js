const inputUserpassword = document.querySelector(".input-userpassword");
const inputCheckpassword = document.querySelector(".input-checkpassword");
const btnPassword = document.querySelector(".btn-password");

/* 유저 아이디 가져오기 */
let userId = localStorage.getItem("userId");

btnPassword.onclick = () => {
    if(inputUserpassword.value == inputCheckpassword.value) {
        alert("비밀번호가 일치합니다.");
        const isConfirmed = confirm("비밀번호를 변경하시겠습니까?");
        if (isConfirmed) {
		    // 사용자가 확인 버튼을 눌렀을 때 실행되는 코드
			let modifyData = {
				userId: userId,
				userPassword: inputUserpassword.value,
			}
			console.log(modifyData);
			$.ajax({
				async: false,
				type: "put",
				url: "/modification/password",
				data: modifyData,
				dataType: "json",
				success: (response) => {
					if(response.data) {
						alert("비밀번호 변경이 완료되었습니다.");
						location.href = "/signin"
					}
				},
				error: (error) => {
					if(error.status == 400) {
						   alert(JSON.stringify(error.responseJSON.data))
					   }else {
						   console.log("요청실패");
						   console.log(error);
					   }
				}
			})
		} else {
		    // 사용자가 취소 버튼을 눌렀거나 대화상자를 닫았을 때 실행되는 코드
		    alert("비밀번호 변경이 취소되었습니다.");
		}
    }else {
        alert("비밀번호가 다릅니다.");
    }
}




