import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const TaskItem = ({task, onEdit, onDelete, onToggleComplete}) => {
  const {id, title, description, completed} = task;

  const handleToggleComplete = () => {
    onToggleComplete(id);
  };

  const handleEdit = () => {
    onEdit(task);
  };

  const handleDelete = () => {
    onDelete(id);
  };

  return (
    <View style={[styles.container, completed && styles.completedContainer]}>
      <View style={styles.titleAndCompleted}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
        </View>
        <TouchableOpacity
          onPress={handleToggleComplete}
          style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.completeText}>Complete</Text>
          <View style={[styles.checkbox, completed && styles.checked]}>
            {completed && <Icon name="check" size={14} color="#FFF" />}
          </View>
        </TouchableOpacity>
      </View>
      <Text style={styles.descriptionHeading}>Description:</Text>
      <Text style={styles.description}>{description}</Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={handleEdit}>
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleDelete}>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderWidth: 1.3,
    borderColor: '#ccc',
    borderRadius: 12,
    backgroundColor: '#fff',
    marginBottom: 8,
  },
  completedContainer: {
    borderColor: 'lightgreen', // Border color for completed tasks
  },
  titleAndCompleted: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
    color: 'black',
  },
  completeText: {
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 8,
    color: 'black',
  },
  descriptionHeading: {
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 8,
    color: 'black',
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checked: {
    backgroundColor: 'green',
    borderColor: 'green',
  },
  description: {
    marginBottom: 8,
    color: 'black',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  button: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    backgroundColor: '#007BFF',
    marginLeft: 8,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});

export default TaskItem;
