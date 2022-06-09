
import '../../css/candidater.css';
import logo from '../../assets/logo_ynovcampus/logo_ynov_campus.svg'

export const CandidaterArea = () => {
    return (
        <div className="CandidaterArea">
            <div className="candidater-header-card header-card">
                <h1 className="Candidater-title">Candidater</h1>
            </div>
            <form className="candidater-form" action="">
                <div className="candidater-Area">
                    <div>
                        <label>Nom de l'offre</label><input id="name" type="text" />
                    </div>
                    <div>
                        <label>Motivation détaillée</label><input className="candidate-motivation" id="motivation" type="text" />
                    </div>
                </div>
                <div className="btnArea">
                    <div><button className="button">Candidater</button></div>
                </div>
            </form>
        </div>
    )
}

function Candidater () {
    return (
        <div>
            <CandidaterArea />
            <div className="frise">
            </div>
        </div>
    )
}