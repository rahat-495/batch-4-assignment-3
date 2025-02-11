
export type TUser = {
    name : string ,
    email : string ,
    password : string ,
    role ?: "admin" | "user" ,
    isBlocked ?: boolean ,
}

export type TUserRole = "admin" | "user" ;
