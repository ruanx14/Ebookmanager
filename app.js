const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');

require('dotenv').config()
const sequelize = require('./utils/database');

const book = require('./models/Books');
const genres = require ('./models/Genres');
const user = require ('./models/Users');
const comment = require ('./models/Comments');
const manager = require ('./models/Managers');
const review = require ('./models/Reviews');
//Criação das tabelas
const tag = require ('./models/Tags');
const books_tags = require ('./models/Books_Tags');
const Highlights = require ('./models/Highlights');

const app = express();

const multer  = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (file.fieldname === 'bookName') {
            destinationPath = './views/user-panel/epubs';
          } else if (file.fieldname === 'pathCover') {
            destinationPath = './public/img/capes';
          }
        cb(null,destinationPath)
    },
    filename: function (req, file, cb) {
        const extensaoArquivo = file.originalname.split('.')[1];
        const novoNomeArquivo = require('crypto')
            .randomBytes(64)
            .toString('hex');
        cb(null, novoNomeArquivo+"."+extensaoArquivo);
    }
});
const upload = multer({ storage });

const uploadFields = upload.fields([{ name: 'bookName', maxCount: 1 }, { name: 'pathCover', maxCount: 1 }]);

const oneDay = 1000 * 60 * 60 * 24;

app.set('view engine','ejs');
app.set("views","./views");
var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(session({
    secret: 'cats are cute',
    saveUninitialized: true,  
    cookie: { maxAge: oneDay },
    resave: false
}));


const index = require('./routes/index');
app.use(urlencodedParser,index);  
const bookRoute = require('./routes/book');
app.use(urlencodedParser,bookRoute);  
const searchRoutes = require('./routes/search');
app.use(searchRoutes);
const managerRoutes = require('./routes/manager');
app.use(urlencodedParser, uploadFields, managerRoutes);
const panelRoutes = require('./routes/panel');
app.use(urlencodedParser,panelRoutes);
//app.use(express.json());   // => 4.6 version body-parser

app.use(express.static(path.join(__dirname,'public'))); 
app.use(express.urlencoded({extended: false})); 

//genres.associate(book);
//book.associate(genres);
//references criado direto no Model, mas com esse método posso associar
book.belongsTo(genres,{foreignKey : 'idGenres'});
genres.hasOne(book,{foreignKey : 'idGenres'});

book.belongsTo(user,{foreignKey : 'idUsers'});
user.hasOne(book,{foreignKey : 'idUsers'});
 
comment.belongsTo(user,{foreignKey : 'idUsers'});
user.hasOne(comment,{foreignKey : 'idUsers'});

//comentário pertence a um livro, e o livro tem um comentário.
comment.belongsTo(book,{foreignKey : 'idBooks'});
book.hasOne(comment,{foreignKey:'idBooks'});

manager.belongsTo(user,{foreignKey : 'idUsers'});
user.hasOne(manager,{foreignKey:'idUsers'});

review.belongsTo(user,{foreignKey : 'idUsers'});
user.hasOne(review,{foreignKey: 'idUsers'})
review.belongsTo(book,{foreignKey : 'idBooks'});
book.hasOne(review,{foreignKey:'idBooks'});
 
port = process.env.PORT || 3000;

sequelize.sync();

app.listen(port, () => {
    console.log(port);
});