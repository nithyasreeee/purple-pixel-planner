import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export interface Database {
  public: {
    Tables: {
      tasks: {
        Row: {
          id: string
          title: string
          description: string
          priority: 'low' | 'medium' | 'high'
          status: 'todo' | 'in-progress' | 'completed'
          due_date: string
          category: string
          is_starred: boolean
          user_id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          priority: 'low' | 'medium' | 'high'
          status?: 'todo' | 'in-progress' | 'completed'
          due_date: string
          category: string
          is_starred?: boolean
          user_id: string
        }
        Update: {
          title?: string
          description?: string
          priority?: 'low' | 'medium' | 'high'
          status?: 'todo' | 'in-progress' | 'completed'
          due_date?: string
          category?: string
          is_starred?: boolean
        }
      }
      user_balance: {
        Row: {
          id: string
          user_id: string
          work_hours: number
          personal_hours: number
          health_hours: number
          leisure_hours: number
          date: string
          created_at: string
        }
        Insert: {
          user_id: string
          work_hours?: number
          personal_hours?: number
          health_hours?: number
          leisure_hours?: number
          date: string
        }
        Update: {
          work_hours?: number
          personal_hours?: number
          health_hours?: number
          leisure_hours?: number
        }
      }
    }
  }
}