import PropTypes from 'prop-types';
import Square from "./components/square/Square";
import "./Board.css";

export const Board = ({board,updateGame}) => {

  return (
    <section className='board'>
        {
          board.map((square, index) => {
            return (
              <Square
                key={index}
                index={index}
                updateBoard={updateGame}
              >
                {square}
              </Square>
            )
          })
        }
      </section>
  )
}
// ✅ Add prop types here
Board.propTypes = {
  board: PropTypes.arrayOf(PropTypes.string).isRequired,
  updateBoard: PropTypes.func.isRequired,
};