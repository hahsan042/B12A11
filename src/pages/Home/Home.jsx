
import ExtraSection from '../../components/Home/ExtraSection'
import HomeMeals from '../../components/Home/HomeMeals'
import Meals from '../../components/Home/Meals'
import Hero from '../../components/Shared/Hero/Hero'

const Home = () => {
  return (
    <div>
      <Hero></Hero>
   <HomeMeals></HomeMeals>
   <ExtraSection></ExtraSection>
      {/* More components */}
    </div>
  )
}

export default Home
