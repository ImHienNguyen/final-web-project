var express = require('express');
var router = express.Router();

const { PostDeposit,sendOtp, getDeposit, getUserInfo,getUserInfomation,sendOtpPost,getSuccessDeposit,getPendingDeposit } = require('../controllers/deposit.controller');
const { validatorPostDeposit } = require('../validations/deposit')

router.get('/', getDeposit)

router.post('/',validatorPostDeposit,PostDeposit);

router.get('/info', getUserInfo)
router.post('/info', getUserInfomation)

router.get('/sendOtp', sendOtp)

router.post('/sendOtp',sendOtpPost)

router.get('/successDeposit',getSuccessDeposit)

router.get('/pendingDeposit',getPendingDeposit)

module.exports = router;
