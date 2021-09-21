import { render, screen, fireEvent } from '@testing-library/react';
import App, {replaceCamelWithSpaces} from './App';

test('button has correct initial color', () => {
  render(<App />);

  //find el with role button and text of 'Change to Midnight Blue'
  const colorButton = screen.getByRole('button', { name: 'Change to Midnight Blue' });

  //expect the background color to be Medium Violet Red
  expect(colorButton).toHaveStyle({ backgroundColor: 'MediumVioletRed' });
});


test('button turns Midnight Blue when clicked', () => {
  render(<App />);

  const colorButton = screen.getByRole('button', { name: 'Change to Midnight Blue' });

  fireEvent.click(colorButton);

  //expect background to have changed to Midnight Blue
  expect(colorButton).toHaveStyle({backgroundColor: 'MidnightBlue'});

  //expect button text to be 'Change to Medium Violet Red'
  expect(colorButton.textContent).toBe('Change to Medium Violet Red');
});

test('initial conditions', () => {
  render(<App />);

  //check button starts enabled
  const colorButton = screen.getByRole('button', { name: 'Change to Midnight Blue' });
  expect(colorButton).toBeEnabled();

  //check that checkbox starts out unchecked
  const checkbox = screen.getByRole('checkbox');
  expect(checkbox).not.toBeChecked();
});

test('button disabled after checkbox is checked', () => {
  render(<App />);

  //check button starts enabled
  const colorButton = screen.getByRole('button', { name: 'Change to Midnight Blue' });
  const checkbox = screen.getByRole('checkbox', { name: 'Disable button'});

  expect(colorButton).toBeEnabled();
  expect(checkbox).not.toBeChecked();

  fireEvent.click(checkbox);
  expect(colorButton).not.toBeEnabled();
  expect(checkbox).toBeChecked();

  fireEvent.click(checkbox);
  expect(colorButton).toBeEnabled();
});

test('disabled button turns gray', () => {
  render(<App />);
  const colorButton = screen.getByRole('button', { name: 'Change to Midnight Blue' });
  const checkbox = screen.getByRole('checkbox', { name: 'Disable button'});

  //starts enabled
  expect(colorButton).toBeEnabled();

  //click checkbox to disable
  fireEvent.click(checkbox);

  //button should be disabled
  expect(colorButton).not.toBeEnabled();

  //button should be gray
  expect(colorButton).toHaveStyle({backgroundColor: 'gray'});
});

describe('spaces before camel-case capital letters', () => {
  test('should work for no inner capital letters', () => {
    expect(replaceCamelWithSpaces('Red')).toBe('Red');
  });
  test('should work for one inner capital letter', () => {
    expect(replaceCamelWithSpaces('RedBlue')).toBe('Red Blue');
  });
  test('should work for multiple inner capital letters', () => {
    expect(replaceCamelWithSpaces('RedBlueYellowGreen')).toBe('Red Blue Yellow Green');
  });
});


