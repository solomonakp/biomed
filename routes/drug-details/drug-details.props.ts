export type DrugDetailsPageProps = {
    params: Promise<{
        id: string;
    }>;
};

export type DrugDetailsErrorPageProps = {
    error: Error & { digest?: string };
    reset: () => void;
};
