const mongoose = require('mongoose');

// User schema

  const botUserSchema =  new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true, unique:true },
    email: { type: String, required: true },
    planLeave: { type: Number, default: 0 },
    sickLeave: { type: Number, default: 0 },
    planLeaveBalance: { type: Number, default: 0 },
    sickLeaveBalance: { type: Number, default: 0 },
    totalLeaveBalance: { type: Number, default: 0 }
  });
  
  
 // Virtual property for calculating total leave balance
 botUserSchema.pre('save', function (next) {
  this.totalLeaveBalance = this.planLeaveBalance + this.sickLeaveBalance;
  next();
});

const BotUserDemo = mongoose.model('botuserdemo', botUserSchema);
  module.exports =BotUserDemo