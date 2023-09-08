import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('Increment and Decrement button should exist with class name btn-primary', () => {
	render(<App />);
	const incrementButtonElement = screen.getByRole('button', {
		name: /increment/i,
	});
	const decrementButtonElement = screen.getByRole('button', {
		name: /decrement/i,
	});

	expect(incrementButtonElement).toHaveClass('btn-primary');
	expect(decrementButtonElement).toHaveClass('btn-primary');
	expect(incrementButtonElement).toBeInTheDocument();
	expect(decrementButtonElement).toBeInTheDocument();
});

test('Counter exist with attribute data-testid set to counter-value and text content of 0, and expect to be disabled', () => {
	render(<App />);
	const counterElement = screen.getByTestId(/counter-value/i);

	expect(counterElement).toHaveTextContent(0);
});

test('Decrement button should be disabled when  counter is 0, Increment button should increase the counter value and enable the decrement button', () => {
	render(<App />);

	const counterElement = screen.getByTestId('counter-value');
	const decrementButtonElement = screen.getByRole('button', {
		name: /decrement/i,
	});
	const incrementButtonElement = screen.getByRole('button', {
		name: /increment/i,
	});

	expect(counterElement).toHaveTextContent(0);

	fireEvent.click(incrementButtonElement);
	expect(counterElement).toHaveTextContent(1);
	expect(decrementButtonElement).not.toBeDisabled();

	fireEvent.click(decrementButtonElement);
	expect(counterElement).toHaveTextContent(0);
	expect(decrementButtonElement).toBeDisabled();
});

test('Render navigation list with correct test content with class name as list-item', () => {
	const items = ['Home', 'About', 'Contact'];
	render(<App />);
	items.forEach((item) => {
		const reExp = new RegExp(item, 'i');
		const listItem = screen.getByText(reExp);
		expect(listItem).toBeInTheDocument();
		expect(listItem).toHaveClass('list-item');
	});
});
