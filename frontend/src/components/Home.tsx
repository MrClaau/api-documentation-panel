import React, { useContext, useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import styled from 'styled-components/macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faBook, faVideo } from '@fortawesome/free-solid-svg-icons';
import NavBarItem from './NavBarItem';
import axios from 'axios';
import PageContext from './PageContext';

export default () => {

    const pageContext = useContext(PageContext);

    const [homeText, setHomeText] = useState<any>();

    useEffect(() => {

        axios.get(`/api/home`).then((res) => {
            setHomeText(res.data.homePage);
            pageContext.setTitle(pageContext.config.homePageTitle)
        }).catch((err) => {
            console.log(err);
        })

    }, []);

    return (
        <>
            {!homeText ? (<></>) : (
                <>
                    <div dangerouslySetInnerHTML={{ __html: homeText }}/>
                </>
            )}
        </>
    )
}