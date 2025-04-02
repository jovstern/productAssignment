import {useQuery} from "@tanstack/react-query";
import axios from "axios";

const fetchProduct = async () => {
    const res = await axios.get('http://localhost:5001/api/product');
    return res.data;
};

const useFetchHook = () => {
    const {data, isLoading, isError} = useQuery({queryKey: ['products'], queryFn: fetchProduct});

    return {data, isLoading, isError};
};

export default useFetchHook;