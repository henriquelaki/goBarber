import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import React, { useCallback, useRef } from 'react';
import { FiLock, FiLogIn, FiMail } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import logoImg from '../../assets/logo.svg';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';
import getValidationErrors from '../../utils/getValidationErrors';
import { AnimationContainer, Background, Container, Content } from './styles';

interface SignInData {
	email: string;
	password: string;
}

const SignIn: React.FC = () => {
	const formRef = useRef<FormHandles>(null);
	const history = useHistory();

	const { signIn } = useAuth();
	const { addToast } = useToast();

	const handleSubmit = useCallback(
		async (data: SignInData) => {
			try {
				formRef.current?.setErrors({});
				const schema = Yup.object().shape({
					email: Yup.string()
						.required('Digite seu e-mail')
						.email('E-mail inválido'),
					password: Yup.string().required('Digite sua senha'),
				});
				await schema.validate(data, {
					abortEarly: false,
				});

				await signIn({
					email: data.email,
					password: data.password,
				});

				history.push('/dashboard');
			} catch (err) {
				if (err instanceof Yup.ValidationError) {
					const errors = getValidationErrors(err);
					formRef.current?.setErrors(errors);
					return;
				} else {
					addToast({
						type: 'error',
						title: 'Erro na autenticação',
						description:
							'Ocorreu um erro ao fazer seu login. Verifique login/senha',
					});
				}
			}
		},
		[signIn, addToast, history]
	);

	return (
		<Container>
			<Content>
				<AnimationContainer>
					<img src={logoImg} alt='GoBarber' />
					<Form ref={formRef} onSubmit={handleSubmit}>
						<h1>Faça seu logon</h1>
						<Input name='email' icon={FiMail} placeholder={`E-mail`} />
						<Input
							name='password'
							icon={FiLock}
							type='password'
							placeholder='Senha'
						/>
						<Button type='submit'>Entrar</Button>

						<a href='forgot'>Esqueci minha senha</a>
					</Form>
					<Link to='/signup'>
						<FiLogIn />
						Criar conta
					</Link>
				</AnimationContainer>
			</Content>
			<Background />
		</Container>
	);
};

export default SignIn;
