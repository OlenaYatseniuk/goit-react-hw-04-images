import { Component } from 'react';
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
export class App extends Component {
  state = {
    items: [],
    query: '',
    page: 1,
    totalPages: 1,
    status: STATUS.idle,
  };

  componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;
    const prevQuery = prevState.query;
    const prevPage = prevState.page;

    if (!query.trim()) {
      toast.error('Please write a word to find appropriate images');
      return;
    }

    if (query.trim() && (prevQuery !== query || prevPage !== page)) {
      this.setState({ status: STATUS.pending });

      fetchImagesByValue(query, page)
        .then(({ data: { hits, totalHits } }) => {

          if (hits.length === 0) {
            toast.error(
              "Sorry, we didn't find such images. Try another word, please."
            );
            this.setState({ status: STATUS.resolved, items: [] });
            return;
          }
          if (prevQuery === query && prevPage !== page) {

            this.setState(prevState => ({
              items: [...prevState.items, ...hits],
              page,
              status: STATUS.resolved,
            }));
          } else {
            toast(`We find ${totalHits} images`);
            this.setState({
              items: hits,
              page,
              totalPages: Math.ceil(totalHits / IMAGES_PER_PAGE),
              status: STATUS.resolved,
            });
            return;
          }
        })
        .catch(error => {
          toast.error('Oops... Something went wrong');
        });
    }
  }

  onSearch = value => {
    if (value === this.state.query) {
      return;
    }
    this.setState({
      query: value,
      page: 1,
      totalPages: 1,
    });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { items, page, totalPages, status } = this.state;

    return (
      <div className={s.app}>
        <Searchbar onSubmit={this.onSearch} />
        <ImageGallery items={items} />
        {status === 'pending' && <Loader />}
        {items.length !== 0 && page < totalPages && (
          <Button onClick={this.handleLoadMore} />
        )}
        <ToastContainer position="top-right" autoClose={2000} />
      </div>
    );
  }
}
