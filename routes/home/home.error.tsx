import { EmptyState } from '@components/empty-state';
import { HomeErrorPageProps as Props } from './home.props';
import EmptyImage from 'public/empty.jpg';

export const HomeErrorPage = ({ reset }: Props) => {
    return (
        <EmptyState
            title="Failed to retrieve drug candidates"
            description="We encountered an issue while retrieving the drug candidate data. Please try again later."
            action={{ text: 'Retry', onClick: () => reset() }}
            src={EmptyImage}
            alt="failed to fetch drug candidates image"
        />
    );
};
