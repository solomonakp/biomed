import { EmptyState } from '@components/empty-state';
import { DrugList } from '../drug-list';
import { getDrugs } from './drugs.server';

export const Drugs = async () => {
    const drugs = await getDrugs();
    console.log(drugs, 'drugs');

    if (drugs.drugs.length === 0) {
        return (
            <EmptyState
                title="No Drug Candidates"
                description="Sorry, We cant find any drug candidates at the moment"
            />
        );
    }

    return <DrugList drugs={drugs} />;
};
