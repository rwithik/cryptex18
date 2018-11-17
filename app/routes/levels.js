var User = require('../models/user');
var level_global;
module.exports = function(app, passport){

app.get('/level0',isLoggedIn,function(req,res){
  isValid(req,res,0)
})

app.get('/level1',isLoggedIn,function(req,res){
  isValid(req,res,1)
});

app.get('/level2',isLoggedIn,function(req,res){
isValid(req,res,2)

});
app.get('/level3',isLoggedIn,function(req,res){
isValid(req,res,3)

});
app.get('/level4',isLoggedIn,function(req,res){
isValid(req,res,4)

});
app.get('/level5',isLoggedIn,function(req,res){
isValid(req,res,5)

});
app.get('/level6',isLoggedIn,function(req,res){
isValid(req,res,6)

});
app.get('/level7',isLoggedIn,function(req,res){
isValid(req,res,7)

});
app.get('/level8',isLoggedIn,function(req,res){
isValid(req,res,8)

});
app.get('/level9',isLoggedIn,function(req,res){
isValid(req,res,9)

});
app.get('/level10',isLoggedIn,function(req,res){
isValid(req,res,10)

});
app.get('/level11',isLoggedIn,function(req,res){
isValid(req,res,11)

});
app.get('/level12',isLoggedIn,function(req,res){
isValid(req,res,12)

});
app.get('/level13',isLoggedIn,function(req,res){
isValid(req,res,13)

});
app.get('/level14',isLoggedIn,function(req,res){
isValid(req,res,14)

});
app.get('/level15',isLoggedIn,function(req,res){
isValid(req,res,15)

});
app.get('/level16',isLoggedIn,function(req,res){
  isValid(req,res,16)
  
  });
  

  app.get('/level17',isLoggedIn,function(req,res){
    isValid(req,res,17)
    
    });
    
    app.get('/level18',isLoggedIn,function(req,res){
      isValid(req,res,18)
      
      });
      app.get('/level19',isLoggedIn,function(req,res){
        isValid(req,res,19)
        
        });
        app.get('/level20',isLoggedIn,function(req,res){
          isValid(req,res,20)
          
          });
          app.get('/level21',isLoggedIn,function(req,res){
            isValid(req,res,21)
            
            });
                                    

}
function isLoggedIn(req, res, next) {
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect('/');
}




function isValid(req,res,x) {
if(req.user.user_access != -1) {
  if(x<=req.user.unlocked){
    var red= './levels/level'+x;
    User.findOneAndUpdate({'auth.id': req.user.auth.id}, { present_level: x }, function(err,docs){
      if(err)
        return err;
    })
    res.render(red);
  }
  else {
    res.redirect('/hackerman')
  }
}
else {
res.redirect('/banned')
}


}
