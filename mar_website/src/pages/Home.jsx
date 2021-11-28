import React from "react";
import Typist from "react-typist";
import styled from "styled-components";
import 'react-typist/dist/Typist.css';

const HomeContainer = styled.div`
    width: 100%;
    min-height: 80vh;
    background-position: center;
    background-size: cover;
    position: relative;
    display: flex;
    flex-direction: column;
`;

const MarSection = styled.div`
    color: rgb(0, 0, 0);
    z-index: 999;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: 20px;
`;


const Features = styled.div`

`;

export default function Home() {
    return (
        <HomeContainer>
            <MarSection>

                <Typist>
                    <span><h3> MANDATORY ADDITIONAL REQUIREMENTS</h3></span>
                    <Typist.Backspace count={40} delay={200} show={false} element={"."} />
                    <span><h1>MAR - Simplified</h1></span>
                </Typist>


            </MarSection>
        </HomeContainer >
    );
}
