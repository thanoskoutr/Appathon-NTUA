import React from 'react';
import ReactLoading from 'react-loading';
import GetPhotoTMDB from './GetPhotoTMDB';

class ShowResults extends React.Component {

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
                <GetPhotoTMDB Backend_API_Hostname={this.props.Backend_API_Hostname} base_url={this.props.base_url} poster_size={this.props.poster_size} item={item}/>
              </div>
          ))}
        </div>
      );
    }
  }
}

export default ShowResults;
