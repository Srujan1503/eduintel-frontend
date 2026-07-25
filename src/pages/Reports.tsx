import { Download, FileText, Share2 } from 'lucide-react'
import { useState } from 'react'
import { reportService } from '../services/report.service'

export const Reports = () => {
  const [statusMessage, setStatusMessage] = useState('')
  const [isExporting, setIsExporting] = useState(false)

  const handleExport = async (type: 'pdf' | 'csv' | 'excel') => {
    setIsExporting(true)
    setStatusMessage(`Preparing ${type.toUpperCase()} export…`)

    try {
      const blob = type === 'pdf' ? await reportService.downloadPdf() : type === 'csv' ? await reportService.downloadCsv() : await reportService.downloadExcel()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `report.${type}`
      link.click()
      window.URL.revokeObjectURL(url)
      setStatusMessage(`${type.toUpperCase()} export started.`)
    } catch (error) {
      setStatusMessage(error instanceof Error ? error.message : 'Unable to download the report right now.')
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="rounded-[28px] border border-slate-200/70 bg-white/80 p-6 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-violet-600">Executive reporting</p>
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Board-ready insights and export packages</h2>
          </div>
          <div className="flex gap-2">
            <button onClick={() => void handleExport('pdf')} disabled={isExporting} className="flex items-center gap-2 rounded-2xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 dark:border-slate-700 dark:text-slate-200 disabled:opacity-70"><Download size={15} /> PDF</button>
            <button onClick={() => void handleExport('csv')} disabled={isExporting} className="flex items-center gap-2 rounded-2xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 dark:border-slate-700 dark:text-slate-200 disabled:opacity-70"><Share2 size={15} /> CSV</button>
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[28px] border border-slate-200/70 bg-white/80 p-6 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
          <div className="mb-4 flex items-center gap-2 text-violet-600"><FileText size={18} /> <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Executive summary</h3></div>
          <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
            <p>Enrollment velocity is accelerating across all priority regions, led by digital-first programs in STEM and health.</p>
            <p>Marketing efficiency remains strongest in paid search and partner channels, with search outperforming target thresholds by 12%.</p>
            <p>Threat posture is moderate, but competitive activity is increasing in scholarship and hybrid delivery offerings.</p>
          </div>
        </div>

        <div className="rounded-[28px] border border-slate-200/70 bg-white/80 p-6 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Export package</h3>
          <div className="mt-4 space-y-3">
            {['Board deck', 'Campaign performance', 'Competitor brief', 'Parent sentiment summary'].map((item) => (
              <div key={item} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm dark:border-slate-800 dark:bg-slate-900">
                <span>{item}</span>
                <button onClick={() => void handleExport(item.includes('Campaign') ? 'csv' : item.includes('Competitor') ? 'excel' : 'pdf')} className="text-violet-600">Export</button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {statusMessage ? (
        <div className="rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-950/70 dark:text-slate-300">
          {statusMessage}
        </div>
      ) : null}
    </div>
  )
}
