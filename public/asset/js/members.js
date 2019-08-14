let members = [];

(function(){
    members.push(new Member("Damien Montoya", "damien.jpg", [
            new Link("LinkedIn", LINKS_LOGO_ENUM.LINKEDIN, "https://www.linkedin.com/in/damien-montoya/"),
            new Link("Portfolio", LINKS_LOGO_ENUM.WEBSITE, "https://montoyadamien.github.io/")
    ]));

    members.push(new Member("François Rigaut", "francois.jpg", [
        new Link("LinkedIn", LINKS_LOGO_ENUM.LINKEDIN, "https://www.linkedin.com/in/fran%C3%A7ois-rigaut/")
    ]));
})();
