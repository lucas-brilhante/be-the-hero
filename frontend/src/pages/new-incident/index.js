import React, { useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { Link, useHistory, useLocation } from 'react-router-dom';
import api from 'services/api';

const Logo = require('assets/Logo.png');

const NewIncident = () => {
    const history = useHistory();
    const location = useLocation();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');

    const {ong_id} = location.state;

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log('loc',location)

        await api.post('incidents', {
            title,
            description,
            value,
            ong_id
        });

        alert('Caso cadastrado com sucesso!')
        history.push('/incidents',{ong_id});
    }

    return (
        <div className='register-container'>
            <section>
                <div className='info'>
                    <img src={Logo} alt='Be the Hero' className='title' />
                    <h1>Cadastro</h1>
                    <span>Faça seu cadastro, entre na plataforma e ajude <br />
                pessoas a encontrarem os casos da sua ONG.</span>
                    <Link to={location => ({pathname: '/incidents', state:{ong_id}})} className='icon-link'>
                        <FiArrowLeft size={15} color='red' style={{ marginRight: 10 }} />
                        <h5>Voltar para home</h5>
                    </Link>
                </div>
                <form onSubmit={handleSubmit}>
                    <input placeholder='Título' value={title} onChange={e => setTitle(e.target.value)} />
                    <textarea placeholder='Descrição' value={description} onChange={e => setDescription(e.target.value)} />
                    <input placeholder='Valor' value={value} onChange={e => setValue(e.target.value)} />
                    <div className='input-group'>
                        <button type='button' onClick={() => history.push('/incidents',{ong_id})}>Cancelar</button>
                        <button type='submit'>Cadastrar</button>
                    </div>
                </form>
            </section>
        </div>
    )
}

export default NewIncident;