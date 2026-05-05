import { Link } from "react-router-dom";
import img1 from "../assets/img/landing2.jpg";
import img2 from "../assets/img/landing3.jpg";
import img3 from "../assets/img/landing4.jpg";

const Landing = () => {
    return (
        <div className="container-fluid p-0 mb-6 wow fadeIn" data-wow-delay="0.1s">
            <div
                id="header-carousel"
                className="carousel slide"
                data-bs-ride="carousel"
            >
                {/* Carousel Indicators */}
                <div className="carousel-indicators">
                    <button
                        type="button"
                        data-bs-target="#header-carousel"
                        data-bs-slide-to="0"
                        className="active"
                    >
                        <img className="img-fluid" src={img1} alt="Slide 1" />
                    </button>

                    <button
                        type="button"
                        data-bs-target="#header-carousel"
                        data-bs-slide-to="1"
                    >
                        <img className="img-fluid" src={img2} alt="Slide 2" />
                    </button>

                    <button
                        type="button"
                        data-bs-target="#header-carousel"
                        data-bs-slide-to="2"
                    >
                        <img className="img-fluid" src={img3} alt="Slide 3" />
                    </button>
                </div>

                {/* Carousel Slides */}
                <div className="carousel-inner">

                    {/* Slide 1 */}
                    <div className="carousel-item active">
                        <img className="w-100" src={img1} alt="slide" />

                        <div className="carousel-caption">
                            <h1 className="display-2 text-uppercase text-white mb-4 animated zoomIn">
                                Reliable Automotive Parts for Every Vehicle
                            </h1>

                            <p>
                                Trusted supplier of high-quality engine components, brake
                                systems, suspension parts and vehicle accessories.
                            </p>

                            <Link to="/products" className="btn btn-primary py-3 px-4">
                                Browse Parts
                            </Link>
                        </div>
                    </div>

                    {/* Slide 2 */}
                    <div className="carousel-item">
                        <img className="w-100" src={img2} alt="slide" />

                        <div className="carousel-caption">
                            <h1 className="display-2 text-uppercase text-white mb-4 animated zoomIn">
                                Reliable Automotive Parts for Every Vehicle
                            </h1>

                            <p>
                                Trusted supplier of high-quality engine components, brake
                                systems, suspension parts and vehicle accessories.
                            </p>

                            <Link to="/products" className="btn btn-primary py-3 px-4">
                                Browse Parts
                            </Link>
                        </div>
                    </div>

                    {/* Slide 3 */}
                    <div className="carousel-item">
                        <img className="w-100" src={img3} alt="slide" />

                        <div className="carousel-caption">
                            <h1 className="display-2 text-uppercase text-white mb-4 animated zoomIn">
                                Reliable Automotive Parts for Every Vehicle
                            </h1>

                            <p>
                                Trusted supplier of high-quality engine components, brake
                                systems, suspension parts and vehicle accessories.
                            </p>

                            <Link to="/products" className="btn btn-primary py-3 px-4">
                                Browse Parts
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Landing; 
