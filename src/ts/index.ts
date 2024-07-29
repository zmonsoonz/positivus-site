import "../styles/styles.scss";
import "../index.html";

//Slider

const sliderNext = document.querySelector(".next-arrow") as Element;
const sliderPrev = document.querySelector(".prev-arrow") as Element;
const sliderInner = document.querySelector(".testimonials__slider") as HTMLElement;
const card = document.querySelector(".testimonials-card") as HTMLElement;
const sliderTranslate = card.offsetWidth*2;
console.log(sliderTranslate);

sliderNext.addEventListener('click', () => {
    sliderInner.style.left = `${sliderTranslate}px`;
})