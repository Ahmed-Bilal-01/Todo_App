import React, {useState, useCallback} from 'react';
import {
  View,
  Text,
  Button,
  FlatList,
  TextInput,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import TaskItem from '../components/TaskItem';
import {Picker} from '@react-native-picker/picker';
import Header from '../components/Header';

const TasksScreen = ({navigation}) => {
  const [tasks, setTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [categories, setCategories] = useState(['All']);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [totalTasks, setTotalTasks] = useState(0);

  // Function to load tasks from AsyncStorage
  const loadTasks = async () => {
    const savedTasks = await AsyncStorage.getItem('tasks');
    setTotalTasks(savedTasks.length);
    if (savedTasks) {
      const parsedTasks = JSON.parse(savedTasks);
      setTasks(parsedTasks);
      setFilteredTasks(parsedTasks);
      const uniqueCategories = [
        ...new Set(parsedTasks.map(task => task.category)),
      ];
      setCategories(['All', ...uniqueCategories]);
    }
  };

  // Reset search query, selected category, and load tasks on screen focus
  useFocusEffect(
    useCallback(() => {
      setSearchQuery('');
      setSelectedCategory('All');
      loadTasks();
    }, []),
  );

  // Function to save tasks to AsyncStorage
  const saveTasks = async updatedTasks => {
    await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  // Function to add a new task
  const addTask = () => {
    navigation.navigate('AddOrEditTaskScreen', {
      saveTask,
      totalTasks: totalTasks,
      heading: 'Add Task',
    });
  };

  // Function to edit an existing task
  const editTask = task => {
    navigation.navigate('AddOrEditTaskScreen', {
      saveTask,
      task,
      heading: 'Edit Task',
    });
  };

  // Function to save a task (either new or edited)
  const saveTask = task => {
    const taskIndex = tasks.findIndex(t => t.id === task.id);
    let updatedTasks;
    if (taskIndex > -1) {
      updatedTasks = [...tasks];
      updatedTasks[taskIndex] = task;
    } else {
      updatedTasks = [...tasks, task];
    }
    setTasks(updatedTasks);
    filterTasks(searchQuery, selectedCategory, updatedTasks);
    saveTasks(updatedTasks);
    const uniqueCategories = [...new Set(updatedTasks.map(t => t.category))];
    setCategories(['All', ...uniqueCategories]);
  };

  // Function to delete a task
  const deleteTask = id => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
    filterTasks(searchQuery, selectedCategory, updatedTasks);
    saveTasks(updatedTasks);
    loadTasks();
  };

  // Function to toggle the completion status of a task
  const toggleComplete = id => {
    const updatedTasks = tasks.map(task => {
      if (task.id === id) {
        return {...task, completed: !task.completed};
      }
      return task;
    });
    setTasks(updatedTasks);
    filterTasks(searchQuery, selectedCategory, updatedTasks);
    saveTasks(updatedTasks);
  };

  // Function to filter tasks based on search query and selected category
  const filterTasks = (query, category, tasks) => {
    let filtered = tasks;
    if (query) {
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(query.toLowerCase()),
      );
    }
    if (category !== 'All') {
      filtered = filtered.filter(task => task.category === category);
    }
    setFilteredTasks(filtered);
  };

  // Function to handle change in search query
  const handleSearchChange = query => {
    setSearchQuery(query);
    filterTasks(query, selectedCategory, tasks);
  };

  // Function to handle change in selected category
  const handleCategoryChange = category => {
    setSelectedCategory(category);
    filterTasks(searchQuery, category, tasks);
  };

  return (
    <View style={styles.mainContainer}>
      <Header heading={'Tasks'} />
      <View style={styles.innerContainer}>
        <Text style={styles.headingText}>Search</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search Tasks"
          value={searchQuery}
          onChangeText={handleSearchChange}
        />
        <Text style={styles.headingText}>Category</Text>
        <View style={styles.picker}>
          <Picker
            selectedValue={selectedCategory}
            onValueChange={handleCategoryChange}>
            {categories.map(category => (
              <Picker.Item key={category} label={category} value={category} />
            ))}
          </Picker>
        </View>
        <Text style={[styles.headingText, {marginBottom: 5}]}>Tasks</Text>

        <FlatList
          data={filteredTasks}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (
            <TaskItem
              task={item}
              onEdit={editTask}
              onDelete={deleteTask}
              onToggleComplete={toggleComplete}
            />
          )}
          keyExtractor={item => item.id.toString()}
        />
        <Button title="Add Task" onPress={addTask} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    padding: 16,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginVertical: 8,
    backgroundColor: 'white',
    height: 40,
    paddingLeft: '5%',
    borderRadius: 12,
  },
  picker: {
    height: 40,
    marginVertical: 8,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'center',
    borderRadius: 12,
  },
  headingText: {
    color: 'black',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default TasksScreen;
