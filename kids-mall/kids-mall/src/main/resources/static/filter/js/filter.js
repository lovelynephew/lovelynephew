const genderButtons = document.querySelectorAll(".gender-button");
const ageRangeButtons = document.querySelectorAll(".age-range-button");
const styleButtons = document.querySelectorAll(".style-button");
const completeButton = document.querySelector(".complete-button");
const priceMinInput = document.querySelector(".input-left");
const priceMaxInput = document.querySelector(".input-right");

const filterMenu = document.querySelectorAll(".filter-menu");
const resetButton = document.querySelector(".reset-button");
const skipButton = document.querySelector(".skip-button");

let userCode = null;

if(getUser() != null) {
    userCode = getUser().user_code;
}

let gender = null;
let age = null;
let kidStyle = [];


/** 기본 세팅 */

// 성향 버튼 클릭시 클릭한 버튼[index]에 색을 변경해준다.
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
                genderButtons[genderCheck].classList.toggle("active-color");
                genderCheck = i;
                genderButtons[genderCheck].classList.toggle("active-color");
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
                ageRangeButtons[ageCheck].classList.toggle("active-color");
                ageCheck = i;
                ageRangeButtons[ageCheck].classList.toggle("active-color");
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
        priceMinInput.value = 0;
        priceMaxInput.value = 100000;
    } else {
        // 설정안함 버튼이 체크되지 않았을 때 input range와 값을 나타내는 div를 활성화
        console.log("활성화");
        priceMinInput.disabled = false;
        priceMaxInput.disabled = false;
    }
};

/** 기본 세팅 end */

/** 필터 세팅 완료 버튼 */
completeButton.onclick = () => {
    setData();

    const data = {
        userCode: userCode,
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
            location.href = "/main";
        },
        error: (error) => {
            console.log(error);
        }
    });
}


/** 필터 초기화 버튼 기능 */
resetButton.onclick = () => {
    filterMenu.forEach((button, index) => {
        if (button.classList.contains("active-color")) {
            button.classList.remove("active-color");
        }
    });

    const right = document.querySelector(".right");
    const left = document.querySelector(".left");
    const range = document.querySelector(".range");

    const outputLeft = document.querySelector(".output-left");
    const outputRight = document.querySelector(".output-right");

    left.style = "";
    right.style = "";
    range.style = "";
    priceMinInput.value = 0;
    priceMaxInput.value = 100000;

    outputLeft.textContent = "0원";
    outputRight.textContent = "100000원";

    if (unsetCheckbox.checked) {
        unsetCheckbox.checked = false;
        priceMinInput.disabled = false;
        priceMaxInput.disabled = false;
    }
}



