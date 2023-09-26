

let categoryCode = location.pathname.substring(location.pathname.lastIndexOf("/") + 1);
console.log(categoryCode);
load();
function load() {
	$.ajax({
		async: false,
		type: "get",
		url: "/product/main/list/" + categoryCode,
		dataType: "json",
		success: (response) => {
			console.log(response.data)
			getProductMain(response.data);
			changeBold(response.data);
			getProductList();
		},
		error: (error) => {
			console.log(error);
		}
	})
}

function getProductMain(data) {
	const headerTitle = document.querySelector(".header-title");
	const categoryWrap = document.querySelector(".category-wrap");
	if(data.parentCategoryCode == 1) {
		headerTitle.innerHTML = `
        	<h3>장난감</h3>
		`;
		categoryWrap.innerHTML = `
	        <div class="category-wrap">
	            <a href="/product/main/1">
	                인형
	            </a>
	        </div>
	        <div class="category-wrap">
	            <a href="/product/main/2">
	                자동차 및 기차모형
	            </a>
	        </div>
	        <div class="category-wrap">
	            <a href="/product/main/3">
	                블록 및 퍼즐
	            </a>
	        </div>
	        <div class="category-wrap">
	            <a href="/product/main/4">
	                과학 및 교육용 장난감
	            </a>
	        </div>
        	<div class="category-wrap">
	            <a href="/product/main/5">
	                스포츠 용품
	            </a>
	        </div>
		`
	} else if(data.parentCategoryCode == 2) {
		headerTitle.innerHTML = `
        	<h3>의류</h3>
		`;
		categoryWrap.innerHTML = `
	        <div class="category-wrap">
	            <a href="/product/main/6">
	                상의
	            </a>
	        </div>
	        <div class="category-wrap">
	            <a href="/product/main/7">
	                하의
	            </a>
	        </div>
	        <div class="category-wrap">
	            <a href="/product/main/8">
	                모자 및 악세서리
	            </a>
	        </div>
	        <div class="category-wrap">
	            <a href="/product/main/9">
	                실내복 및 팬티
	            </a>
	        </div>
		`;
	} else if(data.parentCategoryCode == 3) {
		headerTitle.innerHTML = `
        	<h3>이벤트</h3>
		`;
		categoryWrap.innerHTML = `
	        <div class="category-wrap">
	            <a href="/product/main/10">
	                생일 및 기념일 선물용품
	            </a>
	        </div>
	        <div class="category-wrap">
	            <a href="/product/main/11">
	                크리스마스 선물용품
	            </a>
	        </div>
	        <div class="category-wrap">
	            <a href="/product/main/12">
	                할로윈 선물용품
	            </a>
	        </div>
	        <div class="category-wrap">
	            <a href="/product/main/13">
	                추석 선물용품
	            </a>
	        </div>
		`;
	} else if(data.parentCategoryCode == 4``) {
		headerTitle.innerHTML = `
        	<h3>생활용품</h3>
		`;
		categoryWrap.innerHTML = `
	        <div class="category-wrap">
	            <a href="/product/main/14">
	                문구류 및 스티커
	            </a>
	        </div>
	        <div class="category-wrap">
	            <a href="/product/main/15">
	                수납용품
	            </a>
	        </div>
	        <div class="category-wrap">
	            <a href="/product/main/16">
	                욕실용품
	            </a>
	        </div>
		`;
	}
	
}

function changeBold(data) {
	const categoryWrap = document.querySelectorAll(".category-wrap");
	const categoryWrapText = document.querySelectorAll(".category-wrap a");
	for(let i = 1; i < categoryWrap.length; i++) {
		if(categoryWrap[i].textContent.trim() == data.subCategoryName) {
			console.log(data.subCategoryName)
			categoryWrapText[i-1].style.fontWeight="700";
		}
	}
}

/* 위 카테고리 불러오기 끝 */

/* 상품가져오기 */



function getProductList() {
	$.ajax({
		async: false,
		type: "get",
		url: "/product/main/product/list/" + categoryCode,
		dataType: "json",
		success: (response) => {
			console.log(response.data);
			loadProducts(response.data);
		},
		error: (error) => {
			console.log(error);
		}
	})
}

function loadProducts(data) {
	const recommendBox = document.querySelector(".recommend-box");
	for(let i = 0; i < data.length; i++) {
		console.log("hihi")
		recommendBox.innerHTML += `
	        <div class="recommend">
	            <div class="recommend-img">
	                <img src="${data[i].prdMainImage}" alt="">
	                <p class="explain">${data[i].prdName}</p>
	                <p class="price">${data[i].prdDiscountPrice}원</p>
	            </div>
	        </div>
		`
	}
}
