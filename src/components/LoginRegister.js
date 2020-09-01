/** @format */

import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { useParams } from "react-router-dom";

const REGISTER = gql`
	mutation createUser($userData: CreateUserInput!) {
		createUser(userData: $userData) {
			newUser {
				id
				name
			}
			token
		}
	}
`;

const LOGIN = gql`
	mutation logIn($email: String!, $password: String!) {
		logIn(email: $email, password: $password) {
			newUser {
				id
				name
			}
			token
		}
	}
`;

function LoginRegister(props) {
	const [createUser] = useMutation(REGISTER, {
		onCompleted(data) {
			localStorage.setItem("token", data.logIn.token);
			props.history.push("/");
			window.location.reload(false);
		},
	});
	const [logIn, { data }] = useMutation(LOGIN, {
		onCompleted(data) {
			localStorage.setItem("token", data.logIn.token);
			props.history.push("/");
			window.location.reload(false);
		},
	});

	const [email, setEmail] = useState();
	const [password, setPassword] = useState();
	const [name, setName] = useState();
	const [surname, setSurname] = useState();

	return (
		<React.Fragment>
			<div className='login-wrap'>
				<div className='login-html'>
					<input id='tab-1' type='radio' name='tab' className='sign-in' checked />
					<label for='tab-1' className='tab'>
						Sign In
					</label>
					<input id='tab-2' type='radio' name='tab' className='sign-up' />
					<label for='tab-2' className='tab'>
						Sign Up
					</label>
					<div className='login-form'>
						<div className='sign-in-htm'>
							<div className='group'>
								<label for='user' className='label'>
									E-mail
								</label>
								<input id='user' type='text' className='input' onChange={(e) => setEmail(e.target.value)} />
							</div>
							<div className='group'>
								<label for='pass' className='label'>
									Password
								</label>
								<input id='pass' type='password' className='input' data-type='password' onChange={(e) => setPassword(e.target.value)} />
							</div>
							<div className='group'>
								<input id='check' type='checkbox' className='check' checked />
								<label for='check'>
									<span className='icon'></span> Keep me Signed in
								</label>
							</div>
							<div className='group'>
								<input
									type='submit'
									className='button'
									value='Sign In'
									onClick={() => {
										logIn({ variables: { email, password } });
									}}
								/>
							</div>
							<div className='hr'></div>
							<div className='foot-lnk'>
								<a href='#forgot'>Forgot Password?</a>
							</div>
						</div>
						<div className='sign-up-htm'>
							<div className='group'>
								<label for='user' className='label'>
									Username
								</label>
								<input id='user' type='text' className='input' onChange={(e) => setName(e.target.value)} />
							</div>
							<div className='group'>
								<label for='pass' className='label'>
									Password
								</label>
								<input id='pass' type='password' className='input' data-type='password' onChange={(e) => setSurname(e.target.value)} />
							</div>
							<div className='group'>
								<label for='pass' className='label'>
									Repeat Password
								</label>
								<input id='pass' type='password' className='input' data-type='password' onChange={(e) => setPassword(e.target.value)} />
							</div>
							<div className='group'>
								<label for='pass' className='label'>
									Email Address
								</label>
								<input id='pass' type='text' className='input' onChange={(e) => setEmail(e.target.value)} />
							</div>
							<div className='group'>
								<input
									type='submit'
									className='button'
									value='Sign Up'
									onClick={() => {
										createUser({
											variables: {
												userData: { name, surname, password, email },
											},
										});
									}}
								/>
							</div>
							<div className='hr'></div>
							<div className='foot-lnk'>
								<label for='tab-1'>Already Member?</label>
							</div>
						</div>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
}

export default LoginRegister;
