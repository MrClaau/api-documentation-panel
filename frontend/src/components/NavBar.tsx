import React, { useContext, useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import styled from 'styled-components/macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faBook, faVideo } from '@fortawesome/free-solid-svg-icons';
import NavBarItem from './NavBarItem';
import axios from 'axios';
import PageContext from './PageContext';

export default () => {

    const pageContext = useContext(PageContext);

    const navigate = useNavigate();

    function toggleClose(e: any) {
        let sidebar: any = document.querySelector(".sidebar");
        sidebar.classList.toggle("close");
    }

    const [pages, setPages] = useState<any>();

    useEffect(() => {

        axios.get(`/api/config`).then((res) => {
            let config:any = pageContext.config;
            config.title = res.data.title;
            config.homePageTitle = res.data.homePageTitle;
            pageContext.setConfig(config);
        }).catch((err) => {
            console.log(err);
        })

        axios.get(`/api/methods`).then((res) => {
            setPages(res.data);
        }).catch((err) => {
            console.log(err);
        })

    }, []);

    return (
        <>
            {!pages ? (<></>) : (
                <>
                    <div className="sidebar">
                        <div className="logo-details">
                            <FontAwesomeIcon icon={faBook} className='icon' />
                            <span className="logo_name">{pageContext.config.title}</span>
                        </div>
                        <ul className="nav-links">
                            <li>
                                <Link to={`/`}>
                                    <i className='bx bx-grid-alt' ></i>
                                    <span className="link_name">Home</span>
                                </Link>
                                <ul className="sub-menu blank">
                                    <li><Link to={`/`} className="link_name">Home</Link></li>
                                </ul>
                            </li>
                            {pages.categories.map((element: any, index: any) => (
                                <NavBarItem icon={element.icon} title={element.title} subitems={element.pages} />
                            ))}
                        </ul>
                    </div>
                    <section className="home-section">
                        <div className="home-content">
                            <i className='bx bx-menu' onClick={toggleClose} ></i>
                            <span className="text">{pageContext.title}</span>
                        </div>
                        <div className='section-content'>
                            <Outlet />
                        </div>
                    </section>
                </>
            )}
        </>
    )
}