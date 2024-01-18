import React, {  useState } from 'react';
import { GoogleApiWrapper } from 'google-maps-react';

const AddressInput = ({ google, onCoordinatesChange }) => {
  const [address, setAddress] = useState('');

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const searchAddress = () => {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: address }, (results, status) => {
      console.log("statis",status);
      if (status === 'OK') {
        if (results[0]) {
          const lat = results[0].geometry.location.lat();
          const lng = results[0].geometry.location.lng();

          onCoordinatesChange({ lat, lng });
        } else {
          console.log('검색된 결과가 없습니다.');
        }
      } else {
        console.log('지오코딩 요청이 실패했습니다.');
      }
    });
  };


  return (
    <div>
      <input
        type="text"
        placeholder="도로명 주소 입력"
        value={address}
        onChange={handleAddressChange}
      />
      <button type='button' onClick={searchAddress}>검색하기</button>
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCneMsRWKMVCH-nY4-ueOY21FMugC8-Nic',
})(AddressInput);