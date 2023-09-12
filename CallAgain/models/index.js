const User = require('./User');
const Appointment = require('./Appointment');
const Friend = require('./Friend');

Appointment.hasMany(Friend, {
  foreignKey: 'appointment_id',
});

Friend.belongsTo(Appointment, {
  foreignKey: 'appointment_id',
});

module.exports = { User, Appointment, Friend };
