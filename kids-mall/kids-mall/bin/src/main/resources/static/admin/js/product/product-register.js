const productInfoName = document.querySelector(".product-info-name");
const productInfoMaker = document.querySelector(".product-info-maker");
const stockNum = document.querySelector(".stock-type input");
const genderCategory = document.querySelectorAll("#gender-category");
const genderCategoryInput = document.querySelectorAll("#gender-category input");	
const genderHidden = document.querySelector(".gender-hidden");	
const ageCategory = document.querySelectorAll("#age-category");
const ageCategoryInput = document.querySelectorAll("#age-category input");
const ageHidden = document.querySelector(".age-hidden");
const styleCategory = document.querySelectorAll("#style-category");
const styleCategoryInput = document.querySelectorAll("#style-category input");
const styleHidden = document.querySelector(".style-hidden");

const btnRegis = document.querySelector(".btn-regis");
const btnCancel = document.querySelector(".btn-cancel");

/* 필요한 flag 확인 */
let checkCategoryFlag = false;
let checkGenderFlag = false;
let checkAgeFlag = false;
let checkStyleFlag = false;
let checkPriceFlag = false;

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

mainSelect.onclick = () => {
		itemCode = mainSelect.value;
		subSelect.options.length = 0;
		itemLoad();
		console.log("1카테고리"+itemCode);
}

subSelect.onclick = () => {
	subItemCode = subSelect.value;
	checkCategoryFlag = true;
	console.log("2카테고리"+subItemCode);
}

/* 상품분류 선택 */

/* 상품가격 시작 */
const discountContentSel = document.querySelector(".discount-content select");
const discountContentOp = document.querySelectorAll(".discount-content select option");
const discountInput = document.querySelector(".discount-input");
const regularPrice = document.querySelector(".regular-price");
const totalPrice = document.querySelector(".total-price");
const discountBtn = document.querySelector(".discount-btn");


discountContentSel.onclick = () => {
	if(discountContentSel.value == "1") {
		discountInput.innerHTML = `
		`
	} else if(discountContentSel.value == "2") {
		discountInput.innerHTML = `
	        <input type="text">
	        <span>%</span>
		`
	} else if(discountContentSel.value == "3") {
		discountInput.innerHTML = `
	        <input type="text">
	        <span>원</span>
		`
	}
}

discountBtn.onclick = () => {
	const discountInputVal = document.querySelector(".discount-input input");
	if(discountContentSel.value == "1") {
		totalPrice.value = regularPrice.value;
	} else if(discountContentSel.value == "2") {
		totalPrice.value -= (regularPrice.value * discountInputVal.value / 100);
	} else if(discountContentSel.value == "3") {
		totalPrice.value = regularPrice.value - discountInputVal.value;
	}
	checkPriceFlag = true;
}

/* 상세 이미지 첨부 */

const imageInput = document.getElementById('imageInput');
const imagePreview = document.getElementById('imagePreview');
const uploadedImage = document.getElementById('uploadedImage');

imageInput.addEventListener('change', function () {
    const file = imageInput.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = function (e) {
            uploadedImage.src = e.target.result;
            uploadedImage.style.display = 'block';
        };

        reader.readAsDataURL(file);
    } else {
        uploadedImage.src = '';
        uploadedImage.style.display = 'none';
    }
});



btnRegis.onclick = () => {
	checkRegis();
	
	let regisData = {
		subCategoryCode: subItemCode,
		prdName: productInfoName.value,
		prdMaker: productInfoMaker.value,
		prdGender: genderHidden.value.slice(0,-1),
		prdAge: ageHidden.value.slice(0,-1),
		prdStyle: styleHidden.value.slice(0,-1),
		prdRegularPrice: regularPrice.value,
		prdDiscountPrice: totalPrice.value,
		prdBrifExplain: null,
		prdDetailExplain: null,
		prdInventory: 0,
		"checkCategoryFlag": checkCategoryFlag,
		"checkGenderFlag": checkGenderFlag,
		"checkAgeFlag": checkAgeFlag,
		"checkStyleFlag": checkStyleFlag,
		"checkPriceFlag": checkPriceFlag
	}
	console.log(regisData);
	
	$.ajax({
		async: false,
		type: "post",
		url: "/admin/product/register",
		contentType: "application/json",
		data: JSON.stringify(regisData),
		dataType: "json",
		success: (response) => {
			if(response.data) {
				alert("상품 등록 성공");
				/*location.replace("/admin/product/main");*/
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
	
	
	
	
}

function checkRegis() {	
	
	console.log("상품명"+productInfoName.value);
	console.log("제조사"+productInfoMaker.value);
	console.log("재고수량"+stockNum.value);
	
	/* 성별 */
	genderHidden.value = null;
	for(let i = 0; i < genderCategory.length; i++) {
		if(genderCategoryInput[i].checked == true) {
			checkGenderFlag = true;
			genderHidden.value += genderCategoryInput[i].value;
			genderHidden.value += ",";
		}
	}
	console.log("성별모음"+genderHidden.value.slice(0,-1));
	
	/* 연령대 */
	ageHidden.value = null;
	for(let i = 0; i < ageCategory.length; i++) {
		if(ageCategoryInput[i].checked == true) {
			checkAgeFlag = true;
			ageHidden.value += ageCategoryInput[i].value;
			ageHidden.value += ",";
		}
	}
	console.log("연령모음"+ageHidden.value.slice(0,-1));
	
	/* 성향 */
	styleHidden.value = null;	
	for(let i = 0; i < styleCategory.length; i++) {
		if(styleCategoryInput[i].checked == true) {
			checkGenderFlag = true;
			styleHidden.value += styleCategoryInput[i].value;
			styleHidden.value += ",";			
		}
	}
	console.log("성향모음"+styleHidden.value.slice(0,-1));	
	
	console.log("판매가"+regularPrice.value);
	console.log("최종가"+totalPrice.value);	
}



















