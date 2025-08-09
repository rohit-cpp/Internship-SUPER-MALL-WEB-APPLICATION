// components/LoadingSpinner.jsx

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-24">
      <div className="w-10 h-10 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
    </div>
  );
};

export default Loading;
