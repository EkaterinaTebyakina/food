function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {

    //Слайдер

    /*const currentNumber = document.querySelector('.offer__slider #current');
    const sliderPicturesAmount = document.querySelector('#total');

    const leftArrow = document.querySelector('.offer__slider-prev');
    const rightArrow = document.querySelector('.offer__slider-next');

    const sliderImgs = [
        {src: "img/slider/pepper.jpg", alt:"pepper"}, 
        {src: "img/slider/food-12.jpg", alt:"food"},
        {src: "img/slider/olive-oil.jpg", alt:"oil"},
        {src: "img/slider/paprika.jpg", alt:"paprika"}];

    leftArrow.addEventListener('click', (e) => {
        let number = 0;
        if (currentNumber.textContent === '01') {
            number = + sliderPicturesAmount.textContent;
            currentNumber.textContent = '0' + number;
        } else {
            number = currentNumber.textContent - 1;
            currentNumber.textContent = '0' + number;
        }

        const sliderImg = document.querySelector('.offer__slide img');
        sliderImg.src = sliderImgs[--number].src;
        sliderImg.alt = sliderImgs[--number].alt;
    });

    rightArrow.addEventListener('click', (e) => {
        let number = 0;
        if (currentNumber.textContent === sliderPicturesAmount.textContent) {
            number = 1;
            currentNumber.textContent = '01';
        } else {
            number = + currentNumber.textContent + 1;
            currentNumber.textContent = '0' + number;
        }
        const sliderImg = document.querySelector('.offer__slide img');
        sliderImg.src = sliderImgs[--number].src;
        sliderImg.alt = sliderImgs[--number].alt;
    });*/

    const currentNumber = document.querySelector(currentCounter);
    const sliderPicturesAmount = document.querySelector(totalCounter);

    const leftArrow = document.querySelector(prevArrow);
    const rightArrow = document.querySelector(nextArrow);

    const slides = document.querySelectorAll(slide),
        slidesWrapper = document.querySelector(wrapper),
        slidesField = document.querySelector(field),
        width = window.getComputedStyle(slidesWrapper).width;

    let slideIndex = 1;
    let offset = 0;

    setSliderPictAmount();
    setCurrentNumber();
    /*if (slides.length < 10) {
        sliderPicturesAmount.textContent = `0${slides.length}`;
        currentNumber.textContent = `0${slideIndex}`;
    } else {
        sliderPicturesAmount.textContent = slides.length;
        currentNumber.textContent = slideIndex;
    }*/

    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden';

    slides.forEach(slide => {
        slide.style.width = width;
    });

    //dots
    const slider = document.querySelector(container),
        dots = [];

    slider.style.position = 'relative';
    const indicators = document.createElement('ol');
    indicators.classList.add('carousel-indicators');
    indicators.style.cssText = `position: absolute;
                                right: 0;
                                bottom: 0;
                                left: 0;
                                z-index: 15;
                                display: flex;
                                justify-content: center;
                                margin-right: 15%;
                                margin-left: 15%;
                                list-style: none;`;

    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.style.cssText = `
                            box-sizing: content-box;
                            flex: 0 1 auto;
                            width: 30px;
                            height: 6px;
                            margin-right: 3px;
                            margin-left: 3px;
                            cursor: pointer;
                            background-color: #fff;
                            background-clip: padding-box;
                            border-top: 10px solid transparent;
                            border-bottom: 10px solid transparent;
                            opacity: .5;
                            transition: opacity .6s ease;`;

        if (i == 0) {
            dot.style.opacity = 1;
        }
        indicators.append(dot);
        dots.push(dot);
    }

    rightArrow.addEventListener('click', () => {
        if (offset == strToNumber(width) * (slides.length - 1)) { //'500px'
            offset = 0;
        } else {
            offset += strToNumber(width);
            //offset += +width.replace(/\D/g, '');
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        setCurrentNumber();

        setActiveDot();
    });

    leftArrow.addEventListener('click', () => {
        if (offset == 0) { //'500px'
            offset = strToNumber(width) * (slides.length - 1);
        } else {
            offset -= strToNumber(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        setCurrentNumber();

        setActiveDot();
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');
            slideIndex = slideTo;
            offset = strToNumber(width) * (slideTo - 1);

            slidesField.style.transform = `translateX(-${offset}px)`;

            setCurrentNumber();

            setActiveDot();

        });
    });

    function strToNumber(str) {
        return +str.replace(/\D/g, '');
        //+width.slice(0, width.length - 2)
    }

    function setCurrentNumber() {
        if (slides.length < 10) {
            currentNumber.textContent = `0${slideIndex}`;
        } else {
            currentNumber.textContent = slideIndex;
        }
    }

    function setSliderPictAmount() {
        if (slides.length < 10) {
            sliderPicturesAmount.textContent = `0${slides.length}`;
        } else {
            sliderPicturesAmount.textContent = slides.length;
        }
    }

    function setActiveDot() {
        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = 1;
    }

}

//module.exports = slider;
export default slider;