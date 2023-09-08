import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

import SignInForm from "../../components/SignInForm/signin-form.component";
import SignUpForm from "../../components/SignUpForm/signup-form.component";

import "./authentication.styles.scss";

const Authentication = () => {
  return (
    <div className="authentication-container">
      <SignInForm />
      <SignUpForm />
    </div>
  );
};

export default Authentication;

//whenever you navigate away from your website(ex. sign in with google redirecting), you are breaking the instance of the website, and everything is remounting
