import PropTypes from 'prop-types';
import { Square } from '../sharedComponents/square/Square';
import './TurnDisplayer.css';
import { TURNS } from './constants.js';
export const TurnDisplayer = ({ turn}) => {
  return (
    <section className='turn'>
        <Square isSelected={turn === TURNS.X}>
            {TURNS.X}
        </Square>
        <Square isSelected={turn === TURNS.O}>
            {TURNS.O}
        </Square>
    </section>
  )
}
// ✅ Add prop types here
TurnDisplayer.propTypes = {
    turn: PropTypes.oneOf([TURNS.X, TURNS.O]).isRequired,
};