import {
  auth,
  signInWithGooglePopup,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

import SignUpForm from "../../components/SignUpForm/signup-form.component";

const SignIn = () => {
  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
  };
  return (
    <div>
      <h1>Sign In</h1>
      <button onClick={logGoogleUser}> Sign in with Google</button>
      <SignUpForm />
    </div>
  );
};

export default SignIn;

//whenever you navigate away from your website(ex. sign in with google redirecting), you are breaking the instance of the website, and everything is remounting
