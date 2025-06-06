import { useEffect, useState, useRef } from 'react'
import { Fancybox } from '@fancyapps/ui'
import '@fancyapps/ui/dist/fancybox/fancybox.css'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import { useTournamentsDetails } from '../../store/slices/useTournamentsDetails'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'

import 'swiper/css/pagination'

const Videos = ({ sectionBg }) => {
  const BASE_URL = import.meta.env.MODE === 'development'
    ? import.meta.env.VITE_IMG_DEV_BASE_URL
    : import.meta.env.VITE_IMG_PROD_BASE_URL

  const [videos, setVideos] = useState(null)
  const { currentTournament } = useTournamentsDetails()

  const prevRef = useRef(null)
  const nextRef = useRef(null)

  useEffect(() => {
    if (currentTournament?.Videos) {
      setVideos(currentTournament.Videos)
    }
  }, [currentTournament])

  useEffect(() => {
    if (videos) {
      Fancybox.bind('[data-fancybox="video"]', {
        Video: {
          autoplay: true,
          controls: true
        }
      })
    }
    return () => {
      Fancybox.destroy()
    }
  }, [videos])

  if (!videos || videos.length === 0) return null

  return (
    <div className={`site-section ${sectionBg.videosBg}`}>
      <div className="container">
        <div className="row">
          <div className="col-6 title-section">
            <h2 className="heading">Videos</h2>
          </div>
          <div className="col-6 text-right">
            <div className="custom-nav">
              <button ref={prevRef} className="js-custom-prev-v2" aria-label="Previous video">
                <span className="custom-icons-box" dangerouslySetInnerHTML={{
                  __html: `
                  <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                    <path d="M257.5 445.1l-22.2 22.2c-9.4 9.4-24.6 9.4-33.9 0L7 273c-9.4-9.4-9.4-24.6 0-33.9L201.4 44.7c9.4-9.4 24.6-9.4 33.9 0l22.2 22.2c9.5 9.5 9.3 25-.4 34.3L136.6 216H424c13.3 0 24 10.7 24 24v32c0 13.3-10.7 24-24 24H136.6l120.5 114.8c9.8 9.3 10 24.8.4 34.3z"></path>
                  </svg>
                `
                }} />
              </button>
              <button ref={nextRef} className="js-custom-next-v2" aria-label="Next video">
                <span className="custom-icons-box" dangerouslySetInnerHTML={{
                  __html: `
                  <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                    <path d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z"></path>
                  </svg>
                `
                }} />
              </button>
            </div>
          </div>
        </div>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current
          }}
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current
            swiper.params.navigation.nextEl = nextRef.current
          }}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          spaceBetween={30}
          slidesPerView={3}
          loop={true}
          breakpoints={{
            320: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            992: { slidesPerView: 3 }
          }}
        >
          {videos.map((video, index) =>
            video.videoUrl
              // eslint-disable-next-line multiline-ternary
              ? (
                <SwiperSlide key={video.videoId || index} className="item">
                  <div className="video-media">
                    <img
                      src={`${BASE_URL}${video.imageUrl}`}
                      className="user-videos"
                      alt={video.title || 'Video thumbnail'}
                    />
                    <a
                      href={video.videoUrl}
                      className="d-flex play-button align-items-center"
                      data-fancybox="video"
                    >
                      <span className="icon mr-3">
                        <span className="custom-icons-box">
                          {/* Aquí podrías poner un icono play svg o usar react-icons */}
                          <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                            <path d="M424 214L72 6c-23-13-49 6-49 32v436c0 26 26 45 49 32l352-208c23-14 23-42 0-56z"></path>
                          </svg>
                        </span>
                      </span>
                      <div className="caption">
                        <h3 className="m-0">{video.title || ''}</h3>
                      </div>
                    </a>
                  </div>
                </SwiperSlide>
              ) : null
          )}
        </Swiper>
      </div>
    </div>
  )
}

export default Videos