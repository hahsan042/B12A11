import Card from './Card'
import Container from '../Shared/Container'

const Meals = () => {
  return (
    <Container>
      <div className='pt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
        <Card />

      </div>
    </Container>
  )
}

export default Meals
