class Language{
    constructor(name, logo){
        this.name = name;
        this.logo = logo;
    }
}

class Link{
    constructor(name, logo, link){
        this.name = name;
        this.logo = logo;
        this.link = link;
    }
}

class Project{
    constructor(name, logo, description, languages, links, backgroundColor, members, date){
        this.name = name;
        this.description = description;
        this.languages = languages;
        this.logo = logo;
        this.links = links;
        this.backgroundColor = backgroundColor;
        this.members = members;
        this.date = date;
    }
}

class Member{
    constructor(name, picture, links){
        this.name = name;
        this.picture = picture;
        this.links = links;
    }
}

const LANGUAGES_ENUM = {
    JAVA: new Language("Java", "java.png"),
    PHP: new Language("PHP", "php.png"),
    MYSQL: new Language("MySQL", "mysql.png"),
    JAVASCRIPT : new Language("JavaScript", "javascript.png"),
    ANDROID : new Language("Android", "android.png"),
    JQUERY : new Language("jQuery", "jquery.png")
};

const LINKS_LOGO_ENUM = {
    GOOGLE_PLAY : "googleplay.png",
    WEBSITE : "website.png",
    FACEBOOK : "facebook.png",
    TWITTER : "twitter.png",
    FILE : "file.png",
    LINKEDIN : "linkedin.png"
};

