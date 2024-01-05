import React, { useState } from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';


const MapContainer = (props) => {
    const [showInfoWindow, setShowInfoWindow] = useState(false);

  const onMarkerClick = () => {
    setShowInfoWindow(true);
  };

  const onCloseInfoWindow = () => {
    setShowInfoWindow(false);
  };
  const mapStyles = {
    width: '30.3%',
    height: '44.5%',
  };

  return (
    <Map
      google={props.google}
      zoom={12}
      style={mapStyles}
      initialCenter={{
        lat: 37.5665, // 위도
        lng: 126.9780, // 경도
      }}
    >
    <Marker
        title="경복궁"
        name="경복궁"
        position={{ lat: 37.5775, lng: 126.9769 }}
        onClick={onMarkerClick}
      />

      <InfoWindow
        visible={showInfoWindow}
        onClose={onCloseInfoWindow}
        position={{ lat: 37.5775, lng: 126.9769 }}
      >
        <div>
          <h2>경복궁</h2>
          <p>경복궁 어디서든 한복입고 사진찍기</p>
        </div>
      </InfoWindow>
    </Map>
  );
};

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCneMsRWKMVCH-nY4-ueOY21FMugC8-Nic', // Replace YOUR_API_KEY with your actual API key
})(MapContainer);