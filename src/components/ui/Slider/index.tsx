import { useRef, useState } from 'react'

import { MEDIA_URL } from '@/api'
import ArrowLeft from '@/components/icons/Arrow-left'
import ArrowRight from '@/components/icons/Arrow-right'
import Play from '@/components/icons/Play'

import IconButton from '../IconButton'

interface SliderProps {
  images: string[]
  videos: string[]
}

const Slider: React.FC<SliderProps> = ({ images, videos }) => {
  const slides = [
    ...images.map((img) => ({ img, type: 'image' })),
    ...videos.map((img) => ({ img, type: 'video' })),
  ]

  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState<boolean[]>([])
  const videoRefs = useRef<HTMLVideoElement[]>([])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
    setIsPlaying(videoRefs.current.map(() => false)) // Reset play state
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
    setIsPlaying(videoRefs.current.map(() => false)) // Reset play state
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    setIsPlaying(videoRefs.current.map(() => false)) // Reset play state
  }

  const togglePlay = (index: number) => {
    const video = videoRefs.current[index]
    if (video) {
      if (isPlaying[index]) {
        video.pause()
      } else {
        video.play()
      }
      setIsPlaying((prevState) => {
        const updatedState = [...prevState]
        updatedState[index] = !prevState[index]
        return updatedState
      })
    }
  }

  return (
    <div className='relative flex h-full w-full flex-col items-center justify-center gap-2 overflow-hidden'>
      {slides.length > 0 ? (
        <>
          {' '}
          <div className='relative h-[70%] w-full overflow-hidden rounded-lg'>
            <div
              className='flex h-full w-full transition-transform duration-500 ease-in-out'
              style={{
                transform: `translateX(-${currentSlide * 100}%)`,
              }}
            >
              {slides.map((slide, index) => (
                <div key={index} className='h-full w-full flex-shrink-0'>
                  {slide.type === 'image' ? (
                    <img
                      src={`${MEDIA_URL}${slide.img}`}
                      alt={`Slide ${index}`}
                      className='h-full w-full rounded-2xl object-contain'
                    />
                  ) : (
                    <div className='relative h-full w-full'>
                      <video
                        ref={(el) => {
                          if (el) videoRefs.current[index] = el
                        }}
                        src={`${MEDIA_URL}${slide.img}`}
                        className='h-full w-full rounded-2xl object-contain'
                        onClick={() => togglePlay(index)}
                        controls={false}
                      />
                      {!isPlaying[index] && currentSlide === index && (
                        <div className='absolute inset-0 flex cursor-pointer items-center justify-center bg-black bg-opacity-60 text-6xl'>
                          <IconButton
                            onClick={() => togglePlay(index)}
                            className='h-10 w-10 rounded-full bg-white bg-opacity-50'
                            icon={
                              <Play
                                color='var(--neutral-50)'
                                size={30}
                                className='ml-1'
                              />
                            }
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <IconButton
              onClick={prevSlide}
              className='absolute left-2 top-1/2 h-10 w-10 -translate-y-1/2 transform rounded-full bg-white bg-opacity-[50%] text-white focus:outline-none'
              icon={<ArrowLeft color='var(--primary-600)' size={22} />}
            />

            <IconButton
              onClick={nextSlide}
              className='absolute right-2 top-1/2 h-10 w-10 -translate-y-1/2 transform rounded-full bg-white bg-opacity-[50%] text-white focus:outline-none'
              icon={<ArrowRight color='var(--primary-600)' size={22} />}
            />
          </div>
          <div className='flex h-1/6 w-full overflow-x-auto overflow-y-hidden'>
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`h-full w-1/5 flex-shrink-0 cursor-pointer p-1 ${
                  currentSlide === index
                    ? 'rounded-lg border-2 border-primary-600'
                    : ''
                }`}
                onClick={() => goToSlide(index)}
              >
                {slide.type === 'image' ? (
                  <img
                    src={`${MEDIA_URL}${slide.img}`}
                    alt={`Thumbnail ${index}`}
                    className='h-full w-full rounded-2xl object-contain'
                  />
                ) : (
                  <video
                    src={`${MEDIA_URL}${slide.img}`}
                    className='h-full w-full rounded-2xl object-contain'
                    muted
                  />
                )}
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className='relative flex h-[70%] w-full items-center justify-center overflow-hidden rounded-lg border p-5'>
          <p>محتوایی برای نمایش وجود ندارد</p>
        </div>
      )}
    </div>
  )
}

export default Slider
