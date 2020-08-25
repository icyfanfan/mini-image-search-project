import React,{ useEffect, useState, useCallback } from 'react';
import { Typography, Spin, message } from 'antd';

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

  const search = useCallback((text, page, cb) => {
    setLoading(true);
    searchImageByText(text, page)
    .then((newData) => {
      cb(newData);
    })
    .catch(error => {
      // noop
      message.error(error)
    })
    .finally(() => {
      setLoading(false);
    })
  }, [])

  // begin a new search
  useEffect(() => {
    if(!text)
      return;
    search(text, 1, (newData) => {
      setData(newData);
      setPage(1);
    });
  }, [text]);

  // search for more pages
  useEffect(() => {
    if(!text || page === 1)
      return;
    search(text, page, (newData) => {
      setData((preData) => [...preData, ...newData]);
    });
  }, [page]);
  
  return (
    <div className="app">
      <Title>Image Search</Title>
      <SearchBox disabled={loading} onSearch={(text: string) => {
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
