export default function Topbar() {
    return <>
        <div className="container-fluid topbar-custom text-white d-none d-lg-flex wow fadeIn" data-wow-delay="0.1s">
        <div className="container py-3">
            <div className="d-flex align-items-center">
                <a href="index.html">
                    <h2 className="text-white fw-bold m-0">GearLink Pvt Ltd</h2>
                </a>
                <div className="ms-auto d-flex align-items-center">
                    <small className="ms-4"><i className="fa fa-map-marker-alt me-3"></i>Mumbai , India</small>
                    <small className="ms-4"><i className="fa fa-envelope me-3"></i>info@gearlink.com</small>
                    <small className="ms-4"><i className="fa fa-phone-alt me-3"></i>+91 98765 43210</small>
                    <div className="ms-3 d-flex">
                        <a className="btn btn-sm-square btn-light text-primary ms-2" href=""><i
                                className="fab fa-facebook-f"></i></a>
                        <a className="btn btn-sm-square btn-light text-primary ms-2" href=""><i
                                className="fab fa-twitter"></i></a>
                        <a className="btn btn-sm-square btn-light text-primary ms-2" href=""><i
                                className="fab fa-linkedin-in"></i></a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
}