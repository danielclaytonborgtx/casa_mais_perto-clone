import React, { useEffect, useRef } from 'react';
import { Modal as RNModal, View, Text, TouchableOpacity, Animated } from 'react-native';
import { styles } from './styles';
import { User as IconUser } from 'lucide-react-native';
import { useRouter } from 'expo-router';

interface ModalProps {
  visible: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ visible, onClose }) => {
  const slideAnim = useRef(new Animated.Value(-300)).current; // Começa fora da tela à esquerda
  const router = useRouter();

  useEffect(() => {
    if (visible) {
      // Animação para abrir o modal
      Animated.timing(slideAnim, {
        toValue: 0, // Anima para a posição 0 (visível)
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      // Animação para fechar o modal
      Animated.timing(slideAnim, {
        toValue: -300, // Anima para fora da tela à esquerda
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  const handleNavigation = (route: string) => {
    router.push(route as any); // Usando type assertion
    onClose(); // Fecha o modal
  };

  return (
    <RNModal
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableOpacity style={styles.container} onPress={onClose}>
        <Animated.View style={[styles.modalContent, { transform: [{ translateX: slideAnim }] }]}>
          <View style={styles.sidebar}>
            <TouchableOpacity onPress={() => handleNavigation('/Login/login')} style={styles.button}>
              <IconUser size={24} color="white" />
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleNavigation('/SobreNos')} style={styles.button}>
              <Text style={styles.buttonText}>Sobre nós</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleNavigation('/Contato')} style={styles.button}>
              <Text style={styles.buttonText}>Contato</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </TouchableOpacity>
    </RNModal>
  );
};

export default Modal;
