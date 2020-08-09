export class UserShortDetails
{
    constructor(
            public userId:number,
            public firstName:string,
            public lastName:string
                ){}
}

export class UserDetail
{
    constructor(
        public userId:number,
        public firstName:string,
        public lastName:string,
        public emailId:string,
        public mobileNo:string,
        public dateOfJoining:string,
        public department:string,
        public role:string,
        public isAssetsAssign:string,
        public isDelete:string
    )
    {}
}


