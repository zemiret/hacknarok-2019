import React, { Component } from 'react';
import { Map, Marker, Polygon, TileLayer } from 'react-leaflet';


class MapView extends Component {

  state = {
    user_position: [40, 39],
    other_positions: [
      [50.028108999999995, 19.8919536],
      [50.008108999999995, 19.9119536],
      [50.015108999999995, 19.9019536],
    ],
    polygons: [
      [
        [50.028108999999995, 19.8919536],
        [50.028208999999995, 19.8929536],
        [50.029308999999995, 19.9039536],
        [50.028008999999995, 19.9209536],
      ]
    ],
  };

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(this.onPosition, null, {
      enableHighAccuracy: true,
      timeout: 1000,
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
            return <Polygon positions={polygon} key={i} color="blue"/>
          })}
        </Map>

        <button className="clanBtn" onClick={this.onBtnClick}>
          Clans
        </button>
      </div>
    );
  }

  onBtnClick = () => {
    console.log('Btn clicked!');
  };

  onPosition = (location) => {
    console.log(location.coords);
    // alert(location.coords);

    this.setState({
      user_position: [location.coords.latitude, location.coords.longitude]
    })
  };
}

export default MapView;
