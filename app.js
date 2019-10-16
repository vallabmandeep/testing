const  express = require('express');

const hbs = require('hbs');
const session = require('express-session');
hbs.registerPartials(__dirname+'/views/partials');

const errorHandler = require('./middlewares/errorHandler');
const appMiddleware = require('./middlewares/appmiddleware');
const routes = require('./routes/index');
const mongoose = require("mongoose");



const app = express();

app.set('view engine','hbs');

app.set('views',__dirname+'/views');


app.use(appMiddleware.logger);


app.use(express.static(__dirname+'/static'));

app.use(session({
        secret:'my secret',
        saveUninitialized:false,
        resave:false,
        cookie:{ maxAge:1000000 }
}))

app.use(appMiddleware.authenticated);


app.use(express.json());

app.use(express.urlencoded({extended:false}));

app.get('/',routes.index);



app.get('/projects',routes.projectList);

app.get('/contact',routes.contactForm);
app.post('/contact',routes.doContact);
app.get('/about',routes.aboutPofo);

app.get('/projects/:alias',routes.projectDetail);

app.get('/blogs',routes.blogList);
app.get('/login',routes.getLogin);
app.post('/login',routes.doLogin);
app.get('/signup',routes.getSignup);
app.post('/signup',routes.doSignup);
app.get('/logout',routes.logout);

app.get('/admin/dashboard',appMiddleware.authenticate, routes.admin);



app.get('/admin/projects',appMiddleware.authenticate, routes.adminProjects);

app.get('/admin/projects/:alias',appMiddleware.authenticate, routes.adminProjectDetail)


app.get('/home/index',routes.indexPofo);

app.use(errorHandler.notFound);
app.use(errorHandler.handleError);





app.listen(3000, () => console.log("server started on port 3000"));