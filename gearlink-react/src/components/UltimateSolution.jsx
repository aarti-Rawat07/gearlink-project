import { Link } from 'react-router-dom';
import aboutImg from '../assets/img/auto-about.jpg'

export default function UltimateSolution() {
    return <>
        <div className="container-fluid pt-6 pb-6">
            <div className="container">
                <div className="row g-5 align-items-center">

                    {/* Image Section */}
                    <div className="col-lg-6 wow fadeIn" data-wow-delay="0.1s">
                        <div className="about-img">
                            <img
                                className="img-fluid w-100"
                                src={aboutImg}
                                alt="Automotive Parts"
                            />
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="col-lg-6 wow fadeIn" data-wow-delay="0.5s">

                        <h1 className="display-6 text-uppercase mb-4">
                            Automotive Spare Parts Distribution Built for India
                        </h1>

                        <p className="mb-4">
                            GearLink provides a professional platform for workshops, dealers, and fleet managers to source
                            authentic spare parts with transparent pricing, trusted manufacturers, and inventory visibility.
                        </p>

                        <div className="row g-4 mb-4">
                            <div className="col-12">
                                <div className="d-flex align-items-start gap-3">
                                    <div className="flex-shrink-0 btn-xl-square bg-light pt-2">
                                        <i className="fa fa-check-circle fa-2x text-primary"></i>
                                    </div>
                                    <div>
                                        <h5 className="lh-base text-uppercase mb-1">Verified Parts Quality</h5>
                                        <p className="mb-0">Certified components from reputable automotive brands.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="d-flex align-items-start gap-3">
                                    <div className="flex-shrink-0 btn-xl-square bg-light pt-2">
                                        <i className="fa fa-handshake fa-2x text-primary"></i>
                                    </div>
                                    <div>
                                        <h5 className="lh-base text-uppercase mb-1">Business-Ready Support</h5>
                                        <p className="mb-0">Dedicated assistance for orders, logistics and technical advice.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="border border-5 border-primary p-4 text-center mt-4">
                            <h4 className="lh-base text-uppercase mb-0">
                                Trusted by workshops, distributors and fleets across India.
                            </h4>
                        </div>

                        <div className="d-flex flex-wrap gap-3 justify-content-start mt-4">
                            <Link to="/products" className="btn btn-primary py-3 px-5">
                                Explore Catalog
                            </Link>
                            <Link to="/contact" className="btn btn-outline-primary py-3 px-5">
                                Talk to Sales
                            </Link>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </>
}