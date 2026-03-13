import Carousel from './Carousel'
import UltimateSolution from './UltimateSolution'
import Feature from './Feature'
import WhyChoose from './WhyChoose'
import Services from './Services'
import Appoinment from './Appointment'
import Team from './Team'
import Categories from './Categories'
import Brands from './Brands'
import Newsletter from './NewsLetter'

export default function Home() {
    return <>
        <Carousel />
        <UltimateSolution />
        <Feature />
        <WhyChoose />
        <Services />
        {/* <Appoinment /> */}
        {/* <Team /> */}
        <Categories/>
        <Brands/>
        <Newsletter/>
    </>
}