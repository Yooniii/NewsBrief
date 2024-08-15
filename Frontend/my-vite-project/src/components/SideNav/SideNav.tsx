import { Link } from 'react-router-dom';

const SideNav = () => {
  const linkStyle = {
    textDecoration: 'none',
    color: '#6b6b6b',
    backgroundColor: 'transparent'
  };

  return (
    <nav className='side-nav'>
      <Link to='/Top Stories' style={linkStyle}>Top Stories</Link>
      <Link to='/World' style={linkStyle}>World</Link>
      <Link to='/Business' style={linkStyle}>Business</Link>
      <Link to='/Tech' style={linkStyle}>Tech</Link>
      <Link to='/Entertainment' style={linkStyle}>Entertainment</Link>
      <Link to='/Politics' style={linkStyle}>Politics</Link>
      <Link to='/Sports' style={linkStyle}>Sports</Link>
      <Link to='/Science' style={linkStyle}>Science</Link>
      <Link to='/Health' style={linkStyle}>Health</Link>
    </nav>
  );
};

export default SideNav;