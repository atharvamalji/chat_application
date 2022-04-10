import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { CircularProgress } from "@mui/material"


const SearchResults = ({ searchResults }) => {

    const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER;

    if (searchResults.length !== 0) {
        return (
            searchResults.map((result, index) => {
                return (
                    <Link key={"result_".concat(index)} to={"/profile/" + result.username}>
                        <div className="py-2 flex items-center space-x-4 bg-white rounded-md">
                            <div>
                                <span>
                                    <img className="h-10 w-10 rounded-full" src={publicFolder + "profiles/1.jpg"} alt="" />
                                </span>
                            </div>
                            <div>
                                <p className="text-sm font-bold">{result.firstName.concat(" ", result.lastName)}</p>
                                <p className="text-sm text-slate-500">{"@".concat(result.username)}</p>
                            </div>
                        </div>
                    </Link>
                );
            })
        );
    } else {
        return (
            <div>
                <p className="text-sm font-slate-500">No results found</p>
            </div>
        )
    }

}

const Search = () => {

    const searchQuery = useRef();

    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const funSearch = async () => {
        setIsLoading(true);
        console.log(searchQuery.current.value);
        const res = await axios.get("/users?q=".concat(searchQuery.current.value));
        setIsLoading(false);
        setSearchResults(res.data);
    }

    return (
        <div>
            <div className="header border-b h-12 flex space-x-2 px-4 items-center">
                <Link to="/friends">
                    <button className="flex items-center justify-center border h-8 w-8 bg-slate-50 rounded-full">
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                            </svg>
                        </span>
                    </button>
                </Link>
                <input className="p-1 flex-1 text-sm bg-slate-50 border rounded-md outline-none focus:ring-2" type="text" onChange={() => funSearch()} ref={searchQuery} />
            </div>
            <div className="container p-4 flex-1">
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <p className="font-bold text-xl">Search</p>
                    </div>
                    <div className="space-y-2">
                        {isLoading ? <CircularProgress color="inherit" size="14px" /> : <SearchResults searchResults={searchResults} />}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Search;