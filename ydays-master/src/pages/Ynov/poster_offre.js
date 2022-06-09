
import '../../css/poster_offre.css';
import '../../css/general.css';

export const PosterOffreArea = () => {
    return (
        <div className="PosterOffreArea">
            <div className="header-card">
                <p className="posterOffreTitle">Poster une Offre d'emploi</p>
            </div>
            <form className="PostForm" action="">
                <div className="postOffreArea">
                    <div><label>Nom de l'offre</label><input id="name" type="text" /></div>
                    <div><label>Type de contrat</label><input id="type" type="text" /></div>
                    <div><label>Détail de l'offre</label><input id="detail" type="text" /></div>
                </div>

                <div className="btnArea">
                    <div><button type="submit" className="button">Poster</button></div>
                </div>
            </form>
        </div>
    )
}