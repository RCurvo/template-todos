import React, { useState } from 'react';
import { Alert, StatusBar, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export type EditTaskArgs = {
  taskId: number
  taskNewTitle: string
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const todoWithSameTitle = tasks.find(task => task.title === newTaskTitle)

if (todoWithSameTitle){
  return Alert.alert('Task já cadastrada', 'Você não pode cadastrar uma task com o mesmo nome')
}

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
Alert.alert('Remover item', 'Tem certeza que você deseja remover esse item?', [
  {
style: 'cancel',
text: 'Não'
  },
  {
    style: 'destructive',
    text: 'Sim',
    onPress: () => {
      const updatedTasks = tasks.filter(task => task.id !== id)
      setTasks(updatedTasks)
    }
  }
])
  }

  function handleEditTask({taskId, taskNewTitle}: EditTaskArgs){
const uptatedTasks = tasks.map(task => ({...task}))

const taskToBeEdited = uptatedTasks.find(task => task.id === taskId)

if (!taskToBeEdited){
  return
}
taskToBeEdited.title = taskNewTitle

setTasks(uptatedTasks)



  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
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