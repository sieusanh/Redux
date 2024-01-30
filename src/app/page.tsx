'use client';
import { legacy_createStore as createStore } from 'redux';
import { useState, useEffect } from 'react';

const initState = 0;

// Reducer
function reducer(state = initState, action: { type: string, payload: number }) {
	switch (action.type) {
		case 'DEPOSIT':
			return state + action.payload;
		default:
			return state;

	}
}

// store
const store = createStore(reducer);

// Actions
function actionDeposit(payload: number) {
	console.log('value: ', store.getState())
	return {
		type: 'DEPOSIT',
		payload
	}
}

export default function Home() {
	const [value, setValue] = useState(store.getState());
	const [change, setChange] = useState(false);
	// Listener 
	store.subscribe(() => {
		console.log('State vừa update!')
		setChange(!change);
	});

	useEffect(() => {
		setValue(store.getState());
	}, [change]);

	function handleDeposit() {
		console.log('deposit')
		store.dispatch(actionDeposit(10));
	}
	return (
		<>
			<h1 id="output">{value}</h1>
			<button onClick={handleDeposit}>Deposit $10</button>
		</>
	);
}
