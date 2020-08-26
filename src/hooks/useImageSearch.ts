import React,{ useEffect, useState, useCallback } from 'react';

const useImageSearch = (searchHandler) => {
  const [text, setText] = useState('');
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  // begin a new search
  useEffect(() => {
    if(!text)
      return;
    searchHandler(text, 1, (newData) => {
      setData(newData);
      setPage(1);
    });
  }, [text]);

  // search for more pages
  useEffect(() => {
    if(!text || page === 1)
      return;
    searchHandler(text, page, (newData) => {
      setData((preData) => [...preData, ...newData]);
    });
  }, [page]);

  const nextPage = () => {
    setPage(prePage => prePage + 1);
  }

  return {
    text,
    page,
    data,
    loading,
    setText,
    nextPage,
    setData,
    setLoading,
  }
}

export default useImageSearch;
