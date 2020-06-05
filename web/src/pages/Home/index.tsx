import React from 'react';
import { FiLogIn } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import './styles.css';

import logo from '../../assets/logo.svg';

const Home = () => {
    return (
        <div id="page-home">
            <div className="content">
                <header>
                    <img src={logo} alt="Ecoleta"/>

                </header>

                {/* O Link do React-Router-Dom é melhor que o a do HTML
                pois o Link realiza o carregamento de página sem recarregar
                todo o html
                 */}

                <main>
                    <h1>Seu marketplace de coleta de resíduos.</h1>
                    <p>Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente</p>
                    <Link to="/create-point">
                        <span>
                            <FiLogIn />
                        </span>
                        <strong>Cdastre um ponto de coleta</strong>
                    </Link>
                </main>
            </div>
        </div>
    )
}

export default Home;