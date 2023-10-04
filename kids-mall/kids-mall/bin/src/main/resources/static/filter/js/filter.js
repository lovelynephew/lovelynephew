const genderButtons = document.querySelectorAll(".gender-button");
const ageRangeButtons = document.querySelectorAll(".age-range-button");
const styleButtons = document.querySelectorAll(".style-button");
const completeButton = document.querySelector(".complete-button");
const priceMinInput = document.querySelector(".input-left");
const priceMaxInput = document.querySelector(".input-right");

let gender = null;
let age = null;
let kidStyle = [];

styleButtons.forEach((button, index) => {
    button.onclick = () => {
        styleButtons[index].classList.toggle("active-color");
    };
});

let genderCheck = null;
let ageCheck = null;

for(let i = 0; i < genderButtons.length; i++) {
    genderButtons[i].onclick = () => {
        if(genderCheck == null) {
            genderCheck = i;
            genderButtons[genderCheck].classList.toggle("active-color");
            console.log("genderCheck == null ? 체크하기");
        }else {
            if(genderCheck != i) {
                alert("성별은 복수 선택이 불가능합니다.");
                console.log("성별은 복수선택 불가능합니다.");
            } else {
                genderButtons[genderCheck].classList.toggle("active-color");
                genderCheck = null;
                console.log("genderCheck == i 체크 헤제");            
            }
        }
    }
}

for(let i = 0; i < ageRangeButtons.length; i++) {
    ageRangeButtons[i].onclick = () => {
        if(ageCheck == null) {
            ageCheck = i;
            ageRangeButtons[ageCheck].classList.toggle("active-color");
            console.log("agecheck == null ? 체크하기");
        }else {
            if(ageCheck != i) {
                alert("나이는 복수 선택이 불가능합니다.");
                console.log("나이는 복수선택 불가능합니다.");
            } else {
                ageRangeButtons[ageCheck].classList.toggle("active-color");
                ageCheck = null;
                console.log("agecheck == i 체크 헤제");            
            }
        }
    }
}

const unsetCheckbox = document.querySelector(".free-price input[type=checkbox]");

unsetCheckbox.onclick = () => {
    if (unsetCheckbox.checked) {
        // 설정안함 버튼이 체크되었을 때 input range와 값을 나타내는 div를 비활성화
        console.log("비활성화");
        priceMinInput.disabled = true;
        priceMaxInput.disabled = true;
    } else {
        // 설정안함 버튼이 체크되지 않았을 때 input range와 값을 나타내는 div를 활성화
        console.log("활성화");
        priceMinInput.disabled = false;
        priceMaxInput.disabled = false;
    }
};

function submit() {
    completeButton.onclick = () => {
        setData();
        // 여기서 선택 정보를 서버로 보내는 Ajax 요청을 수행할 수 있습니다.
        console.log(kidStyle.join(","));

        const data = {
            userFlag: null,
            filterName: null,
            gender: gender,
            age: age,
            kidStyle: kidStyle.join(","),
            priceMin: priceMinInput.value,
            priceMax: priceMaxInput.value
        };

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
                saveDataToSessionStorage(data);
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



function setData() {
    gender = null;
    age = null;
    kidStyle = new Array();

    styleButtons.forEach((button, index) => {
        if (button.classList.contains("active-color")) {
            kidStyle.push(button.textContent);
        }
    });

    ageRangeButtons.forEach((button, index) => {
        if (button.classList.contains("active-color")) {
            age = button.textContent.charAt(0);
        }
    });

    genderButtons.forEach((button, index) => {
        if (button.classList.contains("active-color")) {
            gender = button.textContent.charAt(0);
        }
    });
}




submit();