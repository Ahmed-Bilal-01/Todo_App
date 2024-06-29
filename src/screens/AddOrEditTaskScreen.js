import React, {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';
import Header from '../components/Header';

const AddOrEditTaskScreen = ({navigation, route}) => {
  const {saveTask, task, totalTasks, heading} = route.params || {};
  const [title, setTitle] = useState(task ? task.title : '');
  const [description, setDescription] = useState(task ? task.description : '');
  const [category, setCategory] = useState(task ? task.category : '');

  const [titleError, setTitleError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [categoryError, setCategoryError] = useState('');

  const handleSave = () => {
    let valid = true;

    if (title.trim() === '') {
      setTitleError('* This field is required');
      valid = false;
    } else {
      setTitleError('');
    }

    if (description.trim() === '') {
      setDescriptionError('* This field is required');
      valid = false;
    } else {
      setDescriptionError('');
    }

    if (category.trim() === '') {
      setCategoryError('* This field is required');
      valid = false;
    } else {
      setCategoryError('');
    }

    if (valid) {
      const newTask = {
        id: task ? task.id : totalTasks + 1,
        title,
        description,
        category,
        completed: task ? task.completed : false,
      };
      saveTask(newTask);
      navigation.goBack();
    }
  };

  return (
    <View>
      <Header backButton={true} heading={heading} navigation={navigation} />
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Title"
          value={title}
          onChangeText={setTitle}
        />
        {titleError ? <Text style={styles.errorText}>{titleError}</Text> : null}
        <TextInput
          style={styles.input}
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
        />
        {descriptionError ? (
          <Text style={styles.errorText}>{descriptionError}</Text>
        ) : null}
        <TextInput
          style={styles.input}
          placeholder="Category"
          value={category}
          onChangeText={setCategory}
        />
        {categoryError ? (
          <Text style={styles.errorText}>{categoryError}</Text>
        ) : null}
        <View style={styles.buttonContainer}>
          <Button title="Save" onPress={handleSave} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginVertical: 8,
    backgroundColor: 'white',
    borderRadius: 12,
    height: 40,
  },
  buttonContainer: {
    marginTop: 16,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: -5,
    marginBottom: 8,
  },
});

export default AddOrEditTaskScreen;
