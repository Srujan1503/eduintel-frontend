import { api } from './api'

export const reportService = {
  downloadPdf: async () => {
    const { data } = await api.get('/reports/pdf', { responseType: 'blob' })
    return data
  },
  downloadCsv: async () => {
    const { data } = await api.get('/reports/csv', { responseType: 'blob' })
    return data
  },
  downloadExcel: async () => {
    const { data } = await api.get('/reports/excel', { responseType: 'blob' })
    return data
  },
}
