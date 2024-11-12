import React, { useEffect, useRef, useState } from 'react';
import { View, TouchableOpacity, Animated, Image, Text } from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';
import * as Location from 'expo-location';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { styles } from './styles';
import { Imovel } from '../../@types';
import { useRouter } from 'expo-router';

const MapScreen: React.FC = () => {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [imoveis, setImoveis] = useState<Imovel[]>([]);
  const mapRef = useRef<MapView>(null);
  const [selectedImovel, setSelectedImovel] = useState<Imovel | null>(null);
  const router = useRouter();
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
          timeInterval: 10000,
          distanceInterval: 1,
        },
        (newLocation) => {
          setLocation(newLocation);
        }
      );

      return () => {
        subscription.remove();
      };
    };

    const fetchImoveis = async () => {
      try {
        const response = await fetch('https://casa-mais-perto-server-clone-production.up.railway.app/imoveis');
        if (!response.ok) {
          throw new Error('Falha ao buscar imóveis');
        }
        const data = await response.json();
        setImoveis(data);
      } catch (error) {
        console.error('Erro ao buscar imóveis:', error);
      }
    };

    watchLocation();
    fetchImoveis();
  }, []);

  const handleMarkerPress = (imovel: Imovel) => {
    setSelectedImovel(imovel);
  };

  const handleCloseInfoWindow = () => {
    setSelectedImovel(null);
  };

  const handleImagePress = (imovelId: number) => {
    router.push(`/ProductDetail/${imovelId}`);
  };

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
        duration: 1000,
        useNativeDriver: false,
      }).start(() => {
        if (mapRef.current) {
          mapRef.current.animateToRegion(region, 1000); 
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
        showsMyLocationButton={false}
        showsCompass={false}
      >
        {imoveis.map((imovel) => (
          <Marker
            key={imovel.id}
            coordinate={{
              latitude: imovel.latitude,
              longitude: imovel.longitude,
            }}
            onPress={() => handleMarkerPress(imovel)}
          >
            <View style={styles.marker} />
          </Marker>
        ))}
      </MapView>
      <TouchableOpacity style={styles.updateButton} onPress={handleUpdateLocation}>
        <MaterialCommunityIcons name="crosshairs-gps" size={20} />
      </TouchableOpacity>
      
      {selectedImovel && (
        <View style={styles.infoWindow}>
          <TouchableOpacity style={styles.closeButton} onPress={handleCloseInfoWindow}>
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleImagePress(selectedImovel.id)}>
            <Image
              source={{ uri: selectedImovel.imagens[0]?.url }}
              style={styles.image}
            />
          </TouchableOpacity>
          <Text style={styles.title}>{selectedImovel.titulo}</Text>
        </View>
      )}
    </View>
  );
};

export default MapScreen;