// 다음에 할게요 버튼 클릭시 메인페이지로 이동
skipButton.onclick = () => {
    location.href = "/main";
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



/** 완료 버튼 클릭 시 선택된 버튼값 저장하기 */
function setData() {
    gender = null;
    age = null;
    kidStyle = new Array();

    styleButtons.forEach((button) => {
        if (button.classList.contains("active-color")) {
            kidStyle.push(button.textContent);
        }
    });

    ageRangeButtons.forEach((button, index) => {
        if (button.classList.contains("active-color")) {
            age = button.textContent.charAt(0);
        }

        if(index == 8) {
            age = 8;
        }
    });

    genderButtons.forEach((button) => {
        if (button.classList.contains("active-color")) {
            gender = button.textContent.charAt(0);
        }
    });
}


load();

function load() {
    if (loadDataFromSessionStorage() != null) {
        genderButtons.forEach((button) => {
            if (button.textContent.charAt(0) == loadDataFromSessionStorage().gender) {
                button.classList.toggle("active-color");
                console.log("필터 불러오기 test: " + button.textContent);
            }
        });

        ageRangeButtons.forEach((button, index) => {
            if (button.textContent.charAt(0) == loadDataFromSessionStorage().age) {
                button.classList.toggle("active-color");
            }

            if(index == 8 && loadDataFromSessionStorage().age == 8) {
                button.classList.toggle("active-color");
            }
        });

        styleButtons.forEach((button) => {
            let kidArray = loadDataFromSessionStorage().kidStyle.split(",");
            for(let i = 0; i < kidArray.length; i++) {
                if (button.textContent == kidArray[i]) {
                    button.classList.toggle("active-color");
                }
            }
        });

        let savedPriceMin = loadDataFromSessionStorage().priceMin;
        let savedPriceMax = loadDataFromSessionStorage().priceMax;

        const right = document.querySelector(".right");
        const left = document.querySelector(".left");
        const range = document.querySelector(".range");
    
        const outputLeft = document.querySelector(".output-left");
        const outputRight = document.querySelector(".output-right");


        if(savedPriceMax == 100000) {
            right.style = "";
            range.style.right = "";
            priceMaxInput.value = 100000;
            outputRight.textContent = "100000원";
        } else if(savedPriceMax == 90000) {
            right.style = "right: 10%";
            range.style.right = "10%";
            priceMaxInput.value = 90000;
            outputRight.textContent = "90000원";
        } else if(savedPriceMax == 80000) {
            right.style = "right: 20%";
            range.style.right = "20%";
            priceMaxInput.value = 80000;
            outputRight.textContent = "80000원";
        } else if(savedPriceMax == 70000) {
            right.style = "right: 30%";
            range.style.right = "30%";
            priceMaxInput.value = 70000;
            outputRight.textContent = "70000원";
        } else if(savedPriceMax == 60000) {
            right.style = "right: 40%";
            range.style.right = "40%";
            priceMaxInput.value = 60000;
            outputRight.textContent = "60000원";
        } else if(savedPriceMax == 50000) {
            right.style = "right: 50%";
            range.style.right = "50%";
            priceMaxInput.value = 50000;
            outputRight.textContent = "50000원";
        } else if(savedPriceMax == 40000) {
            right.style = "right: 60%";
            range.style.right = "60%";
            priceMaxInput.value = 40000;
            outputRight.textContent = "40000원";
        } else if(savedPriceMax == 30000) {
            right.style = "right: 70%";
            range.style.right = "70%";
            priceMaxInput.value = 30000;
            outputRight.textContent = "30000원";
        } else if(savedPriceMax == 20000) {
            right.style = "right: 80%";
            range.style.right = "80%";
            priceMaxInput.value = 20000;
            outputRight.textContent = "20000원";
        } else if(savedPriceMax == 10000) {
            right.style = "right: 90%";
            range.style.right = "90%";
            priceMaxInput.value = 10000;
            outputRight.textContent = "10000원";
        } else if(savedPriceMax == 0) {
            right.style = "right: 100%";
            range.style.right = "100%";
            priceMaxInput.value = 0;
            outputRight.textContent = "0원";
        }

        if(savedPriceMin == 0) {
            left.style = "";
            range.style.left = "";
            priceMinInput.value = 0;
            outputLeft.textContent = "0원";
        } else if(savedPriceMin == 10000) {
            left.style = "left: 10%";
            range.style.left = "10%";
            priceMinInput.value = 10000;
            outputLeft.textContent = "10000원";
        } else if(savedPriceMin == 20000) {
            left.style = "left: 20%";
            range.style.left = "20%";
            priceMinInput.value = 20000;
            outputLeft.textContent = "20000원";
        } else if(savedPriceMin == 30000) {
            left.style = "left: 30%";
            range.style.left = "30%";
            priceMinInput.value = 30000;
            outputLeft.textContent = "30000원";
        } else if(savedPriceMin == 60000) {
            left.style = "left: 40%";
            range.style.left = "40%";
            priceMinInput.value = 40000;
            outputLeft.textContent = "40000원";
        } else if(savedPriceMin == 50000) {
            left.style = "left: 50%";
            range.style.left = "50%";
            priceMinInput.value = 50000;
            outputLeft.textContent = "50000원";
        } else if(savedPriceMin == 60000) {
            left.style = "left: 60%";
            range.style.left = "60%";
            priceMinInput.value = 60000;
            outputLeft.textContent = "60000원";
        } else if(savedPriceMin == 70000) {
            left.style = "left: 70%";
            range.style.left = "70%";
            priceMinInput.value = 70000;
            outputLeft.textContent = "70000원";
        } else if(savedPriceMin == 80000) {
            left.style = "left: 80%";
            range.style.left = "80%";
            priceMinInput.value = 80000;
            outputLeft.textContent = "80000원";
        } else if(savedPriceMin == 90000) {
            left.style = "left: 90%";
            range.style.left = "90%";
            priceMinInput.value = 90000;
            outputLeft.textContent = "90000원";
        } else if(savedPriceMin == 100000) {
            left.style = "left: 100%";
            range.style.left = "100%";
            priceMinInput.value = 100000;
            outputLeft.textContent = "100000원";
        }
    }
}