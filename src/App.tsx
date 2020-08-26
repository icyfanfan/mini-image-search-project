import React,{ useCallback } from 'react';
import { Typography, Spin, message } from 'antd';

import SearchBox from './components/SearchBox';
import DisplayContainer from './components/DisplayContainer';

import { searchImageByText } from './services/image';
import useImageSearch from './hooks/useImageSearch';
import './App.css';

interface AppProps {}

const { Title } = Typography;

function App({}: AppProps) {
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

  const { 
    text,
    page,
    data,
    loading,
    setText,
    nextPage,
    setData,
    setLoading
  } = useImageSearch(search);
  
  return (
    <div className="app">
      <Title>Image Search</Title>
      <SearchBox disabled={loading} onSearch={(text: string) => {
        setText(text);
      }} />
      <Spin spinning={loading}>
        <DisplayContainer data={data} onNextPage={nextPage} />
      </Spin>
    </div>
  );
}

export default App;
