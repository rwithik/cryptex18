var User = require('../models/user');
var answer = require('../../config/answer');
var level = require('../../config/level_routes')
module.exports = function(app, passport){
	app.get('/', function(req, res){

		res.render('index.ejs');

	});
	app.get('/hackerman',function(req,res){
		res.render('hackerman.ejs')
	})

	app.get('/banned',function(req,res){
		res.render('banned.ejs')
	})

	app.get('/completeProfile', isLoggedIn, function(req, res){
		console.log(req.user);
		if(req.user.college === "None" || req.user.college === null)
				res.render('details.ejs',{ user:req.user });
			else
		res.redirect('/levels')
 		});

 	app.post('/updateCollege',(req,res)=>{
		var collegename = req.body.college;
		//res.send(collegename);
		console.log("hello"+req.body.college);
		//console.log(JSON.stringify(req.user));
		User.findOneAndUpdate({"auth.id": req.user.auth.id}, { $set:{"college": collegename , "phone_number":req.body.phone }},{new:true}, function(err,doc){
			if(err)
				return err;
		})

		res.redirect('/levels');
});

	app.get('/auth/facebook', passport.authenticate('facebook', {scope: ['profile','email']}));

	app.get('/auth/facebook/callback',
	  passport.authenticate('facebook', { successRedirect: '/profile', failureRedirect: '/' }));

	app.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));

	app.get('/auth/google/callback',
	  passport.authenticate('google', { successRedirect: '/completeProfile', failureRedirect: '/' }));

	app.get('/connect/facebook', passport.authorize('facebook', { scope: 'email' }));

	app.get('/connect/google', passport.authorize('google', { scope: ['profile', 'email'] }));


	app.get('/logout', function(req, res){
	req.logout();
	res.redirect('/');
	});

	app.get('/levels',isLoggedIn,function(req,res){

	res.render('user.ejs',{ user:req.user })
	});

app.get('/leaderboard',function(req,res){
	User.find({}).sort({'unlocked': -1, 'timestamp': 1}).exec(function(err, docs){
		res.render('leaderboard.ejs',{ doc:docs , user:req.user })
	})
})

app.get('/rules', function(req, res){
		res.render('rules.ejs');
		});

app.get('/profile', function(req, res){
		res.render('profile.ejs');
		});

app.get('/shanku',isLoggedIn,(req,res)=>{
	if(req.user.user_access === 1)
		{
			User.find({}).sort({'unlocked': -1, 'timestamp': 1}).exec(function(err, docs){
				res.render('admin_dashboard.ejs',{ doc:docs , user:req.user })
			});
		}
		else {
			res.send('404!')
		}
})

app.get('/kozhi',isLoggedIn,(req,res)=>{
	if(req.user.user_access === 1)
		{
				res.render('update_access.ejs',{ user:req.user })
		}
		else {
			res.send('404!')
		}
})

app.get('/mathew',isLoggedIn,(req,res)=>{
	if(req.user.user_access === 1)
		{  User.findOneAndUpdate({'auth.id': req.query.id}, { user_access: req.query.access }, function(err,doc){
			if(err)
				return err;
				else
				res.redirect('/shanku');

})
		}
		else {
			res.send('404!')
		}
})

	app.get('/checkAnswer',function(req,res){
		var ans= req.query.answers;
		var key= req.user.present_level;
		 if(ans === answer.keys[key]){
			//console.log("Here")

			 if(req.user.present_level === req.user.unlocked)
			  	{
					  var date = new Date();
						User.findOneAndUpdate({'auth.id': req.user.auth.id}, {unlocked: req.user.unlocked+1,present_level: req.user.present_level+1, timestamp: date}, function(err,docs){
							if(err)
								return err;
						})
					}
					User.findOneAndUpdate({'auth.id': req.user.auth.id}, { present_level: req.user.present_level+1 }, function(err,docs){
						if(err)
							return err;
					})
					if(req.user.present_level === 0){
						res.redirect('/level1')
					}
					else{

					var red = level.routes[req.user.present_level+1];
					console.log(red);
					res.redirect(red);
				}
			}
			else {
				console.log(req.user.present_level)

				res.redirect(level.routes[req.user.present_level])
			}

	})

};



function isLoggedIn(req, res, next) {
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect('/');
}
