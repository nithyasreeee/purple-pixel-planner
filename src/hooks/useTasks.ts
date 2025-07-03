import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Task } from '@/types/task'
import { useAuth } from './useAuth'
import { toast } from '@/hooks/use-toast'

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  const fetchTasks = async () => {
    if (!user) return

    try {
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) throw error

      const formattedTasks = data.map(task => ({
        id: task.id,
        title: task.title,
        description: task.description,
        priority: task.priority,
        status: task.status,
        dueDate: task.due_date,
        category: task.category,
        isStarred: task.is_starred,
      }))

      setTasks(formattedTasks)
    } catch (error) {
      console.error('Error fetching tasks:', error)
      toast({
        title: "Error",
        description: "Failed to fetch tasks",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (user) {
      fetchTasks()
    } else {
      setTasks([])
      setLoading(false)
    }
  }, [user])

  const addTask = async (task: Omit<Task, 'id'>) => {
    if (!user) return

    try {
      const { data, error } = await supabase
        .from('tasks')
        .insert([{
          title: task.title,
          description: task.description,
          priority: task.priority,
          status: task.status || 'todo',
          due_date: task.dueDate,
          category: task.category,
          is_starred: task.isStarred || false,
          user_id: user.id,
        }])
        .select()
        .single()

      if (error) throw error

      const newTask = {
        id: data.id,
        title: data.title,
        description: data.description,
        priority: data.priority,
        status: data.status,
        dueDate: data.due_date,
        category: data.category,
        isStarred: data.is_starred,
      }

      setTasks(prev => [newTask, ...prev])
      toast({
        title: "Success",
        description: "Task created successfully",
      })
    } catch (error) {
      console.error('Error adding task:', error)
      toast({
        title: "Error",
        description: "Failed to create task",
        variant: "destructive",
      })
    }
  }

  const updateTask = async (taskId: string, updates: Partial<Task>) => {
    if (!user) return

    try {
      const { error } = await supabase
        .from('tasks')
        .update({
          title: updates.title,
          description: updates.description,
          priority: updates.priority,
          status: updates.status,
          due_date: updates.dueDate,
          category: updates.category,
          is_starred: updates.isStarred,
        })
        .eq('id', taskId)
        .eq('user_id', user.id)

      if (error) throw error

      setTasks(prev => prev.map(task => 
        task.id === taskId ? { ...task, ...updates } : task
      ))

      toast({
        title: "Success",
        description: "Task updated successfully",
      })
    } catch (error) {
      console.error('Error updating task:', error)
      toast({
        title: "Error",
        description: "Failed to update task",
        variant: "destructive",
      })
    }
  }

  const deleteTask = async (taskId: string) => {
    if (!user) return

    try {
      const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', taskId)
        .eq('user_id', user.id)

      if (error) throw error

      setTasks(prev => prev.filter(task => task.id !== taskId))
      toast({
        title: "Success",
        description: "Task deleted successfully",
      })
    } catch (error) {
      console.error('Error deleting task:', error)
      toast({
        title: "Error",
        description: "Failed to delete task",
        variant: "destructive",
      })
    }
  }

  const toggleTaskComplete = async (taskId: string) => {
    const task = tasks.find(t => t.id === taskId)
    if (!task) return

    const newStatus = task.status === 'completed' ? 'todo' : 'completed'
    await updateTask(taskId, { status: newStatus })
  }

  const toggleTaskStar = async (taskId: string) => {
    const task = tasks.find(t => t.id === taskId)
    if (!task) return

    await updateTask(taskId, { isStarred: !task.isStarred })
  }

  return {
    tasks,
    loading,
    addTask,
    updateTask,
    deleteTask,
    toggleTaskComplete,
    toggleTaskStar,
    refetch: fetchTasks,
  }
}