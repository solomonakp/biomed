import { NextPage } from 'next';

export type HomeBaseProps = {
    params?: Promise<{
        page?: string;
    }>;
};

export type HomeErrorPageProps = {
    error: Error & { digest?: string };
    reset: () => void;
};

export type HomePageProps = NextPage<HomeBaseProps>;
