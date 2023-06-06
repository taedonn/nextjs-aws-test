// 컴포넌트
import Header from "@/components/Header";

const Index = ({params}: any) => {
    return (
        <>
            <Header/>
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