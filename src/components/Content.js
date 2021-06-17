import React from 'react'
import { Switch, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import Login from './Login';
import Landing from './Landing';
// import { FormBuilder } from './FormBuilder';
import ViewSurvey from './ViewSurvey';
import CompleteSurvey from './CompleteSurvey';
import CreateNewUser from './CreateNewUser';
import EditTemplate from './EditTemplate';
import Surveys from './Surveys';
import AvailableSurvey from './AvailableSurvey';
import CategoryView from './CategoryView';






const  Content = () => {
    return (
       <Switch>
           <Route exact path="/" component={Landing}/>
           <Route  path="/landing" component={Landing}/>


           <Route exact path="/" component={Login}/>
           <Route  path="/login" component={Login}/>

 
           <Route exact path="/" component={Dashboard}/>
           <Route  path="/dashboard" component={Dashboard}/>

          
           {/* <Route exact path="/" component={FormBuilder}/>
           <Route  path="/FormBuilder" component={FormBuilder}/>

           */}
           <Route exact path="/" component={ViewSurvey}/>
           <Route  path="/ViewSurvey" component={ViewSurvey}/>
           
           <Route exact path="/" component={CompleteSurvey}/>
           <Route  path="/CompleteSurvey" component={CompleteSurvey}/>
           
           <Route exact path="/" component={CreateNewUser}/>
           <Route  path="/Register" component={CreateNewUser}/>

          <Route exact path="/" component={EditTemplate}/>
           <Route  path="/EditTemplate" component={EditTemplate}/>
           
           <Route exact path="/" component={Surveys}/>
           <Route  path="/Surveys" component={Surveys}/>
           
           <Route exact path="/" component={AvailableSurvey}/>
           <Route  path="/AvailableSurvey" component={AvailableSurvey}/>

           
           <Route exact path="/" component={CategoryView}/>
           <Route  path="/CategoryView" component={CategoryView}/>
           
       </Switch>

       
    )
}


export default Content;