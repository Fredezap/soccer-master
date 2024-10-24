import { useState } from 'react'
import { FaArrowRight, FaArrowLeft, FaPlay } from 'react-icons/fa'

const Videos = () => {
  const [videos, setVideos] = useState(null)
  // const getVideos = () => {
  //   const videosFounded = axios.get("api/get-videos")

  // check what data return and if not null set it
  //   if (videosFounded) {
  //     setVideos(videosFounded)
  //   }
  // }

  // useEffect(() => {
  //   getVideos()
  // }, [])

  // todo: ver si tables scores es un array y mostrarlos en pantalla
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
                <a href="#" className="js-custom-prev-v2"><span className="custom-icons-box"><FaArrowLeft/></span></a>
                <span></span>
                <a href="#" className="js-custom-next-v2"><span className="custom-icons-box"><FaArrowRight/></span></a>
              </div>
            </div>
          </div>

          <div className="owl-4-slider owl-carousel">
            <div className="item">
              <div className="video-media">
                <img src="images/img_1.jpg" alt="Image" className="img-fluid"></img>
                <a href="https://vimeo.com/139714818" className="d-flex play-button align-items-center" data-fancybox>
                  <span className="icon mr-3">
                    <span className="custom-icons-box"><FaPlay /></span>
                  </span>
                  <div className="caption">
                    <h3 className="m-0">Dogba set for Juvendu return?</h3>
                  </div>
                </a>
              </div>
            </div>
            <div className="item">
              <div className="video-media">
                <img src="images/img_2.jpg" alt="Image" className="img-fluid"></img>
                <a href="https://vimeo.com/139714818" className="d-flex play-button align-items-center" data-fancybox>
                  <span className="icon mr-3">
                    <span className="custom-icons-box"><FaPlay /></span>
                  </span>
                  <div className="caption">
                    <h3 className="m-0">Kai Nets Double To Secure Comfortable Away Win</h3>
                  </div>
                </a>
              </div>
            </div>
            <div className="item">
              <div className="video-media">
                <img src="images/img_3.jpg" alt="Image" className="img-fluid"></img>
                <a href="https://vimeo.com/139714818" className="d-flex play-button align-items-center" data-fancybox>
                  <span className="icon mr-3">
                    <span className="custom-icons-box"><FaPlay /></span>
                  </span>
                  <div className="caption">
                    <h3 className="m-0">Romolu to stay at Real Nadrid?</h3>
                  </div>
                </a>
              </div>
            </div>

            <div className="item">
              <div className="video-media">
                <img src="images/img_1.jpg" alt="Image" className="img-fluid"></img>
                <a href="https://vimeo.com/139714818" className="d-flex play-button align-items-center" data-fancybox>
                  <span className="icon mr-3">
                    <span className="custom-icons-box"><FaPlay /></span>
                  </span>
                  <div className="caption">
                    <h3 className="m-0">Dogba set for Juvendu return?</h3>
                  </div>
                </a>
              </div>
            </div>
            <div className="item">
              <div className="video-media">
                <img src="images/img_2.jpg" alt="Image" className="img-fluid"></img>
                <a href="https://vimeo.com/139714818" className="d-flex play-button align-items-center" data-fancybox>
                  <span className="icon mr-3">
                    <span className="custom-icons-box"><FaPlay /></span>
                  </span>
                  <div className="caption">
                    <h3 className="m-0">Kai Nets Double To Secure Comfortable Away Win</h3>
                  </div>
                </a>
              </div>
            </div>
            <div className="item">
              <div className="video-media">
                <img src="images/img_3.jpg" alt="Image" className="img-fluid"></img>
                <a href="https://vimeo.com/139714818" className="d-flex play-button align-items-center" data-fancybox>
                  <span className="icon mr-3">
                    <span className="custom-icons-box"><FaPlay /></span>
                  </span>
                  <div className="caption">
                    <h3 className="m-0">Romolu to stay at Real Nadrid?</h3>
                  </div>
                </a>
              </div>
            </div>

          </div>

        </div>
      </div>
    )
  )
}

export default Videos