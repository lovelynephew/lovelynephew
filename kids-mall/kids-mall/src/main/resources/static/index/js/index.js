
load();
function load() {
	$.ajax({
		async: false,
		type: "get",
		url: "/popular-products",
		dataType: "json",
		success: (response) => {
			loadProducts(response.data);
		},
		error: (error) => {
			console.log(error);
		}
	})
}

function loadProducts(data) {
	const recommendBox = document.querySelector(".recommend-box-all");
	for(let i = 0; i < data.length; i++) {
		recommendBox.innerHTML += `
	        <div class="recommend">
	            <div class="recommend-img">
	            	<a href="">
	                <img src="${data[i].prdMainImage}" alt="">
                    <div class="sale-box">
                        <div class="sale">${data[i].prdDiscountPercentage}%</div>
                        <p class="sale-price">${data[i].prdRegularPrice}원</p>
                    </div>
	                <p class="explain">${data[i].prdName}</p>
	                <p class="price">${data[i].prdDiscountPrice}원</p>
	                </a>
	            </div>
	        </div>
		`
	}
}