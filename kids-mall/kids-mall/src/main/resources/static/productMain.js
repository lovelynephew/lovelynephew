const headerTitle = document.querySelector(".header-title");
const categoryWrap = document.querySelectorAll(".category-wrap");
const categoryWrapText = document.querySelectorAll(".category-wrap a");
const categoryDetailLi = document.querySelectorAll(".category-detail-li");

let categoryCode = location.pathname.substring(location.pathname.lastIndexOf("/") + 1);
console.log(categoryCode);

if(location.href == "http://localhost:8888/product/main/0") {
	getFilterData();
} else {
	load();
}
function load() {
	$.ajax({
		async: false,
		type: "get",
		url: "/product/main/list/" + categoryCode,
		dataType: "json",
		success: (response) => {
			getProductMain(response.data);
			changeBold(response.data);
			getProductList(response.data);
		},
		error: (error) => {
			console.log(error);
		}
	})
}

function getProductMain(data) {
	const categoryDetailUl = document.querySelector(".category-detail-ul");
	if(data.parentCategoryCode == 1) {
		headerTitle.innerHTML = `
        	<h3>장난감</h3>
		`;
		categoryDetailUl.innerHTML = `
			<li class="category-detail-li"><a href="/product/main/17">전체</a></li>
			<li class="category-detail-li"><a href="/product/main/1">인형</a></li>
			<li class="category-detail-li"><a href="/product/main/2">자동차 및 기차모형</a></li>
			<li class="category-detail-li"><a href="/product/main/3">블록 및 퍼즐</a></li>
			<li class="category-detail-li"><a href="/product/main/4">과학 및 교육용 장난감</a></li>
			<li class="category-detail-li"><a href="/product/main/5">스포츠 용품</a></li>
		`
	} else if(data.parentCategoryCode == 2) {
		headerTitle.innerHTML = `
        	<h3>의류</h3>
		`;
		categoryDetailUl.innerHTML = `
			<li class="category-detail-li"><a href="/product/main/18">전체</a></li>
			<li class="category-detail-li"><a href="/product/main/6">상의</a></li>
			<li class="category-detail-li"><a href="/product/main/7">하의</a></li>
			<li class="category-detail-li"><a href="/product/main/8">모자 및 악세서리</a></li>
			<li class="category-detail-li"><a href="/product/main/9">실내복 및 팬티</a></li>
			<li class="category-detail-li"></li>
		`
	} else if(data.parentCategoryCode == 3) {
		headerTitle.innerHTML = `
        	<h3>이벤트</h3>
		`;
		categoryDetailUl.innerHTML = `
			<li class="category-detail-li"><a href="/product/main/19">전체</a></li>
			<li class="category-detail-li"><a href="/product/main/10">생일 및 기념일 선물용품</a></li>
			<li class="category-detail-li"><a href="/product/main/11">크리스마스 선물용품</a></li>
			<li class="category-detail-li"><a href="/product/main/12">할로윈 선물용품</a></li>
			<li class="category-detail-li"><a href="/product/main/13">추석 선물용품</a></li>
			<li class="category-detail-li"></li>
		`
	} else if(data.parentCategoryCode == 4) {
		headerTitle.innerHTML = `
        	<h3>생활용품</h3>
		`;
		categoryDetailUl.innerHTML = `
			<li class="category-detail-li"><a href="/product/main/20">전체</a></li>
			<li class="category-detail-li"><a href="/product/main/14">문구류 및 스티커</a></li>
			<li class="category-detail-li"><a href="/product/main/15">수납용품</a></li>
			<li class="category-detail-li"><a href="/product/main/16">욕실용품</a></li>
			<li class="category-detail-li"></li>
			<li class="category-detail-li"></li>
		`
	}
	
}

function changeBold(data) {
	for(let i = 1; i < categoryWrap.length; i++) {
		if(categoryWrap[i].textContent.trim() == data.parentCategoryName) {
			categoryWrapText[i-1].style.fontWeight="700";
		}
	}
	for(let i = 0; i < categoryDetailLi.length; i++) {
		if(categoryDetailLi[i].textContent == data.subCategoryName) {
			categoryDetailLi[i].style.fontWeight="700";
		}
	}
}

/* 위 카테고리 불러오기 끝 */

/* 상품가져오기 */

function getProductList(name) {
	if(name.subCategoryName == "전체") {
		let parentCode = name.parentCategoryCode;
		$.ajax({
			async: false,
			type: "get",
			url: "/product/main/product/listall/" + parentCode,
			dataType: "json",
			success: (response) => {
				console.log(response.data);
				loadProducts(response.data);
			},
			error: (error) => {
				console.log(error);
			}
		})
	} else {
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
}

function loadProducts(data) {
	const recommendBox = document.querySelector(".recommend-box");
	for(let i = 0; i < data.length; i++) {
		recommendBox.innerHTML += `
	        <div class="recommend">
	            <div class="recommend-img">
	            	<a href="">
	                <img src="${data[i].prdMainImage}" alt="">
	                <p class="explain">${data[i].prdName}</p>
	                <p class="price">${data[i].prdDiscountPrice}원</p>
	                </a>
	            </div>
	        </div>
		`
	}
}

function getFilterData() {

	/**세션 스토리지에 등록되어 있는 검색조건 설정값 */
	let session = loadDataFromSessionStorage();
	

	headerTitle.innerHTML = `
    	<h3>추천</h3>
	`;
	
	categoryWrapText[0].style.fontWeight="700";

	console.log(session);

	let productList = new Array();

	if (session != null) {
		loadFilter();
	}

	function loadFilter() {

		const data = {
			category: null,
			gender: session.gender,
			prdAge: session.age,
			prdStyle: session.kidStyle,
			priceMin: session.priceMin,
			priceMax: session.priceMax
		}

		$.ajax({
			async: false,
			type: "get",
			data: data,
			url: `/api/v1/search/product`,
			dataType: "json",
			success: (response) => {
				console.log(response.data);
				console.log("get완료");
				productList = response.data;
				loadProducts(response.data);
			},
			error: (error) => {
				console.log(data);
				console.log(error);
			}
		});
		return productList;
	}

	function loadDataFromSessionStorage() {
		// sessionStorage에서 데이터를 가져와서 JSON으로 파싱
		const filterData = sessionStorage.getItem('filterData');
		if (filterData) {
			return JSON.parse(filterData);
		}
		return null; // 데이터가 없으면 null 반환
	}
}