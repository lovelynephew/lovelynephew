const btnMail = document.querySelector(".btn-mail");
const inputUserid = document.querySelector(".input-userid");

btnMail.onclick = () => {
	emailSend();
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










































