import { useState } from "react";

import {
  signInUserEmailPass,
  signInWithGooglePopup,
} from "../../utils/firebase/firebase.utils";
//this UserContext object is going to give us back whatever value is passed in for the value
import FormInput from "../FormInput/form-input.component";
import Button from "../Button/button.component";

import "./signin-form.styles.scss";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const signInWithGoogle = async () => {
    await signInWithGooglePopup();
  };

  const resetFields = () => {
    setFormFields(defaultFormFields);
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await signInUserEmailPass(email, password);

      resetFields();
    } catch (error) {
      if (error.code === "auth/wrong-password") alert("Incorrect password!");
      else if (error.code === "auth/user-not-found")
        alert("No user associated with this email!");
      else console.error(error);
      console.log(error);
    }
  };
  return (
    <div className="sign-in-container">
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>

      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          name="email"
          required
          onChange={handleChange}
          value={email}
        />
        <FormInput
          label="Password"
          type="password"
          name="password"
          required
          onChange={handleChange}
          value={password}
        />
        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button type="button" onClick={signInWithGoogle} buttonType="google">
            Google Sign In
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
