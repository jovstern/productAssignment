import './App.css'
import ProductTable from "./components/ProductTable";
import useFetchHook from "./hooks/useFetchHook";


function App() {
    const {data, isLoading, isError} = useFetchHook()

    // console.log('data', data);

    return (
        <>
            {isLoading && <div>Loading...</div>}

            {!isLoading && !isError && (
                <ProductTable data={data}/>
            )}
        </>
    );
}

export default App
