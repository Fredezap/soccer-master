import TeamScore from '../../TeamScore'
import News from '../../News'
import NextMatchAndTable from '../../NextMatchAndTable'
import Videos from '../../Videos'
import Blog from '../../Blog'
import HeroHome from './HeroHome'

const Home = () => {
  // todo: en heroHome, book ticker y learn more se dejan?
  // todo: en teamScore se mostraria el resultado del ultimo partido o del mejor partido de la fecha o que?
  // todo: van a haber news?
  // todo: van a haber videos?
  // todo: van a haber un blog?
  // todo: que se hace con los componentes que no tienen data? no se muestran o se muestran con un mensaje?
  // todo: ejemplo. Si no hay News, mostrar un "Aun no se han cargado noticias"? o no reenderizar nada?
  // todo: Que dejamos en el footer?
  return (
    <>
      <HeroHome />
      <TeamScore />
      <News />
      <NextMatchAndTable />
      <Videos />
      <Blog />
    </>
  )
}

export default Home