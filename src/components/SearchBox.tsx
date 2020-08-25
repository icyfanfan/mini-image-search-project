import React,{ useState } from 'react';
import { Input, Button, message } from 'antd';

interface SearchBoxProps {
  onSearch: Function;
  disabled: boolean;
}

const SearchBox = ({ disabled, onSearch }: SearchBoxProps) => {
  const [value, setValue] = useState('');

  return (
    <div className="searchBox">
      <Input value={value} onChange={(e) => {
        setValue(e.target.value);
      }} className="searchBox_input"/>
      <Button type="primary" disabled={disabled} onClick={() => {
        if (!value) {
          message.warn('Search text should not be empty!');
          return;
        }
        onSearch(value);
      }}>Click to Search!</Button>
    </div>
  )
}

export default SearchBox;
