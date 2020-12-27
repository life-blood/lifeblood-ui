import React, { Component } from 'react';
import { InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

import CurrentLocation from './CurrentLocation';

class Map extends Component {

  constructor(props) {
    super(props);

    this.state = {
      showingInfoWindow: false,  // Hides or shows the InfoWindow
      activeMarker: {},          // Shows the active marker upon click
      selectedPlace: {}          // Shows the InfoWindow to the selected place upon a marker
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
    return (
      <CurrentLocation
        centerAroundCurrentLocation
        google={this.props.google} >
        <Marker
          onClick={this.onMarkerClick}
          name={'Районен център по трансфузионна хематология - Варна'}
          position={{ lat: 43.21476771342051, lng: 27.918031648984652 }}
          address={'Адрес: МБАЛ „Св. Ана-Варна“, 9002 Варна Център, Варна'}
          telephone={'Телефон: +35952681811'}
        />
        <Marker
          onClick={this.onMarkerClick}
          name={'Национален център по клинична и трансфузионна хематология - София'}
          position={{ lat: 42.708697852837645, lng: 23.320315655520577 }}
          address={'Адрес: ул. „Братя Миладинови“ 112, 1202 Център, София'}
          telephone={'Телефон: +35929210417'}
        />
        <Marker
          onClick={this.onMarkerClick}
          name={'РЦ по трансфузионна хематология - Пловдив'}
          position={{ lat: 42.26790449315521, lng: 24.67422955050839 }}
          address={'Адрес: Пловдив 234, 4027 Гагарин, Пловдив'}
          telephone={'Телефон: +35932904402'}
        />
        <Marker
          onClick={this.onMarkerClick}
          name={'Кръвен център - Бургас'}
          position={{ lat: 42.51444757865788, lng: 27.465726755515288 }}
          address={'Адрес: бул. „Стефан Стамболов“ 73, 8018 ж.к. Зорница, Бургас'}
          telephone={'Телефон: +359879357474'}
        />
        <Marker
          onClick={this.onMarkerClick}
          name={'Районен център по трансфузионна хематология (РЦТХ) - Плевен'}
          position={{ lat: 43.857377375907596, lng: 25.960651582540887 }}
          address={'Адрес: ул. „Независимост“, 7000 Русе Център, Русе'}
          telephone={'Телефон: +35982887236'}
        />
        <Marker
          onClick={this.onMarkerClick}
          name={'РАЙОНЕН Ц-Р ПО ТРАНСФУЗИОННА ХЕМАТОЛОГИЯ - Стара Загора'}
          position={{ lat: 42.42486231842029, lng: 25.611364276677836 }}
          address={'Адрес: ул. „Генерал Столетов“ 2, 6003 кв. Възраждане, Стара Загора'}
          telephone={'Телефон: +35942611404'}
        />
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