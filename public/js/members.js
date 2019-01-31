let members = [];
let membersElement = [];
let memberDisplayOffset = 0;
let membersDisplayed = false; //used for animation appear

(function(){
	memberDisplayOffset = membersAnchor.offsetTop;

	addMember("Montoya Damien",
            "/public/images/members/damien.jpg",
            "Développeur et fondateur de GorillaBox",
            "https://montoyadamien.github.io/");

	addMember("Rigaut François",
            "/public/images/members/francois.jpg",
            "Développeur",
            "https://www.linkedin.com/in/fran%C3%A7ois-rigaut/");

	for(let i=0;i<members.length;i++){
		buildMember(i);
	}

	window.addEventListener("scroll", function(){
		if(window.pageYOffset >= (memberDisplayOffset-(window.innerHeight/2)) && membersDisplayed === false){
			membersDisplayed = true;
			for(let i=0;i<membersElement.length;i++){
				setAnimListenerOpen(membersElement[i], i);
			}
		}
	});

})();

function addMember(name, picture, description, link){
	members.push(new Member(name, picture, description, link));
}

function buildMember(i){
	let memberContainer = document.createElement("div");
	memberContainer.classList.add("memberContainer");
	membersElement.push(memberContainer);
	memberContainer.classList.add("memberDisplay");
	memberContainer.classList.add("memberDisplayHide");
	let div = document.createElement("div");
	let img = document.createElement("img");
	img.src = members[i].logo;
	img.alt = "";
	div.appendChild(img);
	memberContainer.appendChild(div);
	div = document.createElement("div");
	let nameContainer = document.createElement("p");
	nameContainer.classList.add("memberNameContainer");
	nameContainer.appendChild(document.createTextNode(members[i].name));
	div.appendChild(nameContainer);
	let descriptionContainer = document.createElement("p");
	descriptionContainer.classList.add("memberdescriptionContainer");
	descriptionContainer.appendChild(document.createTextNode(members[i].description));
	div.appendChild(descriptionContainer);
	memberContainer.appendChild(div);
	div = document.createElement("div");
	div.classList.add("flexCenter");
	let  a = document.createElement("a");
	a.classList.add("portfolioButton");
	a.target = "_blank";
	a.href = members[i].portfolio;
	a.appendChild(document.createTextNode("Portfolio"));
	div.appendChild(a);
	memberContainer.appendChild(div);
	membersAnchor.appendChild(memberContainer);
}

function Member(name, logo, description, portfolio){
	this.name = name;
	this.logo = logo;
	this.description = description;
	this.portfolio = portfolio;
}