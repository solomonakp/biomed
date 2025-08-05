import { render, screen, cleanup } from '@testing-library/react';
import { axe } from 'jest-axe';

import { NavBar } from './nav-bar';

afterEach(cleanup);

const setUpNavBar = () => render(<NavBar />);

describe('NavBar', () => {
    it('should the Nav bar component be exported correctly', () => {
        expect(NavBar).toBeDefined();
    });
    test('should the Nav bar component be mounted correctly', () => {
        setUpNavBar();

        const navbar = screen.getByRole('navigation');

        expect(navbar).toBeInTheDocument();
    });

    test('should render the Nav bar user would see', () => {
        const { asFragment } = setUpNavBar();

        expect(asFragment()).toMatchSnapshot();
    });
    test('should Nav bar not fail any accessibility test', async () => {
        const { container } = setUpNavBar();

        const result = await axe(container);

        expect(result).toHaveNoViolations();
    });
});
