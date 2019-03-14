const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const validateProfileInput = require('../../validation/profile');

//Load profile model 
const Profile = require('../../models/Profile');
const User = require('../../models/User');

//@route to get api test
//@desc test post route
//@access Public
router.get('/test', (req, res) => res.json({
    msg: "Profile Works "
}));

//@route GET api/profile
//@desc get current user profile
//@access private
router.get('/', passport.authenticate('jwt', {
    session: false
}), (req, res) => {

    const errors = {};

    Profile.findOne({
            user: req.user.id
        })
        .then(profile => {
            if (!profile) {
                errors.noprofile = 'There is no profile for this user';
                return res.sendStatus(404).json(errors);
            } else {
                res.json(profile);
            }
        })
        .catch(err => res.status(404).json({
            err
        }));


});

//@route POST api/profile/all
//@desc get all
//@access Public

router.get('/all', (req, res) => {
    const errors = {};
    Profile.find()
        .populate('user', ['name', 'avatar'])
        .then(profiles => {
            if (!profiles) {
                errors.noprofile = 'There are no profiles';
                return (res.sendStatus(404).json(errors));
            }
            res.json(profiles);
        })
        .catch(err => res.status(404).json({
            profile: 'There is no profiles'
        }));
    
});

//@route POST api/handle/:handle
//@desc get profile by handle
//@access Public

router.get('/handle/:handle', (req, res) => {
    const errors = {};
    Profile.findOne({
            user: req.params.handle
        })
        .populate('user', ['name', 'avatar'])
        .then(profile => {
            if (!profile) {
                errors.noprofile = 'There is no profile for this user';
                res.sendStatus(404).json(errors);
            }
            res.json(profile);
        })
        .catch(err => res.status(404).json({
            profile: 'There is no profile for this user'
        }));
});

//@route POST api/handle/user/:user_id
//@desc get profile by user_id
//@access Public

router.get('/user/:user_id', (req, res) => {
    const errors = {};
    Profile.findOne({
            user: req.params.user_id
        })
        .populate('user', ['name', 'avatar'])
        .then(profile => {
            if (!profile) {
                errors.noprofile = 'There is no profile for this user';
                res.sendStatus(404).json(errors);
            }
            res.json(profile);
        })
        .catch(err => res.status(404).json({
            profile: 'There is no profile for this user'
        }));
});


//@route POST api/profile
//@desc create/update user profile
//@access private
router.post('/', passport.authenticate('jwt', {
    session: false
}), (req, res) => {

    const {
        errors,
        isValid
    } = validateProfileInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    //Get Fields
    const profileFields = {};
    profileFields.user = req.user.id;

    if (req.body.handle)
        profileFields.handle = req.body.handle;
    if (req.body.company)
        profileFields.company = req.body.company;
    if (req.body.website)
        profileFields.website = req.body.website;
    if (req.body.location)
        profileFields.location = req.body.location;
    if (req.body.bio)
        profileFields.bio = req.body.bio;
    if (req.body.status)
        profileFields.status = req.body.status;
    if (req.body.github)
        profileFields.github = req.body.github;
    if (typeof req.body.skills != 'undefined')
        profileFields.skills = req.body.skills.split(',');

    profileFields.social = {};

    if (req.body.youtube)
        profileFields.social.youtube = req.body.youtube;
    if (req.body.twitter)
        profileFields.social.twitter = req.body.twitter;
    if (req.body.facebook)
        profileFields.social.facebook = req.body.facebook;
    if (req.body.linkedin)
        profileFields.social.linkedin = req.body.linkedin;
    if (req.body.instagram)
        profileFields.social.instagram = req.body.instagram;

    if (req.body.handle)
        profileFields.handle = req.body.handle;

    Profile.findOne({
            user: req.user.id
        })
        .populate('user', ['name', 'avatar'])
        .then(profile => {
            if (profile) { //updating profile
                profile.findOneAndUpdate({
                    user: req.user.id
                }, {
                    $set: profileFields
                }, {
                    new: true
                }).then(profile => res.json(profile));
            } else { //creating profile
                Profile.findOne({
                        handle: profileFields.handle
                    })
                    .then(profile => {
                        if (profile) {
                            errors.handle = 'that handle already exists';
                            res.status(400).json(errors);
                        }
                    })

                new Profile(profileFields).save().then(profile => res.json(profile));
            }
        })

});

module.exports = router;