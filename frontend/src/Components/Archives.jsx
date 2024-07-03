import React, { useEffect } from 'react';
import { useGlobalContext } from './context';
import customFetch from '../utils/util';

const Archives = () => {
  const { archives, activeUser } = useGlobalContext();
  console.log(activeUser);
  useEffect(() => {
    console.log('component loaded..');
    getArchives();
  }, []);

  const getArchives = async () => {
    const response = await customFetch(`/quiz/archives/${activeUser.id}`);
    //next up
  };

  return <div>Archives</div>;
};

export default Archives;
