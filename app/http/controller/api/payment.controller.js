const { default: axios } = require("axios");
const createHttpError = require("http-errors");
const { StatusCodes } = require("http-status-codes");
const { getUserBasket } = require("../../../graphql/utils");
const { PaymentMoldle } = require("../../../models/peyment");
const { generateInvoiceNumber } = require("../../../utils/function");
const moment = require('moment-jalali');
const controller = require("../controller");
const { UserMoldle } = require("../../../models/users");
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

class Payment extends controller{
    async paymentGateway(req, res, next){
        try {
            const user = req.user;
            const basket = await getUserBasket(user._id);
            if(!basket?.[0]?.paymentDetail?.paymentAmount) throw createHttpError.BadRequest("payment info not founded");
            const zarinpal_request_url = "https://api.zarinpal.com/pg/v4/payment/request.json";
            const paymentGateway = "https://www.zarinpal.com/pg/StartPay";
            const description = "جهت پرداخت دوره و محصول" , amount = 50000;
            const zarinpalOption ={
                merchant_id : process.env.ZARINPAL_MERCHANT_ID,
                amount,
                description ,
                metadata:{
                    mobile: user.phone,
                    email: user?.email || ""
                },
                callback_url: "http://localhost:3000/varify"
            }

            const requestResault = await axios.post(zarinpal_request_url , zarinpalOption).then(resualt => resualt.data);
            const {code ,authority } = requestResault.data;
            await PaymentMoldle.create({
                invoceNumber: generateInvoiceNumber(),
                payDate: moment().format("jYYYYjMMjDD"),
                amount,
                description,
                authority,
                user: user._id,
                verify: false
            })
            if(code == 100 && authority){
                return res.status(StatusCodes.OK).json({
                    code,
                    PaymentGateway: `${paymentGateway}/${authority}`
                })
            }
            throw createHttpError.BadRequest("parametars is incorect");
        } catch (error) {
            next(error)
        }
    }

    async varifyPayment(req, res, next){
        try {
            const {Authority: authority , Status} = req.query;
            const payment = await PaymentMoldle.findOne({authority});
            console.log(payment.user);
            if(!payment) throw createHttpError.NotFound("تراکنش در انتظار پرداخت یافت نشد");
            if(payment.verify) throw createHttpError.BadRequest("این تراکنش قبلا پرداخت شده است");
            const zarinpal_verify_url = "https://api.zarinpal.com/pg/v4/payment/verify.json";
            const verifyBody = JSON.stringify({
                merchant_id: process.env.ZARINPAL_MERCHANT_ID,
                amount: payment.amount,
                authority
            })
            const verifyResualt = await fetch(zarinpal_verify_url , {
                method: "POST",
                headers:{
                    'Content-Type': "application/json"
                },
                body: verifyBody
            }).then(resualt => resualt.json());
            if(verifyResualt.data.code == 100){
                await PaymentMoldle.updateOne({authority} , {
                    $set:{
                        refID: verifyResualt.data.ref_id,
                        cardHash: verifyResualt.data.card_hash,
                        verify: true
                    }
                });
                const user = await UserMoldle.findById(payment.user);
                await UserMoldle.updateOne({_id: payment.user} , {
                    $set:{
                        courses: [...payment?.basket?.paymentDetail?.courseIds || [] , ...user.courses],
                        produ: [...payment?.basket?.paymentDetail?.productIds || [] , ...user.products],
                        basket:{
                            course: [],
                            product: []
                        }
                    }
                })
                return res.status(StatusCodes.OK).json({
                    statusCode: StatusCodes.OK,
                    data:{
                        message: "پرداخت شما با موفقیت انجام شد"
                    }
                });
            }
            throw createHttpError.BadRequest("پرداخت انجام نشد در صورت کسر وجه طی 72 ساعت به حساب شما باز میگردد")
        } catch (error) {
            next(error)
        }
    }
}

module.exports ={
    payment : new Payment()
}