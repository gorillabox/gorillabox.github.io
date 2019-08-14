let members = [];
let membersContainer;

(function(){
    members.push(new Member("Damien Montoya", "damien.jpg", [
            new Link("LinkedIn", LINKS_LOGO_ENUM.LINKEDIN, "https://www.linkedin.com/in/damien-montoya/"),
            new Link("Portfolio", LINKS_LOGO_ENUM.WEBSITE, "https://montoyadamien.github.io/")
    ]));

    members.push(new Member("François Rigaut", "francois.jpg", [
        new Link("LinkedIn", LINKS_LOGO_ENUM.LINKEDIN, "https://www.linkedin.com/in/fran%C3%A7ois-rigaut/")
    ]));

    membersContainer = document.getElementById("members-container");

    buildMembers();
})();

function buildMembers(){
    members.forEach(buildMember)
}

function buildMember(member){
    console.log(member);
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

    membersContainer.appendChild(memberItem);
}
