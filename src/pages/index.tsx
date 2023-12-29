// react hooks
import { useState, useRef, ChangeEvent } from "react";

// api
import axios from "axios";

const Index = ({params}: any) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [imgDisplay, setImgDisplay] = useState<boolean>(false);
    const [imgUrl, setImgUrl] = useState<string>('');

    // when image is uploaded
    const uploadImg = async (e: ChangeEvent<HTMLInputElement>) => {
        // loading spinner on
        setIsLoading(true);

        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];

            // call API
            await axios.post('/api/uploadimg', {
                action: 'putSignedUrl',
                fileName: 'nextjs-aws-test-img.' + file.name.split('.').pop(),
                fileType: file.type,
            })
            .then(async (res) => {
                console.log(res.data.url);

                // upload image to s3 through putSignedUrl
                await axios.put(res.data.url, file, {
                    headers: { 'Content-Type': file.type }
                })
                .then(async () => {
                    // fetch image url
                    await axios.get('/api/uploadimg', {
                        params: {
                            action: 'getSignedUrl',
                            fileName: 'nextjs-aws-test-img.' + file.name.split('.').pop()
                        }
                    })
                    .then((res) => {
                        console.log(res.data.url);

                        // change default vector icon to uploaded img
                        setIsLoading(false);
                        setImgDisplay(true);
                        setImgUrl(res.data.url);
                    })
                })
            })
            .catch(err => console.log(err));
        }

        // loading spinner off
        setIsLoading(false);
    }

    // ref input
    const inputRef = useRef<HTMLInputElement>(null);

    // clears img
    const clearImg = () => {
        if (inputRef && inputRef.current) {
            // disable image display
            setImgDisplay(false);   

            // reset file input value
            inputRef.current.value = '';
        }
    }

    return (
        <>
            <div className="w-[100%] mt-[120px] tsm:mt-[80px] tsm:px-[16px] flex flex-col justify-center items-center">
                <h1 className="text-[24px] text-theme-2 font-bold mb-[8px]">Upload files to S3 through aws-sdk for javascript</h1>
                <h2 className="text-[14px] text-theme-7 text-center tsm:text-left leading-tight mb-[12px]">A simple next.js project to test uploading files to S3 storage via aws-sdk for javascript v3</h2>
                <a href="https://github.com/taedonn/nextjs-aws-test" target="_blank" className="tsm:w-[100%] mb-[24px] text-[14px] text-theme-blue-3 underline">View this repo in GitHub</a>
                <div className="w-[580px] tsm:w-[100%] p-[16px] border rounded-[12px] border-theme-7">
                    {
                        imgDisplay
                        ? <div className="relative rounded-[12px] overflow-hidden">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={imgUrl} alt="" className="w-[100%]"/>
                            {
                                isLoading
                                ? <div className="w-[100%] h-[100%] absolute z-10 left-0 top-0 flex justify-center items-center bg-theme-10/60">
                                    <span className="loader"></span>
                                </div>
                                : <></>
                            }
                        </div>
                        : <div className="w-[100%] h-[300px] relative rounded-[12px] overflow-hidden flex flex-col justify-center items-center bg-theme-9/60">
                            <svg className="w-[180px] fill-theme-8/60" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                                <path d="M.002 3a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-12a2 2 0 0 1-2-2V3zm1 9v1a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12zm5-6.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0z"/>
                            </svg>
                            {
                                isLoading
                                ? <div className="w-[100%] h-[100%] absolute z-10 left-0 top-0 flex justify-center items-center bg-theme-8/60">
                                    <span className="loader"></span>
                                </div>
                                : <></>
                            }
                        </div>
                    }
                </div>
                <div className="flex mt-[16px]">
                    <input ref={inputRef} onChange={uploadImg} id='img-upload' type='file' accept='image/*' className='hidden'/>
                    <label htmlFor='img-upload' className='w-[120px] h-[32px] flex justify-center items-center text-[14px] text-theme-10 font-medium rounded-[8px] border-b-[3px] border-r-[3px] border-theme-blue-2 bg-theme-blue-1 hover:bg-theme-blue-1/80 cursor-pointer'>Upload image</label>
                    <button onClick={clearImg} className="w-[88px] h-[32px] ml-[12px] flex justify-center items-center text-[14px] text-theme-10 font-medium rounded-[8px] border-b-[3px] border-r-[3px] border-theme-8 bg-theme-5 hover:bg-theme-5/80 cursor-pointer">Clear</button>
                </div>
                <div className="w-[580px] tsm:w-[100%] flex flex-col mt-[100px] tsm:mt-[80px] mb-[60px]">
                    <div className="text-[20px] text-theme-3 font-bold mb-[8px] pb-[8px] border-b border-theme-7">Reference post : Upload files to S3 through API Gateway</div>
                    <a href="https://repost.aws/knowledge-center/api-gateway-upload-image-s3" target="_blank" className="text-[14px] text-theme-blue-3 hover:underline">How do I upload an image or PDF file to Amazon S3 through API Gateway?</a>
                </div>
                <div className="w-[580px] tsm:w-[100%] flex flex-col">
                    <div className="text-[20px] text-theme-3 font-bold mb-[12px] pb-[8px] border-b border-theme-7">Packages & version</div>
                    <pre style={{fontFamily: "Noto Sans KR", tabSize: 8}} className="w-[100%] p-[20px] rounded-[12px] text-[14px] text-theme-3 bg-theme-9/60 overflow-x-scroll">
                        {
`"dependencies": {
    "@aws-sdk/client-s3": "^3.414.0",
    "@aws-sdk/s3-request-presigner": "^3.414.0",
    "eslint": "8.40.0",
    "eslint-config-next": "13.4.1",
    "next": "13.4.1",
    "react": "18.2.0",
    "react-dom": "18.2.0",
    "axios": "^1.4.0"
}`
                        }
                    </pre>
                </div>
                <div className="w-[480px] tsm:w-[100%] mt-[80px] tsm:mt-[60px] mb-[60px] tsm:mb-[40px] text-[12px] text-theme-7 text-center leading-relaxed">
                    Copyright 2023 - {new Date().getFullYear()}, taedonn, all rights reserved. <br/>
                    check my GitHub @ <a href="https://github.com/taedonn" target="_blank" className="underline">github.com/taedonn</a>
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