import React from "react";
import {ButtonLoad, Container} from './button.styled'

export const Button =({onClick}) => {
    return (
        <Container>
            <ButtonLoad type ="button" onClick={onClick}>Load more</ButtonLoad>
        </Container>
    );
};