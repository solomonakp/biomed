import { HomePageProps as Props } from './home.props';

import { Drugs } from './features/drugs';

export const HomeMetadata = {
    title: 'Drug Candidates List Page',
    description: 'A List of all Drug Candidates',
};

export const HomePage: Props = async ({ params }) => {
    return (
        <div className="home-page">
            <Drugs />
        </div>
    );
};
