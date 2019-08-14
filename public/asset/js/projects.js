let projects = [];
let projectsContainer;

(function(){
    projectsContainer = document.getElementById("projects-container");

    let description;

    description =
            "MyGameDB est un site web de gestion de collection de jeux vidéo et de consoles administré par mes soins. <br /><br />" +
            "Le site ainsi que l'application permettent d'ajouter jeux vidéos et consoles une fois un profil créé et connecté. Ils permettent de gérer toute une collection via différents champs et fonctionnalités.<br /><br />" +
            "L'application a été dévéloppée de manière native au système, en Java.";

    projects.push(new Project("MyGameDB", "mygamedb.png", description,
            [LANGUAGES_ENUM.JAVASCRIPT, LANGUAGES_ENUM.JQUERY, LANGUAGES_ENUM.PHP, LANGUAGES_ENUM.MYSQL, LANGUAGES_ENUM.JAVA, LANGUAGES_ENUM.ANDROID],
                [
                        new Link("Facebook", LINKS_LOGO_ENUM.FACEBOOK, "https://www.facebook.com/MyGameDB/"),
                        new Link("Twitter", LINKS_LOGO_ENUM.TWITTER, "https://twitter.com/MyGameDB"),
                        new Link("Google Play", LINKS_LOGO_ENUM.GOOGLE_PLAY, "https://play.google.com/store/apps/details?id=gorillabox.mygamedb"),
                        new Link("Site web", LINKS_LOGO_ENUM.WEBSITE, "https://mygamedb.com")
                        ],
        "1d3e5c",
                [
                            members[0]
                        ],
            "2017 - ?"
            ));

    description =
            "MyWorkouts est une application android de gestion d'entrainement de musculation, de crossfit ainsi que de street workout.<br /><br />" +
            "L'application m'a permis de développer un minuteur lié à un système de notifications ainsi qu'un historique pour les entraînements.";
    projects.push(
            new Project("MyWorkouts", "myworkouts.png", description,
                    [LANGUAGES_ENUM.JAVA, LANGUAGES_ENUM.ANDROID],
                    [
                        new Link("Site web", LINKS_LOGO_ENUM.WEBSITE, "https://gorillabox.github.io/projects/myworkouts/"),
                        new Link("Google Play", LINKS_LOGO_ENUM.GOOGLE_PLAY, "https://play.google.com/store/apps/details?id=gorillabox.myworkouts")
                    ], "0bcd62",
                    [
                            members[0]
                    ],
                    "2017 - 2018"));

    buildProjects();
})();

function buildProjects(){
    for(let i = 0; i<projects.length; i++){
        buildProject(projects[i]);
    }
}

function buildProject(project){
    console.log(project);
    let item = document.createElement("div");
    item.classList.add("project-item");
    item.style.backgroundColor = "#"+project.backgroundColor;
    let picture = document.createElement("div");
    picture.classList.add("project-item-picture-container");
    let img = document.createElement("img");
    img.classList.add("project-item-picture");
    img.alt = "logo";
    img.src = "/public/asset/images/projects/"+project.logo;
    picture.appendChild(img);
    item.appendChild(picture);

    let membersContainer = document.createElement("div");
    membersContainer.classList.add("project-item-members");

    project.members.forEach(function(member){
       let memberContainer = document.createElement("div");
       memberContainer.classList.add("project-item-member");

       let memberContainerSub = document.createElement("div");
       memberContainerSub.classList.add("project-item-member-container");

       let picture = document.createElement("div");
       picture.classList.add("project-item-member-picture-container");
       let img = document.createElement("img");
       img.alt= "picture";
       img.src = "/public/asset/images/members/"+member.picture;
       picture.appendChild(img);
       memberContainerSub.appendChild(picture);

       memberContainer.appendChild(memberContainerSub);
       let infobulle = document.createElement("div");
       infobulle.classList.add("infobulle-left");
       infobulle.appendChild(document.createTextNode(member.name));
       memberContainer.appendChild(infobulle);
       membersContainer.appendChild(memberContainer);
    });

    let date = document.createElement("div");
    date.classList.add("project-item-date");
    date.appendChild(document.createTextNode(project.date));
    item.appendChild(date);

    let name = document.createElement("div");
    name.classList.add("project-item-name");
    name.appendChild(document.createTextNode(project.name));
    item.appendChild(name);

    item.appendChild(membersContainer);

    projectsContainer.appendChild(item);
}
