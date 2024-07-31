import "../styles/styles.scss";
import "../index.html";

//Slider

const sliderNext = document.getElementById("next-arrow") as HTMLButtonElement,
    sliderPrev = document.getElementById("prev-arrow") as HTMLButtonElement,
    sliderInner = document.querySelector(".testimonials__slider") as HTMLElement,
    card = document.querySelector(".testimonials-card") as HTMLElement,
    paginationButtons = document.querySelectorAll(".testimonials-pagination__button") as NodeListOf<HTMLButtonElement>;

let currentIndex: number = 0;

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
            sliderPrev.disabled = false;
            if (currentIndex == 2) {
                sliderNext.disabled = true;
            }
            else {
                sliderNext.disabled = false;
            }
        }
        else {
            let sliderTranslate = -(card.offsetWidth + 50) * currentIndex;
            moveSlider(sliderTranslate);
            sliderNext.disabled = false;
            if (currentIndex == -2) {
                sliderPrev.disabled = true;
            }
            else {
                sliderPrev.disabled = false;
            }
        }
    })
})


//Modal
const contactForm = document.querySelector('.contact-form') as HTMLFormElement;
const footerForm = document.querySelector('.footer__form') as HTMLFormElement;
const modal = document.getElementById('modalWindow') as HTMLDialogElement;

contactForm.addEventListener('submit', (e) => submitForm(e, contactForm));
footerForm.addEventListener('submit', (e) => submitForm(e, footerForm));

function submitForm(e:SubmitEvent, form: HTMLFormElement) {
    e.preventDefault();

    const formData = new FormData(form);
    const jsonData = JSON.stringify(formData);

    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: jsonData
    })
    .then(() => openModal())
    .catch(() => {wrongModal(); openModal()})    
    }

function openModal() {
    modal.showModal();
    document.body.style.overflow = 'hidden';
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.close();
            document.body.style.overflow = '';
        }
    })
}

function wrongModal() {
    const message = modal.firstElementChild as HTMLElement
    message.textContent = "Something went wrong";
}