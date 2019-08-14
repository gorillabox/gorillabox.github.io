let nav;
let navButtonOpenClose;
let subContainer;
let bars;
let height;
let container;
let arrowContainer;

let projectsAnchor;
let membersAnchor;

(function(){
	nav = document.getElementsByTagName("nav")[0];
	navButtonOpenClose = document.getElementById("nav-button-open-close");
	subContainer = document.getElementById("subContainer");
	container = document.getElementById("container");
	bars = document.getElementsByClassName("bar");
	arrowContainer = document.getElementById("arrowContainer");

    projectsAnchor = document.getElementById("projects");
    membersAnchor = document.getElementById("members");

	navButtonOpenClose.addEventListener("click", function(){
		if(nav.classList.contains("translateHide"))
			openMenu();
		else
			closeMenu(true);
	});

    container.addEventListener("click", function(){
        closeMenu();
	});

    clickOnNavItem();
})();

function openMenu(){
	nav.classList.remove("translateHide");
	subContainer.classList.add("translateShow");
	bars[0].id="bar1Open";
	bars[1].id="bar2Open";
	bars[2].id="bar3Open";
	document.body.classList.add("overflowHidden");
}

function closeMenu(){
	nav.classList.add("translateHide");
	subContainer.classList.remove("translateShow");
	bars[0].id="bar1";
	bars[1].id="bar2";
	bars[2].id="bar3";
    document.body.classList.remove("overflowHidden");
}


function clickOnNavItem(){
    let navItems = document.getElementsByClassName("navItem");
    for(let i=0;i<navItems.length;i++){
        navItems[i].addEventListener("click", function(e){
            e.preventDefault();
            if(i===0)
                scrollToTop();
            else if(i===1)
                scrollTo(projectsAnchor);
            else if(i===2)
                scrollTo(membersAnchor);
            closeMenu(true);
        });
    }
}

function scrollTo(element){
    window.scroll({
        behavior: 'smooth',
        top: element.offsetTop
    });
}

function scrollToTop(){
    window.scroll({
        behavior: 'smooth',
        top: 0
    });
}
