import '../css/popup.css';
import '../css/general.css';
import close from '../assets/close.png';

export function Popup( props) {
    return (
        <div>
            <div className="background-popup">
                <div className="popup shadow">

                    <button className="closeModalBtn">
                        <img src={close} alt="close button" onClick={props.closeModal}/>
                    </button>

                    {props.contain}

                </div>
            </div>

        </div>

    )
}