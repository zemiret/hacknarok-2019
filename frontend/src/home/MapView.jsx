import React, { Component } from 'react';
import { Map, Marker, Polygon, TileLayer } from 'react-leaflet';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Config from '../config';
import {degreeFromMetres} from '../utils';


class MapView extends Component {

  constructor() {
    super();

    this.state = {
      user: null,
      other_positions: [
        [50.028108999999995, 19.8919536],
        [50.008108999999995, 19.9119536],
        [50.015108999999995, 19.9019536]
      ],
      beacons: []
    };

    this.locationWatch = -1;
  }

  componentDidMount() {
    this.locationWatch = navigator.geolocation.watchPosition(this.onPosition, console.log, {
      enableHighAccuracy: true,
      timeout: 1000
    });

    this.getBeacons();
    // this.getOthers();

    setInterval(() => {
      this.getBeacons();
    }, 3000);

    // setInterval(() => {
    //   this.getOthers();
    // }, 3000);

    axios
      .get(Config.BASE_URL + 'users/user/1')
      .then((res) => {
        this.setState({
          user: res.data
        });
      });
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.locationWatch);
  }

  render() {
    const { user, other_positions, beacons } = this.state;
    const pos = user == null ? [0, 0] : [this.state.user.lat, this.state.user.lon];


    console.log(beacons);

    return (
      <div>
        <Map center={pos} zoom={18}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          />
          {user && <Marker position={pos}/>}

          {other_positions.map((pos, i) => {
            return <Marker position={pos} key={i}/>;
          })}

          {beacons.map((polygon, i) => {
            return <Polygon positions={polygon.positions} key={i} color={polygon.color}/>;
          })}
        </Map>

        <Link to="/profile" className="clanBtn">
          Warrior profile
        </Link>

        <button onClick={this.startCapture} className="captureBtn">
          Start capture
        </button>
      </div>
    );
  }

  onPosition = (location) => {
    const lat = location.coords.latitude;
    const lon = location.coords.longitude;

    this.setState({
      user: {
        ...this.state.user,
        lat, lon
      }
    });

    if (this.state.user.id != null) {
      axios.post(Config.BASE_URL + 'users/move/' + this.state.user.id + '/' + lat + '/' + lon);
    }
  };

  createPolygon = (lat, lon, radius, color) => {
    radius = degreeFromMetres(radius);

    const positions = [
      [lat - radius / 3, lon - radius],
      [lat + radius / 3, lon - radius],
      [lat + 2 * radius / 3, lon],
      [lat + radius / 3, lon + radius],
      [lat - radius / 3, lon + radius],
      [lat - 2 * radius / 3, lon]
    ];

    return { positions, color };
  };

  startCapture = () => {
    if (this.state.user != null) {

      axios
        .post(Config.BASE_URL + 'users/start_capture/' + this.state.user.id)
        .then((res) => res.data)
        .then((beacon) => {
          console.log(beacon);
          setTimeout(
            () => {
              axios.post(Config.BASE_URL + 'users/end_capture/' + this.state.user.id)
                .then(() => this.getBeacons());
            },
            beacon.capture_time * 1000
          );
        })
        .catch((error) => console.log('error: ' + error));
    }
  };

  getBeacons = () => {
    axios
      .get(Config.BASE_URL + 'beacons')
      .then((res) => {
        const data = res.data;

        this.setState({
          beacons: data.map(beacon => this.createPolygon(beacon.lat, beacon.lon, beacon.range, '#' + beacon.color || '#000000'))
        } );
      });
  };

  // getOthers = () => {
  //
  // }
}

export default MapView;
