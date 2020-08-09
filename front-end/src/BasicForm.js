import React, { Component } from 'react';

class BasicForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      HostnameAPI: '192.168.1.15',
      isLoaded: false,
      isSubmitted: false,
      platform: [],
      Rotten_Tomatoes: [],
      Language: [],
      Directors: [],
      Selectedplatform: undefined,
      SelectedRotten_Tomatoes: undefined,
      SelectedLanguage: undefined,
      SelectedDirectors: undefined,
      Submittedvalue: '',
      ErrorData: null,
      ErrorAPI: null,
      ResultsAPI: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
        })
      }
    );
  }

  getResultsFromBackend(type, selectedType) {
    fetch(`http://${this.state.HostnameAPI}:8000/${type}/${selectedType}`,{
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
        isSubmitted: true
      });
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  componentDidMount() {

    this.getSelectionsFromBackend("Rotten_Tomatoes");
    this.getSelectionsFromBackend("platform");
    this.getSelectionsFromBackend("Language");
    this.getSelectionsFromBackend("Directors");

  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      ErrorData: null,
      isSubmitted: false,
      [name]: value,
    });
  }

  handleSubmit(event) {
    // alert('A name was submitted: ' + this.state.Submittedvalue);
    event.preventDefault();

    this.getResultsFromBackend("platform", this.state.Selectedplatform);
  }

  render() {

    if (!this.state.isLoaded) {
      return (
        <div id="loadingAreaName">
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
        <div>
          <form onSubmit={this.handleSubmit}>

            <div className="form-group">
              <label htmlFor="exampleFormControlInput1">Name:</label>
              <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Type..." name="Submittedvalue" value={this.state.Submittedvalue} onChange={this.handleChange} />
            </div>

            <div className="text-left">
              <div className="custom-control custom-switch">
                <input type="checkbox" className="custom-control-input" id="customSwitch1"/>
                <label className="custom-control-label" htmlFor="customSwitch1">Netflix</label>
              </div>

              <div className="custom-control custom-switch">
                <input type="checkbox" className="custom-control-input" id="customSwitch2" />
                <label className="custom-control-label" htmlFor="customSwitch2">Hulu</label>
              </div>

              <div className="custom-control custom-switch">
                <input type="checkbox" className="custom-control-input" id="customSwitch3" />
                <label className="custom-control-label" htmlFor="customSwitch3">Prime Video</label>
              </div>

              <div className="custom-control custom-switch">
                <input type="checkbox" className="custom-control-input" id="customSwitch4" />
                <label className="custom-control-label" htmlFor="customSwitch4">Disney+</label>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="exampleFormControlSelect1">Streaming Platform:</label>
              <select className="form-control" id="exampleFormControlSelect1" name="Selectedplatform" value={this.state.Selectedplatform} onChange={this.handleChange}>
                <option disabled selected value> -- Select Platform -- </option>
                {this.createSelect(this.state.platform, "platform")}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="exampleFormControlSelect1">Rotten Tomatoes Score:</label>
              <select className="form-control" id="exampleFormControlSelect1" name="SelectedRotten_Tomatoes" value={this.state.SelectedRotten_Tomatoes} onChange={this.handleChange}>
                <option disabled selected value> -- Select Score -- </option>
                {this.createSelect(this.state.Rotten_Tomatoes, "Rotten_Tomatoes")}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="exampleFormControlSelect1">Language:</label>
              <select className="form-control" id="exampleFormControlSelect1" name="SelectedLanguage" value={this.state.SelectedLanguage} onChange={this.handleChange}>
                <option disabled selected value> -- Select Language -- </option>
                {this.createSelect(this.state.Language, "Language")}
              </select>
            </div>

            <input type="submit" value="Submit" />

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
                <div className="row">
                  {this.state.ResultsAPI.map(item => (
                      <div className="col-sm-6" key={item.ID}>
                        <div className="card">
                          <h5 className="card-header">{item.Title}</h5>
                          <div className="card-body">
                            <h5 className="card-title">{item.Directors}</h5>
                            <p className="card-text">{item.Genres}</p>
                            <a href={"https://www.google.com/search?q=" + item.Title} className="btn btn-info" target="_blank" rel="noopener noreferrer">Find More</a>
                          </div>
                        </div>
                      </div>
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>

      );
    }
  }

}

export default BasicForm;


// <div className="form-group">
//   <label htmlFor="exampleFormControlSelect1">Name:</label>
//   <select className="form-control" id="exampleFormControlSelect1" name="SelectedDirectors" value={this.state.SelectedDirectors} onChange={this.handleChange}>
//     <option disabled selected value> -- Select Name -- </option>
//     {this.createSelect(Directors, "Directors")}
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
