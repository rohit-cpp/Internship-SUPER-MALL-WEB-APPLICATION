const Footer = () => {
  return (
    <footer className="border-t border-neutral-800 bg-neutral-900/80 backdrop-blur py-10 px-6 text-center">
      <p className="text-sm text-neutral-400">
        © {new Date().getFullYear()}{" "}
        <span className="font-semibold text-fuchsia-400 neon-text">EPLQ</span> —
        Efficient&nbsp;Privacy-Preserving Location&nbsp;Queries.
      </p>
      <p className="mt-2 text-xs text-neutral-500">
        Built with ♥ for developers who value privacy.
      </p>
    </footer>
  );
};
export default Footer;
