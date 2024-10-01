import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Modal from '../Modal/modal'; // Certifique-se de que o caminho está correto
import { styles } from './styles'

const Header: React.FC = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleAddProduct = () => {
    // Ação para adicionar um produto
    console.log('Adicionar produto');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.menuButton} onPress={toggleModal}>
        <Ionicons name="menu" size={60} color="black" />
      </TouchableOpacity>
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar mais perto"
        placeholderTextColor="black"
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddProduct}>
        <Ionicons name="add" size={40} color="black" style={{ transform: [{ scale: 1.3 }] }}/>
      </TouchableOpacity>
      <Modal visible={isModalVisible} onClose={toggleModal} />
    </View>
  );
};

export default Header;
