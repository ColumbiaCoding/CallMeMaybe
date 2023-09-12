const router = require('express').Router();
const { Appointment } = require('../models');
// GET all galleries for homepage
router.get('/', async (req, res) => {
  try {
    const dbAppointmentData = await Appointment.findAll({
      include: [
        {
          model: Friends,
          attributes: ['filename', 'description'],
        },
      ],
    });
    const galleries = dbAppointmentData.map((appointment) =>
      appointment.get({ plain: true })
    );
    // Send over the 'loggedIn' session variable to the 'homepage' template
    res.render('homepage', {
      galleries,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
// GET one Appointment
router.get('/appointment/:id', async (req, res) => {
  try {
    const dbAppointmentData = await Appointment.findByPk(req.params.id, {
      include: [
        {
          model: Friends,
          attributes: [
            'id',
            'title',
            'artist',
            'discussion_date',
            'filename',
            'description',
          ],
        },
      ],
    });
    const appointment = dbAppointmentData.get({ plain: true });
    // Send over the 'loggedIn' session variable to the 'appointment' template
    res.render('appointment', { appointment, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
// GET one Friends
router.get('/friends/:id', async (req, res) => {
  try {
    const dbFriendsData = await Friends.findByPk(req.params.id);
    const friends = dbFriendsData.get({ plain: true });
    // Send over the 'loggedIn' session variable to the 'homepage' template
    res.render('friends', { friends, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
// Login route
router.get('/login', (req, res) => {
  // If the user is already logged in, redirect to the homepage
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  // Otherwise, render the 'login' template
  res.render('login');
});
module.exports = router;