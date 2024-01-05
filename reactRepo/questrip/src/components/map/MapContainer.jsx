import React, { useState } from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import { useQuestMemory } from '../community/context/QuestContext';

const MapContainer = (props) => {
  const { questVoList } = useQuestMemory();

  const [showInfoWindow, setShowInfoWindow] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState(null);

  const onMarkerClick = (quest) => {

    console.log("Clicked Marker Lat:", quest.latitude);
    console.log("Clicked Marker Lng:", quest.longitude);

    
    
    setSelectedMarker(quest);
    setShowInfoWindow(true);
  };

  const onCloseInfoWindow = () => {
    setSelectedMarker(null);
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
    {questVoList.map((quest) => (
        <Marker
        key={quest.no}
        title={quest.title}
        name={quest.title}
        position={{ lat: quest.latitude, lng: quest.longitude }}
        quest={quest}
        onClick={() => onMarkerClick(quest)}
      />
      ))}

{selectedMarker && (
  <InfoWindow
    visible={showInfoWindow}
    onClose={onCloseInfoWindow}
    position={selectedMarker ? { lat: selectedMarker.latitude, lng: selectedMarker.longitude } : null}
  >
    <div>
      <h2>{selectedMarker.title}</h2>
      <p>{selectedMarker.content}</p>
    </div>
  </InfoWindow>
)}
    </Map>
  );
};

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCneMsRWKMVCH-nY4-ueOY21FMugC8-Nic', // Replace YOUR_API_KEY with your actual API key
})(MapContainer);