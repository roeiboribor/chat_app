import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import io from 'socket.io-client';
// const socket = io.connect('http://localhost:3001');
const socket = io.connect('http://192.168.1.87:3001');

function App() {
	const [message, setMessage] = useState('');
	const [receivedMessage, setReceivedMessage] = useState('');

	useEffect(() => {
		receiveMessage();
	}, []);

	const submit = (e) => {
		e.preventDefault();
		socket.emit('send_message', message);
		setMessage('');
	};
	// https://www.youtube.com/watch?v=djMy4QsPWiI
	const receiveMessage = () => {
		socket.on('receive_message', (data) => {
			setReceivedMessage(data);
		});
	};

	return (
		<>
			<div className="min-vh-100 bg-light">
				<div className="container py-5">
					<Form onSubmit={submit}>
						<Form.Group className="mb-3" controlId="message-form">
							<Form.Control
								// as="textarea"
								// rows="5"
								type="text"
								placeholder="Your message here..."
								onChange={(e) => setMessage(e.target.value)}
								value={message}
								// style={{ resize: 'none' }}
							/>
						</Form.Group>
						<Button variant="primary" type="submit">
							Send Message
						</Button>
					</Form>
					<div className="mt-5">{receivedMessage}</div>
				</div>
			</div>
		</>
	);
}

export default App;
