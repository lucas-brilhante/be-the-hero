import React, { useState } from 'react';
import './styles.css';
import { FiLogIn } from "react-icons/fi";
import { Link, useHistory } from 'react-router-dom';

import api from 'services/api';

const Logo = require('../../assets/Logo.png');
const image = require('../../assets/image.svg');

const Home = () => {
    const history = useHistory();
    const [ong_id, setOngId] = useState('');

    const handleClick = async (e) => {
        if(ong_id ==='')
            return;

        const login = await api.get(`ong_login/${ong_id}`);
        if(login.data.length === 0)
            return alert('Ong não cadastrada');

        history.push('/incidents', {ong_id});
    }

    return (
        <div className='home-container'>
            <div className='home-login'>
                <img className='home-logo' src={Logo} alt='Be the Hero' />
                <h1>Faça seu login</h1>
                <input placeholder='Sua ID' value={ong_id} onChange={e => setOngId(e.target.value)} autoFocus />
                <button onClick={handleClick}>Entrar</button>
                <Link to='/register' className="icon-link">
                    <FiLogIn size={20} color={'red'} style={{ marginRight: 10 }} />
                    <span>Não tenho cadastro</span>
                </Link>
            </div>
            <img src={image} alt='Be the Hero' style={{ height: 500 }} />
        </div>
    )
}

export default Home;