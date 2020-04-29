import React from 'react'
import ReactDOM from 'react-dom'
import mapboxgl from 'mapbox-gl'
import Tooltip from './Tooltip/Tooltip'

const key = process.env.REACT_APP_MAP_BOX_PUBLIC_API_KEY
console.log(key)
mapboxgl.accessToken = key;

class Map extends React.Component {
  mapRef = React.createRef();
  tooltipContainer;

  setTooltip(features) {
    if (features.length) {
      ReactDOM.render(
        React.createElement(
          Tooltip, {
            features
          }
        ),
        this.tooltipContainer
      );
    } else {
      ReactDOM.unmountComponentAtNode(this.tooltipContainer);
    }
  }

  componentDidMount() {

    // Container to put React generated content in.
    this.tooltipContainer = document.createElement('div');

    const map = new mapboxgl.Map({
      container: this.mapRef.current,
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [-79.38, 43.65],
      zoom: 12.5
    });

    const tooltip = new mapboxgl.Marker(this.tooltipContainer, {
      offset: [-120, 0]
    }).setLngLat([0,0]).addTo(map);

    map.on('mousemove', (e) => {
      const features = map.queryRenderedFeatures(e.point);
      tooltip.setLngLat(e.lngLat);
      map.getCanvas().style.cursor = features.length ? 'pointer' : '';
      this.setTooltip(features);
    });
  }

  render() {
    return (
      <div ref={this.mapRef} className="absolute top right left bottom" />
    );
  }
}

export default Map