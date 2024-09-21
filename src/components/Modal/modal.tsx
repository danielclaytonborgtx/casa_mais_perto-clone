import React, { useEffect, useRef } from 'react';
import { Modal as RNModal, View, Text, TouchableOpacity, Animated } from 'react-native';
import { styles } from './styles';
import { User as IconUser } from 'lucide-react-native';

interface ModalProps {
  visible: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ visible, onClose }) => {
  const slideAnim = useRef(new Animated.Value(-300)).current; // Começa fora da tela à esquerda

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

  return (
    <RNModal
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableOpacity style={styles.container} onPress={onClose}>
        <Animated.View style={[styles.modalContent, { transform: [{ translateX: slideAnim }] }]}>
          <View style={styles.sidebar}>
            <TouchableOpacity onPress={() => { /* Lógica de login */ }} style={styles.sidebarItemContainer}>
              <IconUser size={24} color="black" />
              <Text style={styles.sidebarItem}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {}} style={styles.sidebarItemContainer}>
              <Text style={styles.sidebarItem}>Sobre nós</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { /* Lógica de contato */ }} style={styles.sidebarItemContainer}>
              <Text style={styles.sidebarItem}>Contato</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </TouchableOpacity>
    </RNModal>
  );
};

export default Modal;
