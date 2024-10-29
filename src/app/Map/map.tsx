// src/mapScreen.tsx
import React, { useEffect, useRef, useState } from 'react';
import { View, TouchableOpacity, Animated } from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';
import * as Location from 'expo-location';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { styles } from './styles';
import { Imovel } from '../../@types'; // Certifique-se de que o caminho está correto

const MapScreen: React.FC = () => {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [imoveis, setImoveis] = useState<Imovel[]>([]); // Estado para armazenar os imóveis
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

    const fetchImoveis = async () => {
      try {
        const response = await fetch('http://192.168.100.6:3000/imoveis'); // URL para buscar todos os imóveis
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
    fetchImoveis(); // Chama a função para buscar imóveis
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
        {imoveis.map((imovel) => (
          <Marker
            key={imovel.id} // Certifique-se de que o ID é único
            coordinate={{
              latitude: imovel.latitude, // Substitua com a propriedade correta do imóvel
              longitude: imovel.longitude, // Substitua com a propriedade correta do imóvel
            }}
          >
            <View style={styles.marker} />
          </Marker>
        ))}
      </MapView>
      <TouchableOpacity style={styles.updateButton} onPress={handleUpdateLocation}>
        <MaterialCommunityIcons name="crosshairs-gps" size={20} />
      </TouchableOpacity>
    </View>
  );
};

export default MapScreen;
