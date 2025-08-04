import Link from 'next/link';
import { DrugDetailsPageProps as Props } from './drug-details.props';
import { Metadata, NextPage } from 'next';
import { getDrug } from './drug-details.server';

export async function generatePostDetailsMetadata({
    params,
}: Props): Promise<Metadata> {
    // read route params
    const { id } = await params;

    // fetch data
    const drug = await getDrug(id);

    return {
        title: `Edit ${drug.name}`,
        description: drug.description,
        publisher: drug.manufacturer,
    };
}

export const DrugDetailsPage: NextPage<Props> = async ({ params }: Props) => {
    const { id } = await params;
    const drug = await getDrug(id);
    return (
        <div className="drug-details-page">
            <Link
                href="/"
                className={
                    'text-base text-black font-medium mb-7 inline-block focus:outline-black hover:text-blue-800 ease-in-out will-change-auto duration-150'
                }
            >
                Back to homepage
            </Link>
            <section className="mb-23">
                <header className="mb-6">
                    <h1 className="text-black text-lg font-bold">
                        Drug Candidate Details
                    </h1>
                </header>
                <div className="divide-y divide-gray-100 pt-2 grid grid-cols-2 text-sm text-left border-t border-(--color-accent)">
                    {/* Drug Name Row */}
                    <div className="py-4 last:pb-0">
                        <dl className="flex flex-col gap-1">
                            <dt className="text-gray-500">Drug Name</dt>
                            <dd className="text-(--color-font-black)">
                                {drug.name}
                            </dd>
                        </dl>
                    </div>

                    {/* Mechanism of Action Row */}
                    <div className="py-4 first:pt-0 last:pb-0">
                        <dl className="flex flex-col gap-1">
                            <dt className="text-gray-500">
                                Mechanism of Action
                            </dt>
                            <dd className="text-(--color-font-black)">
                                {drug.mechanismOfAction}
                            </dd>
                        </dl>
                    </div>

                    {/* Clinical Trials Row */}
                    <div className="py-4 first:pt-0 last:pb-0">
                        <dl className="flex flex-col gap-1">
                            <dt className="text-gray-500">Clinical Trials</dt>
                            <dd className="text-(--color-font-black)">
                                {drug.clinicalTrials}
                            </dd>
                        </dl>
                    </div>

                    {/* Side Effects Row */}
                    <div className="py-4 first:pt-0 last:pb-0">
                        <dl className="flex flex-col gap-2">
                            <dt className="text-gray-500">Side Effects</dt>
                            <dd className="text-(--color-font-black)">
                                {drug.sideEffects.toString()}
                            </dd>
                        </dl>
                    </div>
                </div>
            </section>

            <section>
                <header className="mb-6">
                    <h2 className="text-black text-[1.375rem] font-bold">
                        Additional Information
                    </h2>
                </header>

                <div className="divide-y divide-gray-100 pt-2 grid grid-cols-2 text-sm text-left border-t border-(--color-accent)">
                    {/* Approval Status Row */}
                    <div className="py-4 last:pb-0">
                        <dl className="flex flex-col gap-1 mb-7">
                            <dt className="text-gray-500">Approval Status</dt>
                            <dd className="text-(--color-font-black)">
                                {drug.status}
                            </dd>
                        </dl>
                    </div>

                    {/* Manufacturer Row */}
                    <div className="py-4 first:pt-0 last:pb-0">
                        <dl className="flex flex-col gap-1">
                            <dt className="text-gray-500">Manufacturer</dt>
                            <dd className="text-(--color-font-black)">
                                {drug.manufacturer}
                            </dd>
                        </dl>
                    </div>
                </div>
            </section>
        </div>
    );
};
