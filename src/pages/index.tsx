const Index = ({params}: any) => {
    return (
        <>
        </>
    );
}

export async function getStaticProps(ctx: any) {
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