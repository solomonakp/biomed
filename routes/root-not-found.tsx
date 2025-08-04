'use client';

import { EmptyState } from '@components/empty-state';
import { useRouter } from 'next/navigation';

export const RootNotFoundPageMetadata = {
    title: 'Not Found',
    description: 'The page you are looking for does not exist.',
};

export const RootNotFoundPage = () => {
    const router = useRouter();
    return (
        <EmptyState
            title="Page not found"
            description="The page you are looking for does not exist or has been moved."
            action={{ text: 'Go Back', onClick: () => router.push('/') }}
        />
    );
};
