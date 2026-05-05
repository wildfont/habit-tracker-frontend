import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div>
      <Link to="/">
        🏠
        <br />
        Home
      </Link>
      <br />
      <Link to="/habits">
        📋
        <br />
        Habits
      </Link>
      <br />
      <Link to="/stats">
        📊
        <br />
        Stats
      </Link>
    </div>
  );
}
export default Navbar;
