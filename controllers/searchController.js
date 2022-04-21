const {QueryTypes} = require('../utils/database');
const sequelize = require('../utils/database');

exports.search = async (req,res,next) =>  {
    const {genres, tags, moreClicked} = await require('../utils/menus')();
    filtros = false;
    if(Object.keys(req.params).length==2){
        if(req.params.tableName=='generos'){
            sqlQuery = "select * from Genres as g join Books as b on g.idGenres=b.idGenres where g.genres='"+req.params.search+"' and b.statusBook='approved'"; 
            sqlQueryCount = "select count(*) as contagem from Genres as g join Books as b on g.idGenres=b.idGenres where g.genres='"+req.params.search+"' and b.statusBook='approved'"; 
            whatLooking = req.params.search;
            countResult = await sequelize.query(sqlQueryCount,{ type: QueryTypes.SELECT });
        }else{
            sqlQuery = "select * from Genres g join Books b on g.idGenres=b.idGenres left join Books_Tags lt on lt.idBooks=b.idBooks left join Tags t on lt.idTags=t.idTags where t.tags='"+req.params.search+"' and b.statusBook='approved'"; 
            sqlQueryCount = "select count(*) as contagem from Genres g join Books b on g.idGenres=b.idGenres left join Books_Tags lt on lt.idBooks=b.idBooks left join Tags t on lt.idTags=t.idTags where t.tags='"+req.params.search+"' and b.statusBook='approved'"; 
            whatLooking = req.params.search;
            countResult = await sequelize.query(sqlQueryCount,{ type: QueryTypes.SELECT });
        }
    }else{
        sqlQuery = "select * from Genres as g join Books as b on g.idGenres=b.idGenres where b.title like '%"+req.query.search+"%' and b.statusBook='approved'"; 
        sqlQueryCount = "select count(*) as contagem from Genres as g join Books as b on g.idGenres=b.idGenres where b.title like '%"+req.query.search+"%' and b.statusBook='approved'"; 
        whatLooking = req.query.search;
        countResult = await sequelize.query(sqlQueryCount,{ type: QueryTypes.SELECT });
        //console.log(Object.keys(req.query).length);
        filtros = true;
    }
    if(Object.keys(req.query).length==1){
        order = Object.keys(req.query);
        switch(order[0]){
            case "anoPublicacao":
            orderQuery = "order by b.yearPublic desc";
            break;
            case "visitados":
            orderQuery = "order by b.clickedCount desc";
            break;
            case "recentes":
            orderQuery = "order by b.idBooks desc";
            break;
            case "alfabetica": 
            orderQuery = "order by b.title asc";
            break;
            default:
            orderQuery = "";
            break;
      }
      sqlQuery = sqlQuery + orderQuery;
    }

    if(req.query.searchN=="tudo"){
        sqlQuery = "select * from Genres as g join Books as b on g.idGenres=b.idGenres where b.statusBook='approved'"; 
        sqlQueryCount = "select count(*) as contagem from Genres as g join Books as b on g.idGenres=b.idGenres where b.statusBook='approved'"; 
        whatLooking = "todos..."
        countResult = await sequelize.query(sqlQueryCount,{ type: QueryTypes.SELECT });
        //console.log(Object.keys(req.query).length);
        filtros = true;
    }
    
    booksResult = await sequelize.query(sqlQuery,{ type: QueryTypes.SELECT });

    msg = {isThere : false, msg : 'null'}; 
    if(req.query.error=='pass'){
        msg.msg = "Senha incorreta";
        msg.isThere = true;
        msg.style = "error";
    }
    if(req.query.error=='notFound'){
        msg.msg = "Usuario não encontrado";
        msg.isThere = true;
        msg.style = "error";
    }
    if(req.query.error=='alreadyIn'){
        msg.msg = "Usuario já cadastrado";
        msg.isThere = true;
        msg.style = "error";
    } 
    if(!req.session.acesso){
        showLogin = true;
        userLogged = {};
    }else{
        userLogged = {
            idUser : req.session.idUser,
            username : req.session.username,
        }
        showLogin = false;
    }
    
    res.render('search',{genres : genres, tags : tags, moreClicked : moreClicked, books: booksResult, searchName : whatLooking, countResult : countResult, filtros : filtros,showLogin: showLogin});
 

   /*  Genres.findAll({
        where:{
            genres : req.params.search 
        },
        include: [
            { model: Books }
        ]
    }).then(result => {
        res.render('search',{genres : genres, tags : tags, moreClicked : moreClicked, books: result});
    }); */

    /* Books.findAll({
        include: [
            { model: Genres}
        ]
    }).then(result => {
        res.render('search',{genres : genres, tags : tags, moreClicked : moreClicked, books: result});
    });
 */
};