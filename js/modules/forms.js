import { hideModal } from "./modal";
import { showModal } from "./modal";
import { postData } from "../services/services";

function forms(formSelector, timerID) {
    // Forms

    const forms = document.querySelectorAll(formSelector);
    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Скоро мы с Вами свяжемся',
        fail: 'Что-то пошло не так'
    };

    forms.forEach(item => bindPostData(item));


    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
            display: block;
            margin: 0 auto;
        `;
            //statusMessage.textContent = message.loading;
            //form.append(statusMessage);
            form.insertAdjacentElement('afterend', statusMessage);

            const formData = new FormData(form);

            /*const object = {};
            formData.forEach(function(value, key){
                object[key] = value;
            });
            const json = JSON.stringify(object);*/

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            /*fetch('server.php', {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: json
            })*/
            postData('http://localhost:3000/requests', json)
                //.then(data => data.text())
                .then((data) => {
                    console.log(data);
                    showThanksModal(message.success);
                    statusMessage.remove();
                }).catch(() => {
                    showThanksModal(message.fail);
                }).finally(() => {
                    form.reset();
                });

            /*Запрос с помощью  XMLHttpRequest()

            const request = new XMLHttpRequest();
            request.open('POST', 'server.php');

            //Отправка данных типа FormData
            //-----------------------------
            //request.setRequestHeader('Content-type', 'multipart/form-data');
            //Когда использум htmlhttprequest и formData заголовок устанавливать не нужно, это происходит автоматически
            const formData = new FormData(form); //чтобы самостоятельно не вытаскивать данные из инпутов
            //для FormData() нужно, чтобы у тега был атрибут name
            //request.send(formData);

            //Отправка данных типа JSON
            //-------------------------
            request.setRequestHeader('Content-type', 'application/json');
            const object = {};
            formData.forEach(function(value, key){
                object[key] = value;
            });
            const json = JSON.stringify(object);

            request.send(json);

            request.addEventListener('load', () => {
                if (request.status === 200) {
                    console.log(request.response);
                    //statusMessage.textContent = message.success;
                    showThanksModal(message.success);
                    form.reset();
                    statusMessage.remove();
                    //setTimeout(() => {statusMessage.remove();}, 3000);
                } else {
                    //statusMessage.textContent = message.fail;
                    showThanksModal(message.fail);
                }
            });*/

        });
    }

    //Shift + F5 сброс кеша

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');
        prevModalDialog.classList.add('hide');
        prevModalDialog.classList.remove('show');
        showModal('.modal', timerID);

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
        <div class="modal__content">
            <div class="modal__close" data-close>&times;</div>
            <div class="modal__title">${message}</div>
        </div>
    `;

        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.remove('hide');
            prevModalDialog.classList.add('show');
            hideModal('.modal');
        }, 4000);
    }

    /*fetch('http://localhost:3000/menu')
        .then(data => data.json())
        .then(res => console.log(res));*/

}

//module.exports = forms;
export default forms;