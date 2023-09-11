import { useState } from "react";
import {
  createAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";
import FormInput from "../FormInput/form-input.component";
import "./signup-form.styles.scss";
import Button from "../Button/button.component";
// object that allows us to keep track of multiple fields inside of our form
const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );
      user.displayName = displayName;

      resetFormFields();
    } catch (error) {
      if (error.code === "auth/email-already-in-use")
        alert("Cannot create user, email already in use!");
      console.error("User creation encountered an error", error);
    }
  };
  // generic handler function on change
  const handleChange = (event) => {
    const { name, value } = event.target;
    // updating the state of formFields => trigger a re-render of the SignUpForm component with the updated state
    setFormFields({ ...formFields, [name]: value });
    // im using here as an argument an object literal that creates a new object that includes all the properties from the original formFields object, and it overrides the property with the name specified by the "name" variable with the new value.
  };

  return (
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>

      <form onSubmit={handleSubmit}>
        <FormInput
          label="Name"
          type="text"
          required
          onChange={handleChange}
          name="displayName"
          value={displayName}
        />

        <FormInput
          label="Email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />

        <FormInput
          label="Password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />

        <FormInput
          label="Confirm Password"
          type="password"
          required
          onChange={handleChange}
          name="confirmPassword"
          value={confirmPassword}
        />

        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  );
};
export default SignUpForm;
