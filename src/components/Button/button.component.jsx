import {
  StyledBaseButton,
  StyledGoogleSignInButton,
  StyledInvertedButton,
  StyledButtonSpinner,
} from "./button.styles.jsx";

export const BUTTON_TYPE_CLASSES = {
  base: "base",
  google: "google-sign-in",
  inverted: "inverted",
};

const getButton = (buttonType = BUTTON_TYPE_CLASSES.base) =>
  ({
    [BUTTON_TYPE_CLASSES.base]: StyledBaseButton,
    [BUTTON_TYPE_CLASSES.google]: StyledGoogleSignInButton,
    [BUTTON_TYPE_CLASSES.inverted]: StyledInvertedButton,
  }[buttonType]);

const Button = ({ children, buttonType, isLoading, ...otherProps }) => {
  const CustomButton = getButton(buttonType);
  return <CustomButton disabled={isLoading} {...otherProps}>{isLoading ? <StyledButtonSpinner/> : children}
  </CustomButton>;
};

export default Button;
