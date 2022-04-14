import { chakra } from '@chakra-ui/react';
import { MapContainer, TileLayer } from 'react-leaflet';
import Geoman from './Geoman';

import 'leaflet/dist/leaflet.css';

const ChakraMapContainer = chakra(MapContainer, {
  baseStyle: {
    h: 'full',
    w: 'full',
  },
});

const Map = () => {
  const position = [35.1822679, 137.1113604];
  const zoomLv = 16;

  return (
    <ChakraMapContainer center={position} zoom={zoomLv} scrollWheelZoom={false}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        // maxZoom={20}
      />
      <Geoman />
    </ChakraMapContainer>
  );
};

export default Map;
