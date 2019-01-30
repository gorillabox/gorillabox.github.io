let projects = [];
let projectsElement = [];
let projectDisplayOffset = 0;
let projectsDisplayed = false;
let moreProjectsOpen = false;
let projectDisplayerContainer;

(function(){
    projectDisplayerContainer = document.getElementById("projectDisplayerContainer");
    events.push(["<a target='_blank' href=\"https://mygamedb.com\">MygameDB</a>", 2017]);
    events.push(["<a target='_blank' href=\"https://play.google.com/store/apps/details?id=gorillabox.mygamedb\">MygameDB - Android</a>", 2018]);
    events.push(["<a target='_blank' href=\"https://play.google.com/store/apps/details?id=gorillabox.myworkouts\">My Workouts - Android</a>", 2018]);

	projectDisplayOffset = projectsAnchor.offsetTop;

	let name;
	let logo;
	let description;
	let languages;
	let links;
	let backgroundColor;

    name = "MyWorkouts";
    logo = "/public/images/projects/myworkouts.png";
    description = "MyWorkouts est une application android de gestion d'entrainement de musculation, de crossfit ainsi que de street workout.<br /><br />Grâce au minuteur intégré qui se lance à la fin d'une série vous ne louperez plus jamais vos pauses ! Chaque entrainement effectué sera ajouté à l'historique pour visualiser vos améliorations depuis le début.";
    languages = ["JAVA"];
    links = [["Google Play", "https://play.google.com/store/apps/details?id=gorillabox.myworkouts"]];
    backgroundColor = "0bcd62";
    projects.push(new Project(name, logo, description, languages, links, backgroundColor));

	name = "MyGameDB";
	logo = "/public/images/projects/mygamedb.png";
	description = "MyGameDB est un site web de gestion de collection de jeux vidéo et de consoles administré par moi-même. <br /><br />MyGameDB vous permet d'ajouter les consoles et jeux vidéos que vous possédez, d'indiquer leur statut et bien d'autres options.<br /><br />Vous pourrez également ajouter des jeux à votre wishlist dans le but d'être notifié si un membre possède le jeu en plusieurs exemplaires. Idéal pour faire des échanges.";
	languages = ["HTML", "CSS", "PHP", "SQL", "JavaScript", "JQuery"];
	links = [["Site web", "https://mygamedb.com"], ["Google Play", "https://play.google.com/store/apps/details?id=gorillabox.mygamedb"]];
	backgroundColor = "1d3e5c";
	projects.push(new Project(name, logo, description, languages, links, backgroundColor));


	let i = 0;
	while(i<projects.length && i < 3){
		buildProject(i);
		i++;
	}

	window.addEventListener("scroll", function(){
		if(window.pageYOffset >= (projectDisplayOffset-(window.innerHeight/2)) && projectsDisplayed === false){
			projectsDisplayed = true;
			let i = 0;
			while(i<projectsElement.length && i < 3){
				setAnimListenerOpen(projectsElement[i], i);
				i++;
			}
		}
	});

	if(projects.length > 3){
		let moreProjects = document.createElement("div");
		moreProjects.id = "moreProjects";
		let plus = document.createElement("div");
		plus.id = "morePlus";
		moreProjects.appendChild(plus);
		let plusBar = document.createElement("div");
		plus.appendChild(plusBar);
		plusBar = document.createElement("div");
		plusBar.classList.add("plusBarRotate");
		plus.appendChild(plusBar);
		let showMore = document.createElement("div");
		showMore.appendChild(document.createTextNode("Voir plus de projets"));
		moreProjects.appendChild(showMore);
		projectsAnchor.appendChild(moreProjects);
		moreProjects.addEventListener("click", function(){
			if(moreProjectsOpen === false){
				showMore.innerText = "Voir moins de projets";
				plusBar.classList.add("plusBarRotateHidden");
				moreProjectsOpen = true;
				for(let i=3; i<projects.length;i++){
					buildProject(i);
					setAnimListenerOpen(projectsElement[i], i);
				}
			}else{
				showMore.innerText = "Voir plus de projets";
				plusBar.classList.remove("plusBarRotateHidden");
				moreProjectsOpen = false;
				for(let i = projects.length-1; i>2;i--){
					setAnimListenerClose(projectsElement[i], (projects.length-(i+1)));
				}
			}
		});
	}
})();

function setAnimListenerOpen(object, delay){
	object.style.animation = "projetPop 0.6s "+(delay/8)+"s";
	object.addEventListener("animationend", animationOpenEvent);
}

function animationOpenEvent(e){
	e.target.removeEventListener("animationend", animationOpenEvent);
	e.target.style.transform = "scale(1)";
	e.target.style.animation = "";
}

function animationCloseEvent(e){
	e.target.removeEventListener("animationend", animationCloseEvent);
	e.target.parentNode.removeChild(e.target);
	e.target.style.animation = "";
	projectsElement.pop();
}

