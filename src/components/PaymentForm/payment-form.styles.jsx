import styled from 'styled-components';
import Button from '../Button/button.component';
export const PaymentFormContainer = styled.div`
    height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const FormContainer = styled.form`
    width:100%;
`;

export const PaymentButton = styled(Button)`
    margin-left:auto;
    margin-top:30px;
`