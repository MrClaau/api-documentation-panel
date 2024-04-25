import React, { useContext, useEffect } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import styled from 'styled-components/macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import APITag from './APITag';

const Nav = styled.nav`

    position: fixed;
    top:0;
    right:0;
    left:0;
    width: 100%;
    background-color: #0f0f0f;
    color: #fff;
    z-index: 2023;

    box-shadow: 0 5px 10px rgba(0, 0, 0, .7);

    & a {
        color: #fff;
        text-decoration: none;
        transition: all 0.2s;

        &:hover {
            color: red;
        }
    }
    

    & .container {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding: 0 16px;
        height: 56px;

        & .left {
            display: flex;
            align-items: center;
            max-width: 170px;

            & img {
                max-width: 100%;
                max-height: 55px;
                cursor: pointer;
            }
        }

        & .center {
            display: none;
            flex-direction: row;
            align-items: center;
            flex: 0 1 728px;
            min-width: 0px;

            & input {
                width: 100%;
                padding: 4px 8px;
                border-radius: 20px;
                border: none;
                box-shadow: none;
                outline: none;
                font-weight: 400;
                line-height: 24px;
                font-size: 16px;
                height: 35px;
            }

        }

        & .right {
            display: flex;
            flex-direction: row;
            align-items: right;
            min-width: 250px;
            justify-content: right;

            @media (width < 1200){
            }
        }

    }

`

const Content = styled.div`

    & {
        position: relative;
        background-color: #0f0f0f;
        color: #fff;
        min-height: 100vh;
        width: 100vw;
    }

`

export default ({icon, title, subitems}: {icon: string, title: string, subitems:any}) => {

    const navigate = useNavigate();

    function openDiv(e: any) {
        let arrowParent = e.target.parentElement;//selecting main parent of arrow
        
        if(arrowParent.tagName != "LI") {
            arrowParent = arrowParent.parentElement;
        }

        if(arrowParent.tagName != "LI") {
            arrowParent = arrowParent.parentElement;
        }
        arrowParent.classList.toggle("showMenu");
    }

    return (
        <>
            <li>
                <div className="iocn-link" onClick={openDiv} style={{cursor: `pointer`}}>
                    <a style={{minHeight: `50px`}}>
                        <i className={`icon ${icon}`} />
                        <span className="link_name">{title}</span>
                    </a>
                    <i className='bx bxs-chevron-down arrow'></i>
                </div>
                <ul className="sub-menu">
                    <li><a className="link_name">{title}</a></li>
                    {subitems.map((item:any, index:any) => (
                        <li style={{cursor: `pointer`}}><Link to={`/page/${item.id}`} ><APITag type={item.type} /> {item.title}</Link></li>
                    ))

                    }
                </ul>
            </li>
        </>
    )
}