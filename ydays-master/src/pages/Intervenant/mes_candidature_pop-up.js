import '../../css/mes_candidature_pop-up.css';
import '../../css/candidature_detail_2.css';
import '../../css/general.css'

export function MesCandidature_detail(props) {
    
    return (
           <div>
                    <div className="headerCandidate">
                        <div className="candidatePic"><img className="candidate-pic" src={props.pictureLink} alt="pdp"/></div>
                        <div className="candidateInfo">
                            <div><h3 className="firstname">{props.firstname} </h3></div>
                            <div><h3 className="surname">{props.surname} </h3></div>
                            <div><h3 className="age">{props.age}</h3> </div>
                        </div>
                    </div>
                    
                    <div className="detail_candidature">
                            <div><h4>{props.description}</h4></div>
                            <div><h4>{props.situation}</h4></div>
                            <div><h4>{props.motivation}</h4></div>
                            <div><h4>{props.competence}</h4></div>
                    </div>
                    <div className="btnArea">
                        <div><button className="button">{props.button}</button></div>
                </div>
         </div>
    );
}
