import TeamScore from '../../common/TeamScore'
import News from './News'
import NextMatchAndTable from './NextMatchAndTable'
import Videos from '../../common/Videos'
import Blog from '../../common/Blog'
import HeroHome from './HeroHome'

const Home = () => {
  // todo: en heroHome, book ticker y learn more se dejan?
  // todo: en teamScore se mostraria el resultado del ultimo partido
  // todo: Si news
  // todo: Si videos
  // todo: No blog
  // todo: No Players
  // todo: No blog section
  // todo: que se hace con los componentes que no tienen data? no se muestran o se muestran con un mensaje?
  // todo: ejemplo. Si no hay News, mostrar un "Aun no se han cargado noticias"? o no reenderizar nada?
  // todo: Que dejamos en el footer?

  // todo: carga de partidos manualmente como tablas, ver librerias
  // todo: agregar fixture frontend con libreria para mostrar partidos.

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