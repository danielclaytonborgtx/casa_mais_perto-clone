// src/mapScreen.tsx
import React, { useEffect, useRef, useState } from 'react';
import { View, TouchableOpacity, Animated } from 'react-native';
import MapView, { Region } from 'react-native-maps';
import * as Location from 'expo-location';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { styles } from './styles';

const MapScreen: React.FC = () => {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const mapRef = useRef<MapView>(null); // Referência para o MapView
  const [animatedRegion] = useState(new Animated.Value(0)); // Estado animado

  useEffect(() => {
    const watchLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      const subscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 10000, // Atualiza a cada 10 segundos
          distanceInterval: 1, // Atualiza a cada 1 metro
        },
        (newLocation) => {
          setLocation(newLocation);
        }
      );

      return () => {
        subscription.remove(); // Remove a assinatura quando o componente é desmontado
      };
    };

    watchLocation();
  }, []);

  const handleUpdateLocation = async () => {
    let newLocation = await Location.getCurrentPositionAsync({});
    setLocation(newLocation);

    if (mapRef.current && newLocation) {
      const region: Region = {
        latitude: newLocation.coords.latitude,
        longitude: newLocation.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      };

      // Animação suave para o mapa
      Animated.timing(animatedRegion, {
        toValue: 1,
        duration: 1000, // Ajuste o tempo de animação conforme necessário
        useNativeDriver: false,
      }).start(() => {
        if (mapRef.current) {
          mapRef.current.animateToRegion(region, 1000); // Ajuste o tempo de animação conforme necessário
        }
      });
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        region={{
          latitude: location?.coords.latitude || 37.78825,
          longitude: location?.coords.longitude || -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation
        showsMyLocationButton={false} // Remove o botão de localização padrão
        showsCompass={false} // Remove a bússola
      >
        {/* Não inclua nenhum marcador adicional aqui */}
      </MapView>
      <TouchableOpacity style={styles.updateButton} onPress={handleUpdateLocation}>
        <MaterialCommunityIcons name="crosshairs-gps" size={20} />
      </TouchableOpacity>
    </View>
  );
};


export default MapScreen;
