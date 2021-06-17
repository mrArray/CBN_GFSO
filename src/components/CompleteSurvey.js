
import { useState, useEffect } from 'react';
import FormElement from './FormElement';
import { FormContext } from './FormContext';
import Header from './Header';
import Footer from './Footer'
import Menu from "./Menu";
import axios from 'axios'




//hey i will use react hook here
function CompleteSurvey() {


  const [Get_Survey_Details, Set_Survey_Details] = useState({});

  // Call_Survey_Details form localStorage
  const SingleSurvey = JSON.parse(localStorage.getItem('SingleSurvey'));
  const Call_Survey_Details = SingleSurvey.form;


  useEffect(() => {
    Set_Survey_Details(Call_Survey_Details)
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault();
    

    //get the user from the localstorage
    const mytoken = JSON.parse(localStorage.getItem('user'));
    const token = mytoken.token;

    //get single survey details
    const SingleSurvey = JSON.parse(localStorage.getItem('SingleSurvey'));

    //get the survey Pk  to send as require survey_pk
    const SingleSurveyPk = SingleSurvey.pk

    //Save all user responses of the survey  to LocalStorage
    const to_Send = JSON.parse(localStorage.getItem('Response_to_Send'))

    // returns an array of a given object's own enumerable property values
    const I_to_Send = Object.values(to_Send);

    //Response Body to send to Mallam Ahmad
    const Responsebody =
    {
      survey_pk: SingleSurveyPk,
      form: I_to_Send
    }

    console.log(Responsebody);

    axios.post("https://gfso.chinikiguard.com/survey/api/create/response/", Responsebody,
      {
        headers:
        {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`,
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET,POST,HEAD,OPTIONS',
          'Access-Control-Allow-Credentials': true
        },
      })
      .then(res => {
        if (res.data) {
          localStorage.setItem("Response_Success", JSON.stringify(res.data));
        }
        console.log(res.data)
        window.location = "/AvailableSurvey"
      })

    // console.log(Get_Survey_Details)
  }


  //this handle the change user typing
  const handleChange = (id, event) => {

    const newElements = { ...Get_Survey_Details }
    const arr = [...Get_Survey_Details];


    //convert the categories objects to array
    for (let n = 0; n < newElements.length; n++) {
      arr.push(newElements[n]);
    }

    //first array to loop through the categories
    for (let i = 0; i < arr.length; i++) {
      const category = arr[i];

      //second array to loop through the field
      for (let j = 0; j < category.fields.length; j++) {
        const field = category.fields[j];

        //check the pk for each field
        const { pk } = field;
        if (id === pk) {
          field['value'] = event.target.value;
        }
      }
    }

    //Save the result to the localStorage
    localStorage.setItem("Response_to_Send", JSON.stringify(Get_Survey_Details));
  }

  return (

    <FormContext.Provider value={{ handleChange }}>
      <Header />
      <div className="content-wrapper" style={{ minHeight: 1602 }}>
        <Menu /><br />
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              {/* left column */}
              <div className="col-md-12">
                <center><h2 class="mt-4 mb-2">{SingleSurvey.title}</h2></center>
                {Call_Survey_Details.map(myfield => (
                  <div className="card card-">
                    <div className="card-header">
                      <h3 className="card-title">{myfield.name}</h3>
                    </div>
                    <div className="card-body">
                      <h6 className="">{myfield.type}</h6>
                        <div className="row">
                          {
                            myfield.fields.map((field, i) => <FormElement key={i} field={field} />)
                          }
                        </div>
                    </div>
                    {/* /.card-body */}
                  </div>
                ))}

                    <div className="card-body">
                      <h6 className=""></h6>
                        <button type="submit" className="btn btn-primary btn-lg float-right" onClick={(e) => handleSubmit(e)} >Submit</button>

                    </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer/>
    </FormContext.Provider>
  );
}

export default CompleteSurvey;

