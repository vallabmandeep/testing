const data = require('../data');




module.exports.index = function(req,res){
    console.log(req.session);
    res.render('index',{
        title: 'MyPortfolio - Vallab',
        layout:'layout'
    });
}

module.exports.indexPofo = function(req,res){
    res.render('home/index',{
        tile:'home',
        // layout:'indexpofolayout'
    });
}


module.exports.projectList = function(req,res) {
    console.log(data.myProjects);
    res.render('project-list',{
        title:'project Lists',

        navProject:true,
        projects:data.myProjects
        
    });
}

module.exports.projectDetail = function(req,res){

    let alias = req.params.alias;
    let index = data.projectIndex[alias];
    // console.log(alias);
    // console.log(data.myProjects[index]);
    res.render('project-detail',{
        title:'Project Detail',
        navProject:true,
        project: data.myProjects[index]
        
    })
}

// contact

module.exports.contactForm = function(req, res){
    res.render('contact',{
        title:'contact',
        // layout:'contactlayout'
        navContact:true
    })
}

// about
module.exports.aboutPofo =function(req,res){
    res.render('about',{
        title:'about',
        navAbout:true
    })
}



module.exports.blogList = function(req,res){

    res.render('blogs',{
        title:'blog',
        navBlog:true
        
    })
}

module.exports.getLogin = function(req,res){
    res.render('login',{
        title:'login',
        layout:'signin-layout'
    })
}


// users information in array list

const users = [{name:'vallab', email:'vallab@gmail.com', password:'123'},
{name:'test', email:'test@t.com', password:'test'}]



module.exports.doLogin = function(req,res){
    let body = req.body;
   

    // here we will checck  the list by filter wheather the entered details are present in array or not when login,if there  it will print
    let usr = users.filter(ele => body.email == ele.email)[0];


    // this if statement will check the details provided in the body ,if user or pswd is wrong it will throw error,if correct it will redirect to admin
    if(usr && usr.password == body.password){
         console.log(body);
        req.session.user = usr;
        res.locals.user = usr;
        req.session.isLoggedIn = true;


        //  res.redirect('/admin/dashboard');
        res.render('admin/dashboard',{
            title:'Dashboard',
            layout:'layout-admin'
        })
    }else {
            res.render('login', {
            title:'Login',
            layout:'signin-layout',
            error:'User credentials not correct'
        })
    }
}

module.exports.getSignup = function(req,res){
    res.render('signup',{
        title:'Create an Account',
        layout:'signin-layout'
    })
}

module.exports.doSignup = function(req,res){
    let body = req.body;
    console.log(body);
    res.redirect('/login');
}

module.exports.admin = (req,res) => {
    console.log(req.session);
    res.render('admin/dashboard',{
        title:'Dashboard',
        layout:'layout-admin'
    })    
}

module.exports.logout =(req,res) => {
    req.session.isLoggedIn = false;
    req.session.user = '';
    res.redirect('/');
}


module.exports.doContact =(req,res) =>{
    let body =req.body;
    console.log(body);
    if(body.name == ''){
        res.status(400).json({message:'Name field is required'});
    }else{
        res.json({message:'contact submittedd successfully' })
    }
}


module.exports.adminProjects = (req,res) => {
    res.render('admin/projects', {
        title:'project-list',
        layout:'layout-admin',
        projects: data.myProjects
    })
}



module.exports.adminProjectDetail = (req,res) =>{
    let alias = req.params.alias;
    let index = data.projectIndex[alias];   
    res.render('admin/projectDetail',{
        title:'Project-detail',
        layout:'layout-admin',
        project:data.myProjects[index]

    })
}