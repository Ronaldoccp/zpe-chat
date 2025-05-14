'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import React, { useRef, useState } from 'react'

type DocumentStatus = 'idle' | 'uploading' | 'processing' | 'success' | 'error'

interface DocumentInfo {
  id: string
  name: string
  type: string
  size: number
  uploadDate: Date
  status: DocumentStatus
  progress: number
  extractedText?: string
  analysis?: {
    documentType?: string
    fields?: Record<string, string>
    missingFields?: string[]
    issues?: string[]
    complianceStatus?: 'compliant' | 'non-compliant' | 'partially-compliant'
  }
}

const DocumentUpload = () => {
  const { t } = useLanguage()
  const [documents, setDocuments] = useState<DocumentInfo[]>([])
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Simular o processamento OCR e análise de documentos (RF03.3 e RF03.4)
  const processDocument = async (file: File): Promise<DocumentInfo> => {
    // Criar documento com status inicial
    const newDoc: DocumentInfo = {
      id: Date.now().toString(),
      name: file.name,
      type: file.type,
      size: file.size,
      uploadDate: new Date(),
      status: 'uploading',
      progress: 0
    }
    
    // Simular upload
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 100))
      setDocuments(prev => 
        prev.map(doc => 
          doc.id === newDoc.id 
            ? { ...doc, progress: i } 
            : doc
        )
      )
    }
    
    // Atualizar para processamento
    setDocuments(prev => 
      prev.map(doc => 
        doc.id === newDoc.id 
          ? { ...doc, status: 'processing' } 
          : doc
      )
    )
    
    // Simular OCR e análise
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Atualizar com resultados simulados
    const updatedDoc: DocumentInfo = {
      ...newDoc,
      status: 'success',
      progress: 100,
      extractedText: `Texto extraído do documento ${file.name}...`,
      analysis: {
        documentType: file.name.includes('invoice') 
          ? 'Fatura' 
          : file.name.includes('license') 
            ? 'Licença' 
            : 'Desconhecido',
        fields: {
          'data': '2023-05-15',
          'valor': 'R$ 1.500,00',
          'empresa': 'Exemplo SA'
        },
        missingFields: ['assinatura', 'cnpj'],
        issues: ['Data de validade expirada'],
        complianceStatus: 'partially-compliant'
      }
    }
    
    return updatedDoc
  }

  // Manipular arquivo selecionado
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      // Adicionar documento com status inicial
      const newDoc: DocumentInfo = {
        id: Date.now().toString() + i,
        name: file.name,
        type: file.type,
        size: file.size,
        uploadDate: new Date(),
        status: 'uploading',
        progress: 0
      }
      
      setDocuments(prev => [...prev, newDoc])
      
      // Processar documento
      const processedDoc = await processDocument(file)
      
      // Atualizar documento com resultados
      setDocuments(prev => 
        prev.map(doc => 
          doc.id === newDoc.id ? processedDoc : doc
        )
      )
    }
  }

  // Manipular arrastar e soltar
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      // Converter FileList para Array para processamento
      const filesArray = Array.from(e.dataTransfer.files)
      filesArray.forEach(async (file, index) => {
        const newDoc: DocumentInfo = {
          id: Date.now().toString() + index,
          name: file.name,
          type: file.type,
          size: file.size,
          uploadDate: new Date(),
          status: 'uploading',
          progress: 0
        }
        
        setDocuments(prev => [...prev, newDoc])
        const processedDoc = await processDocument(file)
        
        setDocuments(prev => 
          prev.map(doc => 
            doc.id === newDoc.id ? processedDoc : doc
          )
        )
      })
    }
  }

  // Abrir seletor de arquivos ao clicar
  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }

  // Gerar documento baseado na análise (RF03.5)
  const generateDocument = (docId: string) => {
    alert(`Gerando documento baseado na análise do documento ${docId}`)
    // Em uma implementação real, integraria com uma API para gerar documentos
  }

  // Renderizar status do documento
  const renderStatus = (status: DocumentStatus) => {
    switch (status) {
      case 'uploading':
        return <span className="text-yellow-500">⏳ {t('uploading')}</span>
      case 'processing':
        return <span className="text-blue-500">🔄 {t('processing')}</span>
      case 'success':
        return <span className="text-green-500">✅ {t('processed')}</span>
      case 'error':
        return <span className="text-red-500">❌ {t('error')}</span>
      default:
        return <span className="text-gray-500">⏱️ {t('waiting')}</span>
    }
  }

  // Formatar tamanho do arquivo
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' bytes'
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB'
    else return (bytes / 1048576).toFixed(1) + ' MB'
  }

  return (
    <div className="flex flex-col h-full">
      {/* Área de upload */}
      <div 
        className={`border-2 border-dashed rounded-lg p-8 text-center mb-6 transition-colors ${
          dragActive 
            ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/10' 
            : 'border-gray-300 dark:border-gray-700'
        }`}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          className="hidden"
          onChange={handleFileChange}
          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
        />
        
        <div className="flex flex-col items-center justify-center">
          <svg className="w-12 h-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
          </svg>
          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
            <span className="font-semibold">{t('dropFilesHere')}</span> {t('orClickToUpload')}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {t('supportedFormats')}: PDF, Word, JPEG, PNG
          </p>
          <button
            type="button"
            onClick={handleButtonClick}
            className="mt-4 px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          >
            {t('selectFiles')}
          </button>
        </div>
      </div>
      
      {/* Lista de documentos */}
      <div className="flex-1 overflow-auto">
        <h2 className="text-xl font-semibold mb-4">{t('uploadedDocuments')}</h2>
        
        {documents.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-center py-8">
            {t('noDocuments')}
          </p>
        ) : (
          <div className="space-y-4">
            {documents.map(doc => (
              <div key={doc.id} className="border rounded-lg p-4 bg-white dark:bg-secondary-800">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">{doc.name}</h3>
                  {renderStatus(doc.status)}
                </div>
                
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                  <span>{formatFileSize(doc.size)}</span>
                  <span className="mx-2">•</span>
                  <span>{doc.uploadDate.toLocaleString()}</span>
                </div>
                
                {doc.status === 'uploading' && (
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                    <div 
                      className="bg-primary-500 h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${doc.progress}%` }}
                    ></div>
                  </div>
                )}
                
                {doc.status === 'success' && (
                  <div className="mt-4 space-y-3">
                    {doc.analysis && (
                      <>
                        <div className="text-sm">
                          <span className="font-medium">{t('documentType')}:</span> {doc.analysis.documentType}
                        </div>
                        
                        {doc.analysis.fields && Object.keys(doc.analysis.fields).length > 0 && (
                          <div className="text-sm">
                            <span className="font-medium">{t('extractedFields')}:</span>
                            <ul className="list-disc list-inside ml-2 mt-1">
                              {Object.entries(doc.analysis.fields).map(([key, value]) => (
                                <li key={key}>
                                  {key}: <span className="font-medium">{value}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        
                        {doc.analysis.missingFields && doc.analysis.missingFields.length > 0 && (
                          <div className="text-sm text-yellow-600 dark:text-yellow-400">
                            <span className="font-medium">{t('missingFields')}:</span>
                            <ul className="list-disc list-inside ml-2 mt-1">
                              {doc.analysis.missingFields.map(field => (
                                <li key={field}>{field}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        
                        {doc.analysis.issues && doc.analysis.issues.length > 0 && (
                          <div className="text-sm text-red-600 dark:text-red-400">
                            <span className="font-medium">{t('issues')}:</span>
                            <ul className="list-disc list-inside ml-2 mt-1">
                              {doc.analysis.issues.map((issue, index) => (
                                <li key={index}>{issue}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        
                        <div className="flex justify-end">
                          <button
                            onClick={() => generateDocument(doc.id)}
                            className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-100 rounded hover:bg-primary-200 dark:hover:bg-primary-800"
                          >
                            {t('generateDocument')}
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default DocumentUpload 