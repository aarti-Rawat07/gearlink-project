import team1 from "../assets/img/team-1.jpg"
import team2 from "../assets/img/team-2.jpg"
import team3 from "../assets/img/team-3.jpg"
import team4 from "../assets/img/team-4.jpg"
export default function Team(){
    return <>
         <div className="container-fluid team pt-6 pb-6">
        <div className="container">
            <div className="text-center mx-auto wow fadeInUp" data-wow-delay="0.1s" style={{maxWidth: '600px'}}>
                <h1 className="display-6 text-uppercase mb-5">Meet Our Professional and Experience Welder</h1>
            </div>
            <div className="row g-4">
                <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
                    <div className="team-item">
                        <div className="position-relative overflow-hidden">
                            <img className="img-fluid w-100" src={team1} alt=""/>
                            <div className="team-social">
                                <a className="btn btn-square btn-dark mx-1" href=""><i className="fab fa-facebook-f"></i></a>
                                <a className="btn btn-square btn-dark mx-1" href=""><i className="fab fa-twitter"></i></a>
                                <a className="btn btn-square btn-dark mx-1" href=""><i className="fab fa-linkedin-in"></i></a>
                                <a className="btn btn-square btn-dark mx-1" href=""><i className="fab fa-youtube"></i></a>
                            </div>
                        </div>
                        <div className="text-center p-4">
                            <h5 className="mb-1">Alex Robin</h5>
                            <span>Welder</span>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.4s">
                    <div className="team-item">
                        <div className="position-relative overflow-hidden">
                            <img className="img-fluid w-100" src={team2} alt=""/>
                            <div className="team-social">
                                <a className="btn btn-square btn-dark mx-1" href=""><i className="fab fa-facebook-f"></i></a>
                                <a className="btn btn-square btn-dark mx-1" href=""><i className="fab fa-twitter"></i></a>
                                <a className="btn btn-square btn-dark mx-1" href=""><i className="fab fa-linkedin-in"></i></a>
                                <a className="btn btn-square btn-dark mx-1" href=""><i className="fab fa-youtube"></i></a>
                            </div>
                        </div>
                        <div className="text-center p-4">
                            <h5 className="mb-1">Andrew Bon</h5>
                            <span>Welder</span>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.5s">
                    <div className="team-item">
                        <div className="position-relative overflow-hidden">
                            <img className="img-fluid w-100" src={team3} alt=""/>
                            <div className="team-social">
                                <a className="btn btn-square btn-dark mx-1" href=""><i className="fab fa-facebook-f"></i></a>
                                <a className="btn btn-square btn-dark mx-1" href=""><i className="fab fa-twitter"></i></a>
                                <a className="btn btn-square btn-dark mx-1" href=""><i className="fab fa-linkedin-in"></i></a>
                                <a className="btn btn-square btn-dark mx-1" href=""><i className="fab fa-youtube"></i></a>
                            </div>
                        </div>
                        <div className="text-center p-4">
                            <h5 className="mb-1">Martin Tompson</h5>
                            <span>Welder</span>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.6s">
                    <div className="team-item">
                        <div className="position-relative overflow-hidden">
                            <img className="img-fluid w-100" src={team4} alt=""/>
                            <div className="team-social">
                                <a className="btn btn-square btn-dark mx-1" href=""><i className="fab fa-facebook-f"></i></a>
                                <a className="btn btn-square btn-dark mx-1" href=""><i className="fab fa-twitter"></i></a>
                                <a className="btn btn-square btn-dark mx-1" href=""><i className="fab fa-linkedin-in"></i></a>
                                <a className="btn btn-square btn-dark mx-1" href=""><i className="fab fa-youtube"></i></a>
                            </div>
                        </div>
                        <div className="text-center p-4">
                            <h5 className="mb-1">Clarabelle Samber</h5>
                            <span>Welder</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
}