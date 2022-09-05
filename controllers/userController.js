const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const passport = require('passport')

function userController() {
    return{
        index(req, res) {
            res.send("Hii from the home page!")
        },

        login(req, res) {
            res.send("Hii from the login page!")
        },

        register(req, res) {
            res.send("Hii from the register page!")
        },

        postLogin(req, res, next) {

            passport.authenticate('local', (err, user, info)=> {
                if(err){
                    res.status(400).json({message: err.message})
                    return next(err)
                }
                if(!user){
                    res.status(400).json({message: info.message})
                    return res.redirect('/login')
                }
                req.logIn(user, (err)=>{
                    if(err){
                        res.status(400).json({message: info.message})
                        return next(err)
                    }
                    // res.send('LoggedIn!')
                    res.status(200).json(user)
                    console.log(user)

                })
            })(req, res, next) 
        },

        async postRegister(req, res) {
            const{ name, email, password } = req.body

            console.log(req.body)

            // Making password encrypted
            const hashedPassword = bcrypt.hashSync(password, 10);

            // Creating a new user
            const newUser = new User({
                name,               // name: name,
                email,              // email: email,
                password: hashedPassword
            })
            

            try {
                const user = await newUser.save();
                res.status(200).json(user)
                console.log(user)
        
            }
            catch (error) {
                res.status(400).json({message: error.message})
            }
        },

        logout(req, res) {
            req.logout(function(err) {
                if (err) { return next(err); }
                res.redirect('/register');
            });
        },

        dashboard(req, res) {
            res.send("Hii from the login dashboard!")
        },
    }
}

module.exports = userController;