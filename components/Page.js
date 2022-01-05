import PropTypes from 'prop-types';
import Header from './Header';

export default function Page({ children }) {
  return (
    <>
      <Header />
      <div className="max-w-full mt-0 mb-auto p-8">{children}</div>
    </>
  );
}

Page.propTypes = {
  children: PropTypes.any,
};
