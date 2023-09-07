


/* 상품분류 선택 */
const mainSelect = document.querySelector(".main-select");
const subSelect = document.querySelector(".sub-select");
itemCode = 1;
itemLoad();
function itemLoad() {
	$.ajax({
		async: false,
		type: "get",
		url: `/admin/product/register/${itemCode}`,
		dataType: "json",
		success: (response) => {
			console.log(response);
			getItems(response.data);
		},
		error: (error) => {
			console.log("요청실패");
			console.log(error);
		}
	})
}

function getItems(data) {

	
	for(let i = 0; i < data.length; i++) {
		let suboption = document.createElement("option");
		suboption.text = data[i].itemSubName;
		suboption.value = data[i].itemSubCode;

		subSelect.options.add(suboption);
	}
}
/*
for(let i = 0; i < mainSelect.length; i++) {
	mainSelect[i].onclick = () => {
		itemCode = mainSelect[i].value;
		console.log(itemCode);
		subSelect.options.length = 0;
		itemLoad();
	}
}
*/
mainSelect.onclick = () => {
		itemCode = mainSelect.value;
		console.log(itemCode);
		subSelect.options.length = 0;
		itemLoad();
}

/* 상품분류 선택 */












