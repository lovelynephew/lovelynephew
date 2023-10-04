const sliders = document.querySelectorAll(".multi-range-slider");

sliders.forEach((slider) => {
  const inputLeft = slider.querySelector(".input-left");
  const inputRight = slider.querySelector(".input-right");
  const thumbLeft = slider.querySelector(".slider .thumb.left");
  const thumbRight = slider.querySelector(".slider .thumb.right");
  const range = slider.querySelector(".slider .range");

  const setLeftValue = () => {
    const [min, max] = [parseInt(inputLeft.min), parseInt(inputLeft.max)];

    inputLeft.value = Math.min(parseInt(inputLeft.value), parseInt(inputRight.value) - 1);

    const percent = ((inputLeft.value - min) / (max - min)) * 100;
    thumbLeft.style.left = percent + "%";
    range.style.left = percent + "%";
  };

  const setRightValue = () => {
    const [min, max] = [parseInt(inputRight.min), parseInt(inputRight.max)];

    inputRight.value = Math.max(parseInt(inputRight.value), parseInt(inputLeft.value) + 1);

    const percent = ((inputRight.value - min) / (max - min)) * 100;
    thumbRight.style.right = 100 - percent + "%";
    range.style.right = 100 - percent + "%";
  };

  inputLeft.addEventListener("input", setLeftValue);
  inputRight.addEventListener("input", setRightValue);
});



// input 값 실시간으로 띄워주기
// 좌측 input 요소와 연결
const inputLeft = document.querySelector(".input-left");
const outputLeft = document.querySelector(".output-left");

// 우측 input 요소와 연결
const inputRight = document.querySelector(".input-right");
const outputRight = document.querySelector(".output-right");

// 좌측 input 값 변경 시
inputLeft.addEventListener("input", function () {
    outputLeft.textContent = inputLeft.value + "원";
});

// 우측 input 값 변경 시
inputRight.addEventListener("input", function () {
    outputRight.textContent = inputRight.value + "원";
});

