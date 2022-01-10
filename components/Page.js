import PropTypes from 'prop-types';
import Footer from './Footer';
import Header from './Header';

export default function Page({ children }) {
  return (
    <>
      <Header />
      <div className="max-w-full min-h-screen mt-0 mb-auto p-8">{children}</div>
      <Footer />
    </>
  );
}

Page.propTypes = {
  children: PropTypes.any,
};
