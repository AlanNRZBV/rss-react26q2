import NavBar from '../NavBar/NavBar.tsx';
import BarContainer from '../UI/BarContainer/BarContainer.tsx';

const NotFound = () => {
  return (
    <>
      <BarContainer>
        <NavBar />
      </BarContainer>
      <BarContainer className="justify-center h-full">
        <div className="max-w-md text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="mx-auto size-20 text-gray-400"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.182 16.318A4.486 4.486 0 0 0 12.016 15a4.486 4.486 0 0 0-3.198 1.318M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z"
            ></path>
          </svg>

          <h2 className="mt-6 text-2xl font-bold text-gray-900">
            Hmm, nothing found
          </h2>

          <p className="mt-4 text-pretty text-gray-700">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. A ab
            commodi id ipsa laudantium nemo nulla rerum tempora.
          </p>
        </div>
      </BarContainer>
    </>
  );
};

export default NotFound;
