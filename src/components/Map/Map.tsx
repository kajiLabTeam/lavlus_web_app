import { MapContainer, TileLayer } from 'react-leaflet';
import { LatLng } from 'leaflet';
import { Geoman } from './Geoman';

import 'leaflet/dist/leaflet.css';

const Map = ({ onChange }: { onChange?: (geoJson: any) => void }) => {
  const position = new LatLng(35.1822679, 137.1113604);
  const zoomLv = 16;

  return (
    <MapContainer
      center={position}
      zoom={zoomLv}
      scrollWheelZoom={false}
      style={{ width: '100%', height: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        maxZoom={20}
      />
      <Geoman onChange={onChange} />
    </MapContainer>
  );
};

export default Map;
