import React from 'react';
import nophoto from './icons/nophoto.jpeg';

class GetPhotoTMDB extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      TMDB_API_hostname: "https://api.themoviedb.org/3",
      api_key: "",
      Error: null,
      results: {},
      poster_path: '',
      photo_url: ''
    };
  }

  getMovieDetails() {
    fetch(`${this.state.TMDB_API_hostname}/search/movie?api_key=${this.state.api_key}&query=${this.props.item.Title}`,{
      method: 'GET',
    })
    .then((response) => {
      console.log(response.status, response.statusText);
      if (!response.ok) {
        this.setState({
          Error: 'TMDB API Error'
        });
        throw Error(response.statusText);
      }
      else {
        this.setState({
          Error: null
        });
        return response.json();
      }
    })
    .then(
      (json) => {
        // console.log('json = ', json);
        // console.log('json.results[0] = ', json.results[0]);
        // console.log('json.results[0].poster_path = ', json.results[0].poster_path);
        this.setState({
          results: json.results[0],
          poster_path: json.results[0].poster_path
        });

        fetch(`${this.props.base_url}/${this.props.poster_size}/${json.results[0].poster_path}`,{
          method: 'GET',
        })
        .then((response) => {
          console.log(response.status, response.statusText);
          if (!response.ok) {
            this.setState({
              Error: 'No Photo'
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
              Error: 'No Photo'
            });
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
      <img src={this.state.photo_url === "" ? nophoto : this.state.photo_url } className="card-img-top" alt={"Photo for: " + this.props.item.Title}/>
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
        <p className="card-text"><b>Platforms:</b> {this.props.item.Netflix === 1 ? 'Netflix' : ''} {this.props.item.Hulu === 1 ? 'Hulu' : ''} {this.props.item.Prime_Video === 1 ? 'Prime Video' : ''} {this.props.item.Disney === 1 ? 'Disney+' : ''}</p>
        <a href={"https://www.google.com/search?q=" + this.props.item.Title} className="btn btn-info" target="_blank" rel="noopener noreferrer">Find More</a>
      </div>
      </div>
    );
  }
}

export default GetPhotoTMDB;
