import { useMemo } from 'react'

import { MEDIA_URL } from '@/api'
import Trash from '@/components/icons/Trash'
import UploadIcon from '@/components/icons/UploadIcon'
import IconButton from '@/components/ui/IconButton'
import { MediaItem } from '@/types/Files'

const isPseudoFile = (media: MediaItem): media is File => 'isExisting' in media

interface MediaFieldsProps {
  images: MediaItem[]
  setImages: React.Dispatch<React.SetStateAction<MediaItem[]>>
  videos: MediaItem[]
  setVideos: React.Dispatch<React.SetStateAction<MediaItem[]>>
  existingImages?: string[]
  existingVideos?: string[]
  setDeletedImages?: React.Dispatch<React.SetStateAction<string[]>>
  deletedImages?: string[]
  setDeletedVideos?: React.Dispatch<React.SetStateAction<string[]>>
  deletedVideos?: string[]
}

const MediaFields = ({
  images,
  setImages,
  videos,
  setVideos,
  existingImages = [],
  existingVideos = [],
  setDeletedImages,
  deletedImages = [],
  deletedVideos = [],
  setDeletedVideos,
}: MediaFieldsProps) => {
  const handleFilesChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setFilesCallback: React.Dispatch<React.SetStateAction<MediaItem[]>>
  ) => {
    const files = Array.from(event.target.files || [])
    setFilesCallback((prevFiles) => [...prevFiles, ...files])

    event.target.value = ''
  }

  const visibleExistingImages = useMemo(
    () => existingImages.filter((url) => !deletedImages.includes(url)),
    [existingImages, deletedImages]
  )

  const visibleExistingVideos = useMemo(
    () => existingVideos.filter((url) => !deletedVideos.includes(url)),
    [existingVideos, deletedVideos]
  )

  const removeImageFile = (
    index: number,
    setFilesCallback: React.Dispatch<React.SetStateAction<MediaItem[]>>,
    isExisting: boolean = false,
    mediaUrl?: string
  ) => {
    if (isExisting && mediaUrl && setDeletedImages) {
      setDeletedImages((prevDeleted) => [...prevDeleted, mediaUrl])
    } else {
      setFilesCallback((prevFiles) => prevFiles.filter((_, i) => i !== index))
    }
  }

  const removeVideoFile = (
    index: number,
    setFilesCallback: React.Dispatch<React.SetStateAction<MediaItem[]>>,
    isExisting: boolean = false,
    mediaUrl?: string
  ) => {
    if (isExisting && mediaUrl && setDeletedVideos) {
      setDeletedVideos((prevDeleted) => [...prevDeleted, mediaUrl])
    } else {
      setFilesCallback((prevFiles) => prevFiles.filter((_, i) => i !== index))
    }
  }

  return (
    <div className='border-b pb-5'>
      <p className='text-right text-xl font-medium'>تصاویر و ویدیو ها </p>
      <div className='mt-3 grid grid-cols-1 gap-4 md:grid-cols-2'>
        {/* Images Section */}
        <div className='flex flex-col gap-1'>
          <p>تصاویر ملک</p>
          <div className='relative flex h-36 flex-col rounded-lg border border-dashed bg-neutral-50'>
            <label
              htmlFor='images'
              className='relative h-full w-full text-right text-base'
            >
              <input
                type='file'
                name='images'
                accept='image/*'
                multiple
                onChange={(e) => handleFilesChange(e, setImages)}
                className='absolute z-10 h-full w-full opacity-0'
              />
              <div className='absolute left-1/2 top-1/2 flex w-full -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5'>
                <UploadIcon />
                <p className='text-sm text-neutral-500'>
                  برای آپلود کلیک کنید یا فایل خود را اینجا بیاندازید
                </p>
                <p className='text-xs text-neutral-500'>
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                </p>
              </div>
            </label>
          </div>
          <div className='mt-2 flex w-full items-center gap-4 overflow-x-auto whitespace-nowrap pb-2'>
            {visibleExistingImages.map((media, index) => (
              <div
                className='relative flex flex-shrink-0 flex-col'
                key={`existing-image-${media}`}
              >
                <img
                  src={`${MEDIA_URL}${media}`}
                  alt={`Preview ${media}`}
                  className='h-28 w-32 rounded-2xl border object-cover'
                />
                <IconButton
                  className='absolute left-1.5 top-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-neutral-200'
                  onClick={() => removeImageFile(index, setImages, true, media)}
                  icon={<Trash size={18} />}
                />
              </div>
            ))}
            {images.map((media, index) => (
              <div
                className='relative flex flex-shrink-0 flex-col'
                key={`new-image-${index}`}
              >
                <img
                  src={
                    isPseudoFile(media)
                      ? `${MEDIA_URL}${media}`
                      : URL.createObjectURL(media)
                  }
                  alt={`Preview ${index}`}
                  className='h-28 w-32 rounded-2xl border object-cover'
                />
                <IconButton
                  className='absolute left-1.5 top-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-neutral-200'
                  onClick={() => removeImageFile(index, setImages)}
                  icon={<Trash size={18} />}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Videos Section */}
        <div className='flex flex-col gap-1'>
          <p>ویدیو های ملک</p>
          <div className='relative flex h-36 flex-col rounded-lg border border-dashed bg-neutral-50'>
            <label
              htmlFor='videos'
              className='relative h-full w-full text-right text-base'
            >
              <input
                type='file'
                name='videos'
                accept='video/*'
                multiple
                onChange={(e) => handleFilesChange(e, setVideos)}
                className='absolute z-10 h-full w-full opacity-0'
              />
            </label>
            <div className='absolute left-1/2 top-1/2 flex w-full -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5'>
              <UploadIcon />
              <p className='text-sm text-neutral-500'>
                برای آپلود کلیک کنید یا فایل خود را اینجا بیاندازید
              </p>
              <p className='text-xs text-neutral-500'>MP4, MKV</p>
            </div>
          </div>
          <div className='mt-2 flex w-full items-center gap-4 overflow-x-auto whitespace-nowrap pb-2'>
            {visibleExistingVideos.map((media, index) => (
              <div
                className='relative flex flex-shrink-0'
                key={`existing-video-${index}`}
              >
                <video controls className='h-28 w-32 rounded-2xl object-cover'>
                  <source src={`${MEDIA_URL}${media}`} />
                  Your browser does not support the video tag.
                </video>
                <IconButton
                  className='absolute left-1 top-1 flex h-7 w-7 items-center justify-center rounded-full bg-neutral-200'
                  onClick={() => removeVideoFile(index, setVideos, true, media)}
                  icon={<Trash size={18} />}
                />
              </div>
            ))}
            {videos.map((media, index) => (
              <div
                className='relative flex flex-shrink-0'
                key={`new-video-${index}`}
              >
                <video controls className='h-28 w-32 rounded-2xl object-cover'>
                  <source
                    src={
                      isPseudoFile(media)
                        ? `${MEDIA_URL}${media}`
                        : URL.createObjectURL(media)
                    }
                  />
                  Your browser does not support the video tag.
                </video>
                <IconButton
                  className='absolute left-1 top-1 flex h-7 w-7 items-center justify-center rounded-full bg-neutral-200'
                  onClick={() => removeVideoFile(index, setVideos)}
                  icon={<Trash size={18} />}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MediaFields
