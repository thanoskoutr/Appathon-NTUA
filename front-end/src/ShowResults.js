import React, { Component } from 'react';
import ReactLoading from 'react-loading';
import InfiniteScroll from 'react-infinite-scroll-component';

class ShowResults extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {};
  }

  render() {

    if (!this.props.isLoadedResults) {
      return (
        <div id="loading" className="d-flex justify-content-center">
          <ReactLoading type={"spin"} color={"black"} height={"5%"} width={"5%"} />
        </div>
      );
    }
    else {
      return (
        <div className="row">
          {this.props.isSubmitted && this.props.ResultsAPI.map(item => (
              <div className="col-sm-6" key={item.ID}>
                <div className="card bg-light">
                  <h5 className="card-header">{item.Title}</h5>
                  <div className="card-body">
                    <p className="card-title"><b>Director:</b> {item.Directors}</p>
                    <p className="card-title"><b>Year:</b> {item.Year}</p>
                    <p className="card-text"><b>Genre:</b> {item.Genres}</p>
                    <p className="card-text"><b>Runtime:</b> {item.Runtime}</p>
                    <p className="card-text"><b>IMDb Score:</b> {item.IMDb}</p>
                    <p className="card-text"><b>Rotten Tomatoes Score:</b> {item.Rotten_Tomatoes}</p>
                    <p className="card-text"><b>Platforms:</b> {item.Netflix === 1 ? 'Netflix' : ''} {item.Hulu === 1 ? 'Hulu' : ''} {item.Prime_Video === 1 ? 'Prime Video' : ''} {item.Disney === 1 ? 'Disney+' : ''}</p>
                    <a href={"https://www.google.com/search?q=" + item.Title} className="btn btn-info" target="_blank" rel="noopener noreferrer">Find More</a>
                  </div>
                </div>
              </div>
          ))}
        </div>
      );
    }
  }
}

export default ShowResults;

  // <div id="loading">
  //   <div className="d-flex justify-content-center">
  //     Loading...
  //   </div>
  // </div>
