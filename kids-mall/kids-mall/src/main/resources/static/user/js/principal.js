/*유저정보 가져오기*/
function getPrincipal() {
	let user = null;
	$.ajax({
		async: false,
		type: "get",
		url: "/register/principal",
		dataType: "json",
		success: (response) => {
			console.log(response.data);
			user = response.data;
		},
		error: (error) => {
			console.log(error);
		}
	});
	return user;
}


let user = getPrincipal();

function getUser() {
	return user;
	
}








