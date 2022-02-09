let projects = [];
let projectsContainer;

let projectsDisplayOffset = 0;
let projectsLoaded = false;

const buildProject = (project) => {
    let item = document.createElement('div');
    item.classList.add('project-item');
    item.style.backgroundColor = '#'+project.backgroundColor;
    let picture = document.createElement('div');
    picture.classList.add('project-item-picture-container');
    let img = document.createElement('img');
    img.classList.add('project-item-picture');
    img.alt = project.name;
    img.src = '/public/assets/images/projects/'+project.logo;
    picture.appendChild(img);
    item.appendChild(picture);

    let membersContainer = document.createElement('div');
    membersContainer.classList.add('project-item-members');

    project.members.forEach((member) => {
        let memberContainer = document.createElement('div');
        memberContainer.classList.add('project-item-member');

        let memberContainerSub = document.createElement('div');
        memberContainerSub.classList.add('project-item-member-container');

        let picture = document.createElement('div');
        picture.classList.add('project-item-member-picture-container');
        let img = document.createElement('img');
        img.alt= member.name;
        img.src = '/public/assets/images/members/'+member.picture;
        picture.appendChild(img);
        memberContainerSub.appendChild(picture);

        memberContainer.appendChild(memberContainerSub);
        let infobulle = document.createElement('div');
        infobulle.classList.add('infobulle-left');
        infobulle.appendChild(document.createTextNode(member.name));
        memberContainer.appendChild(infobulle);
        membersContainer.appendChild(memberContainer);
    });

    let date = document.createElement('div');
    date.classList.add('project-item-date');
    date.appendChild(document.createTextNode(project.date));
    item.appendChild(date);

    let name = document.createElement('div');
    name.classList.add('project-item-name');
    name.appendChild(document.createTextNode(project.name));
    item.appendChild(name);

    item.appendChild(membersContainer);

    projectsContainer.appendChild(item);
    item.addEventListener('click', () => {
        clickOnProject(project);
    });
};

const clickOnProject = (project) => {
    let projectContainer = document.createElement('div');
    projectContainer.id = 'project-fullscreen';

    let projectSubContainer = document.createElement('div');
    projectSubContainer.classList.add('project-popup-sub-container');

    let subContainer = document.createElement('div');
    subContainer.id = 'popup-sub-container';

    let leftContainer = document.createElement('div');
    leftContainer.id = 'popup-left-container';
    let pictureContainer = document.createElement('div');
    pictureContainer.id = 'popup-picture-container';
    pictureContainer.style.backgroundColor = '#'+project.backgroundColor;
    let picture = document.createElement('img');
    picture.alt = project.name;
    picture.src = '/public/assets/images/projects/'+project.logo;
    pictureContainer.appendChild(picture);
    leftContainer.appendChild(pictureContainer);
    let linksContainer = document.createElement('div');
    linksContainer.id = 'popup-links-container';
    for(let i = 0;i<project.links.length;i++){
        let link = document.createElement('a');
        link.classList.add('popup-link');
        link.href = project.links[i].link;
        link.target = '_blank';
        let pic = document.createElement('img');
        pic.alt = project.links[i].name;
        pic.classList.add('popup-link-picture');
        pic.src = '/public/assets/images/icons/links/'+project.links[i].logo;
        link.appendChild(pic);
        let div = document.createElement('div');
        div.classList.add('infobulle-bottom');
        div.appendChild(document.createTextNode(project.links[i].name));
        link.appendChild(div);
        linksContainer.appendChild(link);
    }
    leftContainer.appendChild(linksContainer);

    let membersContainer = document.createElement('div');
    membersContainer.id = 'popup-members-container';
    for(let i = 0;i<project.members.length;i++){
        let link = document.createElement('div');
        link.classList.add('popup-member');
        let subPic = document.createElement('div');
        subPic.classList.add('popup-member-picture-container');
        let pic = document.createElement('img');
        pic.alt = project.members[i].name;
        pic.classList.add('popup-member-picture');
        pic.src = '/public/assets/images/members/'+project.members[i].picture;
        subPic.appendChild(pic);
        link.appendChild(subPic);
        let div = document.createElement('div');
        div.classList.add('infobulle-bottom');
        div.appendChild(document.createTextNode(project.members[i].name));
        link.appendChild(div);
        membersContainer.appendChild(link);
    }
    leftContainer.appendChild(membersContainer);
    subContainer.appendChild(leftContainer);

    let rightContainer = document.createElement('div');
    rightContainer.id = 'popup-right-container';
    let h1 = document.createElement('h1');
    h1.id = 'popup-title';
    h1.appendChild(document.createTextNode(project.name));
    rightContainer.appendChild(h1);
    let textContainer = document.createElement('div');
    textContainer.id = 'popup-text';
    textContainer.innerHTML = project.description;
    rightContainer.appendChild(textContainer);

    let languagesContainer = document.createElement('div');
    languagesContainer.id = 'popup-languages-container';
    for(let i = 0;i<project.languages.length;i++){
        let language = document.createElement('div');
        language.classList.add('popup-language-container');
        let pictureContainer = document.createElement('div');
        pictureContainer.classList.add('popup-language-picture-container');
        let picture = document.createElement('img');
        picture.alt = project.languages[i].name;
        picture.src = '/public/assets/images/icons/languages/'+project.languages[i].logo;
        pictureContainer.appendChild(picture);
        let languageName = document.createElement('div');
        languageName.classList.add('popup-language-name');
        languageName.appendChild(document.createTextNode(project.languages[i].name));
        language.appendChild(pictureContainer);
        language.appendChild(languageName);
        languagesContainer.appendChild(language);
    }
    rightContainer.appendChild(languagesContainer);

    subContainer.appendChild(rightContainer);

    projectSubContainer.appendChild(subContainer);
    projectContainer.appendChild(projectSubContainer);
    document.body.classList.add('overflow-hidden');
    let crossContainer = document.createElement('div');
    crossContainer.id = 'cross-container';
    projectContainer.appendChild(crossContainer);

    crossContainer.addEventListener('click', () => {
        projectContainer.addEventListener('animationend', () => {
            document.body.classList.remove('overflow-hidden');
            projectContainer.remove();
        });
        projectContainer.style.animation = 'projectHide 0.4s cubic-bezier(0.45, 0.57, 0.28, 0.86) forwards';
    });
    document.body.appendChild(projectContainer);
    projectContainer.style.animation = 'projectShow 0.4s cubic-bezier(0.45, 0.57, 0.28, 0.86) forwards';
};

