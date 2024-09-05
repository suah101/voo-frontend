import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// 커스텀 훅을 사용하여 지도 위치와 줌 레벨을 설정합니다.
const MapSetup = ({ center, zoom }: { center: [number, number]; zoom: number }) => {
  const map = useMap(); // 현재 지도 인스턴스를 가져옵니다.
  map.setView(center, zoom); // 지도 중심과 줌 레벨 설정
  return null; // 이 컴포넌트는 UI를 렌더링하지 않습니다.
};

const Posts = () => {
  const center: [number, number] = [37.5665, 126.9780]; // 서울의 위도와 경도

  return (
    <div>
      <h1>Posts Page</h1>
      {/* MapContainer를 사용하여 지도를 표시합니다. */}
      <MapContainer style={{ height: '400px', width: '100%' }}>
        
        {/* 지도의 타일 레이어를 설정합니다. */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          // attribution 속성은 이제 TileLayer에 포함되어야 할 수 있습니다.
        />
        
        {/* MapSetup 컴포넌트를 사용하여 지도 중심과 줌 레벨을 설정합니다. */}
        <MapSetup center={center} zoom={13} />
        
        {/* 지도에 마커를 추가합니다. */}
        <Marker position={center}>
          {/* 마커를 클릭했을 때 팝업을 표시합니다. */}
          <Popup>
            대한민국 서울. <br /> 여기를 중심으로 지도가 로드됩니다.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Posts;
