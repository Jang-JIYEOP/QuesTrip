import React, { useEffect, useState } from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import { useQuestMemory } from '../community/context/QuestContext';

const MapContainer = (props) => {
  const { questVoList } = useQuestMemory();

  const [showInfoWindow, setShowInfoWindow] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState(null);

  const [mapCenter, setMapCenter] = useState({
    lat: 37.5665, // 기본 위도
    lng: 126.9780, // 기본 경도
  });

  useEffect(() => {
    if (props.selectedQuest) {
      // 선택된 quest가 변경될 때마다 맵의 중심을 해당 마커의 위치로 변경
      
      onMarkerClick(props.selectedQuest);
    }
  }, [props.selectedQuest]);

  const onMarkerClick = (quest) => {
    setSelectedMarker(quest);
    setShowInfoWindow(true);
  };

  const onCloseInfoWindow = () => {
    setSelectedMarker(null);
    setShowInfoWindow(false);
  };
 
  const mapStyles = {
    width: '45.7%',
    height: '46%',
  };

  useEffect(() => {
    // questVoList이 변경될 때마다 맵의 중심을 첫 번째 마커의 위치로 변경
    if (questVoList.length > 0) {
      setMapCenter({
        lat: questVoList[0].latitude,
        lng: questVoList[0].longitude,
      });
    }
  }, [questVoList]);

  return (

    
    <Map
      google={props.google}
      zoom={13}
      style={mapStyles}
      center={mapCenter}
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