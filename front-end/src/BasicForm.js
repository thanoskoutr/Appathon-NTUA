import React from 'react';
import ToggleButtonGroupControlled from './ToggleButtonGroupControlledClass';
import ShowResults from './ShowResults';
import ScrollButton from './ScrollButton';
import ShowStats from './ShowStats';
import ReactLoading from 'react-loading';

class BasicForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      isLoadedResults: true,
      isSubmitted: false,
      platform: [],
      Language: [],
      Genres: [],
      Year: [],
      Country: [],
      Age: [],
      Order: [
        {Order: 'Ascending'},
        {Order: 'Descending'}
      ],
      OrderBy: [
        {OrderBy: 'Title'},
        {OrderBy: 'Director'},
        {OrderBy: 'Year'},
        {OrderBy: 'Runtime'},
        {OrderBy: 'IMDb Score'},
        {OrderBy: 'Rotten Tomatoes Score'}
      ],
      LimitList: [
        {Limit: 10},
        {Limit: 20},
        {Limit: 50},
        {Limit: 100},
        {Limit: 200}
      ],
      Selectedplatform: undefined,
      SelectedLanguage: '',
      SelectedGenre: '',
      SelectedYear: '',
      SelectedCountry: '',
      SelectedAge: '',
      SelectedOrder: 'ASC',
      SelectedOrderBy: 'Title',
      SubmittedTitle: '',
      SubmittedDirector: '',
      ErrorData: null,
      ErrorAPI: null,
      ResultsAPI: [],
      PlatformValue: [],
      limit: 20,
      offset: 0,
      ErrorDataStats: null,
      ResultsStats: [],
      isLoadedResultsStats: true,
      isSubmittedStats: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePlatformChange = this.handlePlatformChange.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.handleChangePage = this.handleChangePage.bind(this);
    this.handleSubmitStatistics = this.handleSubmitStatistics.bind(this);
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
    fetch(`http://${this.props.HostnameAPI}:8000/${type}`,{
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

    let SelectedOrder = this.state.SelectedOrder;
    if (this.state.SelectedOrder === "Ascending")
      SelectedOrder = "ASC";
    else if (this.state.SelectedOrder === "Descending")
      SelectedOrder = "DESC";

    let SelectedOrderBy = this.state.SelectedOrderBy;
    if (this.state.SelectedOrderBy === "Director")
      SelectedOrderBy = "Directors";
    if (this.state.SelectedOrderBy === "IMDb Score")
      SelectedOrderBy = "IMDb";
    if (this.state.SelectedOrderBy === "Rotten Tomatoes Score")
      SelectedOrderBy = "Rotten_Tomatoes";

    let SelectedAge = this.state.SelectedAge;
    if (this.state.SelectedAge === "7+" || this.state.SelectedAge === "13+" || this.state.SelectedAge === "16+" || this.state.SelectedAge === "18+")
      SelectedAge = this.state.SelectedAge.split("+")[0];

    fetch(`http://${this.props.HostnameAPI}:8000/${type}/${selectedType}?offset=${this.state.offset}&limit=${this.state.limit}&orderBy=${SelectedOrderBy}&order=${SelectedOrder}&title=${this.state.SubmittedTitle}&director=${this.state.SubmittedDirector}&language=${this.state.SelectedLanguage}&genre=${this.state.SelectedGenre}&year=${this.state.SelectedYear}&country=${this.state.SelectedCountry}&age=${SelectedAge}`,{
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

  getStatisticsFromBackend() {

    fetch(`http://${this.props.HostnameAPI}:8000/platform/statistics`,{
      method: 'GET',
    })
    /* Returns a promise containing the response */
    .then((response) => {
      console.log(response.status, response.statusText);
      // No Data
      if (response.status === 403) {
        this.setState({
          ErrorDataStats: 'No Data Found',
        });
      }
      else if (!response.ok) {
        this.setState({
          ErrorDataStats: 'Internal Error',
        });
      }
      else {
        this.setState({
          ErrorDataStats: null,
        });
        return response.json();
      }
    })
    .then(json => {
      console.log(json);
      this.setState({
        ResultsStats: json,
        isLoadedResultsStats: true,
        isSubmittedStats: true
      });
    })
    .catch((error) => {
      console.error('Error:', error);
      this.setState({
        isLoadedResultsStats: true,
        ErrorData: 'Cannot Connect',
        isSubmittedStats: true
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

    this.getSelectionsFromBackend("platform");
    this.getSelectionsFromBackend("Language");
    this.getSelectionsFromBackend("Genres");
    this.getSelectionsFromBackend("Year");
    this.getSelectionsFromBackend("Country");
    this.getSelectionsFromBackend("Age");

  }

  handlePlatformChange(event) {
    console.log("event: ", event);
    this.setState({
      PlatformValue: event,
      ErrorData: null,
      isSubmitted: false,
      isSubmittedStats: false,
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
      isSubmittedStats: false,
      offset: 0,
      [name]: value,
    });
  }

  handleChangePage(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    console.log(event.target.name);
    this.setState({
      ErrorData: null,
      isSubmitted: false,
      isSubmittedStats: false,
      offset: 0,
      [name]: parseInt(value),
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log("event", event);

    this.setState({
      isLoadedResults: false,
      isSubmittedStats: false
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
        default:
          console.log("Wrong number of platforms");
      }
    }
    else {
      this.getResultsFromBackend("platform", Platforms[0]);
    }

  }

  handleSubmitStatistics(event) {
    event.preventDefault();
    console.log("event", event);

    this.setState({
      isLoadedResultsStats: false,
    });

    this.getStatisticsFromBackend();

  }

  render() {

    if (!this.state.isLoaded) {
      return (
        <div id="loading" className="d-flex justify-content-center">
            <ReactLoading type={"spin"} color={"black"} height={"5%"} width={"5%"} />
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
          <form id="SubmitForm" onSubmit={this.handleSubmit}>

            <div className="form-group">
              <label htmlFor="FormPlatformSelect"></label>
              <h2>Select Streaming Platform</h2>
              <ToggleButtonGroupControlled PlatformValue={this.state.PlatformValue} handlePlatformChange={this.handlePlatformChange}/>
            </div>

            <div className="form-row">
              <div className="form-group col-md-8">
                <label htmlFor="FormControlInput1">Search by Movie Title:</label>
                <input type="text" className="form-control form-control-lg" id="FormControlInput1" placeholder="Movie Title..."
                  name="SubmittedTitle" value={this.state.SubmittedTitle} onChange={this.handleChange} />
              </div>

              <div className="form-group col-md-4">
                <label htmlFor="FormControlInput2">Search by Director:</label>
                <input type="text" className="form-control form-control-lg" id="FormControlInput2" placeholder="Director..."
                  name="SubmittedDirector" value={this.state.SubmittedDirector} onChange={this.handleChange} />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="FormControlSelect3">Search by Language:</label>
                <select className="form-control" id="exampleFormControlSelect3" name="SelectedLanguage" value={this.state.SelectedLanguage} onChange={this.handleChange}>
                  <option disabled selected value> -- Select Language -- </option>
                  {this.createSelect(this.state.Language, "Language")}
                </select>
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="FormControlSelect4">Search by Genre:</label>
                <select className="form-control" id="exampleFormControlSelect4" name="SelectedGenre" value={this.state.SelectedGenre} onChange={this.handleChange}>
                  <option disabled selected value> -- Select Genre -- </option>
                  {this.createSelect(this.state.Genres, "Genres")}
                </select>
              </div>
            </div>



            <div className="form-row">
              <div className="form-group col-md-4">
                <label htmlFor="FormControlSelect5">Search by Year:</label>
                <select className="form-control" id="exampleFormControlSelect5" name="SelectedYear" value={this.state.SelectedYear} onChange={this.handleChange}>
                  <option disabled selected value> -- Select Year -- </option>
                  {this.createSelect(this.state.Year, "Year")}
                </select>
              </div>
              <div className="form-group col-md-5">
                  <label htmlFor="FormControlSelect6">Search by Country:</label>
                <select className="form-control" id="exampleFormControlSelect6" name="SelectedCountry" value={this.state.SelectedCountry} onChange={this.handleChange}>
                  <option disabled selected value> -- Select Country -- </option>
                  {this.createSelect(this.state.Country, "Country")}
                </select>
              </div>
              <div className="form-group col-md-3">
                  <label htmlFor="FormControlSelect7">Search by Age:</label>
                <select className="form-control" id="exampleFormControlSelect7" name="SelectedAge" value={this.state.SelectedAge} onChange={this.handleChange}>
                  <option disabled selected value> -- Select Age -- </option>
                  {this.createSelect(this.state.Age, "Age")}
                </select>
              </div>
            </div>




            <div className="form-group row justify-content-center">
              <label className="col-auto col-form-label" htmlFor="FormControlSelect1">Order:</label>
              <div className="col-auto">
                <select className="form-control" id="FormControlSelect1" name="SelectedOrder" value={this.state.SelectedOrder} onChange={this.handleChange}>
                  {this.createSelect(this.state.Order, "Order")}
                </select>
              </div>
              <label className="col-auto col-form-label" htmlFor="FormControlSelect2">Sort by:</label>
              <div className="form-group col-auto">
                <select className="form-control" id="FormControlSelect2" name="SelectedOrderBy" value={this.state.SelectedOrderBy} onChange={this.handleChange}>
                  {this.createSelect(this.state.OrderBy, "OrderBy")}
                </select>
              </div>
              <label className="col-auto col-form-label" htmlFor="FormControlSelectLimit">Results per Page:</label>
              <div className="form-group col-auto">
                <select className="form-control" id="FormControlSelectLimit" name="limit" value={this.state.limit} onChange={this.handleChangePage}>
                  {this.createSelect(this.state.LimitList, "Limit")}
                </select>
              </div>
            </div>



            <div className="form-group">
              <button type="submit" className="btn btn-dark">Submit</button>
            </div>



            {(this.state.isSubmitted && (this.state.ErrorData !== 'Select Inputs') && (this.state.ErrorData !== 'Cannot Connect')) ? (
              <div className="form-group">
                <div>
                  <p>Page: {this.state.offset / this.state.limit + 1}</p>
                </div>
                <button className="btn btn-outline-secondary" onClick={this.previousPage}> Previous Page </button>
                {(this.state.ErrorData !== 'No Data Found') ? (
                    <button className="btn btn-outline-secondary" onClick={this.nextPage}> Next Page </button>
                  ) : (<div></div>)
                }
              </div>
            ) : (<div></div>)
            }

          </form>



            <form id="StatsForm" onSubmit={this.handleSubmitStatistics}>
              <div className="form-group">
                <button type="submit" className="btn btn-info">Statistics</button>
              </div>
            </form>




          <div>
            { this.state.ErrorDataStats
            ? (
              <div className="alert alert-danger" role="alert">
                { this.state.ErrorDataStats }
              </div>
            )
            : (
              <div>
                {<ShowStats isSubmittedStats={this.state.isSubmittedStats} ResultsStats={this.state.ResultsStats}
                  isLoadedResultsStats={this.state.isLoadedResultsStats}/>}
              </div>
            )}
          </div>

          

          <div>
            { this.state.ErrorData
            ? (
              <div className="alert alert-danger" role="alert">
                { this.state.ErrorData }
              </div>
            )
            : (
              <div>
                <div>
                  {<ShowResults HostnameAPI={this.props.HostnameAPI}
                    isSubmitted={this.state.isSubmitted} ResultsAPI={this.state.ResultsAPI}
                    isLoadedResults={this.state.isLoadedResults} base_url={this.props.base_url}
                    poster_size={this.props.poster_size}/>}
                </div>

                <ScrollButton scrollStepInPx="250" delayInMs="16.66"/>

              </div>

            )}
          </div>

        </div>

      );
    }
  }

}

export default BasicForm;

/* Platforms as switch-checkoxes */
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

/* Select Results per Page*/
// <div className="form-row justify-content-center">
//   <div className="form-group">
//     <label className="text-secondary" htmlFor="FormControlSelectLimit">Select Results per Page:</label>
//     <div className="col-sm-12">
//       <select className="form-control" id="exampleFormControlSelectLimit" name="limit" value={this.state.limit} onChange={this.handleChangePage}>
//         {this.createSelect(this.state.LimitList, "Limit")}
//       </select>
//     </div>
//   </div>
// </div>

/* Order and Results/page vertical alignment */
// <div className="form-row justify-content-center">
//   <div className="form-group col-md-2">
//   {/*<div className="form-group col-md-4">*/}
//     <label htmlFor="FormControlSelect1">Order:</label>
//     <select className="form-control" id="exampleFormControlSelect1" name="SelectedOrder" value={this.state.SelectedOrder} onChange={this.handleChange}>
//       {this.createSelect(this.state.Order, "Order")}
//     </select>
//   </div>
//   <div className="form-group col-md-2">
//   {/*<div className="form-group col-md-4">*/}
//     <label htmlFor="FormControlSelect2">Sort by:</label>
//     <select className="form-control" id="exampleFormControlSelect2" name="SelectedOrderBy" value={this.state.SelectedOrderBy} onChange={this.handleChange}>
//       {this.createSelect(this.state.OrderBy, "OrderBy")}
//     </select>
//   </div>
//   <div className="form-group col-md-2">
//   {/*<div className="form-group col-md-2">*/}
//       <label className="" htmlFor="FormControlSelectLimit">Results per Page:</label>
//       <select className="form-control" id="exampleFormControlSelectLimit" name="limit" value={this.state.limit} onChange={this.handleChangePage}>
//         {this.createSelect(this.state.LimitList, "Limit")}
//       </select>
//   </div>
// </div>
