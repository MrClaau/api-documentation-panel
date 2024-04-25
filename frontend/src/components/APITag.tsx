import styled from 'styled-components/macro';
const Tag = styled.span`

    padding: 3px 6px;
    color: #fff !important;
    font-weight: 700;
    margin-left: 3px;
    margin-right: 3px;

`

export default ({ type }: { type: string }) => {

    let color = `LimeGreen`;

    switch (type) {
        case `POST`:
            color = `DeepSkyBlue`
            break;
        case `PUT`:
            color = `MediumSlateBlue`
            break;
        case `PATCH`:
            color = `DarkOrange`
            break;
        case `DELETE`:
            color = `Crimson`
            break;

        default:
            break;
    }



    return (
        <>
            <Tag style={{ backgroundColor: color }}>
                {type}
            </Tag>
        </>
    )
}