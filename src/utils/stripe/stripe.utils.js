import { loadStripe } from "@stripe/stripe-js";

//load our Stripe instance with my developer publishable key which essentially identifies my app to Stripe
export const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);