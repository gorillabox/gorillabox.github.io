let nav;
let navButton;
let subContainer;
let bars;
let height;
let body;
let html;
let scrollProgress;
let scrollProgressContainer;
let clientScrollHeight = 0;
let progressPercent;
let container;
let projectDisplayer;
let arrowContainer;
let projectDisplayerContent;
let events = [];
let membersAnchor;
let projectsAnchor;
let historyAnchor;
let contactAnchor;

(function(){
	nav = document.getElementsByTagName("nav")[0];
	navButton = document.getElementById("navButton");
	subContainer = document.getElementById("subContainer");
	container = document.getElementById("container");
	bars = document.getElementsByClassName("bar");
	scrollProgress = document.getElementById("scrollProgress");
	scrollProgressContainer = document.getElementById("scrollProgressContainer");
    contactAnchor = document.getElementById("contact");
	projectsAnchor = document.getElementById("projects");
    membersAnchor = document.getElementById("members");
	historyAnchor = document.getElementById("history");
	projectDisplayer = document.getElementById("projectDisplayer");
	arrowContainer = document.getElementById("arrowContainer");
	projectDisplayerContent = document.getElementById("projectDisplayerContent");
	body = document.body;
    html = document.documentElement;

	navButton.addEventListener("click", function(){
		if(nav.classList.contains("translateHide"))
			openMenu();
		else
			closeMenu(true);
	});

	body.addEventListener("click", function(e){
        if(!nav.classList.contains("translateHide")){
            if(e.target !== nav && e.target.parentNode != null && e.target.parentNode !== nav && e.target.parentNode.parentNode !== nav)
                closeMenu(true);
        }
	});
})();

function openMenu(){
	nav.classList.remove("translateHide");
	subContainer.classList.add("translateShow");
	bars[0].id="bar1Open";
	bars[1].id="bar2Open";
	bars[2].id="bar3Open";
	scrollProgressContainer.classList.add("translateProgressBar");
	body.classList.add("overflowHidden");
}

function closeMenu(removeFlow){
	nav.classList.add("translateHide");
	subContainer.classList.remove("translateShow");
	bars[0].id="bar1";
	bars[1].id="bar2";
	bars[2].id="bar3";
	scrollProgressContainer.classList.remove("translateProgressBar");
	if(removeFlow)
        body.classList.remove("overflowHidden");
}