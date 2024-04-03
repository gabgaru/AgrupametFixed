class user{
    constructor(name,email,password,phone,isadmin){
        this.Name=name;
        this.Email=email;
        this.Password=password;
        this.PhoneNumber=phone;
        this.isAdmin=isadmin;
    }

}

class student extends user{
    constructor(name,email,password,phone){
        //llamado a clase de usuario
        super(name,email,password,phone,false);
        //comportamiento de estudiante
        this.belongsto=[];
    }
}

export default user;