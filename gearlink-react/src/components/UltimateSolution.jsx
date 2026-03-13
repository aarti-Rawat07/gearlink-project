import aboutImg from '../assets/img/auto-about.jpg'

export default function UltimateSolution() {
    return <>
        <div className="container-fluid pt-6 pb-6">
            <div className="container">
                <div className="row g-5">

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
                            Reliable Automotive Parts Solutions
                        </h1>

                        <p className="mb-4">
                            Gearlink Solution Pvt Ltd is a trusted automobile parts supplier
                            dedicated to delivering high-quality vehicle components to
                            dealers, service centers, mechanics, and vehicle owners. Our
                            mission is to simplify the automotive supply chain by connecting
                            reliable manufacturers with customers through a modern and
                            efficient digital platform.
                        </p>

                        <div className="row g-5 mb-4">

                            {/* Feature 1 */}
                            <div className="col-sm-6">
                                <div className="d-flex align-items-center">
                                    <div className="flex-shrink-0 btn-xl-square bg-light me-3">
                                        <i className="fa fa-users-cog fa-2x text-primary"></i>
                                    </div>
                                    <h5 className="lh-base text-uppercase mb-0">
                                        Trusted Supplier Network
                                    </h5>
                                </div>
                            </div>

                            {/* Feature 2 */}
                            <div className="col-sm-6">
                                <div className="d-flex align-items-center">
                                    <div className="flex-shrink-0 btn-xl-square bg-light me-3">
                                        <i className="fa fa-truck fa-2x text-primary"></i>
                                    </div>
                                    <h5 className="lh-base text-uppercase mb-0">
                                        Fast Nationwide Delivery
                                    </h5>
                                </div>
                            </div>

                        </div>

                        <p>
                            <i className="fa fa-check-square text-primary me-3"></i>
                            Wide range of genuine automotive parts
                        </p>

                        <p>
                            <i className="fa fa-check-square text-primary me-3"></i>
                            Reliable sourcing from trusted manufacturers
                        </p>

                        <p>
                            <i className="fa fa-check-square text-primary me-3"></i>
                            Easy online ordering and fast delivery
                        </p>

                        <div className="border border-5 border-primary p-4 text-center mt-4">
                            <h4 className="lh-base text-uppercase mb-0">
                                Providing Reliable Automotive Parts for Workshops, Dealers and
                                Vehicle Owners
                            </h4>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </>
}