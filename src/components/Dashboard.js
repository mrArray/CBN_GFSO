import React, { useState, useEffect } from "react";
import { Line, Bar, Pie, Doughnut, HorizontalBar, Radar } from "react-chartjs-2";
import axios from "axios";
import Spinner from 'react-bootstrap/Spinner'
import { Redirect } from 'react-router-dom';
import Header from "./Header";
import Menu from "./Menu";
import Footer from "./Footer";




const Dashboard = () => {

  const [chartData, setPietData] = useState({});
  const [cspData, setCspData] = useState({});
  const [barchartData, setbarChartData] = useState({});
  const [donutchartData, setdonutData] = useState({});
  const [totalCaptures, SettotalSurveyComp] = useState([]);
  const [myloading, setLoading] = useState([true]);


 
  const totalSurveyCompletion = () => {
    const username = 'noura.dahiru'
    const password = 'a12345678'
    const token = Buffer.from(`${username}:${password}`, 'utf8').toString('base64')
    axios
      .get("https://cavti.kedco.ng/centrak/api/v2/captures-statistics/", { headers: { 'Authorization': `Basic ${token}` }, })
      .then(res => {
        console.log(res);
        const totalCaptures = res.data.result.data;
        SettotalSurveyComp(totalCaptures);
        setLoading(false);

      });
  }



  //this is state capture
  const stateCap = () => {
    let amountOfcaptures = [];
    let capturesByregion = [];
    const username = 'noura.dahiru'
    const password = 'a12345678'

    const token = Buffer.from(`${username}:${password}`, 'utf8').toString('base64')

    axios
      .get("https://cavti.kedco.ng/centrak/api/v2/captures-by-state", { headers: { 'Authorization': `Basic ${token}` }, })
      .then(res => {
        console.log(res);
        for (const dataObj of res.data) {
          amountOfcaptures.push(dataObj.title);
          capturesByregion.push(parseInt(dataObj.meter_audit_captures));
        }

        setdonutData({
          labels: amountOfcaptures,
          datasets: [
            {
              data: capturesByregion,
              backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)'
              ],
            }
          ]
        })
        setLoading(false);

      })
      .catch(err => {
        console.log(err);
      });
    console.log(amountOfcaptures, capturesByregion);
  };

  //this is region captures 
  const regionCap = async () => {
    let amount = [];
    let region = [];
    const KanoCentral = new FormData();
    KanoCentral.append('region', 'R001');

    const KanoWest = new FormData();
    KanoWest.append('region', 'R002');

    const KanoIndustrial = new FormData();
    KanoIndustrial.append('region', 'R003');

    const KanoNorth = new FormData();
    KanoNorth.append('region', 'R005');

    const KanoEast = new FormData();
    KanoEast.append('region', 'R007');

    const KatsinaCentral = new FormData();
    KatsinaCentral.append('region', 'R008');

    const KatsinaNorth = new FormData();
    KatsinaNorth.append('region', 'R009');

    const JigawaSouth = new FormData();
    JigawaSouth.append('region', 'R010');

    const JigawaNorth = new FormData();
    JigawaNorth.append('region', 'R011');

    const KatsinaSouth = new FormData();
    KatsinaSouth.append('region', 'R012');


    //for active Meters
    const ActiveKanoCentral = new FormData();
    ActiveKanoCentral.append('region', 'R001');

    const ActiveKanoWest = new FormData();
    ActiveKanoWest.append('region', 'R002');

    const ActiveKanoIndustrial = new FormData();
    ActiveKanoIndustrial.append('region', 'R003');

    const ActiveKanoNorth = new FormData();
    ActiveKanoNorth.append('region', 'R005');

    const ActiveKanoEast = new FormData();
    ActiveKanoEast.append('region', 'R007');

    const ActiveKatsinaCentral = new FormData();
    ActiveKatsinaCentral.append('region', 'R008');

    const ActiveKatsinaNorth = new FormData();
    ActiveKatsinaNorth.append('region', 'R009');

    const ActiveJigawaSouth = new FormData();
    ActiveJigawaSouth.append('region', 'R010');

    const ActiveJigawaNorth = new FormData();
    ActiveJigawaNorth.append('region', 'R011');

    const ActiveKatsinaSouth = new FormData();
    ActiveKatsinaSouth.append('region', 'R012');


    const username = 'noura.dahiru'
    const password = 'a12345678'

    const token = Buffer.from(`${username}:${password}`, 'utf8').toString('base64')

    await axios
      .get("https://cavti.kedco.ng/centrak/api/v2/captures-by-regions", { headers: { 'Authorization': `Basic ${token}` }, })
      .then(respose => {
        console.log(respose);
        for (const dataObj of respose.data) {
          amount.push(parseInt(dataObj.meter_audit_captures));
          region.push(dataObj.region_name);
        }


        axios.all([
          axios.post('https://meters.kedco.com.ng/kedco/api/PPM/regional/meter', KanoCentral,
            {
              headers: {
                'content-type': 'multipart/form-data'
              }
            }),
          axios.post('https://meters.kedco.com.ng/kedco/api/PPM/regional/meter', KanoWest,
            {
              headers: {
                'content-type': 'multipart/form-data'
              }
            }),
          axios.post('https://meters.kedco.com.ng/kedco/api/PPM/regional/meter', KanoIndustrial,
            {
              headers: {
                'content-type': 'multipart/form-data'
              }
            }),
          axios.post('https://meters.kedco.com.ng/kedco/api/PPM/regional/meter', KanoNorth,
            {
              headers: {
                'content-type': 'multipart/form-data'
              }
            }),
          axios.post('https://meters.kedco.com.ng/kedco/api/PPM/regional/meter', KanoEast,
            {
              headers: {
                'content-type': 'multipart/form-data'
              }
            }),
          axios.post('https://meters.kedco.com.ng/kedco/api/PPM/regional/meter', KatsinaCentral,
            {
              headers: {
                'content-type': 'multipart/form-data'
              }
            }),
          axios.post('https://meters.kedco.com.ng/kedco/api/PPM/regional/meter', KatsinaNorth,
            {
              headers: {
                'content-type': 'multipart/form-data'
              }
            }),
          axios.post('https://meters.kedco.com.ng/kedco/api/PPM/regional/meter', JigawaSouth,
            {
              headers: {
                'content-type': 'multipart/form-data'
              }
            }),
          axios.post('https://meters.kedco.com.ng/kedco/api/PPM/regional/meter', JigawaNorth,
            {
              headers: {
                'content-type': 'multipart/form-data'
              }
            }),
          axios.post('https://meters.kedco.com.ng/kedco/api/PPM/regional/meter', KatsinaSouth,
            {
              headers: {
                'content-type': 'multipart/form-data'
              }
            })

        ])
          .then(axios.spread((Region1, Region2, Region3, Region4, Region5, Region6, Region7, Region8, Region9, Region10) => {
            // output of req.
            console.log(Region1, Region2)
            const KanoCentral = Region1.data[0].meters;
            const KanoWest = Region2.data[0].meters;
            const KanoIndustrial = Region3.data[0].meters;
            const KanoNorth = Region4.data[0].meters;
            const KanoEast = Region5.data[0].meters;
            const KatsinaCentral = Region6.data[0].meters;
            const KatsinaNorth = Region7.data[0].meters;
            const JigawaSouth = Region8.data[0].meters;
            const JigawaNorth = Region9.data[0].meters;
            const KatsinaSouth = Region10.data[0].meters;


            console.log(KanoCentral, KanoWest, KanoIndustrial, KanoNorth, KanoEast, KatsinaCentral, KatsinaNorth, JigawaSouth, JigawaNorth, KatsinaSouth)



            axios.all([
              axios.post('https://meters.kedco.com.ng/kedco/api/PPM/regional/activeMeter', ActiveKanoCentral,
                {
                  headers: {
                    'content-type': 'multipart/form-data'
                  }
                }),
              axios.post('https://meters.kedco.com.ng/kedco/api/PPM/regional/activeMeter', ActiveKanoWest,
                {
                  headers: {
                    'content-type': 'multipart/form-data'
                  }
                }),
              axios.post('https://meters.kedco.com.ng/kedco/api/PPM/regional/activeMeter', ActiveKanoIndustrial,
                {
                  headers: {
                    'content-type': 'multipart/form-data'
                  }
                }),
              axios.post('https://meters.kedco.com.ng/kedco/api/PPM/regional/activeMeter', ActiveKanoNorth,
                {
                  headers: {
                    'content-type': 'multipart/form-data'
                  }
                }),
              axios.post('https://meters.kedco.com.ng/kedco/api/PPM/regional/activeMeter', ActiveKanoEast,
                {
                  headers: {
                    'content-type': 'multipart/form-data'
                  }
                }),
              axios.post('https://meters.kedco.com.ng/kedco/api/PPM/regional/activeMeter', ActiveKatsinaCentral,
                {
                  headers: {
                    'content-type': 'multipart/form-data'
                  }
                }),
              axios.post('https://meters.kedco.com.ng/kedco/api/PPM/regional/activeMeter', ActiveKatsinaNorth,
                {
                  headers: {
                    'content-type': 'multipart/form-data'
                  }
                }),
              axios.post('https://meters.kedco.com.ng/kedco/api/PPM/regional/activeMeter', ActiveJigawaSouth,
                {
                  headers: {
                    'content-type': 'multipart/form-data'
                  }
                }),
              axios.post('https://meters.kedco.com.ng/kedco/api/PPM/regional/activeMeter', ActiveJigawaNorth,
                {
                  headers: {
                    'content-type': 'multipart/form-data'
                  }
                }),
              axios.post('https://meters.kedco.com.ng/kedco/api/PPM/regional/activeMeter', ActiveKatsinaSouth,
                {
                  headers: {
                    'content-type': 'multipart/form-data'
                  }
                })

            ])
              .then(axios.spread((ActiveRegion1, ActiveRegion2, ActiveRegion3, ActiveRegion4, ActiveRegion5, ActiveRegion6, ActiveRegion7, ActiveRegion8, ActiveRegion9, ActiveRegion10) => {
                // output of req.
                console.log(ActiveRegion1, ActiveRegion2)
                const ActiveKanoCentral = ActiveRegion1.data[0].meters;
                const ActiveKanoWest = ActiveRegion2.data[0].meters;
                const ActiveKanoIndustrial = ActiveRegion3.data[0].meters;
                const ActiveKanoNorth = ActiveRegion4.data[0].meters;
                const ActiveKanoEast = ActiveRegion5.data[0].meters;
                const ActiveKatsinaCentral = ActiveRegion6.data[0].meters;
                const ActiveKatsinaNorth = ActiveRegion7.data[0].meters;
                const ActiveJigawaSouth = ActiveRegion8.data[0].meters;
                const ActiveJigawaNorth = ActiveRegion9.data[0].meters;
                const ActiveKatsinaSouth = ActiveRegion10.data[0].meters;


                console.log(ActiveKanoCentral, ActiveKanoWest, ActiveKanoIndustrial, ActiveKanoNorth, ActiveKanoEast, ActiveKatsinaCentral, ActiveKatsinaNorth, ActiveJigawaSouth, ActiveJigawaNorth, ActiveKatsinaSouth)





                setbarChartData({
                  labels: ["zero","one","two","three","four","five","six","seven","eight"],
                  datasets: [


                    {
                      label: 'Alpha',
                      backgroundColor: 'rgba(255, 204, 0)',
                      borderColor: 'rgba(255, 204, 0)',
                      pointRadius: false,
                      pointColor: 'rgba(255, 204, 0)',
                      pointStrokeColor: '#c1c7d1',
                      pointHighlightFill: '#fff',
                      pointHighlightStroke: 'rgba(220,220,220,1)',
                      data: [0, 203, 103, 405, 530, 322, 232, 535, 123, 334, 311]
                    },
                    
                    {
                      label: 'Omega',
                      backgroundColor: 'rgba(25, 232, 84, 1)',
                      borderColor: 'rgba(210, 214, 222, 1)',
                      pointRadius: false,
                      pointColor: 'rgba(210, 214, 222, 1)',
                      pointStrokeColor: '#c1c7d1',
                      pointHighlightFill: '#fff',
                      pointHighlightStroke: 'rgba(220,220,220,1)',
                      data: [0, 504, 304, 274, 343, 443, 474, 457, 425, 445, 443],
                    },
                    
                  ]

                })
              }));

          }));
        setLoading(false);
      })

      .catch(err => {
        console.log(err);
      });
    console.log(amount, region);
  };


  const feederCap = () => {
    let piecaptures = [];
    let piefeeder = [];

    const username = 'noura.dahiru'
    const password = 'a12345678'
    const token = Buffer.from(`${username}:${password}`, 'utf8').toString('base64')

    axios
      .get("https://cavti.kedco.ng/centrak/api/v2/captures-by-feeder/", { headers: { 'Authorization': `Basic ${token}` }, })
      .then(respose => {
        console.log(respose);
        for (const dataObj of respose.data) {
          piecaptures.push(parseInt(dataObj.meter_audit_captures));
          piefeeder.push(dataObj.feeder_name);
        }

        setPietData({

          labels: ["zero","one","two","three","four","five","six","seven","eight"],
          datasets: [
            {
              label: 'Statistics',
              data: [0, 504, 304, 274, 343, 443, 474, 457, 425, 445, 443],

              backgroundColor: [
                '#f56954', '#00a65a', '#f39c12', '#00c0ef', '#3c8dbc', '#d2d6de', '#f56954', '#00a65a', '#f39c12', '#00c0ef',
              ]

            }
          ]
        })
        setLoading(false);

      })
      .catch(err => {
        console.log(err);
      });
    console.log(piecaptures, piefeeder);
  };

  //this should be csp
  const cspCap = () => {
    let cspCaptures = [];
    let cspLabel = [];

    const username = 'noura.dahiru'
    const password = 'a12345678'

    const token = Buffer.from(`${username}:${password}`, 'utf8').toString('base64')

    axios
      .get("https://cavti.kedco.ng/centrak/api/v2/captures-by-csp/", { headers: { 'Authorization': `Basic ${token}` }, })
      .then(respose => {
        console.log(respose);
        for (const dataObj of respose.data) {
          cspCaptures.push(parseInt(dataObj.meter_audit_captures));
          cspLabel.push(dataObj.csp_name);
        }

        setCspData({

          labels: cspLabel,
          datasets: [
            {
              label: 'CSPs',
              data: [0, 504, 304, 274, 343, 443, 474, 457, 425, 445, 443],
              backgroundColor: ['#f56954', '#00a65a', '#f39c12', '#00c0ef', '#3c8dbc', '#d2d6de', '#f56954', '#00a65a', '#f39c12', '#00c0ef',
                '#f56954', '#f56954', '#00a65a', '#f39c12', '#00c0ef', '#3c8dbc', '#d2d6de', '#f56954', '#00a65a', '#f39c12', '#00c0ef',
                '#f56954', '#f56954', '#00a65a', '#f39c12', '#00c0ef', '#3c8dbc', '#d2d6de', '#f56954', '#00a65a', '#f39c12', '#00c0ef',
                '#f56954', '#f56954', '#00a65a', '#f39c12', '#00c0ef', '#3c8dbc', '#d2d6de', '#f56954', '#00a65a', '#f39c12', '#00c0ef',
                '#f56954', '#f56954', '#00a65a', '#f39c12', '#00c0ef', '#3c8dbc', '#d2d6de', '#f56954', '#00a65a', '#f39c12', '#00c0ef',
                '#f56954', '#f56954', '#00a65a', '#f39c12', '#00c0ef', '#3c8dbc', '#d2d6de', '#f56954', '#00a65a', '#f39c12', '#00c0ef',
                '#f56954', '#f56954', '#00a65a', '#f39c12', '#00c0ef', '#3c8dbc', '#d2d6de', '#f56954', '#00a65a', '#f39c12', '#00c0ef',
                '#f56954', '#f56954', '#00a65a', '#f39c12', '#00c0ef', '#3c8dbc', '#d2d6de', '#f56954', '#00a65a', '#f39c12', '#00c0ef',
                '#f56954', '#f56954', '#00a65a', '#f39c12', '#00c0ef', '#3c8dbc', '#d2d6de', '#f56954', '#00a65a', '#f39c12', '#00c0ef',
                '#f56954', '#f56954', '#00a65a', '#f39c12', '#00c0ef', '#3c8dbc', '#d2d6de', '#f56954', '#00a65a', '#f39c12', '#00c0ef',
                '#f56954', '#f56954', '#00a65a', '#f39c12', '#00c0ef', '#3c8dbc', '#d2d6de', '#f56954', '#00a65a', '#f39c12', '#00c0ef',
                '#f56954', '#f56954', '#00a65a', '#f39c12', '#00c0ef', '#3c8dbc', '#d2d6de', '#f56954', '#00a65a', '#f39c12', '#00c0ef',
                '#f56954', '#f56954', '#00a65a', '#f39c12', '#00c0ef', '#3c8dbc', '#d2d6de', '#f56954', '#00a65a', '#f39c12', '#00c0ef',
                '#f56954', '#f56954', '#00a65a', '#f39c12', '#00c0ef', '#3c8dbc', '#d2d6de', '#f56954', '#00a65a', '#f39c12', '#00c0ef',
                '#f56954', '#f56954', '#00a65a', '#f39c12', '#00c0ef', '#3c8dbc', '#d2d6de', '#f56954', '#00a65a', '#f39c12', '#00c0ef',
                '#f56954', '#f56954', '#00a65a', '#f39c12', '#00c0ef', '#3c8dbc', '#d2d6de', '#f56954', '#00a65a', '#f39c12', '#00c0ef',
                '#f56954', '#f56954', '#00a65a', '#f39c12', '#00c0ef', '#3c8dbc', '#d2d6de', '#f56954', '#00a65a', '#f39c12', '#00c0ef',
                '#f56954', '#f56954', '#00a65a', '#f39c12', '#00c0ef', '#3c8dbc', '#d2d6de', '#f56954', '#00a65a', '#f39c12', '#00c0ef',
                '#f56954', '#f56954', '#00a65a', '#f39c12', '#00c0ef', '#3c8dbc', '#d2d6de', '#f56954', '#00a65a', '#f39c12', '#00c0ef',
                '#f56954'
              ]

            }
          ]
        })
        setLoading(false);

      })
      .catch(err => {
        console.log(err);
      });
    console.log(cspCaptures, cspLabel);
  };
  //using the functions
  useEffect(() => {
    stateCap();
    regionCap();
    feederCap();
    cspCap();
    totalSurveyCompletion();
  }, []);

  if (!localStorage.getItem('user')) {
    return (<Redirect to={'/login'} />)
  }

  return (
    <div>
      <Header />

      <div className="content-wrapper">
        <Menu />
        <br />
        {/* Info boxes */}
        <div className="col-12">

          <div className="row">

            <div className="col-12 col-sm-6 col-md-3">
              <div className="info-box">
                <span className="info-box-icon   elevation-1"><i className="fas fa-desktop text-green" /></span>
                <div className="info-box-content">
                  <span className="info-box-text">Completed Survey</span>
                  <span className="info-box-number">
                    <div>
                      {myloading ? (
                        <Spinner animation="grow" size="sm" variant="success" />


                      ) : (
                        (totalCaptures.meter_audit_capture_total)

                      )}

                    </div>

                  </span>
                </div>
                {/* /.info-box-content */}
              </div>
              {/* /.info-box */}
            </div>
            {/* /.col */}
            <div className="col-12 col-sm-6 col-md-3">
              <div className="info-box mb-3">
                <span class="info-box-icon bg-pink"><i class="ion ion-stats-bars"></i></span>
                <div className="info-box-content">
                  <span className="info-box-text">Daily Completed Survey</span>
                  <span className="info-box-number">

                    {myloading ? (
                      <Spinner animation="grow" size="sm" variant="success" />


                    ) : (
                      (totalCaptures.meter_audit_captures_today)

                    )} </span>
                </div>
                {/* /.info-box-content */}
              </div>
              {/* /.info-box */}
            </div>
            {/* /.col */}
            {/* fix for small devices only */}
            <div className="clearfix hidden-md-up" />
            <div className="col-12 col-sm-6 col-md-3">
              <div className="info-box mb-3">
                <span class="info-box-icon bg-warning"><i class="ion ion-stats-bars"></i></span>
                <div className="info-box-content">
                  <span className="info-box-text">Weekly Completed Survey</span>
                  <span className="info-box-number">
                    {myloading ? (
                      <Spinner animation="grow" size="sm" variant="success" />


                    ) : (
                      (totalCaptures.meter_audit_captures_thisweek)

                    )}
                  </span>
                </div>
                {/* /.info-box-content */}
              </div>
              {/* /.info-box */}
            </div>
            {/* /.col */}
            <div className="col-12 col-sm-6 col-md-3">
              <div className="info-box mb-3">
                <span class="info-box-icon bg-success"><i class="ion ion-stats-bars"></i></span>
                <div className="info-box-content">
                  <span className="info-box-text">Monthly Completed Survey</span>
                  <span className="info-box-number">
                    {myloading ? (
                      <Spinner animation="grow" size="sm" variant="success" />


                    ) : (
                      (totalCaptures.meter_audit_captures_thismonth)

                    )}

                  </span>
                </div>
                {/* /.info-box-content */}
              </div>
              {/* /.info-box */}
            </div>
            {/* /.col */}
          </div>
        </div>
        <div><br/><br/>
          {/* Main content */}
          <section className="content">
            <div className="container-fluid">


              <div className="row">
                <div className="col-md-5">

                  {/* DONUT CHART */}
                  <div className="">
                    <h3 className="card-title" color="blue"><b >PRESENTATION ONE </b></h3>
                    <div className="card-tools">
                      <button type="button" className="btn btn-tool" data-card-widget=""><i className="" />
                      </button>
                      <button type="button" className="btn btn-tool" data-card-widget=""><i className="" /></button>
                    </div>
                    <div className="card-body">
                      {myloading ? (
                        <>
                          <center><Spinner animation="border" variant="primary" /></center>
                        </>
                      ) : (
                        <Bar
                          data={barchartData}
                          barChartOptions={{
                            responsive: true,
                            maintainAspectRatio: false,
                            datasetFill: false
                          }}

                        />

                      )}
                    </div>
                    {/* /.card-body */}
                  </div>
                  {/* /.card */}



                </div>
                {/* /.col (LEFT) */}
                <div className="col-md-3">

                  {/* LINE CHART */}
                  <div className="">
                    <h3 className="card-title"> <b >PRESENTATION TWO</b ></h3>
                    <div className="card-tools">
                      <button type="button" className="btn btn-tool" data-card-widget=""><i className="" />
                      </button>
                      <button type="button" className="btn btn-tool" data-card-widget=""><i className="" /></button>
                    </div>
                    <div className="card-body">
                      {/* <div className="chart"> */}
                      {myloading ? (

                        <>
                          <center><Spinner animation="border" variant="primary" /></center>
                        </>
                      ) : (
                        <Pie
                          data={donutchartData}
                          donutOptions={{
                            maintainAspectRatio: true,
                            responsive: true,
                          }}
                        />

                      )}
                      {/* </div> */}
                    </div>
                    {/* /.card-body */}
                  </div>
                  {/* /.card */}

                </div>
                {/* /.col (RIGHT) */}


                {/* STACKED BAR CHART */}
                <div className="col-md-3">
                  {/* DONUT CHART */}
                  <div className="">
                    <h3 className="card-title" color="blue"><b >PRESENTATION THREE </b></h3>
                    <div className="card-tools">
                      <button type="button" className="btn btn-tool" data-card-widget=""><i className="" />
                      </button>
                      <button type="button" className="btn btn-tool" data-card-widget=""><i className="" /></button>
                    </div>
                    <div className="card-body">
                      {myloading ? (
                        <>
                          <center><Spinner animation="border" variant="primary" /></center>
                        </>
                      ) : (
                        <Radar
                          data={barchartData}
                          barChartOptions={{
                            responsive: true,
                            maintainAspectRatio: false,
                            datasetFill: false
                          }}

                        />

                      )}
                    </div>
                    {/* /.card-body */}
                  </div>
                  {/* /.card */}


                </div>

              </div>
              {/* /.row */}






              <div className="row">
                <div className="col-md-6">

                  {/* DONUT CHART */}
                  <div className="">
                    <h3 className="card-title" color="blue"><b > PRESENTATION FOUR </b></h3>
                    <div className="card-tools">
                      <button type="button" className="btn btn-tool" data-card-widget=""><i className="" />
                      </button>
                      <button type="button" className="btn btn-tool" data-card-widget=""><i className="" /></button>
                    </div>
                    <div className="card-body">
                      {myloading ? (
                        <>
                          <center><Spinner animation="border" variant="primary" /></center>
                        </>
                      ) : (
                        <Line
                          data={barchartData}
                          barChartOptions={{
                            responsive: true,
                            maintainAspectRatio: false,
                            datasetFill: false
                          }}

                        />

                      )}
                    </div>
                    {/* /.card-body */}
                  </div>
                  {/* /.card */}



                </div>


                <div className="col-md-6">



                  <div className="">
                    <h3 className="card-title"><b>PRESENTATION FIVE</b></h3>
                    <div className="card-tools">
                      <button type="button" className="btn btn-tool" data-card-widget=""><i className="" />
                      </button>
                      <button type="button" className="btn btn-tool" data-card-widget=""><i className="" /></button>
                    </div>
                    <div className="card-body">
                      <div className="chart">


                        {myloading ? (

                          <>
                            <center><Spinner animation="border" variant="primary" /></center>
                          </>



                        ) : (
                          <Line
                            data={chartData}

                          />

                        )}


                      </div>
                    </div>
                    {/* /.card-body */}
                  </div>
                  {/* /.card */}


                </div>

              </div>


              {/* STACKED BAR CHART */}

              {/* /.row */}
            </div>{/* /.container-fluid */}
          </section>
          {/* /.content */}
        </div>


      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;