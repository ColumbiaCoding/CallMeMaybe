const sequelize = require('../config/connection');
const seedAppointment = require('./appointmentData');
const seedFriends = require('./friendData');

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedAppointment();

  await seedFriends();

  process.exit(0);
};

seedAll();
