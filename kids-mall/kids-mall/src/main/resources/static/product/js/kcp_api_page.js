// 로컬 스토리지에서 JSON 데이터를 가져와서 파싱
const productsData = JSON.parse(localStorage.getItem('productsData'));
console.log(productsData);

document.getElementById("prdName").innerHTML= productsData["0"].name;
document.getElementById("paidPrdName").innerHTML= productsData["0"].name;
document.getElementById("regPrice").innerHTML = productsData["0"].productRegularPrice;
document.getElementById("prdPrice").innerHTML = productsData["0"].productRegularPrice;
document.getElementById("prdDisPrice").innerHTML = "(-)" + (productsData["0"].productRegularPrice-productsData["0"].productDiscountPrice);


