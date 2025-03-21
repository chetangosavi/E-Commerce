export const registerFormControlls = [

    {
        name:'name',
        label:'Name',
        placeholder:'Enter Your Name',
        contentType:'input',
        type:'text',
    },
    {
        name:'email',
        label:'Email',
        placeholder:'Enter Your Email',
        contentType:'email',
        type:'email',
    },
    {
        name:'password',
        label:'Password',
        placeholder:'Enter Your Password',
        contentType:'password',
        type:'password',
    },
]

export const loginFormControlls = [
    {
        name:'email',
        label:'Email',
        placeholder:'Enter Your Email',
        contentType:'email',
        type:'email',
    },
    {
        name:'password',
        label:'Password',
        placeholder:'Enter Your Password',
        contentType:'password',
        type:'password',
    },
]

export const adminSidebarMenuItems = [
    {
        id:'dashboard',
        label:'Dashboard',
        path:'/admin/dashboard'
    },
    {
        id:'products',
        label:'Products',
        path:'/admin/products'
    },
    {
        id:'orders',
        label:'Orders',
        path:'/admin/orders'
    },
]