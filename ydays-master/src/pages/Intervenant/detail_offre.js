
import '../../css/detail_offre.css';
import '../../css/general.css'

 export function Detail_offre(props) {
    
    return (
                <div className="detail-Offre">
                    <div>
                    <h1 className="detail-Offre-title">{props.OfferName}</h1>
                    </div>
                    <div className="border">

                    </div>
                    <div className="detail">
                            <div><h4>{props.type}</h4></div>
                            <div><h4>{props.duration}</h4></div>
                            <div><h4>{props.description}</h4></div>
                            <div><h4>{props.information}</h4></div>
                    </div>
                    <div className="btnArea">
                        <div><button className="button-offre">{props.button}</button></div>
                </div>
                </div>
    );
}

