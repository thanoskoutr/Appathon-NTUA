import React from 'react';
import nophoto from './icons/nophoto.jpeg';

class GetPhotoTMDB extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Error: null,
      photo_url: ''
    };
  }

  getMovieDetails() {
    fetch(`http://${this.props.HostnameAPI}:8000/TMDB/search/movie?base_url=${this.props.base_url}&title=${this.props.item.Title}&poster_size=${this.props.poster_size}`,{
      method: 'GET',
    })
    .then((response) => {
      console.log(response.status, response.statusText);
      if (!response.ok) {
        this.setState({
          Error: response.statusText
        });
        throw Error(response.statusText);
      }
      else {
        this.setState({
          Error: null
        });
        return response.blob();
      }
    })
    .then(
      (image) => {
        console.log('image = ', image);
        const outside = URL.createObjectURL(image);
        console.log('outside = ', outside);
        this.setState({
          photo_url: outside
        });
      })
      .catch((error) => {
        console.error('Error:', error);
        this.setState({
          Error: 'No Path'
        });
      });

  }

  componentDidMount() {
    this.getMovieDetails();
  }

  render() {
    return (
      <div className="card bg-light">
      <img src={this.state.photo_url === "" ? nophoto : this.state.photo_url } className="card-img-top rounded" alt={"Photo for: " + this.props.item.Title}/>
      <div className="card-body">
        <h5 className="card-header">{this.props.item.Title}</h5>
        <p className="card-title"><b>Director:</b> {this.props.item.Directors === "" ? <small><i>No Data</i></small> : this.props.item.Directors}</p>
        <p className="card-title"><b>Year:</b> {this.props.item.Year === "" ? <small><i>No Data</i></small> : this.props.item.Year}</p>
        <p className="card-text"><b>Genre:</b> {this.props.item.Genres  === "" ? <small><i>No Data</i></small> : this.props.item.Genres}</p>
        <p className="card-text"><b>Language:</b> {this.props.item.Language  === "" ? <small><i>No Data</i></small> : this.props.item.Language}</p>
        <p className="card-text"><b>Country:</b> {this.props.item.Country  === "" ? <small><i>No Data</i></small> : this.props.item.Country}</p>
        <p className="card-text"><b>Runtime:</b> {this.props.item.Runtime === "" ? <small><i>No Data</i></small> : this.props.item.Runtime}</p>
        <p className="card-text"><b>IMDb Score:</b> {this.props.item.IMDb === "" ? <small><i>No Data</i></small> : this.props.item.IMDb}</p>
        <p className="card-text"><b>Rotten Tomatoes Score:</b> {this.props.item.Rotten_Tomatoes === "" ? <small><i>No Data</i></small> : this.props.item.Rotten_Tomatoes}</p>
        <p className="card-text"><b>Age:</b> {this.props.item.Age === "" ? <small><i>No Data</i></small> : this.props.item.Age}</p>
        <p className="card-text">
          <b>Platforms:</b>
          {this.props.item.Netflix === 1 ? <a href="https://www.netflix.com" target="_blank" rel="noopener noreferrer"> Netflix </a> : ''}
          {this.props.item.Hulu === 1 ? <a href="https://www.hulu.com" target="_blank" rel="noopener noreferrer"> Hulu </a> : ''}
          {this.props.item.Prime_Video === 1 ? <a href="https://www.primevideo.com/" target="_blank" rel="noopener noreferrer"> Prime Video </a> : ''}
          {this.props.item.Disney === 1 ? <a href="https://www.disneyplus.com" target="_blank" rel="noopener noreferrer"> Disney+ </a> : ''}
        </p>
        <a href={"https://www.google.com/search?q=" + this.props.item.Title} className="btn btn-info" target="_blank" rel="noopener noreferrer">Find More</a>
      </div>
      </div>
    );
  }
}

export default GetPhotoTMDB;
