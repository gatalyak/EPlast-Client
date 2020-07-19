
export type Gender={
    id:number;
    name:string;
}
export type Work={
    id:number;
    placeOfwork: string;
    position: string;
}
export type Education={
    id:number;
    placeOfStudy: string;
    speciality: string;
}
export type Degree={
    id:number;
    name:string;
}
export type Religion={
    id:number;
    name:string;
}
export   type Nationality={
    id:number;
    name:string;
}
export type User ={
    id:any;
    userProfileID:any;
    firstName: string;
    lastName: string;
    fatherName:string;
    imagePath:string;
    address: string;
    birthday: Date;
    phoneNumber: string;
    gender: Gender;
    nationality: Nationality;
    religion: Religion;
    education: Education;
    degree: Degree;
    work: Work;
}

export  interface Data {
    isUserPlastun:boolean;
    timeToJoinPlast:number;
    user:User;
  }
  export interface Approver{
    id:number;
    user:User;
    userId:string;
    confirmedUser:ConfirmedUser;
}
  export interface ConfirmedUser{
    id:number;
    user:User;
    userId:string;
    approverId:string
    approver:Approver[];
    confirmDate:Date;
    isClubAdmin:boolean;
    isCityAdmin:boolean;
}
  export interface ApproversData{
      user:User;
      confirmedUsers:ConfirmedUser[];
      canApprove:boolean;
      timeToJoinPlast:number;
      clubApprover:ConfirmedUser;
      cityApprover:ConfirmedUser;
      IsUserPlastun:boolean;
      IsUserHeadOfClub:boolean;
      IsUserHeadOfRegion:boolean;
      CurrentUserId:boolean;
  }