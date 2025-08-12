const Footer = () => {
  return (
    <footer className="border-t border-slate-800/50 bg-slate-950/90 backdrop-blur-xl supports-[backdrop-filter]:bg-slate-950/80 py-10 px-6 text-center relative overflow-hidden">
      {/* Glow gradient background effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 w-[80%] h-40 bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-500 opacity-5 blur-3xl rounded-full"></div>
      </div>

      {/* Main text */}
      <p className="text-sm text-slate-400 relative z-10">
        © {new Date().getFullYear()}{" "}
        <span className="font-semibold bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent drop-shadow-sm">
          EPLQ
        </span>{" "}
        — Efficient&nbsp;Privacy‑Preserving&nbsp;Location&nbsp;Queries.
      </p>

      {/* Secondary tagline */}
      <p className="mt-2 text-xs text-slate-500 relative z-10">
        Built with <span className="text-red-400">♥</span> for developers who
        value privacy.
      </p>
    </footer>
  );
};

export default Footer;
