import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { PropTypes } from 'prop-types';

export default function CartCount({ count }) {
  return (
    <TransitionGroup>
      <CSSTransition
        unmountOnExit
        className="count"
        classNames="count"
        key={count}
        timeout={{ enter: 400, exit: 400 }}
      >
        <div className="tabular-nums">{count}</div>
      </CSSTransition>
    </TransitionGroup>
  );
}
CartCount.propTypes = {
  count: PropTypes.any,
};
