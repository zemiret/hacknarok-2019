import React, { Component } from 'react';
import { Map, Marker, Polygon, TileLayer } from 'react-leaflet';
import { Link } from 'react-router-dom';


class MapView extends Component {

  constructor() {
    super();

    this.state = {
      user_position: [40, 39],
      other_positions: [
        [50.028108999999995, 19.8919536],
        [50.008108999999995, 19.9119536],
        [50.015108999999995, 19.9019536],
      ],
      polygons: []
    };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(this.onPosition, null, {
      enableHighAccuracy: true,
      timeout: 1000,
    });

    this.setState({
      polygons: [
        this.createPolygon(50.028108999999995, 19.8919536, 0.001, 'red'),
        this.createPolygon(50.028108999999995, 19.7919536, 0.001, 'blue')
      ]
    });
  }

  render() {
    const user_position = this.state.user_position;
    const other_positions = this.state.other_positions;
    const polygons = this.state.polygons;

    return (
      <div>
        <Map center={user_position} zoom={13}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          />
          <Marker position={user_position}/>

          {other_positions.map((pos, i) => {
            return <Marker position={pos} key={i}/>;
          })}

          {polygons.map((polygon, i) => {
            console.log(polygon);
            return <Polygon positions={polygon.positions} key={i} color={polygon.color}/>
          })}
        </Map>

        <Link to="/profile" className="clanBtn">
          Warrior profile
        </Link>
      </div>
    );
  }

  onPosition = (location) => {
    console.log(location.coords);

    this.setState({
      user_position: [location.coords.latitude, location.coords.longitude]
    })
  };

  createPolygon = (lat, lon, radius, color) => {
    const positions = [
      [lat - radius / 3, lon - radius],
      [lat + radius / 3, lon - radius],
      [lat + 2 * radius / 3, lon],
      [lat + radius / 3, lon +  radius],
      [lat - radius / 3, lon + radius],
      [lat - 2 * radius / 3, lon],
    ];

    return { positions, color };
  }
}

export default MapView;
