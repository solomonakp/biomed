import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './root-layout.css';
import { Header } from '@components/header';
import { AppContainer } from '@components/app-container/app-container';

const inter = Inter({
    variable: '--font-inter',
});

export const RootMetadata: Metadata = {
    title: 'BioMed',
    description: 'View, search, and filter a list of drug candidate',
};

export const RootLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <html lang="en">
            <head>
                <link rel="shortcut icon" href="/favicon.png" />
                <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
                />
            </head>

            <body className={`${inter.variable} antialiased`}>
                <Header />
                <AppContainer>{children}</AppContainer>
            </body>
        </html>
    );
};
