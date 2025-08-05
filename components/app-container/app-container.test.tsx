import { render, screen, cleanup } from '@testing-library/react';
import { axe } from 'jest-axe';
import { AppContainer } from './app-container';
import { AppContainerProps as Props } from './app-container.props';

const defaultProps: Props = {
    children: 'hi',
};

afterEach(cleanup);

const setUpAppContainer = (props: Props = defaultProps) =>
    render(<AppContainer {...props}>{defaultProps.children}</AppContainer>);

describe('App Container', () => {
    it('should the App Container component be exported correctly', () => {
        expect(AppContainer).toBeDefined();
    });
    test('should the App Container component be mounted correctly', () => {
        setUpAppContainer();

        const appContainer = screen.getByRole('main');
        expect(appContainer).toHaveTextContent(defaultProps.children as string);

        expect(appContainer).toBeInTheDocument();
    });

    test('should render the App Container user would see', () => {
        const { asFragment } = setUpAppContainer();

        expect(asFragment()).toMatchSnapshot();
    });
    test('should the App Container not fail any accessibility test', async () => {
        const { container } = setUpAppContainer();

        const result = await axe(container);

        expect(result).toHaveNoViolations();
    });
});
