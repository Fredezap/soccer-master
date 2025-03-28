import { useEffect, useState } from 'react'
import { FaArrowRight, FaArrowLeft, FaPlay } from 'react-icons/fa'
import { useTournamentsDetails } from '../../store/slices/useTournamentsDetails'
import { Fancybox } from '@fancyapps/ui'
import '@fancyapps/ui/dist/fancybox/fancybox.css'

const Videos = () => {
  const BASE_URL = import.meta.env.MODE === 'development'
    ? import.meta.env.VITE_IMG_DEV_BASE_URL
    : import.meta.env.VITE_IMG_PROD_BASE_URL

  const [videos, setVideos] = useState(null)
  const { currentTournament } = useTournamentsDetails()

  useEffect(() => {
    if (currentTournament.Videos) {
      setVideos(currentTournament.Videos)
    }
  }, [currentTournament])

  useEffect(() => {
    if (videos) {
      Fancybox.bind('[data-fancybox]', {
        Video: {
          autoplay: true,
          controls: true
        }
      })
    }
  }, [videos])

  return (
    videos && (
      <div className="site-section">
        <div className="container">
          <div className="row">
            <div className="col-6 title-section">
              <h2 className="heading">Videos</h2>
            </div>
            <div className="col-6 text-right">
              <div className="custom-nav">
                <a href="#" className="js-custom-prev-v2">
                  <span className="custom-icons-box">
                    <FaArrowLeft/>
                  </span>
                </a>
                <span></span>
                <a href="#" className="js-custom-next-v2">
                  <span className="custom-icons-box">
                    <FaArrowRight/>
                  </span>
                </a>
              </div>
            </div>
          </div>

          <div className="owl-4-slider owl-carousel">
            {videos.map((video, index) => (
              video.videoUrl && (
                <div key={video.videoId || index} className="item">
                  <div className="video-media">
                    <img
                      src={`${BASE_URL}${video.imageUrl}`}
                      className="user-videos" alt="Image">
                    </img>
                    <a href={video.videoUrl} className="d-flex play-button align-items-center" data-fancybox="video">
                      <span className="icon mr-3">
                        <span className="custom-icons-box"><FaPlay /></span>
                      </span>
                      <div className="caption">
                        <h3 className="m-0">{video.title || ''}</h3>
                      </div>
                    </a>

                  </div>
                </div>
              )
            ))}
          </div>

        </div>
      </div>
    )
  )
}

export default Videos