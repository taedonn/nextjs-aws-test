// 컴포넌트

const Index = ({params}: any) => {
    return (
        <>
            <div>
                
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