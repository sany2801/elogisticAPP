import "./App.css";
// import "../src/MediaWrapper.css"
import { Routes, Route } from "react-router-dom";
import SignInPage from "./layauts/SignInPage";
import RegisterPage from "./layauts/RegisterPage";
import PasswordResetPage from "./layauts/PasswordResetPage";
import PasswordCreatePage from "./layauts/PasswordCreatePage";
import VerifyEmail from "./layauts/VerifyEmail/VerifyEmail";
import WelcomScreen from "./layauts/WelcomScreen/WelcomScreen";
import NotFound from "./pages/404/NotFound";
import RequireAuth from "./components/RequireAuth/RequireAuth";
import Profile from "./layauts/Profile/Profile";
import Shipments from "./layauts/Shipments/Shipments";
import SenderDetails from "./components/SenderDetails/SenderDetails";
import LoginPage from "./pages/LoginPage/LoginPage";
import Accounts from "./pages/Accounts/Account";
import Home from "./pages/Home/Home";
import Order from "./pages/Order/Order";
import RecipeDetails from "./components/RecipeDetails/RecipeDetails";
import AddParcel from "./components/AddParcel/AddParcel";
import Confirmation from "./components/Confirmation/Confirmation";
import PaymentHistory from "./layauts/PaymentHistory/PaymentHistory";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />}>
        <Route index element={<SignInPage />} />
        <Route path="regist" element={<RegisterPage />} />
        <Route path="password-reset" element={<PasswordResetPage />} />
      </Route>

      <Route path="accounts" element={<Accounts />}>
        <Route
          path="userInfo"
          element={
            <RequireAuth>
              <WelcomScreen />
            </RequireAuth>
          }
        ></Route>
        <Route path="verify-Email" element={<VerifyEmail />} />
        <Route
          path="password_reset_confirm/:MQ/:token"
          element={<PasswordCreatePage />}
        />
      </Route>

      <Route
        path="/home"
        element={
          <RequireAuth>
            <Home />
          </RequireAuth>
        }
      >
        <Route index path="shipments" element={<Shipments />}></Route>
        <Route path="items" element={<h1>Items</h1>}></Route>
        <Route path="spaces" element={<h1>Spaces</h1>}></Route>
        <Route path="notifications" element={<h1>Notifications</h1>}></Route>
        <Route path="history" element={<PaymentHistory />}></Route>
        <Route path="support" element={<h1>support</h1>}></Route>
        <Route path="profile" element={<Profile />}></Route>
      </Route>

      <Route
        path="/order"
        element={
          <RequireAuth>
            <Order />
          </RequireAuth>
        }
      >
        <Route index path="sender_details" element={<SenderDetails />}></Route>
        <Route path="beneficiary" element={<RecipeDetails />}></Route>
        <Route path="add_parcel" element={<AddParcel />}></Route>
        <Route path="confirmation" element={<Confirmation />}></Route>
      </Route>

      <Route path="*" element={<NotFound />}></Route>
    </Routes>
  );
}

export default App;
