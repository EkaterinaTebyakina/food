import { getResources } from "../services/services";

function cards() {
    
    class Card {
        constructor(img, alt, name, description, cost, parentSelector, ...classes) {
            this.img = img;
            this.alt = alt;
            this.name = name;
            this.description = description;
            this.cost = cost;
            this.transfer = 27;
            this.parent = document.querySelector(parentSelector);
            this.classes = classes;
            //this.changeToUAH();
        }

        changeToUAH() {
            this.cost = +this.cost * this.transfer;
            //console.log(this.cost);
        }

        render() {
            if (this.classes.length === 0) {
                this.classes.push('menu__item');
            }
            this.changeToUAH();
            const card = document.createElement('div');
            this.classes.forEach(item => card.classList.add(item));

            card.innerHTML = `
                <img src="${this.img}" alt="${this.alt}">
                <h3 class="menu__item-subtitle">${this.name}</h3>
                <div class="menu__item-descr">${this.description}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.cost}</span> грн/день</div>
                </div>`;

            this.parent.append(card);
        }
    }

    /*getResources('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({img, altimg, title, descr, price}) => {
                new Card(img, altimg, title, descr, price, '.menu .container', 'menu__item').render();
            });
        });*/

    axios.get('http://localhost:3000/menu')
        .then(data => {
            data.data.forEach(({
                img,
                altimg,
                title,
                descr,
                price
            }) => {
                new Card(img, altimg, title, descr, price, '.menu .container', 'menu__item').render();
            });
        });


    /*function createCard(data) {
        data.forEach(({img, altimg, title, descr, price}) => {
            const elem = document.createElement('div');
            elem.classList.add('menu__item');
            elem.innerHTML = `
                <img src="${img}" alt="${altimg}">
                <h3 class="menu__item-subtitle">${title}</h3>
                <div class="menu__item-descr">${descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${price}</span> грн/день</div>
                </div>`;

            document.querySelector('.menu .container').append(elem);
        
        });
    }

    getResources('http://localhost:3000/menu')
        .then(data => createCard(data));*/
    /*const data =  [{img:'img/tabs/vegy.jpg', alt:'vegy', title:'Меню "Фитнес"', description:`Меню "Фитнес" - это новый подход 
    к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно 
    новый продукт с оптимальной ценой и высоким качеством!`, cost:229}];

    const cardFitness = new Card(
        'img/tabs/vegy.jpg', 
        'vegy', 
        'Меню "Фитнес"', 
        `Меню "Фитнес" - это новый подход 
        к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно 
        новый продукт с оптимальной ценой и высоким качеством!`,
        180, 
        '.menu .container',
        'menu__item');
    const cardElite = new Card(
        'img/tabs/elite.jpg', 
        'elite', 
        'Меню “Премиум”', 
        `В меню “Премиум” мы используем не 
        только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - 
        ресторанное меню без похода в ресторан!`, 
        550, 
        '.menu .container',
        'menu__item');
    const cardPost = new Card(
        'img/tabs/post.jpg', 
        'post', 'Меню "Постное"', 
        `Меню “Постное” - это тщательный подбор 
        ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, 
        правильное количество белков за счет тофу и импортных вегетарианских стейков.`, 
        430, 
        '.menu .container');

    const menuContainer = document.querySelector('.menu .container');
    menuContainer.innerHTML = '';
    cardFitness.render();
    cardElite.render();
    cardPost.render();*/

    /*const cardPost2 = new Card('img/tabs/post.jpg', 'post', 'Меню "Постное"', `Меню “Постное” - это тщательный подбор 
    ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, 
    правильное количество белков за счет тофу и импортных вегетарианских стейков.`, 430, '.menu .container').render();
    */
    /*const menuContainer = document.querySelector('.menu .container');
    menuContainer.innerHTML = '';
    menuContainer.appendChild(cardFitness.render());
    menuContainer.appendChild(cardElite.render());
    menuContainer.appendChild(cardPost.render());*/

}

//module.exports = cards;
export default cards;