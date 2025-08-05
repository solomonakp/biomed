import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { axe } from 'jest-axe';
import { Button } from './button';
import { ButtonProps as Props } from './button.props';

const defaultProps: Props = {
    onClick: jest.fn(),
    title: 'my button',
    role: 'button',
    type: 'button',
};

afterEach(cleanup);

const setUpButton = (props: Props = defaultProps) =>
    render(<Button {...props}>{defaultProps.title}</Button>);

describe('Button', () => {
    it('should the Button component be exported correctly', () => {
        expect(Button).toBeDefined();
    });
    test('should mount', () => {
        setUpButton();

        const button = screen.getByRole('button');
        expect(button).toHaveTextContent(defaultProps.title as string);

        expect(button).toBeInTheDocument();
    });

    test('should render the Button user would see', () => {
        const { asFragment } = setUpButton();

        expect(asFragment()).toMatchSnapshot();
    });

    test('should Button fire event when clicked', () => {
        const { onClick } = defaultProps;

        setUpButton();

        const button = screen.getByRole('button');

        fireEvent.click(button);

        expect(onClick).toHaveBeenCalled();
    });

    test('should Button show a loader while loading', async () => {
        const props = {
            ...defaultProps,
            loading: true,
        };
        setUpButton(props);

        const button = screen.getByRole('button');

        expect(button).toBeDisabled();
        expect(await screen.findByTestId(/loader/i)).toBeInTheDocument();
    });
    test('should Button not fail any accessibility test', async () => {
        const { container } = setUpButton();

        const result = await axe(container);

        expect(result).toHaveNoViolations();
    });
});
