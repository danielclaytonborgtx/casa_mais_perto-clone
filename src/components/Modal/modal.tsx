import React, { useEffect, useRef, useState } from 'react';
import { Modal as RNModal, View, Text, TouchableOpacity, Animated } from 'react-native';
import { styles } from './styles';
import { User as IconUser } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../../services/auth'; 

interface ModalProps {
  visible: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ visible, onClose }) => {
  const slideAnim = useRef(new Animated.Value(-300)).current; 
  const [showModal, setShowModal] = useState(visible);
  const router = useRouter();
  const { user, isAuthenticated } = useAuth(); 

  useEffect(() => {
    if (visible) {
      setShowModal(true);
      Animated.timing(slideAnim, {
        toValue: 0, 
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: -300, 
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setShowModal(false); 
      });
    }
  }, [visible]);

  const handleNavigation = (route: string) => {
    router.push(route as any); 
    onClose(); 
  };

  const handleAddProperty = () => {
    if (isAuthenticated) {
      handleNavigation('/AddProduct/addProduct'); 
    } else {
      handleNavigation('/Login/login'); 
    }
  };

  return (
    <RNModal
      transparent={true}
      visible={showModal} 
      onRequestClose={onClose}
    >
      <TouchableOpacity style={styles.container} onPress={onClose}>
        <Animated.View style={[styles.modalContent, { transform: [{ translateX: slideAnim }] }]} >
          <View style={styles.sidebar}>
            {isAuthenticated && user ? ( // Verifica se user não é null
              <TouchableOpacity onPress={() => handleNavigation('/Profile/profile')} style={styles.userButton}>
                <Text style={styles.buttonText}>{user.username}</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => handleNavigation('/Login/login')} style={styles.button}>
                <IconUser size={24} color="black" />
                <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity onPress={() => handleNavigation('/')} style={styles.button}>
              <Text style={styles.buttonText}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleAddProperty} style={styles.button}>
              <Text style={styles.buttonText}>Adicionar imóvel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleNavigation('/Map/map')} style={styles.button}>
              <Text style={styles.buttonText}>Mapa</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleNavigation('/List/list')} style={styles.button}>
              <Text style={styles.buttonText}>Lista</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleNavigation('/AboutUs/aboutUs')} style={styles.button}>
              <Text style={styles.buttonText}>Sobre nós</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleNavigation('/Contat/contat')} style={styles.button}> 
              <Text style={styles.buttonText}>Contato</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </TouchableOpacity>
    </RNModal>
  );
};

export default Modal;
