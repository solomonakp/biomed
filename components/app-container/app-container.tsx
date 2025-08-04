interface AppContainerProps {
    children: React.ReactNode;
}

export const AppContainer = ({ children }: AppContainerProps) => {
    return (
        <main className="app-container w-full p-4 sm:p-6 md:p-8">
            <div className="mx-auto max-w-[1240px] p-6">{children}</div>
        </main>
    );
};
