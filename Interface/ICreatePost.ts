export interface MypostVal {
    userId:string,
    body:string,
    title:string,
    id?:number
}
export interface ICreatePost {
    loading:boolean,
    posts:{
        [key:string]:MypostVal
    },
    error:string
}

