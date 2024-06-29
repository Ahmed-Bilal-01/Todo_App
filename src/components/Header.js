import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Header = ({heading, navigation, backButton}) => {
  return (
    <View style={styles.container}>
      {backButton && (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.iconContainer}>
          <Icon name="chevron-left" size={18} color="black" />
        </TouchableOpacity>
      )}
      <Text style={styles.headingText}>{heading}</Text>
      <View style={styles.rightSpace} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 60,
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1.5,
    borderColor: '#ccc',
    paddingHorizontal: 10,
  },
  iconContainer: {
    padding: 8,
  },
  headingText: {
    color: 'black',
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    flex: 1,
  },
  rightSpace: {
    width: 22, // Ensure space on the right to keep the title centered
  },
});

export default Header;
