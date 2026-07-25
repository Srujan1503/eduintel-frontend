import { useEffect, useState } from 'react'
import { healthService } from '../services/healthService'

export const useHealthCheck = () => {
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading')

  useEffect(() => {
    const run = async () => {
      try {
        await healthService.getHealth()
        setStatus('ready')
      } catch {
        setStatus('error')
      }
    }

    run()
  }, [])

  return status
}
