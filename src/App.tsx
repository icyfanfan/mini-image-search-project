import React,{ useEffect, useState } from 'react';
import { Typography, Spin } from 'antd';

import SearchBox from './components/SearchBox';
import DisplayContainer from './components/DisplayContainer';

import { searchImageByText } from './services/image';
import './App.css';

interface AppProps {}

const { Title } = Typography;

function App({}: AppProps) {
  const [text, setText] = useState('');
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  // loading status
  const [loading, setLoading] = useState(false);

  // begin a new search
  useEffect(() => {
    if(!text)
      return;
    setLoading(true);
    searchImageByText(text, 1)
    .then((newData) => {
      setData(newData);
      setPage(1);
    })
    .catch(() => {
      // noop
    })
    .finally(() => {
      setLoading(false);
    })
  }, [text]);

  // search for more pages
  useEffect(() => {
    if(!text || page === 1)
      return;
    setLoading(true);
    searchImageByText(text, page)
    .then((newData) => {
      setData((preData) => [...preData, ...newData]);
    })
    .catch(() => {
      // noop
    })
    .finally(() => {
      setLoading(false);
    })
  }, [page]);
  
  return (
    <div className="app">
      <Title>Image Search</Title>
      <SearchBox onSearch={(text: string) => {
        setText(text);
      }} />
      <Spin spinning={loading}>
        <DisplayContainer data={data} onNextPage={() => {
          setPage(prePage => prePage + 1);
        }} />
      </Spin>
    </div>
  );
}

export default App;
