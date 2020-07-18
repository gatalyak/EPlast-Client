import React, {FC} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import DecisionTable from './pages/DecisionTable/DecisionTable';
import './App.less';
import HeaderContainer from './components/Header/HeaderContainer';
import Home from './pages/Home/Home';
import FooterContainer from './components/Footer/FooterContainer';
import PrivateLayout from './components/PrivateLayout/PrivateLayout';
import RouteWithLayout from './RouteWithLayout';
import Contacts from "./pages/Contacts/Contacts";
import Cities from "./pages/Cities/Cities";
import City from "./pages/City/City";
import SignUp from "./pages/SignUp/SignUp";
import SignIn from "./pages/SignIn/SignIn";
import EventInfo from './pages/Actions/ActionEvent/EventInfo/EventInfo';
import EventCreate from './pages/Actions/ActionEvent/EventCreate/EventCreate';
import Notifications from './pages/Notifications/Notifications';
import Actions from "./pages/Actions/Actions";
import ActionEvent from './pages/Actions/ActionEvent/ActionEvent';
import UserProfile from './pages/userPage/personalData/PersonalData';
import CreateCity from "./pages/CreateCity/CreateCity";
import Clubs from "./pages/Clubs/Clubs";
import Club from "./pages/Club/Club";
import CreateClub from "./pages/CreateClub/CreateClub";
import ActionsCategories from './pages/Actions/ActionsCategories';

const App: FC = () => (
    <div className="App">
      <Router>
        <HeaderContainer/>
        <div className="mainContent">
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/contacts" component={Contacts}/>
            <Route path="/signup" component={SignUp}/>
            <Route path="/signin" component={SignIn}/>
            <Route path="/notification" component={Notifications} />
            <RouteWithLayout
                layout={PrivateLayout}
                path="/userpage/:specify"
                component={UserProfile}
            />
            <RouteWithLayout
                layout={PrivateLayout}
                path="/decisions"
                component={DecisionTable}
            />
            <RouteWithLayout layout={PrivateLayout} exact path="/cities" component={Cities}/>
            <RouteWithLayout layout={PrivateLayout} exact path="/cities/new" component={CreateCity}/>
            <RouteWithLayout layout={PrivateLayout} exact path="/cities/:id" component={City}/>
            <RouteWithLayout layout={PrivateLayout} exact path="/clubs" component={Clubs}/>
            <RouteWithLayout layout={PrivateLayout} exact path="/clubs/new" component={CreateClub}/>
            <RouteWithLayout layout={PrivateLayout} exact path="/clubs/:id" component={Club}/>
            <RouteWithLayout layout={PrivateLayout} exact path="/actions" component={Actions}/>
            <RouteWithLayout layout={PrivateLayout} exact path="/categories/:id" component={ActionsCategories}/>
            <RouteWithLayout layout={PrivateLayout} exact path="/categories/:id/events/:id" component={ActionEvent} />
            <RouteWithLayout layout={PrivateLayout} exact path="/Events/:id/details" component={EventInfo} />
            <RouteWithLayout layout={PrivateLayout} exact path="/actions/eventCreate" component={EventCreate} />
          </Switch>
        </div>
        <FooterContainer/>
      </Router>
    </div>
);

export default App;
