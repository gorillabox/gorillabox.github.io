let members = [];
let membersContainer;

let membersDisplayOffset = 0;
let membersLoaded = false;

(function(){
    members.push(new Member("Damien Montoya", "damien.jpg", [
            new Link("LinkedIn", LINKS_LOGO_ENUM.LINKEDIN, "https://www.linkedin.com/in/damien-montoya/"),
            new Link("Portfolio", LINKS_LOGO_ENUM.WEBSITE, "https://montoyadamien.github.io/")
    ]));

    members.push(new Member("François Rigaut", "francois.jpg", [
        new Link("LinkedIn", LINKS_LOGO_ENUM.LINKEDIN, "https://www.linkedin.com/in/fran%C3%A7ois-rigaut/")
    ]));

    membersContainer = document.getElementById("members-container");
    membersDisplayOffset = membersAnchor.offsetTop;

    members.forEach(buildMember);
    membersScroll();
    window.addEventListener("scroll", function(){
        membersScroll();
    });
})();

function buildMember(member){
    let memberItem = document.createElement("div");
    memberItem.classList.add("member-item");
    let pictureContainer = document.createElement("div");
    pictureContainer.classList.add("member-item-picture-container");
    let img = document.createElement("img");
    img.src = "/public/assets/images/members/"+member.picture;

    pictureContainer.appendChild(img);
    memberItem.appendChild(pictureContainer);

    let name = document.createElement("div");
    name.classList.add("member-item-name");
    name.appendChild(document.createTextNode(member.name));
    memberItem.appendChild(name);

    if(member.links.length > 0){
        let linksContainer = document.createElement("div");
        linksContainer.id = "member-links-container";
        for(let i = 0;i<member.links.length;i++){
            let link = document.createElement("a");
            link.classList.add("popup-link");
            link.href = member.links[i].link;
            link.target = "_blank";
            let pic = document.createElement("img");
            pic.classList.add("popup-link-picture");
            pic.src = "/public/assets/images/icons/links/"+member.links[i].logo;
            link.appendChild(pic);
            let div = document.createElement("div");
            div.classList.add("infobulle-bottom");
            div.appendChild(document.createTextNode(member.links[i].name));
            link.appendChild(div);
            linksContainer.appendChild(link);
        }
        memberItem.appendChild(linksContainer);
    }

    membersContainer.appendChild(memberItem);
}

function membersScroll(){
    if(window.pageYOffset >= (membersDisplayOffset-(window.innerHeight/2)) && membersLoaded === false) {
        membersLoaded = true;
        displayOneAfterOther(document.querySelectorAll(".member-item"), "opacityShow 0.4s linear forwards", 0.4, true, false);
    }
}
