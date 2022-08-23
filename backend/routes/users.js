const router = require('express').Router();
let User = require('../models/user.module');

router.get('/', async(req, res) => {
  console.log(req);
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.post("/add", async (req, res) => {
    const username = req.body.username;
    const newUser = await new User({
        username 
      }).save();
res.json(newUser)

});


module.exports = router;