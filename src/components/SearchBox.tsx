import React,{ useEffect, useState } from 'react';

interface SearchBoxProps {
    onSearch: Function;
}

const SearchBox = ({ onSearch }: SearchBoxProps) => {
    const [value, setValue] = useState('');

    return (
        <div>
            <input value={value} onChange={(e) => {
                setValue(e.target.value);
            }} />
            <button onClick={() => {
                onSearch(value);
            }}>Click to Search!</button>
        </div>
    )
}

export default SearchBox;
