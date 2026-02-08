import React, { FC, useRef, useState } from 'react'

import { cn } from '@/utils'

type FileUploadProps = {
  label?: React.ReactNode
  accept?: string
  onFileSelect: (file: File) => void
}

const FileUpload: FC<FileUploadProps> = ({
  label = '',
  accept = '',
  onFileSelect,
}) => {
  const [file, setFile] = useState<File | null>(null)
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      onFileSelect(selectedFile)
    }
  }
  const handleDrag = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.stopPropagation()
    if (event.type === 'dragenter' || event.type === 'dragover') {
      setDragActive(true)
    } else if (event.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.stopPropagation()
    setDragActive(false)

    const droppedFile = event.dataTransfer.files?.[0]
    if (droppedFile) {
      setFile(droppedFile)
      onFileSelect(droppedFile)
    }
  }

  return (
    <div className='h-16 w-20'>
      <div
        className={cn(
          'flex h-full w-full cursor-pointer items-center justify-center rounded-lg border-[1px] border-dashed border-neutral-400 bg-neutral-50 text-center',
          dragActive ? 'border-primary-600' : '',
          'relative'
        )}
        onClick={handleClick}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type='file'
          ref={fileInputRef}
          className='hidden'
          accept={accept}
          onChange={handleFileChange}
        />
        <p
          className='flex w-full items-center justify-center truncate text-neutral-700'
          dir='ltr'
        >
          {label}
        </p>
        {file && file.type.startsWith('image/') && (
          <img
            src={URL.createObjectURL(file)}
            alt='Preview'
            className='h-full max-w-full rounded'
          />
        )}
      </div>
    </div>
  )
}

export default FileUpload
