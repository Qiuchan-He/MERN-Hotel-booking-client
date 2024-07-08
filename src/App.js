import Home from "./booking/Home.js"
import Login from "./auth/Login.js"
import Register from "./auth/Register.js";
import Dashboard from "./user/Dashboard.js";
import DashboardSeller from "./user/DashboardSeller.js";
import PrivateRoute from "./components/PrivateRoute.js";
import NewHotel from "./hotels/NewHotel.js";
import EditHotel from "./hotels/EditHotel.js";
import ViewHotel from "./hotels/ViewHotel.js";
import StripeCallback from "./stripe/StripeCallback.js";
import StripeSuccess from "./stripe/StripeSuccess.js";
import StripeCancel from "./stripe/StripeCancel.js";
import SearchResult from "./hotels/SearchResult.js";
import {BrowserRouter,Switch,Route} from "react-router-dom";
import TopNav from "./components/TopNav.js";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function App() {
  return (
    <BrowserRouter >
     <TopNav/>
     <ToastContainer position="top-center" />
     <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <PrivateRoute exact path="/hotel/new" component={NewHotel} />
      <PrivateRoute exact path="/dashboard" component={Dashboard} />
      <PrivateRoute exact path="/dashboard/seller" component={DashboardSeller} />
      <PrivateRoute exact path="/stripe/callback" component={StripeCallback} />
      <PrivateRoute exact path="/hotel/edit/:hotelId" component={EditHotel} />
      <PrivateRoute exact path="/stripe/success/:hotelId" component={StripeSuccess} />
      <PrivateRoute exact path="/stripe/cancel" component={StripeCancel} />
      <Route exact path="/hotel/:hotelId" component={ViewHotel} />
      <Route exact path="/search-result/" component={SearchResult} />
     </Switch>
    </BrowserRouter>
  );
}

export default App;
