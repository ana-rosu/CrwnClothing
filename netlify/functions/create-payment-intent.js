//js files built during the build step to create the correct resources to serve my functions
require("dotenv").config();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

exports.handler = async (event) => {
    try {
        const {amount} = JSON.parse(event.body);
        // request to Stripe server
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: "usd",
            payment_method_types: ["card"]
        });

        return {
            statusCode: 200,
            body: JSON.stringify({paymentIntent})
        }
    }
    catch(err){
        console.log(err);

        return {
            statusCode: 400,
            body: JSON.stringify({err})
        }
    }
}