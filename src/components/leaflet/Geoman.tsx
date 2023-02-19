import React from 'react';
import { useLeafletContext } from '@react-leaflet/core';
import '@geoman-io/leaflet-geoman-free';
import '@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css';

export const Geoman = ({ onChange }: { onChange?: (geoJson: any) => void }) => {
  const context = useLeafletContext();

  const handleChange = React.useCallback(() => {
    const container = context.layerContainer || context.map;
    const geoJson = (container as any).pm.getGeomanLayers(true).toGeoJSON();
    onChange && onChange(geoJson);
  }, [context, onChange]);

  React.useEffect(() => {
    const container = context.layerContainer || context.map;
    // 初期化時に必要な設定らしい
    (container as any).pm.setGlobalOptions({ pmIgnore: false });
    // コントローラーの種類の設定
    (container as any).pm.addControls({
      drawMarker: false,
      drawCircleMarker: false,
      drawPolyline: false,
      drawText: false,
      cutPolygon: false,
    });
    // ポリゴンの作成イベント
    (container as any).on('pm:create', ({ layer }: any) => {
      // 作成したポリゴンに編集時イベントを付与
      layer.on('pm:edit', () => handleChange());
      handleChange();
    });
    // 削除時のイベント
    (container as any).on('pm:remove', () => handleChange());

    return () => {
      // 設定をもとに戻す
      (container as any).pm.removeControls();
      (container as any).pm.setGlobalOptions({ pmIgnore: true });
    };
  }, [context, handleChange]);

  return null;
};
