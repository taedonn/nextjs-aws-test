// 서버로 요청이 들어왔을 때 가장 먼저 실행되는 component

// 훅
import type { AppProps } from "next/app";
import { NextSeo } from 'next-seo';

// react-query
import { QueryClientProvider, QueryClient } from "react-query";
const queryClient = new QueryClient();

// 스타일
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <QueryClientProvider client={queryClient}>
                <NextSeo
                    title="Upload files to S3 with Next.js"
                    description="Amazon Web Service(AWS) test website with next.js"
                />
                <main>
                    <Component {...pageProps}/>
                </main>
            </QueryClientProvider>
        </>
    );
}; 