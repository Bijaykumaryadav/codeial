module.exports.user_profile = function(req,res){
    return res.render('user_profile',{
        title: "Profile"
    });
}

//user the sign up page
module.exports.signUp = function(req,res){
    return res.render('user_sign_up',{
        title: "Codeial | Sign Up"
    })
}

//user the sign in page
module.exports.signin = function(req,res){
    return res.render('user_sign_in',{
        title: "Codeial | Sign In"
    })
}

//get the signup data 
module.exports.create = function(req,res){
    //TODO later
}
//sign in and create the session for the user 
module.exports.createSession = function(req,res){
    // TODO later
}