function calculator() {
    //Calculator

    const resultField = document.querySelector('.calculating__result span');

    const genderField = document.querySelector('#gender'),
        female = document.querySelector('#female'),
        male = document.querySelector('#male'),
        height = document.querySelector('#height'),
        weight = document.querySelector('#weight'),
        age = document.querySelector('#age'),
        activitiesField = document.querySelector('.calculating__choose_big');

    const activities = activitiesField.querySelectorAll('div');
    const genders = genderField.querySelectorAll('div');

    if (localStorage.getItem('activity')) {
        //console.log(document.querySelector(`#${localStorage.getItem('activity')}`));
        setActiveField(activities, document.querySelector(`#${localStorage.getItem('activity')}`));
    } else {
        setActiveField(activities, document.querySelector('#medium'));
    }
    if (localStorage.getItem('gender')) {
        //console.log(document.querySelector(`#${localStorage.getItem('gender')}`));
        setActiveField(genders, document.querySelector(`#${localStorage.getItem('gender')}`));
    } else {
        setActiveField(genders, female);
    }

    function setDataToLocalStorage(id) {
        switch (id) {
            case 'female':
                localStorage.setItem('gender', 'female');
                break;
            case 'male':
                localStorage.setItem('gender', 'male');
                break;
            case 'low':
                localStorage.setItem('activity', 'low');
                break;
            case 'small':
                localStorage.setItem('activity', 'small');
                break;
            case 'medium':
                localStorage.setItem('activity', 'medium');
                break;
            case 'high':
                localStorage.setItem('activity', 'high');
                break;
        }
    }

    function setActiveField(fields, checkedField) {
        fields.forEach((field) => {
            field.classList.remove('calculating__choose-item_active');
        });
        checkedField.classList.add('calculating__choose-item_active');

        //console.log(checkedField.getAttribute('id'));
        setDataToLocalStorage(checkedField.getAttribute('id'));

    }

    function checkIsCalculateItem(field) {
        return field.classList.contains('calculating__choose-item');
    }

    function setResultField() {
        if (checkFields()) {
            resultField.textContent = calcResult(getDataFromForm());
        } else {
            resultField.textContent = 0;
        }
    }

    function checkFields() {
        return (height.value != null && height.value != '' && !isNaN(height.value) &&
            weight.value != null && weight.value != '' && !isNaN(weight.value) &&
            age.value != null && age.value != '' && !isNaN(age.value));
    }

    function getDataFromForm() {
        let gender;
        if (female.classList.contains('calculating__choose-item_active')) {
            gender = 'female';
        } else {
            gender = 'male';
        }

        let activity;

        activities.forEach(item => {
            if (item.classList.contains('calculating__choose-item_active')) {
                activity = +item.getAttribute('data-ration');
            }
        });

        return [gender, height.value, weight.value, age.value, activity];
    }

    function calcResult([gender, height, weight, age, activity]) {
        let BMR = 0;
        if (gender === 'female') {
            BMR = 447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age);
        } else if (gender === 'male') {
            BMR = 88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age);
        }

        return Math.ceil(BMR * activity); //(BMR * activity).toFixed(2);
    }



    genderField.addEventListener('click', (e) => {
        if (checkIsCalculateItem(e.target)) {

            setActiveField(genders, e.target);
            setResultField();
        }
    });

    activitiesField.addEventListener('click', (e) => {
        if (checkIsCalculateItem(e.target)) {

            setActiveField(activities, e.target);
            setResultField();
        }
    });

    document.querySelector('.calculating__choose_medium').addEventListener('input', (e) => {
        if (checkIsCalculateItem(e.target)) {
            if (e.target.value.match(/\D/g)) {
                //console.log(Array.from(e.target.value.matchAll(/\./g)));
                if (((e.target.value.match(/\d\.\d/g)) || (e.target.value.match(/\d\./g))) &&
                    (Array.from(e.target.value.matchAll(/\./g)).length <= 1)) {

                    e.target.style.border = 'none';
                    setResultField();
                } else {
                    e.target.style.border = '1px solid red';
                    setResultField();
                }
            } else {
                e.target.style.border = 'none';
                setResultField();
            }
        }
    });
}

//module.exports = calculator;
export default calculator;