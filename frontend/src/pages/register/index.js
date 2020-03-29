import React, { useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import api from 'services/api';

const Logo = require('assets/Logo.png');

const Register = () => {
    const history = useHistory();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');

     const handleSubmit = async (e) => {
        e.preventDefault();

        api.post('ongs',{
            name,
            email,
            whatsapp,
            city,
            uf
        });
        
        alert('Caso cadastrado com sucesso!')
        history.push('/');
    }

    return (
        <div className='register-container'>
            <section>
                <div className='info'>
                    <img src={Logo} alt='Be the Hero' className='title' />
                    <h1>Cadastro</h1>
                    <span>Faça seu cadastro, entre na plataforma e ajude <br />
                            pessoas a encontrarem os casos da sua ONG.</span>
                    <Link to='/' className='icon-link'>
                        <FiArrowLeft size={15} color='red' style={{ marginRight: 10 }} />
                        <h5>Voltar</h5>
                    </Link>
                </div>
                <form onSubmit={handleSubmit}>
                    <input placeholder='Nome da ONG' value={name} onChange={e=>setName(e.target.value)} autoFocus/>
                    <input placeholder='E-mail' value={email} onChange={e=>setEmail(e.target.value)} type='email'/>
                    <input placeholder='Whatsapp' value={whatsapp} onChange={e=>setWhatsapp(e.target.value)}/>
                    <div className='input-group'>
                        <input placeholder='Cidade' value={city} onChange={e=>setCity(e.target.value)}/>
                        <input placeholder='UF' value={uf} onChange={e=>setUf(e.target.value)} maxLength={2}/>
                    </div>
                    <button type='submit'>Cadastrar</button>
                </form>
            </section>
        </div>
    )
}

export default Register;