import React, { useState } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const newTask: Task = {
done: false,
id: new Date().getTime(),
title: newTaskTitle
    }
    setTasks((state) => [...state, newTask])
  }

  function handleToggleTaskDone(id: number) {
const updatedTasks = tasks.map((item) => {
  if (item.id === id){
   item.done = !item.done
   return item
}
return item
  })
  setTasks(updatedTasks)
  }


  function handleRemoveTask(id: number) {
    const newArray = tasks.filter((item) =>  item.id !== id
    )
    setTasks(newArray)
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})