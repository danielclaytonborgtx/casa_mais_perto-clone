import React from 'react';
import { Modal as RNModal, View, Text, Button, StyleSheet } from 'react-native';
import { styles } from './styles'

interface ModalProps {
  visible: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ visible, onClose }) => {
  return (
    <RNModal
      transparent={true}
      visible={visible}
      onRequestClose={onClose} // Adicione o handler para o fechamento
    >
      <View style={styles.container}>
        <View style={styles.modalContent}>
          <Text>Conteúdo do Modal</Text>
          <Button title="Fechar" onPress={onClose} />
        </View>
      </View>
    </RNModal>
  );
};


export default Modal;
