const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const exeSchema =new Schema({
    username: { type: String, require: true},
    description: { type: String, require: true},    
    duration: { type: Number, require: true},    
    date: { type: Date, require: true},
      
    },
  {
    timestamps: true,
});

const Exe = mongoose.model('Exe', exeSchema);

module.exports = Exe;
