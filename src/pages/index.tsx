const Index = ({params}: any) => {
    return (
        <>
            <div className="w-[100%] mt-[120px] flex flex-col justify-center items-center">
                <h1 className="text-[28px] text-theme-3 font-bold mb-[8px]">Upload files to S3 through API Gateway</h1>
                <h2 className="text-[14px] text-theme-7 text-center leading-tight mb-[24px]">A simple next.js project to test uploading files to S3 storage via aws-sdk for javascript v3</h2>
                <div className="w-[580px] p-[16px] border rounded-[12px] border-theme-7">
                    <div className="w-[100%] h-[300px] rounded-[12px] flex flex-col justify-center items-center bg-theme-9">
                        <svg className="w-[180px] fill-theme-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                            <path d="M.002 3a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-12a2 2 0 0 1-2-2V3zm1 9v1a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12zm5-6.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0z"/>
                        </svg>
                    </div>
                </div>
            </div>
        </>
    );
}

export async function getServerSideProps(ctx: any) {
    try {
        return {
            props: {
                params: {

                }
            }
        }
    }
    catch (error) {
        console.log(error);
    }
}

export default Index;