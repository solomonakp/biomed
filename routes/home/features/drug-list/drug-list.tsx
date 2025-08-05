'use client';

import {
    SearchBar,
    Table,
    TableBody,
    TableData,
    TableHead,
    TableHeader,
    TableRow,
} from '@routes/home/components';
import { DrugListProps as Props } from './drug-list.props';
import { useState } from 'react';
import { useDebouncedCallback } from '@hooks/use-debounced-callback';
import { getDrugsByName, getDrugsByPaginationUrl } from './drug-list.action';
import { TD_STATUS_CLASSNAME } from './drugs-list.const';
import { Loader } from '@components/loader';
import { EmptyState } from '@components/empty-state';
import { useRouter } from 'next/navigation';

export const DrugList = ({ drugs }: Props) => {
    const [drugList, setDrugList] = useState<typeof drugs>(drugs);

    const [isLoading, setIsLoading] = useState(false);

    const isDrugListEmpty = drugList.drugs.length === 0;

    const meta = drugList.metadata;

    const router = useRouter();

    const handleSearch = useDebouncedCallback(
        async (e: React.ChangeEvent<HTMLInputElement>) => {
            // Note: Temp hack refactor to use useActionState
            setIsLoading(true);
            const drugListByName = await getDrugsByName(e.target.value);
            setDrugList(drugListByName);
            setIsLoading(false);
        },
        500,
    );

    const handlePrevClick = async () => {
        if (!meta?.prev) return;

        setIsLoading(true);
        const drugListByPagination = await getDrugsByPaginationUrl(meta.prev);
        setDrugList(drugListByPagination);
        setIsLoading(false);
    };

    const handleNextClick = async () => {
        if (!meta?.next) return;

        setIsLoading(true);
        const drugListByPagination = await getDrugsByPaginationUrl(meta.next);
        setDrugList(drugListByPagination);
        setIsLoading(false);
    };

    return (
        <>
            <section className="mb-4">
                <header className="mb-6">
                    <h1 className="text-black text-lg font-bold">
                        Drug Candidates
                    </h1>
                </header>
                <form>
                    <SearchBar
                        placeholder="Search by drug name"
                        name="search"
                        onChange={handleSearch}
                    />
                </form>
            </section>

            <section className="relative table-section">
                {isDrugListEmpty && (
                    <EmptyState
                        title="No Drug Candidate found"
                        description={`Try search another name to find what you're looking for.`}
                    />
                )}

                {isLoading && (
                    <Loader variant="absolute" size="md" className="bg-white" />
                )}
                {!isDrugListEmpty && (
                    <Table>
                        <TableHeader>
                            <TableHead>Name</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Description</TableHead>
                        </TableHeader>
                        <TableBody>
                            {drugList.drugs.map((drug) => {
                                return (
                                    <TableRow
                                        key={drug.id}
                                        onClick={() =>
                                            router.push(`/drugs/${drug.id}`)
                                        }
                                        data-testId="body-row"
                                    >
                                        <TableData>{drug.name}</TableData>
                                        <TableData
                                            className={
                                                TD_STATUS_CLASSNAME[drug.status]
                                            }
                                        >
                                            {drug.status}
                                        </TableData>
                                        <TableData>
                                            {drug.description}
                                        </TableData>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                )}
            </section>
            {/* Note: This will be refactored to use button component */}
            {meta && (
                <section>
                    <div className="max-w-screen-xl mx-auto mt-8  text-(--color-font-black)">
                        <nav
                            className="justify-center sm:flex"
                            aria-labelledby="pagination"
                            data-testid="pagination"
                        >
                            <ul className="flex items-center gap-1">
                                {drugList.metadata?.prev && (
                                    <li className="mr-3">
                                        <button
                                            className="w-10 h-10 flex items-center rounded-lg justify-center bg-(--color-accent) rounded-4 hover:bg-gray-100 transition-colors"
                                            aria-label="previous"
                                            onClick={handlePrevClick}
                                            data-testid="previous"
                                        >
                                            <span className="inline-flex items-center gap-x-2">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                    className="w-5 h-5"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </span>
                                        </button>
                                    </li>
                                )}

                                {drugList.metadata?.next && (
                                    <li>
                                        <button
                                            className="w-10 h-10 flex items-center justify-center rounded-lg bg-(--color-accent) hover:bg-gray-100 transition-colors"
                                            aria-label="next"
                                            onClick={handleNextClick}
                                            data-testid="next"
                                        >
                                            <span className="inline-flex items-center gap-x-2">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                    className="w-5 h-5"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </span>
                                        </button>
                                    </li>
                                )}
                            </ul>
                        </nav>
                    </div>
                </section>
            )}
        </>
    );
};
