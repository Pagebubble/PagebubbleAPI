import passport from 'passport';
import {Strategy as FacebookStrategy} from 'passport-facebook';

export function setup(User, config) {
  passport.use(new FacebookStrategy({
    clientID: config.facebook.clientID,
    clientSecret: config.facebook.clientSecret,
    callbackURL: config.facebook.callbackURL,
    profileURL: 'https://graph.facebook.com/v3.2/me',
    profileFields: [
      'displayName',
      'emails',
      'profileUrl',
      'photos',
      'gender'
    ]
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOne({'facebook.id': profile.id}).exec()
      .then(user => {
        if(user) {
          return done(null, user);
        }

        user = new User({
          name: profile.displayName,
          email: profile.emails && profile.emails[0] && profile.emails[0].value,
          profileUrl: profile.profileUrl,
          photo: profile.photos && profile.photos[0] && profile.photos[0].value,
          gender: profile.gender,
          role: 'user',
          provider: 'facebook',
          facebook: profile._json
        });
        user.save()
          .then(savedUser => done(null, savedUser))
          .catch(err => done(err));
      })
      .catch(err => done(err));
  }));
}
