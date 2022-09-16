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

const IMAGES_PER_PAGE = 12;

export function App() {
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [status, setStatus] = useState(STATUS.idle);

  useEffect(() => {
    if (query === '') {
      return;
    }
    if (query.trim()) {
      setStatus(STATUS.pending);

      fetchImagesByValue(query, page)
        .then(({ data: { hits, totalHits } }) => {
          if (hits.length === 0) {
            toast.error(
              "Sorry, we didn't find such images. Try another word, please."
            );
            setStatus(STATUS.resolved);
            setItems([]);
            return;
          }
          if (page > 1) {
            setStatus(STATUS.resolved);
            setItems(prev => [...prev, ...hits]);
            setPage(page);
          } else {
            toast(`We find ${totalHits} images`);
            setStatus(STATUS.resolved);
            setItems([...hits]);
            setPage(page);
            setTotalPages(Math.ceil(totalHits / IMAGES_PER_PAGE));

            return;
          }
        })
        .catch(error => {
          toast.error('Oops... Something went wrong');
        });
    }
  }, [query, page]);

  const onSearch = value => {
    if (value === query) {
      return;
    }

    setQuery(value);
    setPage(1);
    setTotalPages(1);
  };

  const handleLoadMore = () => {
    setPage(prev => prev + 1);
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
