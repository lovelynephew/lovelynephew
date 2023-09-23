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

/* 에디터 가져오기 */
let oEditors = [];

nhn.husky.EZCreator.createInIFrame({
    oAppRef: oEditors,
    elPlaceHolder: "ir1",
    sSkinURI: "/static/smarteditor/SmartEditor2Skin.html",
    fCreator: "createSEditor2",
    htParams : { 
	bUseVerticalResizer : false,  
	bUseModeChanger : false 
    }
})
/* 에디터 가져오기 */









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
	console.log("이미지"+imageInput.value.substring(12));
    const file = imageInput.files[0];
    if (file) {
        compressImage(file).then((compressedBlob) => {
            uploadedImage.src = URL.createObjectURL(compressedBlob);
            uploadedImage.style.display = 'block';
        });
    } else {
        uploadedImage.src = '';
        uploadedImage.style.display = 'none';
    }
});

// 이미지 압축
function compressImage(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
            const img = new Image();
            img.src = event.target.result;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                const maxWidth = 800; // 원하는 최대 너비 설정
                const maxHeight = 600; // 원하는 최대 높이 설정

                let width = img.width;
                let height = img.height;

                if (width > maxWidth || height > maxHeight) {
                    const ratio = Math.min(maxWidth / width, maxHeight / height);
                    width = width * ratio;
                    height = height * ratio;
                }

                canvas.width = width;
                canvas.height = height;
                ctx.drawImage(img, 0, 0, width, height);

                canvas.toBlob((blob) => {
                    resolve(blob);
                }, 'image/jpeg', 0.7); // 이미지 포맷 및 압축 품질 설정
            };
        };
    });
}

/* 상세 이미지 끝 */

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




const btnChe = document.querySelector(".btn-che");
btnChe.onclick = () => {
    oEditors.getById["ir1"].exec("UPDATE_CONTENTS_FIELD", []);
    const testareaValue = document.querySelector("#ir1").value;
    const mainImage = document.querySelector("#uploadedImage");
    
	console.log(testareaValue);
	console.log(mainImage.value);
	console.log(mainImage.src);
	console.log(mainImage.src.substring(27));
	
	let createForm = document.getElementById("fileload");
	let formData = new FormData(createForm);
	formData.append("image", imageInput.value.substring(12));
	
	$.ajax({
		async: false,
		type: "post",
		url: "/file/profile",
        enctype: "multipart/form-data",
        contentType: false,
        processData: false,
	    data: formData,
	    success: (response) => {
			console.log("hihi");
		},
		error: (error) => {
			console.log(error);
		}
	})
}













