import React, { Component } from 'react';
import ToggleButtonGroupControlled from './ToggleButtonGroupControlledClass';
import ShowResults from './ShowResults';

class BasicForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      HostnameAPI: '192.168.1.15',
      // HostnameAPI: 'localhost',
      isLoaded: false,
      isLoadedResults: true,
      isSubmitted: false,
      platform: [],
      Rotten_Tomatoes: [],
      Language: [],
      Directors: [],
      Order: [
        {Order: 'ASC'},
        {Order: 'DESC'}
      ],
      OrderBy: [
        {OrderBy: 'Title'},
        {OrderBy: 'Year'},
        {OrderBy: 'Rotten_Tomatoes'},
        {OrderBy: 'IMDb'},
        {OrderBy: 'Runtime'}
      ],
      Selectedplatform: undefined,
      SelectedRotten_Tomatoes: undefined,
      SelectedLanguage: undefined,
      SelectedDirectors: undefined,
      SelectedOrder: 'ASC',
      SelectedOrderBy: 'Title',
      SubmittedTitle: '',
      ErrorData: null,
      ErrorAPI: null,
      ResultsAPI: [],
      PlatformValue: [],
      limit: 20,
      offset: 0
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePlatformChange = this.handlePlatformChange.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
  }

  /* Create all selected options */
  createSelect(selectedOption, selectedType) {
    const arrayOfData = selectedOption;
    //console.log('arrayOfData = ', arrayOfData);
    return arrayOfData.map((data) =>
      <option
        key={data[selectedType]}
        value={data[selectedType]}
      >
        {data[selectedType]}
      </option>
    );
  }

  getSelectionsFromBackend(type) {
    fetch(`http://${this.state.HostnameAPI}:8000/${type}`,{
      method: 'GET',
    })
    .then((response) => {
      console.log(response.status, response.statusText);
      if (!response.ok) {
        this.setState({
          ErrorAPI: 'Internal Error'
        });
        throw Error(response.statusText);
      }
      else {
        this.setState({
          ErrorAPI: null
        });
        return response.json();
      }
    })
    .then(
      (json) => {
        console.log('json = ', json)
        this.setState({
          isLoaded: true,
          [type] : json
        });
      },
      // Note: it's important to handle errors here
      // instead of a catch() block so that we don't swallow
      // exceptions from actual bugs in components.
      (error) => {
        this.setState({
          isLoaded: true,
          error
        });
      }
    );
  }

  getResultsFromBackend(type, selectedType) {

    fetch(`http://${this.state.HostnameAPI}:8000/${type}/${selectedType}?offset=${this.state.offset}&limit=${this.state.limit}&orderBy=${this.state.SelectedOrderBy}&order=${this.state.SelectedOrder}&title=${this.state.SubmittedTitle}`,{
      method: 'GET',
    })
    /* Returns a promise containing the response */
    .then((response) => {
      console.log(selectedType);
      console.log(response.status, response.statusText);
      // No Data
      if (response.status === 403) {
        this.setState({
          ErrorData: 'No Data Found',
        });
      }
      else if (!response.ok) {
        this.setState({
          ErrorData: 'Select Inputs',
        });
      }
      else {
        this.setState({
          ErrorData: null,
        });
        return response.json();
      }
    })
    .then(json => {
      console.log(json);
      this.setState({
        ResultsAPI: json,
        isLoadedResults: true,
        isSubmitted: true
      });
    })
    .catch((error) => {
      console.error('Error:', error);
      this.setState({
        isLoadedResults: true,
        ErrorData: 'Cannot Connect',
        isSubmitted: true
      });
    });
  }

  nextPage () {
    this.setState({
      offset: this.state.offset + this.state.limit
    });
  }

  previousPage () {
    if (this.state.offset > 0) {
      this.setState({
        offset: this.state.offset - this.state.limit
      });
    }
  }

  componentDidMount() {

    this.getSelectionsFromBackend("Rotten_Tomatoes");
    this.getSelectionsFromBackend("platform");
    this.getSelectionsFromBackend("Language");
    // this.getSelectionsFromBackend("Directors");

  }

  handlePlatformChange(event) {
    console.log("event: ", event);
    this.setState({
      PlatformValue: event,
      ErrorData: null,
      isSubmitted: false,
      offset: 0
    });
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    console.log(event.target.name);
    this.setState({
      ErrorData: null,
      isSubmitted: false,
      [name]: value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log("event", event);

    this.setState({
      isLoadedResults: false,
    });


    const Platforms = this.state.PlatformValue;

    if (Platforms.length > 1) {
      switch (Platforms.length) {
        case 2:
          this.getResultsFromBackend("platform", `or/${Platforms[0]}/${Platforms[1]}`);
          break;
        case 3:
          this.getResultsFromBackend("platform", `or/${Platforms[0]}/${Platforms[1]}/${Platforms[2]}`);
          break;
        case 4:
          this.getResultsFromBackend("platform", `or/${Platforms[0]}/${Platforms[1]}/${Platforms[2]}/${Platforms[3]}`);
          break;
      }
    }
    else {
      this.getResultsFromBackend("platform", Platforms[0]);
    }

  }

  render() {

    if (!this.state.isLoaded) {
      return (
        <div id="loading">
          <div className="d-flex justify-content-center">
            Loading...
          </div>
        </div>
      );
    }

    else if (this.state.ErrorAPI) {
      return (
        <div>
            <div className="alert alert-danger" role="alert">
              <b>Error:</b> {this.state.ErrorAPI}
            </div>
        </div>
      );
    }

    else {
      return (
        <div id="BasicForm">
          <form onSubmit={this.handleSubmit}>

            <div className="form-group">
              <label htmlFor="FormPlatformSelect"></label>
              <h2>Streaming Platform</h2>
              <ToggleButtonGroupControlled PlatformValue={this.state.PlatformValue} handlePlatformChange={this.handlePlatformChange}/>
            </div>

            <div className="form-group">
              <label htmlFor="FormControlInput1">Movie Title:</label>
              <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Title..." name="SubmittedTitle" value={this.state.SubmittedTitle} onChange={this.handleChange} />
            </div>

            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="FormControlSelect1">Order:</label>
                <select className="form-control" id="exampleFormControlSelect1" name="SelectedOrder" value={this.state.SelectedOrder} onChange={this.handleChange}>
                  {this.createSelect(this.state.Order, "Order")}
                </select>
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="FormControlSelect2">Sort by:</label>
                <select className="form-control" id="exampleFormControlSelect2" name="SelectedOrderBy" value={this.state.SelectedOrderBy} onChange={this.handleChange}>
                  {this.createSelect(this.state.OrderBy, "OrderBy")}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="FormControlSelect3">Language:</label>
              <select className="form-control" id="exampleFormControlSelect3" name="SelectedLanguage" value={this.state.SelectedLanguage} onChange={this.handleChange}>
                <option disabled selected value> -- Select Language -- </option>
                {this.createSelect(this.state.Language, "Language")}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="FormControlSelect4">Rotten Tomatoes Score:</label>
              <select className="form-control" id="exampleFormControlSelect4" name="SelectedRotten_Tomatoes" value={this.state.SelectedRotten_Tomatoes} onChange={this.handleChange}>
                <option disabled selected value> -- Select Score -- </option>
                {this.createSelect(this.state.Rotten_Tomatoes, "Rotten_Tomatoes")}
              </select>
            </div>

            <div className="form-group">
              <button type="submit" className="btn btn-dark">Submit</button>
            </div>

            {(this.state.isSubmitted && (this.state.ErrorData !== 'Select Inputs') && (this.state.ErrorData !== 'Cannot Connect')) ? (
              <div className="form-group">
                <button className="btn btn-outline-secondary" onClick={this.previousPage}> Previous Page </button>
                {(this.state.ErrorData !== 'No Data Found') ? (
                    <button className="btn btn-outline-secondary" onClick={this.nextPage}> Next Page </button>
                  ) : (<div></div>)
                }
              </div>
            ) : (<div></div>)
            }

          </form>




          <div>
            { this.state.ErrorData
            ? (
              <div className="alert alert-danger" role="alert">
                { this.state.ErrorData }
              </div>
            )
            : (
              <div>
                {<ShowResults isSubmitted={this.state.isSubmitted} ResultsAPI={this.state.ResultsAPI} isLoadedResults={this.state.isLoadedResults}/>}
              </div>
            )}
          </div>

        </div>

      );
    }
  }

}

export default BasicForm;

/*Directors div*/
// <div className="form-group">
//   <label htmlFor="exampleFormControlSelect1">Name:</label>
//   <select className="form-control" id="exampleFormControlSelect1" name="SelectedDirectors" value={this.state.SelectedDirectors} onChange={this.handleChange}>
//     <option disabled selected value> -- Select Name -- </option>
//     {this.createSelect(Directors, "Directors")}
//   </select>
// </div>

/*Platform Select*/
// <div className="form-group">
//   <label htmlFor="exampleFormControlSelect1">Streaming Platform:</label>
//   <select className="form-control" id="exampleFormControlSelect1" name="Selectedplatform" value={this.state.Selectedplatform} onChange={this.handleChange}>
//     <option disabled selected value> -- Select Platform -- </option>
//     {this.createSelect(this.state.platform, "platform")}
//   </select>
// </div>

// <div key={shortid.generate()}>

/*Card*/
// <div>
// {this.state.ResultsAPI.map(item => (
// <div className="card" key={item.ID}>
//   <h5 className="card-header">{item.Title}</h5>
//   <div className="card-body">
//     <h5 className="card-title">{item.Directors}</h5>
//     <p className="card-text">{item.Genres}</p>
//     <a href={"https://www.google.com/search?q=" + item.Title} className="btn btn-info">Find More</a>
//   </div>
// </div>
// ))}
// </div>


/*Platforms as switch-checkoxes*/
// <div className="text-left">
//   <div className="custom-control custom-switch">
//     <input type="checkbox" className="custom-control-input" id="customSwitch1"/>
//     <label className="custom-control-label" htmlFor="customSwitch1">Netflix</label>
//   </div>
//
//   <div className="custom-control custom-switch">
//     <input type="checkbox" className="custom-control-input" id="customSwitch2" />
//     <label className="custom-control-label" htmlFor="customSwitch2">Hulu</label>
//   </div>
//
//   <div className="custom-control custom-switch">
//     <input type="checkbox" className="custom-control-input" id="customSwitch3" />
//     <label className="custom-control-label" htmlFor="customSwitch3">Prime Video</label>
//   </div>
//
//   <div className="custom-control custom-switch">
//     <input type="checkbox" className="custom-control-input" id="customSwitch4" />
//     <label className="custom-control-label" htmlFor="customSwitch4">Disney+</label>
//   </div>
// </div>

/* Image buttons separate*/
// <button type="button" className="btn btn-light btn-sm" data-toggle="button" aria-pressed="false"><img src={netflix_icon} alt="netflix_icon"/></button>
// <button type="button" className="btn btn-light btn-sm" data-toggle="button" aria-pressed="false"><img src={hulu_icon} alt="hulu_icon"/></button>
// <button type="button" className="btn btn-light btn-sm" data-toggle="button" aria-pressed="false"><img src={prime_video_icon} alt="prime_video_icon"/></button>
// <button type="button" className="btn btn-light btn-sm" data-toggle="button" aria-pressed="false"><img src={disney_icon} alt="disney_icon"/></button>

/*ShowResults*/
// <div>
//   <div className="row">
//     {this.state.isSubmitted && this.state.ResultsAPI.map(item => (
//         <div className="col-sm-6" key={item.ID}>
//           <div className="card bg-light">
//             <h5 className="card-header">{item.Title}</h5>
//             <div className="card-body">
//               <p className="card-title"><b>Director:</b> {item.Directors}</p>
//               <p className="card-text"><b>Genre:</b> {item.Genres}</p>
//               <p className="card-text"><b>IMDb Score:</b> {item.IMDb}</p>
//               <p className="card-text"><b>Rotten Tomatoes Score:</b> {item.Rotten_Tomatoes}</p>
//               <a href={"https://www.google.com/search?q=" + item.Title} className="btn btn-info" target="_blank" rel="noopener noreferrer">Find More</a>
//             </div>
//           </div>
//         </div>
//     ))}
//   </div>
// </div>
