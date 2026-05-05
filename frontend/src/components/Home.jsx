import { Link } from 'react-router-dom'
import Carousel from './Carousel'
import UltimateSolution from './UltimateSolution'
import Feature from './Feature'
import WhyChoose from './WhyChoose'

import Brands from './Brands'
import Newsletter from './NewsLetter'

const homeCategories = [
    { title: 'Engine Parts', subtitle: '2,400+ Parts', image: '/images/oil-filter.jpg', link: 'Engine' },
    { title: 'Brake Systems', subtitle: '1,800+ Parts', image: '/images/brake-pad.jpg', link: 'Brake' },
    { title: 'Electrical Components', subtitle: '3,200+ Parts', image: '/images/headlight.jpg', link: 'Electrical' },
    { title: 'Suspension & Steering', subtitle: '1,500+ Parts', image: '/images/shock-absorber.jpg', link: 'Suspension' },
]

export default function Home() {
    return <>
        <Carousel />
        <UltimateSolution />
        <Feature />
        <WhyChoose />

        <section className="product-categories py-5">
            <div className="container">
                <div className="text-center mb-5">
                    <h2 className="mb-3">Product Categories</h2>
                    <p className="text-muted">Browse our extensive catalog of premium automotive parts</p>
                </div>

                <div className="row g-4">
                    {homeCategories.map((category, index) => (
                        <div key={index} className="col-lg-3 col-md-6">
                            <Link to={`/category?category=${category.link}`} className="text-decoration-none">
                                <div className="card product-category-card overflow-hidden border-0 shadow-sm h-100">
                                    <div className="position-relative">
                                        <img src={category.image} className="card-img-top" alt={category.title} style={{ height: '240px', objectFit: 'cover' }} />
                                        <div className="card-img-overlay d-flex flex-column justify-content-end p-3 category-card-overlay">
                                            <h5 className="text-white mb-2">{category.title}</h5>
                                            <span className="text-white-50 small">{category.subtitle}</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>

            <style>{`
                .product-category-card {
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                    border-radius: 24px;
                }
                .product-category-card:hover {
                    transform: translateY(-8px);
                    box-shadow: 0 20px 45px rgba(0, 0, 0, 0.15);
                }
                .product-category-card .card-img-top {
                    border-top-left-radius: 24px;
                    border-top-right-radius: 24px;
                }
                .product-category-card .category-card-overlay {
                    background: linear-gradient(180deg, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.72) 100%);
                    border-bottom-left-radius: 24px;
                    border-bottom-right-radius: 24px;
                }
                .product-categories h2 {
                    font-weight: 700;
                }
            `}</style>
        </section>

        {/* <Appoinment /> */}
        {/* <Team /> */}
        <Brands />
        <Newsletter />
    </>
}
