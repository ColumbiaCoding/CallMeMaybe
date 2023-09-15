const router = require('express').Router();
const { Appointment, Friend } = require('../models');

// GET all appointment for homepage
router.get('/', async (req, res) => {
  try {
    const dbAppointmentData = await Appointment.findAll({
      include: [
        {
          model: Friend,
          attributes: ['filename', 'description'],
        },
      ],
    });

    const appointments = dbAppointmentData.map((appointment) =>
      appointment.get({ plain: true })
    );
    console.log(appointments);
    // Send over the 'loggedIn' session variable to the 'homepage' template
    res.render('homepage', {
      appointments,
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
          model: Friend,
          attributes: [
            'id',
            'title',
            'artist',
            'exhibition_date',
            'filename',
            'description',
          ],
        },
      ],
    });

    const appointment = dbAppointmentData.get({ plain: true });
    // Send over the 'loggedIn' session variable to the 'Appointment' template
    res.render('appointment', { appointment, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET one Friend
router.get('/friend/:id', async (req, res) => {
  try {
    const dbFriendData = await Friend.findByPk(req.params.id);

    const friend = dbFriendData.get({ plain: true });
    // Send over the 'loggedIn' session variable to the 'homepage' template
    res.render('friend', { friend, loggedIn: req.session.loggedIn });
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
