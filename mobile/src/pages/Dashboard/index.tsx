import React from 'react';
import { Container } from './styles';
import { Button } from 'react-native';
import { useAuth } from '../../hooks/auth';
const Dashboard: React.FC = () => {

    const {signOut} = useAuth();
    return <Container>
        <Button title="Sair"
            onPress={signOut}
        />
    </Container>
}

export default Dashboard;