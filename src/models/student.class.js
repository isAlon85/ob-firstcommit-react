export class Student {
    id = 0;
    name = '';
    email = '';
    phone = '';
    country = '';
    location = '';
    mobility = false;
    remote = 0;
    user_id = 0;
    picture = null;
    resume = null;
    tags = [];

    constructor(id, name, email, phone, country, location, mobility, remote, user_id, picture, resume, tags){
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.country = country;
        this.location = location;
        this.mobility = mobility;
        this.remote = remote;
        this.user_id = user_id;
        this.picture = picture;
        if(picture) this.picture.url = this.picture.url.replace("/upload/", "/upload/w_82,h_82/");
        this.resume = resume;
        this.tags = tags;
    }

}