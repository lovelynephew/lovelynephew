const sizeButtons = document.querySelectorAll(".size-button");
const colorRangeButtons = document.querySelectorAll(".color-range-button");
const styleButtons = document.querySelectorAll(".style-button");
const completeButton = document.querySelector(".complete-button");
const priceMinInput = document.querySelector(".input-left");
const priceMaxInput = document.querySelector(".input-right");

const skipButton = document.querySelector(".skip-button");



let size = null;
let color = null;
let style = null;
let kidStyle = [];


// 성향 버튼 클릭시 클릭한 버튼[index]에 색을 변경해준다.
styleButtons.forEach((button, index) => {
    button.onclick = () => {
        styleButtons[index].classList.toggle("active-color");
    };
});

let sizeCheck = null;
let colorCheck = null;
let styleCheck = null;

for(let i = 0; i < sizeButtons.length; i++) {
    sizeButtons[i].onclick = () => {
        if(sizeCheck == null) {
            sizeCheck = i;
            sizeButtons[sizeCheck].classList.toggle("active-color");
            console.log("sizeCheck == null ? 체크하기");
        }else {
            if(sizeCheck != i) {
                alert("중복 선택이 불가능합니다.");
                console.log("중복 선택이 불가능합니다.");
                sizeButtons[sizeCheck].classList.toggle("active-color");
                genderCheck = i;
                sizeButtons[sizeCheck].classList.toggle("active-color");
            } else {
                sizeButtons[sizeCheck].classList.toggle("active-color");
                sizeCheck = null;
                console.log("sizeCheck == i 체크 해제"); 
            }
        }
    }
}

for(let i = 0; i < colorRangeButtons.length; i++) {
    colorRangeButtons[i].onclick = () => {
        if(colorCheck == null) {
            colorCheck = i;
            colorRangeButtons[colorCheck].classList.toggle("active-color");
            console.log("colorcheck == null ? 체크하기");
        }else {
            if(colorCheck != i) {
                alert("중복 선택이 불가능합니다.");
                console.log("중복 선택이 불가능합니다.");
                colorRangeButtons[colorCheck].classList.toggle("active-color");
                colorCheck = i;
                colorRangeButtons[colorCheck].classList.toggle("active-color");
            } else {
                colorRangeButtons[colorCheck].classList.toggle("active-color");
                colorCheck = null;
                console.log("colorcheck == i 체크 해제");            
            }
        }
    }
}

for(let i = 0; i < styleButtons.length; i++) {
    styleButtons[i].onclick = () => {
        if(styleCheck == null) {
            styleCheck = i;
            styleButtons[styleCheck].classList.toggle("active-color");
            console.log("sizeCheck == null ? 체크하기");
        }else {
            if(styleCheck != i) {
                alert("중복 선택이 불가능합니다.");
                console.log("중복 선택이 불가능합니다.");
                styleButtons[styleCheck].classList.toggle("active-color");
                genderCheck = i;
                styleButtons[styleCheck].classList.toggle("active-color");
            } else {
                styleButtons[styleCheck].classList.toggle("active-color");
                styleCheck = null;
                console.log("styleCheck == i 체크해제"); 
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

        const data = {
            userFlag: null,
            filterName: null,
            size: size,
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
                location.href = "/search/product";
            },
            error: (error) => {
                console.log(error);
            }
        });
    }
}

function saveDataToSessionStorage(data) {
    // 데이터를 JSON 문자열로 변환하여 sessionStorage에 저장
    sessionStorage.setItem('filterData', JSON.stringify(data));
}

function loadDataFromSessionStorage() {
    // sessionStorage에서 데이터를 가져와서 JSON으로 파싱
    const filterData = sessionStorage.getItem('filterData');
    if (filterData) {
        return JSON.parse(filterData);
    }
    return null; // 데이터가 없으면 null 반환
}



function setData() {
    size = null;
    color = null;
    kidStyle = new Array();

    styleButtons.forEach((button, index) => {
        if (button.classList.contains("active-color")) {
            kidStyle.push(button.textContent);
        }
    });

    colorRangeButtons.forEach((button, index) => {
        if (button.classList.contains("active-color")) {
            color = button.textContent.charAt(0);
        }
    });

    sizeButtons.forEach((button, index) => {
        if (button.classList.contains("active-color")) {
            size = button.textContent.charAt(0);
        }
    });
}




submit();