import { MdDeleteForever } from 'react-icons/md'
import { useMessageStore } from '../../../../store/slices/useMessageStore'
import { useSubmittingFormStore } from '../../../../store/slices/useSubmittingFormStore'
import { useVideoStore } from '../../../../store/slices/useVideoStore'
import Hero from '../../../common/hero/Hero'
import useHeroDetails from '../../../common/hero/useHeroDetails'
import handleSubmitFormAdmin from '../handleSubmitFormAdmin'
import CreateVideoForm from './forms/CreateVideoForm'
import { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import handleGetData from '../handleGetData'
import { useTournamentsDetails } from '../../../../store/slices/useTournamentsDetails'
import SideMenu from '../side-menu/SideMenu'

const AdminVideos = () => {
  const [showVideos, setShowVideos] = useState(false)
  const { adminVideos } = useHeroDetails()
  const { videos, setVideos } = useVideoStore()
  const { addMessage } = useMessageStore()
  const { setSubmittingForm } = useSubmittingFormStore()
  const { currentTournament } = useTournamentsDetails()
  const BASE_URL = import.meta.env.MODE === 'development'
    ? import.meta.env.VITE_IMG_DEV_BASE_URL
    : import.meta.env.VITE_IMG_PROD_BASE_URL

  const deleteVideo = async(videoId) => {
    if (!videoId) return
    const values = { videoId, tournamentId: currentTournament.tournamentId }
    const successResponse = 'Video has been deleted'
    const url = '/admin/video/delete'
    const httpMethod = 'post'
    const response = await handleSubmitFormAdmin({ values, url, addMessage, successResponse, setSubmittingForm, httpMethod })

    if (response.success) {
      setVideos(response.data?.dbVideos || null)
    }
  }

  const getVideos = async() => {
    try {
      const paramValues = { tournamentId: currentTournament.tournamentId }
      const url = '/admin/video/get-all-by-tournament'
      const response = await handleGetData({ paramValues, url, addMessage })
      if (response.success) {
        setVideos(response.data?.dbVideos || null)
      }
    } catch (error) {}
  }

  useEffect(() => {
    getVideos()
  }, [])

  return (
    <div>
      <SideMenu />
      <Hero title={adminVideos.title} />
      <div className="bg-dark admin-teams-main">
        <p>SET THE VIDEOS HERE</p>
        <CreateVideoForm />
      </div>

      {videos && (
        <div className="bg-light admin-show-videos">
          <Button variant="secondray" onClick={() => setShowVideos(!showVideos)}>{showVideos ? 'Hide Videos' : 'Show Videos'}</Button>
          {showVideos && (
            <ul className="videos-list">
              {videos.map((video, index) => (
                <li key={video.videoId || index} className="video-item">
                  <div className="video-content">
                    <h6 className="video-title">{video.title}</h6>
                    <div className="image-content">
                      <img
                        src={`${BASE_URL}${video.imageUrl}`}
                        className="video-image"
                      />
                    </div>
                  </div>
                  <div className="video-delete-icon">
                    <MdDeleteForever onClick={() => deleteVideo(video.videoId)} className="delete-icon" />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}

export default AdminVideos