import {useState} from 'react';
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

import { useSelector } from 'react-redux';
import { selectCartTotal } from '../../store/cart/cart.selector';
import { selectCurrentUser } from '../../store/user/user.selector';

import {BUTTON_TYPE_CLASSES} from '../Button/button.component';

import {PaymentFormContainer, FormContainer, PaymentButton} from './payment-form.styles';

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const amount = useSelector(selectCartTotal);
    const currentUser = useSelector(selectCurrentUser);
    const [isProcessingPayment, setIsProcessingPayment] = useState(false);

    const paymentHandler = async (e) =>{
        e.preventDefault();
        if(!amount){
            alert("The value of the basket must be greater than 0!");
            return;
        } 

        if(!stripe || !elements) return;

        setIsProcessingPayment(true);
        
        //create a stripe payment intent with a serverless netlify functionc
        const response = await fetch("/.netlify/functions/create-payment-intent", {
            method: "post",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({amount: amount * 100})
        });
        const responseData = await response.json();
        console.log(responseData);
        const clientSecret = responseData.paymentIntent.client_secret;
        const paymentResult = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: currentUser ? currentUser.displayName : 'Guest',
                },
            },
        });
        
        setIsProcessingPayment(false);

        if(paymentResult.error){
            alert(paymentResult.error.message);
        }
        else{
            if(paymentResult.paymentIntent.status === "succeeded"){
                alert("Payment Successful")
                elements.getElement(CardElement).clear();
            }
        }
    };

    return (
        <PaymentFormContainer>
            <FormContainer onSubmit={paymentHandler}>
                <h2>Credit Card Payment: </h2>
                <CardElement/>
                <PaymentButton 
                    isLoading={isProcessingPayment}
                    buttonType={BUTTON_TYPE_CLASSES.inverted}>
                Pay now</PaymentButton>
            </FormContainer>
        </PaymentFormContainer>
    );
};

export default PaymentForm;