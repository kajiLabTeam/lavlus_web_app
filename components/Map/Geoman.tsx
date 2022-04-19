import React from 'react';
import { useLeafletContext } from '@react-leaflet/core';
import '@geoman-io/leaflet-geoman-free';
import '@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css';

interface MapProps {
  edit?: boolean;
  onChange: (e: any) => void;
}

const Geoman = (props: MapProps) => {
  const context = useLeafletContext();

  React.useEffect(() => {
    const leafletContainer = context.layerContainer || context.map;

    leafletContainer.pm.addControls({
      drawMarker: false,
    });

    leafletContainer.pm.setGlobalOptions({ pmIgnore: false });

    leafletContainer.on('pm:create', (e: any) => {
      if (e.layer && e.layer.pm) {
        const shape = e;
        // console.log(e);

        // enable editing of circle
        shape.layer.pm.enable();

        // console.log(`object created: ${shape.layer.pm.getShape()}`);

        // console.log(leafletContainer.pm.getGeomanLayers(true).toGeoJSON());

        props.onChange(leafletContainer.pm.getGeomanLayers(true).toGeoJSON());

        leafletContainer.pm
          .getGeomanLayers(true)
          .bindPopup('i am whole')
          .openPopup();
        leafletContainer.pm
          .getGeomanLayers()
          .map((layer: any, index: any) =>
            layer.bindPopup(`I am figure N° ${index}`),
          );
        shape.layer.on('pm:edit', (e: any) => {
          const event = e;
          // console.log(leafletContainer.pm.getGeomanLayers(true).toGeoJSON());
        });
      }
    });

    leafletContainer.on('pm:remove', (e: any) => {
      console.log('object removed');
      // console.log(leafletContainer.pm.getGeomanLayers(true).toGeoJSON());
    });

    return () => {
      leafletContainer.pm.removeControls();
      leafletContainer.pm.setGlobalOptions({ pmIgnore: true });
    };
  }, [context]);

  return null;
};

export default Geoman;
