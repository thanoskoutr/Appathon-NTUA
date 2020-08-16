import React from 'react';
import BasicForm from './BasicForm';

class GetConfigurationTMDB extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      TMDB_API_hostname: "https://api.themoviedb.org/3",
      api_key: "",
      Error: null,
      base_url: '',
      poster_sizes: [],
      poster_size: ''
    };
  }

  getConfiguration () {
    fetch(`${this.state.TMDB_API_hostname}/configuration?api_key=${this.state.api_key}`,{
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
        this.setState({
          base_url: json.images.secure_base_url,
          poster_sizes: json.images.poster_sizes,
          poster_size: json.images.poster_sizes[3]
        });
      })
      .catch((error) => {
        console.error('Error:', error);
        this.setState({
          Error: 'TMDB API Error'
        });
      });
  }

  componentDidMount() {
    this.getConfiguration();
  }

  render() {
    return (
      <BasicForm base_url={this.state.base_url} poster_sizes={this.state.poster_sizes} poster_size={this.state.poster_size}/>
    );
  }
}

export default GetConfigurationTMDB;
