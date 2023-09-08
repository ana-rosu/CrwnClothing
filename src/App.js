import { Routes, Route } from "react-router-dom";
import Navigation from "./routes/navigation/navigation.component";
import Home from "./routes/home/home.component";
import SignIn from "./routes/signin/signin.component";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="/shop" element={<h1>Hei</h1>} />
        <Route path="/signin" element={<SignIn />} />
      </Route>
    </Routes>
  );
};

export default App;
