const Footer = () => {
  return (
    <div>
      <div>
        <footer className="mt-20 py-8 px-6 border-t text-sm text-gray-500 text-center">
          © {new Date().getFullYear()} EPLQ — Efficient Privacy-Preserving
          Location Queries
        </footer>
      </div>
    </div>
  );
};

export default Footer;
