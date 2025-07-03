import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from './useAuth'
import { toast } from '@/hooks/use-toast'

export interface BalanceData {
  id?: string
  workHours: number
  personalHours: number
  healthHours: number
  leisureHours: number
  date: string
}

export const useBalance = () => {
  const [balance, setBalance] = useState<BalanceData | null>(null)
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  const fetchTodayBalance = async () => {
    if (!user) return

    try {
      const today = new Date().toISOString().split('T')[0]
      
      const { data, error } = await supabase
        .from('user_balance')
        .select('*')
        .eq('user_id', user.id)
        .eq('date', today)
        .single()

      if (error && error.code !== 'PGRST116') throw error

      if (data) {
        setBalance({
          id: data.id,
          workHours: data.work_hours,
          personalHours: data.personal_hours,
          healthHours: data.health_hours,
          leisureHours: data.leisure_hours,
          date: data.date,
        })
      } else {
        // Create default balance for today
        setBalance({
          workHours: 0,
          personalHours: 0,
          healthHours: 0,
          leisureHours: 0,
          date: today,
        })
      }
    } catch (error) {
      console.error('Error fetching balance:', error)
      toast({
        title: "Error",
        description: "Failed to fetch balance data",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (user) {
      fetchTodayBalance()
    } else {
      setBalance(null)
      setLoading(false)
    }
  }, [user])

  const updateBalance = async (balanceData: BalanceData) => {
    if (!user) return

    try {
      const { data, error } = await supabase
        .from('user_balance')
        .upsert({
          user_id: user.id,
          work_hours: balanceData.workHours,
          personal_hours: balanceData.personalHours,
          health_hours: balanceData.healthHours,
          leisure_hours: balanceData.leisureHours,
          date: balanceData.date,
        })
        .select()
        .single()

      if (error) throw error

      setBalance({
        id: data.id,
        workHours: data.work_hours,
        personalHours: data.personal_hours,
        healthHours: data.health_hours,
        leisureHours: data.leisure_hours,
        date: data.date,
      })

      toast({
        title: "Success",
        description: "Balance updated successfully",
      })
    } catch (error) {
      console.error('Error updating balance:', error)
      toast({
        title: "Error",
        description: "Failed to update balance",
        variant: "destructive",
      })
    }
  }

  const getBalanceScore = () => {
    if (!balance) return 0
    
    const total = balance.workHours + balance.personalHours + balance.healthHours + balance.leisureHours
    if (total === 0) return 0
    
    // Ideal balance: 40% work, 30% personal, 20% health, 10% leisure
    const idealRatios = { work: 0.4, personal: 0.3, health: 0.2, leisure: 0.1 }
    const actualRatios = {
      work: balance.workHours / total,
      personal: balance.personalHours / total,
      health: balance.healthHours / total,
      leisure: balance.leisureHours / total,
    }
    
    // Calculate balance score (lower deviation = higher score)
    const deviation = Math.abs(actualRatios.work - idealRatios.work) +
                     Math.abs(actualRatios.personal - idealRatios.personal) +
                     Math.abs(actualRatios.health - idealRatios.health) +
                     Math.abs(actualRatios.leisure - idealRatios.leisure)
    
    return Math.max(0, Math.round((1 - deviation) * 100))
  }

  return {
    balance,
    loading,
    updateBalance,
    getBalanceScore,
    refetch: fetchTodayBalance,
  }
}