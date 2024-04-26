import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components/macro';
import PageContext from '../Context/PageContext';
import APITag from '../APITag';
import APIResponseTag from './APIResponseTag';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import TesterContainer from './APITester/TesterContainer';

const PageContainer = styled.div`

    text-align: left;
    margin-left: 15px;

`

const URLContainer = styled.span`

    background-color: #11101d;
    color: #fff;
    padding: 5px 15px;

`

const ParamsContainer = styled.div`

    margin-top: 10px;
    margin-left: 25px;

`

const ParamItem = styled.div`

    margin-top: 10px;

`

const RequiredTag = styled.span`

    padding: 3px 6px;
    font-weight: 700;
    margin-left: 3px;
    margin-right: 3px;
    color: rgb(255, 255, 255) !important;
    background-color: #B22222;

`

const InfoTag = styled.span`

    padding: 3px 6px;
    font-weight: 700;
    margin-left: 3px;
    margin-right: 3px;
    color: rgb(255, 255, 255) !important;
    background-color: #1E90FF;

`

const ResponseContainer = styled.div`

    margin-top: 15px;
    margin-left: 25px;
    
    &.closed {
        .response {
            display: none;
            animation: closeAnimation 0.3s;

            @keyframes closeAnimation {
                from {opacity: 1; display: inline;}
                to {opacity: 0; display: none;}
              }
        }
    }

    &.opened {

        .arrow {
            transform: rotate(-180deg);
        }

        .response {
            
            animation: openAnimation 0.3s;

            @keyframes openAnimation {
                from {opacity: 0;}
                to {opacity: 1;}
              }
        }
    }

`

const Pre = styled.pre`

    background-color: #11101d;
    color: #fff;
    padding: 15px;

`

export default () => {

    const navigate = useNavigate();
    const pageContext = useContext(PageContext);

    const [pageInfo, setPageInfo] = useState<any>();

    const { id } = useParams();

    useEffect(() => {

        axios.get(`/api/page/${id}`).then((res) => {
            setPageInfo(res.data);
            pageContext.setTitle(<><APITag type={res.data.type} /> {res.data.title}</>);
        }).catch((err) => {
            console.log(err);
        })

    }, [id])

    function switchResponse(e: any) {
        const div = e.target.parentElement.parentElement;
        div.classList.toggle(`closed`);
        div.classList.toggle(`opened`);
    }

    return (
        <PageContainer>
            {!pageInfo ? (<></>) : (
                <>

                    <TesterContainer data={pageInfo} />

                    <div style={{ marginTop: `15px` }}>
                        <a href={pageInfo.test.url} target='_blank'><URLContainer>{pageInfo.test.url}</URLContainer></a>
                    </div>

                    <div style={{ marginTop: `15px` }} dangerouslySetInnerHTML={{ __html: pageInfo.description }} />


                    {(pageInfo.header.length == 0) ? (
                        <></>
                    ) : (
                        <>
                            <h2>Header:</h2>

                            <ParamsContainer>


                                <>

                                    {pageInfo.header.map((item: any, index: any) => (

                                        <>
                                            <ParamItem>
                                                - {item.title} <RequiredTag>Required</RequiredTag> <span dangerouslySetInnerHTML={{ __html: item.description }} ></span>
                                            </ParamItem>
                                        </>
                                    ))}

                                </>


                            </ParamsContainer>
                        </>
                    )}

                    {(pageInfo.query.length == 0) ? (
                        <></>
                    ) : (
                        <>
                            <h2>Queries:</h2>

                            <ParamsContainer>


                                <>

                                    {pageInfo.query.map((item: any, index: any) => (

                                        <>
                                            <ParamItem>
                                                - {item.title} <InfoTag>{item.type}</InfoTag> <RequiredTag>Required</RequiredTag> <span dangerouslySetInnerHTML={{ __html: item.description }} ></span>
                                            </ParamItem>
                                        </>
                                    ))}

                                </>


                            </ParamsContainer>
                        </>
                    )}

                    {(pageInfo.params.length == 0) ? (
                        <></>
                    ) : (
                        <>
                            <h2>Params:</h2>

                            <ParamsContainer>


                                <>

                                    {pageInfo.params.map((item: any, index: any) => (

                                        <>
                                            <ParamItem>
                                                - {item.title} <InfoTag>{item.type}</InfoTag> <RequiredTag>Required</RequiredTag> <span dangerouslySetInnerHTML={{ __html: item.description }} ></span>
                                            </ParamItem>
                                        </>
                                    ))}

                                </>


                            </ParamsContainer>
                        </>
                    )}

                    {(pageInfo.body.length == 0) ? (
                        <></>
                    ) : (
                        <>
                            <h2>Body:</h2>

                            <ParamsContainer>


                                <>

                                    {pageInfo.body.map((item: any, index: any) => (

                                        <>
                                            <ParamItem>
                                                - {item.title} <InfoTag>{item.type}</InfoTag> <RequiredTag>Required</RequiredTag> <span dangerouslySetInnerHTML={{ __html: item.description }} ></span>
                                            </ParamItem>
                                        </>
                                    ))}

                                </>


                            </ParamsContainer>
                        </>
                    )}

                    {(pageInfo.test.responses.length == 0) ? (
                        <></>
                    ) : (
                        <>
                            <h2>Responses:</h2>

                            {pageInfo.test.responses.map((item: any, index: any) => (

                                <>

                                    <ResponseContainer className='closed'>

                                        <h3> <APIResponseTag type={`${item.status}`} /> {item.title}

                                            {
                                                ((Object.keys(item.response).length == 0) ? (<></>) : (
                                                    <i className='bx bxs-chevron-down arrow' style={{ cursor: `pointer`, }} onClick={switchResponse}></i>
                                                ))

                                            }
                                        </h3>

                                        <div style={{ marginLeft: `10px` }} dangerouslySetInnerHTML={{ __html: item.description }} />

                                        <div style={{ textAlign: `left`, marginTop: `15px` }} className='response'>
                                            <Pre>
                                                <code>
                                                    {JSON.stringify(item.response, null, 4)}
                                                </code>
                                            </Pre>
                                        </div>
                                    </ResponseContainer>

                                </>

                            ))}

                        </>
                    )}
                </>
            )}
        </PageContainer>
    )
}