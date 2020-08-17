import React from 'react';
import BasicForm from './BasicForm';

class GetConfigurationTMDB extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // Backend_API_Hostname: '192.168.43.91',
      Backend_API_Hostname: 'localhost',
      Error: null,
      base_url: '',
      poster_sizes: [],
      poster_size: ''
    };
  }

  getConfiguration () {
    fetch(`http://${this.state.Backend_API_Hostname}:8000/TMDB/configuration`,{
      method: 'GET',
    })
    .then((response) => {
      // console.log(response.status, response.statusText);
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
      <BasicForm Backend_API_Hostname={this.state.Backend_API_Hostname} base_url={this.state.base_url} poster_sizes={this.state.poster_sizes} poster_size={this.state.poster_size}/>
    );
  }
}

export default GetConfigurationTMDB;
