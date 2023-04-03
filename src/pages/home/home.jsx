import Stories from "../../components/stories/stories"
import Posts from "../../components/posts/posts"
import Share from "../../components/share/share"
import Map from '../../components/map/map'
import "./home.scss"

const Home = () => {
  return (
    <div className="home">
     
      <Stories/>
      <Share/>
      <Posts/>
    </div>
  )
}

export default Home