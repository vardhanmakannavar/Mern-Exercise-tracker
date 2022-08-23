const router = require('express').Router();
let Exe = require('../models/exe.module');

router.route('/').get((req, res) => {
    Exe.find()
      .then(exe => res.json(exe))
      .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);

    const newExe = new Exe({
      username,
      description,
      duration,
      date,
    });

    newExe.save()
      .then(() => res.json('Exercise added!'))
      .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Exe.findById(req.params.id)
      .then(exe => res.json(exe))
      .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Exe.findByIdAndDelete(req.params.res)
      .then(() => res.json('Exercise deleted'))
      .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Exe.findById(req.params.id)
      .then(exe => {
        exe.username = req.body.username;
        exe.description = req.body.description;
        exe.duration = Number(req.body.duration);
        exe.date = Date.parse(req.body.date);

        exe.save()
        .then(() => res.json('Exercise Updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;