const projectsScroll = () => {
    if(window.scrollY >= (projectsDisplayOffset-(window.innerHeight/2)) && projectsLoaded === false) {
        projectsLoaded = true;
        displayOneAfterOther(document.querySelectorAll('.project-item'), 'opacityShow 0.4s linear forwards', 0.4, true, false);
    }
};

(() => {
    projectsContainer = document.getElementById('projects-container');
    projectsDisplayOffset = projectsAnchor.offsetTop;

    let description;
    description =
        'MyGameDB est une application de gestion de collection de jeux vidéo, de consoles et d\'accessoires administré par mes soins. L\'application android ainsi que la version web ont réuni plus de 20 000 membres. <br /><br />' +
        'L\'application permet d\'ajouter jeux vidéos, consoles et accessoires une fois un profil créé et connecté. Elle permet de gérer toute une collection via différents champs, filtres, fonctions de tri, export de données en pdf..';

    projects.push(
        new Project('MyGameDB', 'mygamedb.png', description,
            [LANGUAGES_ENUM.JAVASCRIPT, LANGUAGES_ENUM.JQUERY, LANGUAGES_ENUM.PHP, LANGUAGES_ENUM.MYSQL, LANGUAGES_ENUM.JAVA, LANGUAGES_ENUM.ANDROID],
            [
                new Link('Facebook', LINKS_LOGO_ENUM.FACEBOOK, 'https://www.facebook.com/MyGameDB/'),
                new Link('Instagram', LINKS_LOGO_ENUM.INSTAGRAM, 'https://www.instagram.com/mygamedb/?hl=fr'),
                new Link('Twitter', LINKS_LOGO_ENUM.TWITTER, 'https://twitter.com/MyGameDB'),
                new Link('Google Play', LINKS_LOGO_ENUM.GOOGLE_PLAY, 'https://play.google.com/store/apps/details?id=gorillabox.mygamedb'),
                new Link('Site web', LINKS_LOGO_ENUM.WEBSITE, 'https://mygamedb.com')
            ],
            '0a868b', [members.montoyad], '2017 - En cours'));

    description =
        'Animals Quest est une application de quiz sur les animaux.<br /><br />' +
        'L\'application possède un système de stockage interne permettant de répondre aux 334 questions présentes.';
    projects.push(
        new Project('Animals Quest', 'animalsquest.png', description,
            [LANGUAGES_ENUM.FLUTTER, LANGUAGES_ENUM.ANDROID],
            [
                new Link('Google Play', LINKS_LOGO_ENUM.GOOGLE_PLAY, 'https://play.google.com/store/apps/details?id=com.questsbox.animals_quest'),
                new Link('Facebook', LINKS_LOGO_ENUM.FACEBOOK, 'https://www.facebook.com/QuestsBox/')
            ], 'eb992d', [members.masias, members.montoyad], '2020 - 2021'));

    description =
        'MyWorkouts est une application android de gestion d\'entrainement de musculation, de crossfit ainsi que de street workout.<br /><br />' +
        'L\'application possède tout un système de gestion d\'entrainement et propose l\'ajout d\'entraînement, le lancement de l\'entraînement, un historique des entraînements, un minuteur lié à un système de notifications...';
    projects.push(
            new Project('MyWorkouts', 'myworkouts.png', description,
                    [LANGUAGES_ENUM.JAVA, LANGUAGES_ENUM.ANDROID],
                    [
                        new Link('Site web', LINKS_LOGO_ENUM.WEBSITE, 'https://gorillabox.github.io/projects/myworkouts/'),
                        new Link('Google Play', LINKS_LOGO_ENUM.GOOGLE_PLAY, 'https://play.google.com/store/apps/details?id=gorillabox.myworkouts')
                    ], '0bcd62',
                    [
                            members.montoyad
                    ],
                    '2017 - 2020'));

    description =
        'MyChess est un jeu d\'échec à deux joueurs jouable directement via un navigateur web <br /><br />' +
        'MyChess ne propose pas de jouer contre un ordinateur, il faut donc être deux pour profiter pleinement du jeu.';
    projects.push(new Project('MyChess', 'mychess.png', description,
        [LANGUAGES_ENUM.JAVASCRIPT],
        [
            new Link('Site web', LINKS_LOGO_ENUM.WEBSITE, '/projects/mychess')
        ],
        '16a085',
        [
            members.montoyad,
            members.rigautf
        ],
        '2019'
    ));

    projects.forEach(buildProject);
    projectsScroll();
    window.addEventListener('scroll', () => {
        projectsScroll();
    });
})();

