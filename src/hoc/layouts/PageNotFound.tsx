const PageNotFound = ({
  text = 'Oops! Page not found!',
}: {
  text?: string;
}) => {
  return (
    <div className="h-screen text-center flex flex-col items-center justify-center bg-gradient-to-b from-primary-500 to-primary-700 text-white text-opacity-70 text-2xl font-medium p-10">
      <div>{text}</div>
    </div>
  );
};

export default PageNotFound;
