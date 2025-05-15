import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Modal } from 'react-native';
import { appColors } from '../utils/color';
import ArrowRight from '../assets/svg/ArrowIcon';

const BottomListModal = ({ isModalVisible, setModalVisible, data, setClassName, setSelectedClass, className, from }) => {

  const onItemClick = (item) => {
    if (from === "class") {
      setSelectedClass(item._id);
      setClassName(item.name);
      setModalVisible(false);
    } else {

    }

  };

  console.log("Data ===>", data);

  return (

    <View style={{ flex: 1, marginTop: 16 }}>
      <View
        style={{
          borderColor: appColors.black,
          borderWidth: 1,
          borderRadius: 8,
          padding: 8,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Text
          style={{ flex: 1, color: appColors.black }}
          onPress={() => setModalVisible(true)}>
          {from == "class" ? className : className.name}
        </Text>
        <TouchableOpacity
          style={{ transform: [{ rotate: '90deg' }] }}
          onPress={() => setModalVisible(true)}>
          <ArrowRight />
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.overlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{from == "class" ? "Select Class" : "Select Subject"}</Text>

            <FlatList
              data={data}
              renderItem={({ item, index }) => (
                <TouchableOpacity key={index} style={styles.item} onPress={() => onItemClick(item)}>
                  <Text style={styles.itemText}>{item.name}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </View>


  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    maxHeight: "40%",
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: "center",
  },
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    alignItems: "center",
  },
  itemText: {
    fontSize: 16,
    color: "#333",
  },
});

export default BottomListModal;
