function hideModal(modalSelector) {
    //modal.classList.toggle('show');
    const modal = document.querySelector(modalSelector);
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

function showModal(modalSelector, timerID) {
    //modal.classList.toggle('show');
    const modal = document.querySelector(modalSelector);
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';

    console.log(timerID);
    if (timerID) {
        clearInterval(timerID);
    }
}

function modal(triggerSelector, modalSelector, timerID) {
    //Modal window
    /*
            const showTriggers = document.querySelectorAll('[data-modal]'),
                  hideTriggers = document.querySelectorAll('[data-close]');
    
            function showModal() {
                const modal = document.querySelector('.modal');
                modal.style.display = 'block';
            }
            function hideModal() {
                const modal = document.querySelector('.modal');
                modal.style.display = 'none';
            }
    
            showTriggers.forEach((elem) => {
                elem.addEventListener('click', showModal);
            });
            hideTriggers.forEach(elem => {
                elem.addEventListener('click', hideModal);
            });*/

            const modal = document.querySelector(modalSelector),
            showTriggers = document.querySelectorAll(triggerSelector);
        //hideTriggers = document.querySelectorAll('[data-close]');
    
    
        
    
        showTriggers.forEach(elem => {
            elem.addEventListener('click', () => showModal(modalSelector, timerID));
        });
        /*hideTriggers.forEach(elem => {
            elem.addEventListener('click', hideModal);
        });*/
    
        modal.addEventListener('click', e => {
            if (e.target === modal || e.target.getAttribute('data-close') == '') {
                hideModal(modalSelector);
            }
        });
    
        document.addEventListener('keydown', (e) => {
            if (e.code === "Escape" && modal.classList.contains('show')) {
                hideModal(modalSelector);
            }
        });
    
        const pageHeight = document.scrollHeight;
    
        //const timerID = setTimeout(showModal, 50000);
    
        function showModalByScroll() {
            if (window.pageYOffset + document.documentElement.clientHeight >=
                document.documentElement.scrollHeight - 1) { // -1 пиксель не обязательно, просто иногда в некоторых браузерах без него не срабатывает
                showModal(modalSelector, timerID);
                window.removeEventListener('scroll', showModalByScroll);
            }
        }
    
        window.addEventListener('scroll', showModalByScroll);
}

//module.exports = modal;
export default modal;
export {hideModal};
export {showModal};