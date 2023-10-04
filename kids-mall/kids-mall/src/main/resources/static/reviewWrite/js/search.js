

/**세션 스토리지에 등록되어 있는 검색조건 설정값 */
let session = loadDataFromSessionStorage();


console.log(session);

let productList = new Array();
load();

function load() {

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
