import Logo from "../assets/images/StartSmart_logo.png";

const Navbar = () => {
  return (
    <nav className="shadow-md bg-white flex top-0 sm:p-2  md:py-2 md:px-4 w-full justify-end items-center z-10">
        <img src={Logo} alt="StartSmart Logo" className="h-20" />
    </nav>
  );
};

export default Navbar;
