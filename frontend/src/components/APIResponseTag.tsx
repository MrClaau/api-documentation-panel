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

    if (type.startsWith(`2`)) {
        color = `limegreen`;
    }

    if (type.startsWith(`3`)) {
        color = `darkorange`;
    }

    if (type.startsWith(`4`)) {
        color = `crimson`;
    }

    if (type.startsWith(`5`)) {
        color = `black`;
    }



    return (
        <>
            <Tag style={{ backgroundColor: color }}>
                {type}
            </Tag>
        </>
    )
}