let nav;
let navButtonOpenClose;
let subContainer;
let bars;
let height;
let container;
let arrowContainer;

let bannerAnchor;
let projectsAnchor;
let membersAnchor;

let sections;
let rounds;

const openMenu = () => {
	nav.classList.remove('translateHide');
	subContainer.classList.add('translateShow');
	bars[0].id='bar1Open';
	bars[1].id='bar2Open';
	bars[2].id='bar3Open';
	document.body.classList.add('overflowHidden');
};

const closeMenu= () => {
	nav.classList.add('translateHide');
	subContainer.classList.remove('translateShow');
	bars[0].id='bar1';
	bars[1].id='bar2';
	bars[2].id='bar3';
    document.body.classList.remove('overflowHidden');
};

const redirectNav = (i) => {
    if(i===0)
        scrollTo(bannerAnchor);
    else if(i===1)
        scrollTo(projectsAnchor);
    else if(i===2)
        scrollTo(membersAnchor);
};

const clickOnNavItem= () => {
    let navItems = document.getElementsByClassName('navItem');
    for(let i=0;i<navItems.length;i++){
        navItems[i].addEventListener('click', (e) => {
            e.preventDefault();
            redirectNav(i);
            closeMenu(true);
        });
    }
    for(let i=0;i<rounds.length;i++){
        rounds[i].addEventListener('click', () => {
           redirectNav(i);
            closeMenu(true);
        });
        let value;
        rounds[i].addEventListener('mouseover', () => {
            value = rounds[i].style.transform;
            rounds[i].style.transition = '0.2s';
            rounds[i].style.transform = 'scale(1)';
        });
        rounds[i].addEventListener('mouseout', () => {
            rounds[i].style.transform = value;
            setTimeout(() => {
                rounds[i].style.transition = '0.1s';
            }, 200);
        });
    }
};

const scrollTo = (element) => {
    window.scroll({
        behavior: 'smooth',
        top: element.offsetTop
    });
};

const scrollPoints= () => {
    for(let i=0;i<rounds.length;i++) {
        if ((window.scrollY + window.innerHeight) > sections[i].offsetTop
                &&
                (window.scrollY) < (sections[i].offsetTop + sections[i].clientHeight)) {
            let windowMiddle = window.scrollY + window.innerHeight / 2;
            let itemMiddle = sections[i].offsetTop + sections[i].clientHeight / 2;
            let result;
            if (windowMiddle < itemMiddle) {
                result = (itemMiddle - windowMiddle) / (window.innerHeight);
            } else {
                result = (itemMiddle - windowMiddle) / (window.innerHeight) * -1;
            }
            result = 1 - result + 0.5;
            if (result < 0.5)
                result = 0.5;
            else if (result > 1)
                result = 1;
            rounds[i].style.transform = 'scale(' + result + ')';
        } else {
            rounds[i].style.transform = 'scale(0.5)';
        }
    }
};

(() => {
    nav = document.getElementsByTagName('nav')[0];
    navButtonOpenClose = document.getElementById('nav-button-open-close');
    subContainer = document.getElementById('subContainer');
    container = document.getElementById('container');
    bars = document.getElementsByClassName('bar');
    arrowContainer = document.getElementById('arrowContainer');

    bannerAnchor = document.getElementById('banner');
    projectsAnchor = document.getElementById('projects');
    membersAnchor = document.getElementById('members');

    sections = document.getElementsByClassName('section');
    rounds = document.getElementsByClassName('round-item');

    navButtonOpenClose.addEventListener('click', () => {
        if(nav.classList.contains('translateHide'))
            openMenu();
        else
            closeMenu(true);
    });

    container.addEventListener('click', () => {
        closeMenu();
    });

    clickOnNavItem();

    scrollPoints();
    window.addEventListener('scroll', () => {
        scrollPoints();
    });
})();
