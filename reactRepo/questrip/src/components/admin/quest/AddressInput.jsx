import React, {  useState } from 'react';
import { GoogleApiWrapper } from 'google-maps-react';
import styled from 'styled-components';

const StyledWriteDiv = styled.div`
  width: 100%;
  height: 100%;
  input{
    width: 100%;
  }
  button{
    width: 95px;
    padding: 10px;
    border: none;
    color: #fff;
    background-color: #4682B4;
    cursor: pointer;
    border-radius: 4px;
    transition: background-color 0.3s ease;
  }
`;

const AddressInput = ({ google, onCoordinatesChange }) => {
  const [address, setAddress] = useState('');
  const [isAddressConfirmed, setIsAddressConfirmed] = useState(false);

  const handleAddressChange = (e) => {
    if (!isAddressConfirmed) {
      setAddress(e.target.value);
    }
  };

  const searchAddress = () => {
    if (!isAddressConfirmed) {
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ address: address , language: 'ko'}, (results, status) => {
        if (status === 'OK') {
          if (results[0]) {
            const lat = results[0].geometry.location.lat();
            const lng = results[0].geometry.location.lng();
            const fullAddress = results[0].formatted_address;
            
            console.log('전체 주소: ', fullAddress);
            setAddress(fullAddress);
            setIsAddressConfirmed(true);
            onCoordinatesChange({ lat, lng, fullAddress  });
          } else {
            console.log('검색된 결과가 없습니다.');
          }
        } else {
          console.log('지오코딩 요청이 실패했습니다.');
        }
      });
    } else {
      setAddress('');
      setIsAddressConfirmed(false);
    }
  };


  return (
    <StyledWriteDiv>
      <input
        type="text"
        placeholder="도로명 주소 입력"
        value={address}
        onChange={handleAddressChange}
        disabled={isAddressConfirmed}
      />
      <button type='button' onClick={searchAddress}>{isAddressConfirmed ? '주소 재입력' : '확인'}</button>
    </StyledWriteDiv>
  );
};

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCneMsRWKMVCH-nY4-ueOY21FMugC8-Nic',
})(AddressInput);
