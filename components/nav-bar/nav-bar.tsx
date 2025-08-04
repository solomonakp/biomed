import Link from 'next/link';

export const NavBar = () => {
    return (
        <nav
            className="bg-white w-full border-b md:static border-(--color-accent)"
            role="navigation"
            aria-label="Navigation bar"
        >
            <div className="items-center justify-center px-4 max-w-screen-xl mx-auto md:flex md:px-8">
                <div className="flex items-center justify-center py-2 md:py-5 md:block">
                    <header>
                        <Link href="/" className="text-black font-bold text-lg">
                            BioMed
                        </Link>
                    </header>
                </div>
            </div>
        </nav>
    );
};
