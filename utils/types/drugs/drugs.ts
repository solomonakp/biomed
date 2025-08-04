// Drug Type
export type Drug = {
    id: string;
    name: string;
    status: 'Pending' | 'Approved';
    description: string;
    mechanismOfAction: string;
    clinicalTrials: string;
    sideEffects: string[];
    manufacturer: string;
};

type MetaString = string | null;

type Metadata = {
    first: MetaString;
    prev: MetaString;
    next: MetaString;
    last: MetaString;
};

// Collection of Drugs
export type Drugs = {
    drugs: Drug[];
    metadata?: Metadata;
};