function setAnimListenerClose(object, delay){
	object.style.animation = "projetUnpop 0.6s "+(delay/8)+"s";
	object.addEventListener("animationend", animationCloseEvent);
}


function buildProject(i){
	let div = document.createElement("div");
	div.classList.add("projectDisplay");
	div.classList.add("projectDisplayHide");
	projectsElement.push(div);
	div.style.backgroundColor = "#"+projects[i].backgroundColor;
	let projectId = document.createElement("input");
	projectId.type = "hidden";
	projectId.value = i;
	projectId.name = "projectId";
	div.appendChild(projectId);
	let content = document.createElement("div");
	content.classList.add("content");
	div.appendChild(content);
	let show = document.createElement("div");
	show.classList.add("contentShow");
	div.appendChild(show);
	show.appendChild(document.createTextNode(projects[i].name));
	let img = document.createElement("img");
	img.src = projects[i].logo;
	img.alt = "";
	content.appendChild(img);
	projectsAnchor.appendChild(div);
	div.addEventListener("click", function(e){
		buildProjectPopup(parseInt(e.currentTarget.childNodes[0].value));
	});
}

function closePopup(){
    body.classList.remove("overflowHidden");
	projectDisplayer.classList.add("leftSlide");
	projectDisplayer.classList.remove("leftSlideNone");
	container.classList.remove("slide");
	nav.classList.remove("slide");
    projectDisplayerContainer.classList.remove("zIndex");
    projectDisplayerContainer.classList.add("overflowHidden");
    projectDisplayerContainer.classList.remove("overflowAuto");
}

function buildProjectPopup(projectNumber){
    body.classList.add("overflowHidden");
    projectDisplayerContainer.classList.add("zIndex");
	projectDisplayerContent.innerHTML = "";
    projectDisplayerContainer.classList.remove("overflowHidden");
    projectDisplayerContainer.classList.add("overflowAuto");
	projectDisplayer.classList.remove('leftSlide');
	projectDisplayer.classList.add("leftSlideNone");
	container.classList.add("slide");
	nav.classList.add("slide");
	arrowContainer.addEventListener("click", function(){
		closePopup();
	});
	let h1Container = document.createElement("div");
	h1Container.classList.add("h1Container");
	let h1 = document.createElement("h1");
	h1.appendChild(document.createTextNode(projects[projectNumber].name));
	h1Container.appendChild(h1);
	let middle = document.createElement("div");
	middle.id = "projectDisplayerMiddle";
	let pictureContainer = document.createElement("div");
	pictureContainer.id = "pictureContainer";
	pictureContainer.classList.add("projectDisplay");
	pictureContainer.style.transform = "scale(1)";
	pictureContainer.style.borderRadius = "50%";
	let content = document.createElement("div");
	content.classList.add("content");
	let img = document.createElement("img");
	img.src = projects[projectNumber].logo;
	pictureContainer.style.backgroundColor = "#"+projects[projectNumber].backgroundColor;
	content.appendChild(img);
	pictureContainer.appendChild(content);
	let descriptionContainer = document.createElement("div");
	descriptionContainer.id = "descriptionContainer";
	descriptionContainer.innerHTML = projects[projectNumber].description;
	let linksDescription = descriptionContainer.getElementsByTagName("a");
	for(let i=0;i<linksDescription.length;i++){
		linksDescription[i].addEventListener("click", function(e){
			e.preventDefault();
			closePopup();
		});
	}
    let languagesLine = document.createElement("div");
    languagesLine.id = "projectDisplayerLanguages";
    for(let i=0;i<projects[projectNumber].languages.length;i++){
        let div = document.createElement("div");
        div.appendChild(document.createTextNode(projects[projectNumber].languages[i]));
        languagesLine.appendChild(div);
    }
	let links = document.createElement("div");
	links.id = "projectDisplayerLinks";
	for(let i=0;i<projects[projectNumber].links.length;i++){
		let a = document.createElement("a");
		a.href = projects[projectNumber].links[i][1];
		a.target = "_blank";
		a.appendChild(document.createTextNode(projects[projectNumber].links[i][0]));
		links.appendChild(a);
	}
	middle.appendChild(pictureContainer);
	middle.appendChild(descriptionContainer);
	projectDisplayerContent.appendChild(h1Container);
	projectDisplayerContent.appendChild(middle);
    projectDisplayerContent.appendChild(languagesLine);
	projectDisplayerContent.appendChild(links);
}

function Project(name, logo, description, languages, links, backgroundColor){
	this.name = name;
	this.description = description;
	//development languages array
	this.languages = languages;
	this.logo = logo;
	//link is an array with name to display and the linkg
	this.links = links;
	this.backgroundColor = backgroundColor;
}
