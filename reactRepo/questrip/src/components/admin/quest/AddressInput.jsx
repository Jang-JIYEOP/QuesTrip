import React, { useState, useRef, useEffect } from 'react';

const AddressInput = ({ onCoordinatesChange }) => {
    const [address, setAddress] = useState('');
    const [coordinates, setCoordinates] = useState(null);
    const autocompleteRef = useRef(null);

    useEffect(() => {
        const loadGoogleMaps = () => {
            const script = document.createElement('script');
            script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCneMsRWKMVCH-nY4-ueOY21FMugC8-Nic&libraries=places`;
            script.onload = initializeAutocomplete;
            document.head.appendChild(script);
        };

        const initializeAutocomplete = () => {
            const autocomplete = new window.google.maps.places.Autocomplete(
                autocompleteRef.current,
                { types: ['geocode'] }
            );
            autocomplete.addListener('place_changed', onPlaceChanged);
        };

        const onPlaceChanged = () => {
            const place = autocompleteRef.current.getPlace();
            if (place.geometry && place.geometry.location) {
                const { lat, lng } = place.geometry.location;
                setCoordinates({ latitude: lat(), longitude: lng() });
                onCoordinatesChange({ latitude: lat(), longitude: lng() });
            }
        };

        loadGoogleMaps();

    }, []); 

    const handleAddressChange = (e) => {
        setAddress(e.target.value);
    };

    return (
        <div>
            <label htmlFor="address">주소 입력:</label>
            <input
                type="text"
                id="address"
                ref={autocompleteRef}
                value={address}
                onChange={handleAddressChange}
            />

            {coordinates && (
                <div>
                    <p>좌표값:</p>
                    <p>Latitude: {coordinates.latitude}</p>
                    <p>Longitude: {coordinates.longitude}</p>
                </div>
            )}
        </div>
    );
};

export default AddressInput;