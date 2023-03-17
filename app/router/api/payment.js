const { payment } = require('../../http/controller/api/payment.controller');
const { verifyAccessToken } = require('../../http/middlewares/verifyAccessToken');

const router = require('express').Router();

router.post("/payment" , verifyAccessToken , payment.paymentGateway);
router.get("/varify" , payment.varifyPayment);

module.exports={
    PaymentRoutes : router
}