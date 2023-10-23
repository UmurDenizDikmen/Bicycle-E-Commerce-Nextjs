const Footer = () => {
  return (
    <footer className="bg-slate-200 p-10 grid grid-cols-3 items-center mt-6 gap-56">
      <div className="flex flex-col gap-6 lg:ml-14 cursor-pointer">
        <span className="text-neutral-400">Services</span>
        <a className="link-hover link">Branding</a>
        <a className="link-hover link">Design</a>
        <a className="link-hover link">Marketing</a>
        <a className="link-hover link">Advertisement</a>
      </div>
      <div className="flex flex-col gap-4 cursor-pointer">
        <span className="text-neutral-400">Company</span>
        <a className="link-hover link">About us</a>
        <a className="link-hover link">Contact</a>
        <a className="link-hover link">Jobs</a>
        <a className="link-hover link">Press kit</a>
      </div>
      <div className="flex flex-col gap-4 cursor-pointer">
        <span className="text-neutral-400">Legal</span>
        <a className="link-hover link">Terms of use</a>
        <a className="link-hover link">Privacy policy</a>
        <a className="link-hover link">Cookie policy</a>
      </div>
    </footer>
  );
};

export default Footer;
