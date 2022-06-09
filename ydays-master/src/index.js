import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import {HomePageYnov_1} from "./pages/Ynov/home_page_ynov-1";
import {Connexion} from "./pages/connexion";
import {Profile} from "./pages/profile";
import {HomePageYnov} from "./pages/Ynov/home_page_ynov";
import {Popup} from "./component/popup_candidature";
import {HomePageIntervenant} from "./pages/Intervenant/home_page_intervenant";
import {PosterOffreArea} from "./pages/Ynov/poster_offre";
import {CandidaterArea} from "./pages/Intervenant/candidater";
import {Detail_offre} from "./pages/Intervenant/detail_offre";
import {MesCandidature} from "./pages/Intervenant/mes_candidature";
import {MesCandidature_detail} from "./pages/Intervenant/mes_candidature_pop-up";
import {Candidature_detail} from "./pages/Ynov/candidature_pop-up_2";


ReactDOM.render(
  <React.StrictMode>
      <HomePageYnov />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
