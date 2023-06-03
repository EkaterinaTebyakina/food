function timer(timerSelector, deadline) {
    //timer
    //const deadline = '2022-07-29T16:33:00';

    function getTimeRemaining(endTime) {
        let days, hours, minutes, seconds;
        const t = Date.parse(endTime) - Date.parse(new Date());
        if (t <= 0) {
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;

        } else {
            days = Math.floor(t / (1000 * 60 * 60 * 24)); //1000 мс в секунде, 60 сек в мин, 60 мин в часе, 24 часа в сутках = колво мс в сутках
            hours = Math.floor(t / (1000 * 60 * 60)) % 24;
            minutes = Math.floor(t / (1000 * 60)) % 60;
            seconds = Math.floor(t / 1000) % 60;
        }

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = document.querySelector('#hours'),
            minutes = document.querySelector('#minutes'),
            seconds = document.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    setClock(timerSelector, deadline);
    /*
        function updateTimer() {
            const endDate = new Date('2022-05-26');
            let curDate = new Date();
            let difDate = new Date(endDate - curDate);
            const timerBlocks = document.querySelectorAll('.promotion__timer .timer__block span');
            const daysBlock = document.querySelector('#days');
            const hoursBlock = document.querySelector('#hours');
            const minutesBlock = document.querySelector('#minutes');
            const secondsBlock = document.querySelector('#seconds');
            console.log(difDate);
            console.log(endDate);
            console.log(curDate);

            daysBlock.textContent = curDate.getDate() - endDate.getDate();
            hoursBlock.textContent = curDate.getHours() - endDate.getHours();
            minutesBlock.textContent = curDate.getMinutes() - endDate.getMinutes();
            secondsBlock.textContent = curDate.getSeconds() - endDate.getSeconds();
        }


        //const id = setInterval(updateTimer, 1000);*/
}

//module.exports = timer;
export default timer;