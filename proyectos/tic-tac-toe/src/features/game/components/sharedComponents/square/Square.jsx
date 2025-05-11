import PropTypes from 'prop-types';
import "./Square.css";
export const Square = ({ children, isSelected, updateGame, index }) => {
  const className = `square ${isSelected ? 'is-selected' : ''}`

  const handleClick = () => {
    updateGame(index)
  }

  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  )
}
// ✅ Add prop types here
Square.propTypes = {
  children: PropTypes.node,
  isSelected: PropTypes.bool.isRequired,
  updateGame: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
};