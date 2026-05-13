import CustomLink from '../UI/CustomLink/CustomLink.tsx';

const NavBar = () => {
  return (
    <nav className="flex justify-between gap-4">
      <CustomLink to="/">Home</CustomLink>
      <CustomLink to="/about">About</CustomLink>
    </nav>
  );
};

export default NavBar;
