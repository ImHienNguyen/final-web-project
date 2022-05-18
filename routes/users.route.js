var express = require('express');
var router = express.Router();

const { resetPasswordGet, requestOtpToMail, sendOtp, sendOtpPost,changePassGet, changePassPost, resendOtpPost } = require('../controllers/users.controller');
const { changePassValidator,requestOtpToMailValidator } = require('../validations/account');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.get('/login',function (req, res, next) {
  res.render('account/login',{title: 'Login'});
})

router.get('/account/resetpassword', resetPasswordGet)
router.post('/account/resetpassword',requestOtpToMailValidator, requestOtpToMail)

router.get('/account/resetpassword/sendOtp', sendOtp)
router.post('/account/resetpassword/sendOtpPost', sendOtpPost)

router.get('/account/resetpassword/changepassword',changePassGet);
router.post('/account/resetpassword/changepassword',changePassPost);

router.post('/account/resetpassword/resendOtpPost', resendOtpPost)


module.exports = router;
