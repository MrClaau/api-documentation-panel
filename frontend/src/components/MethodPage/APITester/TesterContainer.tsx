import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios, { AxiosRequestConfig, RawAxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components/macro';
import APIResponseTag from '../APIResponseTag';

const ArrowTop = styled.div`

    position: fixed;
    top: 15px;
    right: 0px;
    background-color: var(--bg-color-1);
    color: #fff;
    padding: 10px;
    text-align: middle;
    font-weight: 700;
    cursor: pointer;
    user-select: none;

    &.open {
        right: 700px;
        & .arrow {
            transform: rotate(-180deg);
        }
    }

`

const Container = styled.div`

    position: fixed;

    z-index: 1;

    top: 0px;
    right: 0px;

    height: 100vh;

    width: 700px;

    display: none;
    opacity: 0;

    padding: 25px;
    background-color: var(--bg-color-1);

    color: var(--txt-color-1);

    overflow-y: auto;

    &.open {
        display: block;
        opacity: 1;
    }

    & .url-container {
        background-color: var(--bg-color-2);
        color: var(--txt-color-2);
        padding: 5px 15px;
        font-weight: 600;
    }

    & .field-zone {
        margin-top: 15px;
        margin-bottom: 35px;
    }

`

const InputContainer = styled.div`

    margin-top: 10px;
    margin-left: 15px;

    margin-bottonm: 10px;
    padding-bottom: 10px;
    border-bottom: solid #413d61 2px;

    & .content {
        display: flex;
        flex-direction: row;
        gap: 10px;
    
            & .title {
        width: 200px;
        & div {
            font-weight: 700;
        }

        & span {
            font-weight: 400;
            font-size: 14px;
            opacity: 0.6;
        }

    }

    & .input-area {

        width: 100%;

        input {
            all: unset;
            width: calc(100% - 30px);
            background-color: var(--bg-color-2);
            color: var(--txt-color-2);
            padding: 5px 15px;
        }
    }
    
    }

`

const RunButton = styled.div`

    margin-top: 25px;
    text-align: right;

    & .button {
        padding: 5px 10px;
        color: #fff !important;
        font-weight: 700;
        font-size: 20px;
        cursor: pointer;
        background-color: LimeGreen;
    }

`

const ErrorContainer = styled.div`

    display: none;
    margin-bottom: 25px;
    background-color: Crimson;
    color: #fff;
    padding: 10px 15px;
    font-size: 18px;

`

const TesterResponseContainer = styled.div`

    display: none;

    & .title {
        font-size: 18px;
        font-weight: 600;
    }

    & .response-code {
        width: 100%;
        & pre {
            overflow-y: auto;
            margin-top: 20px;
            padding: 15px;
            background-color: var(--bg-color-2);
            color: var(--txt-color-2);
        }
    }

`

export default ({ data }: { data: any }) => {

    const [url, setUrl] = useState(``);
    const [errorText, setErrorText] = useState(``);
    const [params, setParams] = useState<any>({
        params: {},
        query: {},
        header: {},
        body: {}
    });
    const [testerResponse, setTesterResponse] = useState(``);
    const [testerResponseStatus, setTesterResponseStatus] = useState<any>();

    useEffect(() => {

        setUrl(data.test.url);

        setParams({
            params: {},
            query: {},
            header: {},
            body: {}
        })

        for (let i = 0; i < data.query.length; i++) {
            const query = data.query[i];
            params.query[query.title] = ``;
        }
        for (let i = 0; i < data.params.length; i++) {
            const param = data.params[i];
            params.params[param.title] = ``;
        }
        for (let i = 0; i < data.body.length; i++) {
            const body = data.body[i];
            params.body[body.title] = ``;
        }
        for (let i = 0; i < data.header.length; i++) {
            const headerData = data.header[i];
            params.header[headerData.title] = ``;
        }

        const testerErrorContainer = document.getElementById(`tester-error-container`);
        if (!testerErrorContainer) return;
        testerErrorContainer.style.display = `none`;

        const testerResultContainer = document.getElementById(`tester-response-container`);
        if (!testerResultContainer) return;
        testerResultContainer.style.display = `none`;

        updateURL();
    }, [data])

    function open(e: any) {
        const button = document.querySelector(`.tester-button`);
        button?.classList.toggle(`open`);
        const container = document.querySelector(`.tester-container`);
        container?.classList.toggle(`open`);
    }

    function updateQuery(e: any) {

        params.query[e.target.name] = e.target.value;

        updateURL();

    }

    function updateBody(e: any) {

        params.body[e.target.name] = e.target.value;

    }

    function updateParams(e: any) {

        params.params[e.target.name] = e.target.value;

        updateURL();

    }

    function updateHeader(e: any) {

        params.header[e.target.name] = e.target.value;

    }

    function updateURL() {

        cleanStyle();

        let text = `${data.test.base_url}`;
        let added = false;

        for (let i = 0; i < data.query.length; i++) {
            const query = data.query[i];
            const actual = params.query[query.title];
            if (actual != ``) {
                if (!added) {
                    text += `?`;
                    added = true;
                } else {
                    text += `&`
                }
                text += `${query.title}=${actual}`
            }
        }

        for (let i = 0; i < data.params.length; i++) {
            const param = data.params[i];
            const actual = params.params[param.title];

            if (actual != ``) {
                text = text.replaceAll(`{${param.title}}`, actual);
            }
        }

        setUrl(text);

    }

    function run() {

        errorTextToggle(``, true);

        const responseContainer = document.getElementById(`tester-response-container`);
        if (responseContainer) {
            responseContainer.style.display = `none`;
        }

        const body: any = {};
        const header: any = {};

        for (let i = 0; i < data.query.length; i++) {
            const query = data.query[i];

            const input = document.getElementById(`query-${query.title}`);

            if (input) {
                if (query.required) {

                    if (params.query[query.title] == `` || !params.query[query.title]) {
                        input.style.border = `red solid 2px`;
                        errorTextToggle(`Required params`, false);
                        return;
                    }
                }

            }

        }

        for (let i = 0; i < data.params.length; i++) {
            const param = data.params[i];

            const input = document.getElementById(`params-${param.title}`);

            if (input) {
                if (param.required) {

                    if (params.params[param.title] == `` || !params.params[param.title]) {
                        input.style.border = `red solid 2px`;
                        errorTextToggle(`Required params`, false);
                        return;
                    } else {
                        body[param.title] = params.params[param.title]
                    }
                }

            }

        }

        for (let i = 0; i < data.header.length; i++) {
            const header_info = data.header[i];

            const input = document.getElementById(`header-${header_info.title}`);

            if (input) {
                if (header_info.required) {

                    if (params.header[header_info.title] == `` || !params.header[header_info.title]) {
                        input.style.border = `red solid 2px`;
                        errorTextToggle(`Required params`, false);
                        return;
                    } else {
                        header[header_info.title] = params.header[header_info.title];
                    }
                }

            }

        }

        for (let i = 0; i < data.body.length; i++) {
            const body_info = data.header[i];

            const input = document.getElementById(`body-${body_info.title}`);

            if (input) {
                if (body_info.required) {

                    if (params.body[body_info.title] == `` || !params.body[body_info.title]) {
                        input.style.border = `red solid 2px`;
                        errorTextToggle(`Required params`, false);
                        return;
                    } else {
                        body[body_info.title] = params.body[body_info.title];
                    }
                }

            }

        }

        let axiosConfig = {
            headers: header
        }

        switch (data.type) {
            case `GET`:
                axios.get(url, axiosConfig).then(setResponse).catch(setErrorResponse);
                break;
            case `POST`:
                axios.post(url, body, axiosConfig).then(setResponse).catch(setErrorResponse);
                break;
            case `PUT`:
                axios.put(url, body, axiosConfig).then(setResponse).catch(setErrorResponse);
                break;
            case `PATCH`:
                axios.patch(url, body, axiosConfig).then(setResponse).catch(setErrorResponse);
                break;
            case `DELETE`:
                axios.delete(url, axiosConfig).then(setResponse).catch(setErrorResponse);
                break;

            default:
                break;
        }

    }

    function setResponse(res: any) {

        let status = <span><APIResponseTag type={`${res.status}`} /> Unknown</span>;

        for (let i = 0; i < data.test.responses.length; i++) {
            const response: any = data.test.responses[i];

            if (response.status == res.status) {

                status = <span><APIResponseTag type={`${res.status}`} /> {response.title}</span>;
            }
        }

        setTesterResponseStatus(status);

        try {
            setTesterResponse(JSON.stringify(res.data, null, 4));
        } catch (error) {
            setTesterResponse(res.data);
        }

        const responseContainer = document.getElementById(`tester-response-container`);
        if (responseContainer) {
            responseContainer.style.display = `block`;
        }

    }

    function setErrorResponse(res: any) {

        let status = <span></span>;

        if (!res.response) {
            status = <span><APIResponseTag type={`502`} /> Bad Gateway</span>;
            setTesterResponseStatus(status);
            const responseContainer = document.getElementById(`tester-response-container`);
            if (responseContainer) {
                responseContainer.style.display = `block`;
            }
            return;
        }

        status = <span><APIResponseTag type={`${res.response.status}`} /> Unknown</span>;

        for (let i = 0; i < data.test.responses.length; i++) {
            const response: any = data.test.responses[i];

            if (response.status == res.status) {

                status = <span><APIResponseTag type={`${res.response.status}`} /> {response.title}</span>;
            }
        }

        setTesterResponseStatus(status);

        try {
            setTesterResponse(JSON.stringify(res.response.data, null, 4));
        } catch (error) {
            setTesterResponse(res.response.data);
        }

        const responseContainer = document.getElementById(`tester-response-container`);
        if (responseContainer) {
            responseContainer.style.display = `block`;
        }

    }

    function errorTextToggle(error: string, close: boolean) {

        const input = document.getElementById(`tester-error-container`);
        if (!input) return;

        if (close) {
            input.style.display = `none`;
            return;
        }

        setErrorText(error);

        input.style.display = `block`;


    }

    function cleanStyle() {

        const inputs = document.querySelectorAll(`input`);
        for (let i = 0; i < inputs.length; i++) {
            const input = inputs[i];
            input.style.border = `none`;
        }
    }

    function getInputType(type: string) {

        switch (type) {
            case "url":
            case "link":
                return "url";
            case "number":
            case "numeric":
                return "number";
            case "time":
                return "time";
            case "date":
                return "date";
            case "boolean":
                return "checkbox";
            case "email":
                return "email";

            default:
                return "text"
        }
    }


    return (
        <>
            <ArrowTop className='tester-button' onClick={open}>
                <i className='bx bxs-chevron-left arrow' style={{ cursor: `pointer`, }}></i> Tester
            </ArrowTop>
            <Container className='tester-container'>
                <ErrorContainer id='tester-error-container'>
                    {errorText}
                </ErrorContainer>

                <div className='url-zone'>
                    <h3>URL:</h3>
                    <div className='url-container'>{url}</div>
                </div>

                {(data.header.length == 0) ? (
                    <></>
                ) : (<>
                    <div className='field-zone'>
                        <h3>Header:</h3>

                        {data.header.map((item: any, index: any) => (
                            <InputContainer>
                                <div className='content'>
                                    <div className='title'>
                                        <div>{item.title}</div>
                                        <div><span>{item.type}</span> {item.required ? (<span>required</span>) : (<></>)}</div>
                                    </div>
                                    <div className='input-area'>
                                        <input type={getInputType(item.type)} name={item.title} onInput={updateHeader} id={`header-${item.title}`} />
                                    </div>
                                </div>
                            </InputContainer>
                        ))}

                    </div>
                </>
                )}

                {(data.query.length == 0) ? (
                    <></>
                ) : (<>
                    <div className='field-zone'>
                        <h3>Queries:</h3>

                        {data.query.map((item: any, index: any) => (
                            <InputContainer>
                                <div className='content'>
                                    <div className='title'>
                                        <div>{item.title}</div>
                                        <div><span>{item.type}</span> {item.required ? (<span>required</span>) : (<></>)}</div>
                                    </div>
                                    <div className='input-area'>
                                        <input type={getInputType(item.type)} name={item.title} onInput={updateQuery} id={`query-${item.title}`} />
                                    </div>
                                </div>
                            </InputContainer>
                        ))}

                    </div>
                </>
                )}

                {(data.params.length == 0) ? (
                    <></>
                ) : (<>
                    <div className='field-zone'>
                        <h3>Params:</h3>

                        {data.params.map((item: any, index: any) => (
                            <InputContainer>
                                <div className='content'>
                                    <div className='title'>
                                        <div>{item.title}</div>
                                        <div><span>{item.type}</span> {item.required ? (<span>required</span>) : (<></>)}</div>
                                    </div>
                                    <div className='input-area'>
                                        <input type={getInputType(item.type)} name={item.title} datatype={data.title} onInput={updateParams} id={`params-${item.title}`} />
                                    </div>
                                </div>
                            </InputContainer>
                        ))}

                    </div>
                </>
                )}

                {(data.body.length == 0) ? (
                    <></>
                ) : (<>
                    <div className='field-zone'>
                        <h3>Body:</h3>

                        {data.body.map((item: any, index: any) => (
                            <InputContainer>
                                <div className='content'>
                                    <div className='title'>
                                        <div>{item.title}</div>
                                        <div><span>{item.type}</span> {item.required ? (<span>required</span>) : (<></>)}</div>
                                    </div>
                                    <div className='input-area'>
                                        <input type={getInputType(item.type)} name={item.title} datatype={data.title} onInput={updateBody} id={`body-${item.title}`} />
                                    </div>
                                </div>
                            </InputContainer>
                        ))}

                    </div>
                </>
                )}

                <RunButton onClick={run}>
                    <span className='button'> <FontAwesomeIcon icon={faPlay} /> RUN</span>
                </RunButton>

                <TesterResponseContainer id='tester-response-container'>
                    <div className='title'>{testerResponseStatus}</div>
                    <div className='response-code'>
                        <pre>
                            <code>
                                {testerResponse}
                            </code>
                        </pre>
                    </div>
                </TesterResponseContainer>
            </Container>
        </>
    )
}