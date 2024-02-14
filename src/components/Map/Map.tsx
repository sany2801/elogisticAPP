import React, { useCallback, useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import 'leaflet/dist/leaflet.css';
import search_icon from '../../images/SearchIcon.svg';
import close_icon from '../../images/CloseSquareIcon.svg';
import DraggableMarker from './DraggableMarker';
import DefaultButton from '../DefaultButton/DefaultButton';
import WhiteButton from '../WhiteButton/WhiteButton';
import MapStyle from './Map.module.css';

type Coords_type = [number, number];

type Map_props = {
  setState: () => void
}

const Map: React.FC<Map_props> = ({ setState }) => {
  const input = useRef<HTMLInputElement>(null);
  const [mapCenter, setMapCenter] = useState<Coords_type>([0, 0]);
  const [zoom, setZoom] = useState<number>(13);
  const [label, setLabel] = useState<string>("");
  const provider = new OpenStreetMapProvider();


  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  }

  const ChangeView = ({ center, zoom }: { center: Coords_type; zoom: number }) => {
    const map = useMap();
    map.setView(center, zoom);
    return null;
  }

  const handle_clear_input = () => {
    if (input.current) {
      input.current.value = "";
    }
  }

  const get_label = useCallback(async () => {
    const results = await provider.search({ query: mapCenter.join(",") });
    if (results && results.length > 0) {
      setLabel(results[0].label);
    }
  }, [mapCenter, provider])

  useEffect(() => {
    get_label();
    if (input.current) {
      input.current.value = label;
      localStorage.setItem('users_address', label);
    }
  }, [mapCenter, label, get_label])

  useEffect(() => {
    // Get user's current coordinates
    navigator.geolocation.getCurrentPosition(
      position => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const currentPosition: Coords_type = [latitude, longitude];
        setMapCenter(currentPosition);
      },
      error => {
        console.error(error.message);
      }
    );

  }, []);

  async function handleInput() {
    if (input.current) {
      const address = input.current.value;
      const results = await provider.search({ query: address });
      if (results && results.length > 0) {
        const { x, y } = results[0];
        const newPosition: Coords_type = [y, x];
        setMapCenter(newPosition);
        get_label();
      }
    }
  }

  // console.log(mapCenter);

  return (
    <div id={MapStyle.map_container}>
      <div id={MapStyle.map_info}>
        <h2>Adding an address</h2>
        <p>Select a point on the map or enter an address</p>
        <div id={MapStyle.info}>
          <div id={MapStyle.input_frame}>
            <img onClick={handleInput} id={MapStyle.icon} src={search_icon} alt="search" />
            {input.current && input.current.value !== "" && (
              <img onClick={handle_clear_input} id={MapStyle.close_icon} src={close_icon} alt="close" />
            )}
            <input ref={input} type="text" onChange={handleChangeInput} id={MapStyle.address_input} />
          </div>
          {input.current && input.current.value !== "" ? (
            <DefaultButton
              setState={setState}
              button_text={'Choose'}
              width={110}
              height={32}
            />
          ) : (
            <WhiteButton
              setState={setState}
              button_text={'Choose'}
              width={110}
              height={32}
            />
          )}
        </div>
      </div>
      <MapContainer
        id={MapStyle.map}
        center={mapCenter}
        zoom={zoom}
        scrollWheelZoom={true}
      >
        <ChangeView center={mapCenter} zoom={zoom} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <DraggableMarker
          mapCenter={mapCenter}
          setMapCenter={setMapCenter}
          setZoom={setZoom}
          label={label}
        />
      </MapContainer>
    </div>
  );
};

export default Map;
