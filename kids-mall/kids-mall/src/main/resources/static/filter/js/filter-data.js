function submit() {
    setData();
    // 여기서 선택 정보를 서버로 보내는 Ajax 요청을 수행할 수 있습니다.
    console.log(kidStyle.join(","));

    let data = {
        user_flag: null,
        gender: gender,
        age: age,
        kidStyle: kidStyle.join(","),
        priceMin: priceMinInput.value,
        priceMax: priceMaxInput.value
    };

    let getData = {
        gender: gender,
        age: age,
        kidStyle: kidStyle.join(","),
        priceMin: priceMinInput.value,
        priceMax: priceMaxInput.value
    }

    $.ajax({
        async: false,
        type: "post",
        url: "/api/v1/search/filter",
        data: JSON.stringify(data),
        contentType: 'application/json; charset=utf-8',
        processData: false,
        dataType: "json",
        success: (response) => {
            console.log(response.data);
            alert("필터 등록 성공");
            saveDataToSessionStorage(getData);
            // console.log(priceMinInput.value);
            // console.log(priceMaxInput.value);
            // 데이터를 처리한 후, 쿼리 문자열을 생성
            const queryString = `?gender=${data.gender}&prdAge=${data.age}&prdStyle=${data.kidStyle}&priceMin=${data.priceMin}&priceMax=${data.priceMax}`;

            // 현재 페이지의 URL에 쿼리 문자열을 추가하여 다른 페이지로 이동
            window.location.href = "/search/product" + encodeURI(queryString);
        },
        error: (error) => {
            console.log(error);
        }
    });
    
}

function saveDataToSessionStorage(data) {
    // 데이터를 JSON 문자열로 변환하여 sessionStorage에 저장
    sessionStorage.setItem('cachedData', JSON.stringify(data));
}

function loadDataFromSessionStorage() {
    // sessionStorage에서 데이터를 가져와서 JSON으로 파싱
    const cachedData = sessionStorage.getItem('cachedData');
    if (cachedData) {
        return JSON.parse(cachedData);
    }
    return null; // 데이터가 없으면 null 반환
}



// submit();