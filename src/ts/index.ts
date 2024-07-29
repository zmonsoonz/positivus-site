import "../styles/styles.scss";
import "../index.html";

//Slider

const sliderNext = document.getElementById("next-arrow") as HTMLButtonElement,
    sliderPrev = document.getElementById("prev-arrow") as HTMLButtonElement,
    sliderInner = document.querySelector(".testimonials__slider") as HTMLElement,
    card = document.querySelector(".testimonials-card") as HTMLElement,
    paginationButtons = document.querySelectorAll(".testimonials-pagination__button") as NodeListOf<HTMLButtonElement>;

let currentIndex: number = 0;

window.addEventListener('resize', () => {
    currentIndex = 0;
    moveSlider(0);
    sliderPrev.disabled = false;
    sliderNext.disabled = false;
});

sliderNext.addEventListener('click', () => {
    currentIndex += 1;
    sliderPrev.disabled = false;
    if (currentIndex == 2) {
        sliderNext.disabled = true;
    }
    let sliderTranslate: number = (card.offsetWidth + 50) * -currentIndex;
    moveSlider(sliderTranslate);
})


sliderPrev.addEventListener('click', () => {
    currentIndex -= 1;
    sliderNext.disabled = false;
    if (currentIndex == -2) {
        sliderPrev.disabled = true;
    }
    let sliderTranslate: number = -(card.offsetWidth + 50) * currentIndex;
    moveSlider(sliderTranslate);
})

function moveSlider(sliderTranslate: number) {
    sliderInner.style.transform = `translateX(${sliderTranslate}px)`;
    paginationButtons.forEach((item: HTMLButtonElement, i: number) => {
        item.classList.remove("is-active");
        if (i === currentIndex + 2) {
            item.classList.add("is-active");
        }
    });

}

paginationButtons.forEach((item: HTMLButtonElement, i: number) => {
    item.addEventListener('click', () => {
        currentIndex = i-2;
        if (currentIndex > 0) {
            let sliderTranslate = (card.offsetWidth + 50) * -currentIndex;
            moveSlider(sliderTranslate);
        }
        else {
            let sliderTranslate = -(card.offsetWidth + 50) * currentIndex;
            moveSlider(sliderTranslate);
        }
    })
})

