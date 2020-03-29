import React, { useState, useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { FiPower, FiTrash2 } from "react-icons/fi";
import './styles.css';

import api from 'services/api';

const Logo = require('assets/Logo.png');

const Incidents = () => {
    const history = useHistory();
    const location = useLocation();
    const [incidents, setIncidents] = useState([]);
    const [ong_name, setOngName] = useState('');

    const { ong_id } = location.state;

    useEffect(() => {
        const getIncidents = async () => {
            const response = await api.get(`ong_login/${ong_id}`);
            setIncidents(response.data.incidents);
            setOngName(response.data.name);
        }
        getIncidents();
    }, [ong_id])

    const handleRegisterNewIncident = () => {
        history.push('/new-incident',{ong_id});
    }

    const handleDeleteIncident = async(id) => {
        await api.delete(`incidents/${id}`, {
            headers: {
                ong_id
            }
        });
        setIncidents(incidents.filter(incident => incident.id !== id))
    }

    return (
        <div className='incidents-container'>
            <header>
                <div className='group'>
                    <img src={Logo} alt='Be the Hero' className='logo' />
                    <span>Bem vindo, {ong_name}</span>
                </div>
                <div className='group'>
                    <button onClick={handleRegisterNewIncident}>Cadastrar novo caso</button>
                    <Link to='/' className='logout'>
                        <FiPower size={18} color='red' />
                    </Link>
                </div>
            </header>

            <section>
                <h1>Casos cadastrados</h1>
                <div className='grid'>
                    {incidents.map(incident => (
                        <div className='card' key={incident.id}>
                            <div className='info-group'>
                                <div className='title-and-trash'>
                                    <h3>CASO:</h3>
                                    <button className='trash-icon'
                                        onClick={() => handleDeleteIncident(incident.id)}>
                                        <FiTrash2 size={15} color='black' />
                                    </button>
                                </div>
                                <span>{incident.title}</span>
                            </div>
                            <div className='info-group'>
                                <h3>Descrição:</h3>
                                <span>{incident.description}</span>
                            </div>
                            <div className='info-group'>
                                <h3>VALOR:</h3>
                                <span>{
                                    Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
                                        .format(incident.value)
                                }</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    )
}

export default Incidents;