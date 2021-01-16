import React, { Component } from 'react';
import { InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

import CurrentLocation from './CurrentLocation';

class Map extends Component {

  constructor(props) {
    super(props);

    this.state = {
      showingInfoWindow: false,  // Hides or shows the InfoWindow
      activeMarker: {},          // Shows the active marker upon click
      selectedPlace: {},         // Shows the InfoWindow to the selected place upon a marker
      data: window.mapsData || [],
    };
  }

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  render() {
    const { data } = this.state

    return (
      <CurrentLocation
        centerAroundCurrentLocation
        google={this.props.google} >
        {data.map(map =>
             <Marker
             onClick={this.onMarkerClick}
             name={map.name}
             position={{ lat: map.lat, lng: map.lng }}
             address={map.address}
             telephone={map.telephone}
           />
          )}
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onOpen={this.onOpen}
          onClose={this.onClose}>
          <div style={{maxWidth: '22rem'}}>
            <h2 style={{ marginTop: '.5rem', marginBottom: 0 }}>{this.state.selectedPlace.name}</h2>
            <p style={{ marginTop: '.5rem' }}>{this.state.selectedPlace.address}</p>
            <p>{this.state.selectedPlace.telephone}</p>
          </div>
        </InfoWindow>
      </CurrentLocation>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDh04bTP182Gg83hb3FSpUDlS7sB0GbIWI'
})(Map);