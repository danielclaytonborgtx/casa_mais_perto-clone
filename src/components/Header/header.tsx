import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Modal from '../Modal/modal'; // Certifique-se de que o caminho está correto
import { styles } from './styles'

const Header: React.FC = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.menuButton} onPress={toggleModal}>
        <Ionicons name="menu" size={60} color="gray" />
      </TouchableOpacity>
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar mais perto"
        placeholderTextColor="#888"
      />
      <Modal visible={isModalVisible} onClose={toggleModal} />
    </View>
  );
};


export default Header;
