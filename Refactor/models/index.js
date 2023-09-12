const User = require('./User');
const Appointment = require('./Appointment');
const Friends = require('./Friends');

Appointment.hasMany(Friends, {
  foreignKey: 'appointment_id',
});

Friends.belongsTo(Appointment, {
  foreignKey: 'appointment_id',
});

module.exports = { User, Appointment, Friends };
