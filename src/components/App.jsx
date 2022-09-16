import { useState, useEffect } from 'react';
import ImageGallery from './ImageGallery';
import Searchbar from './Searchbar';
import Button from './Button';
import { fetchImagesByValue } from '../services/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import s from './App.module.css';
import Loader from './Loader';

const STATUS = {
  idle: 'idle',
  pending: 'pending',
  resolved: 'resolved',
  rejected: 'rejected',
};

const initialState = {
  items: [],
  query: '',
  page: 1,
  totalPages: 1,
  status: STATUS.idle,
};

const IMAGES_PER_PAGE = 12;

export function App() {
  const [stateInfo, setStateInfo] = useState(initialState);

  const { items, page, totalPages, status, query } = stateInfo;

  useEffect(() => {

    if(query === ''){
      return;
    }

    if (query !== '') {

      if (query.trim()) {
        setStateInfo(prev => ({ ...prev, status: STATUS.pending }));

        fetchImagesByValue(query, page)
          .then(({ data: { hits, totalHits } }) => {
            if (hits.length === 0) {
              toast.error(
                "Sorry, we didn't find such images. Try another word, please."
              );
              setStateInfo(prev => ({
                ...prev,
                status: STATUS.resolved,
                items: [],
              }));
              return;
            }
            if (page > 1) {
              setStateInfo(prev => ({
                ...prev,
                status: STATUS.resolved,
                items: [...prev.items, ...hits],
                page,
              }));
            } else {
              toast(`We find ${totalHits} images`);
              setStateInfo(prev => ({
                ...prev,
                status: STATUS.resolved,
                items: [...hits],
                page,
                totalPages: Math.ceil(totalHits / IMAGES_PER_PAGE),
              }));
              return;
            }
          })
          .catch(error => {
            toast.error('Oops... Something went wrong');
          });
      }
    }
  }, [query, page]);

  const onSearch = value => {
    if (value === query) {
      return;
    }

    setStateInfo(prev => ({ ...prev, query: value, page: 1, totalPages: 1 }));
  };

  const handleLoadMore = () => {
    setStateInfo(prev => ({ ...prev, page: prev.page + 1 }));
  };

  return (
    <div className={s.app}>
      <Searchbar onSubmit={onSearch} />
      <ImageGallery items={items} />
      {status === 'pending' && <Loader />}
      {items.length !== 0 && page < totalPages && (
        <Button onClick={handleLoadMore} />
      )}
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
}
