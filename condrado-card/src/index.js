require('normalize.css/normalize.css');
require('./styles/index.scss');
require('./assets/proyects/santader-logo.jpg');

const titleCompanyPosition = [];

function pagination() {
    const returnBtns = document.querySelectorAll('.c-btn--return');

    returnBtns.forEach(returnBtn => {
        returnBtn.onclick = (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const linkAct = e.target;
            const pageGo = e.target.dataset.page;
            
            if (typeof pageGo !== 'undefined') {
                const pageEnd = document.getElementById('page-' + pageGo);
                const pageAct = e.target.closest('.card__page');

                pageEnd.classList.toggle('active');
                pageAct.classList.toggle('active');

                if (pageGo === '3') {
                    createTimeLine();
                    scrollTimeLine();
                }
            }
        }
    });
}

function createTimeLine() {
    const { proyectsMod } = require('./data/projects.json');

    if (typeof proyectsMod.state !== 'undefined' && proyectsMod.state === 1 && proyectsMod.companies.length > 0) {
        const timelineDiv = document.getElementById('timeline');
        const urlImage = process.env.NODE_ENV !== 'production' ? 'src/assets/proyects/' : 'assets/images/';


        if(typeof proyectsMod.companies !== 'undefined') {
            proyectsMod.companies.forEach(company =>  {
                const timelineCompanyDiv = document.createElement('div');
                const titleCompany = document.createElement('h3');
                const contScroll = document.querySelector('#page-3 .card__content');
                
                titleCompany.textContent = company.name;
                timelineCompanyDiv.classList.add('timeline__company');
                titleCompany.classList.add('timeline__title');

                timelineCompanyDiv.appendChild(titleCompany);
                timelineDiv.appendChild(timelineCompanyDiv);

                titleCompany.style.top = contScroll.getBoundingClientRect().top + 'px';

                if(typeof company.years !== 'undefined') {
                    company.years.forEach(year =>  {
                        const titleYear = document.createElement('h4');
                
                        titleYear.classList.add('timeline__year');
                        titleYear.textContent = year.year;
                        timelineCompanyDiv.appendChild(titleYear);

                        if(typeof year.months !== 'undefined') {
                            year.months.forEach(month =>  {
                                const { date } = require('./data/date.json');
                                const titleMonth = document.createElement('h5');
                
                                titleMonth.classList.add('timeline__month');
                                titleMonth.textContent = date.months[month.month];
                                timelineCompanyDiv.appendChild(titleMonth);
    
                                if(typeof month.proyects !== 'undefined') {
                                    timelineCompanyDiv.appendChild(titleMonth);
                                    
                                    month.proyects.forEach(proyect =>  {
                                        const proyDiv = document.createElement('div');
                                        const proyContDiv = document.createElement('div');
                                        const titleProy = document.createElement('h6');
                                        const logoImg = document.createElement('img');
                                        const descP = document.createElement('p');

                                        proyDiv.classList.add('timeline__event');
                                        proyContDiv.classList.add('timeline__content');
                                        logoImg.classList.add('timeline__img');
                                        descP.classList.add('timeline__description');
                                        titleProy.classList.add('timeline__subtitle');

                                        logoImg.setAttribute('src', urlImage + proyect.logo);
                                        titleProy.textContent = proyect.title;
                                        descP.textContent = proyect.desc;

                                        proyContDiv.appendChild(titleProy);
                                        proyContDiv.appendChild(descP);
                                        proyDiv.appendChild(proyContDiv);
                                        proyDiv.appendChild(logoImg);

                                        timelineCompanyDiv.appendChild(proyDiv);
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
    }
}

function scrollTimeLine() {
    var last_known_scroll_position = 0;
    const contScroll = document.querySelector('#page-3 .card__content');

    if (contScroll !== null) {
        contScroll.addEventListener('scroll', function(e) {
            const companies = document.querySelectorAll('.timeline__title');
            last_known_scroll_position = contScroll.scrollTop;

            //if ()
    
            console.log(last_known_scroll_position)
        });
    }
}

document.addEventListener("DOMContentLoaded", () => {
    pagination();
});