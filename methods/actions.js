var User = require('../models/user')
var jwt = require('jwt-simple')
var config = require('../config/dbconfig')
var j_dec = require('jwt-decode')

var functions = {
    addNew: function (req, res) {
        if ((!req.body.name) || (!req.body.password)) {
            res.json({success: false, msg: 'Entrez tous les champs'})
        }
        else {
            var newUser = User({
                name: req.body.name,
                password: req.body.password
            });
            newUser.save(function (err, newUser) {
                if (err) {
                    res.json({success: false, msg: 'Enregistrement échoué'})
                }
                else {
                    res.json({success: true, msg: 'Enregistré avec succès'})
                }
            })
        }
    },
    authenticate: function (req, res) {
        User.findOne({
            name: req.body.name
        }, function (err, user) {
                if (err) throw err
                if (!user) {
                    res.status(403).send({success: false, msg: 'Échec de l\'authentification, utilisateur introuvable'})
                }

                else {
                    user.comparePassword(req.body.password, function (err, isMatch) {
                        if (isMatch && !err) {
                            var token = jwt.encode(user, config.secret)
                            res.json({success: true, token: token})
                        }
                        else {
                            return res.status(403).send({success: false, msg: 'Échec de l\'authentification, mot de passe erroné'})
                        }
                    })
                }
        }
        )
    },
    getinfo: function (req, res) {
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            var token = req.headers.authorization.split(' ')[1]
            var decodedtoken = j_dec(token, config.secret)
            return res.json({success: true, msg: 'Salut ' + decodedtoken.name})
        }
        else {
            return res.json({success: false, msg: 'No Headers'})
        }
    }
}

module.exports = functions