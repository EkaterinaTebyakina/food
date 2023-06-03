function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
    //Tabs
    const tabs = document.querySelectorAll(tabsSelector),
        tabsContent = document.querySelectorAll(tabsContentSelector),
        tabsParent = document.querySelector(tabsParentSelector);

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.style.display = 'none';
            //item.classList.add('hide');
            //item.classList.remove('show', 'fade');
        });

        tabs.forEach(tab => {
            tab.classList.remove(activeClass);
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].style.display = 'block';
        //tabsContent[i].classList.add('show', 'fade');
        //tabsContent[i].classList.remove('hide');
        tabsContent[i].classList.add(activeClass);
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;
        if (target && target.classList.contains(tabsSelector.slice(1))) {
            tabs.forEach((item, i) => {
                if (item == target) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });
}

//module.exports = tabs;
export default tabs;