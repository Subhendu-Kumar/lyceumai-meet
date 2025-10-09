import Image from "next/image";

const Loader = () => {
  return (
    <div className="flex items-center justify-center w-full h-screen">
      <Image
        src="/loading-circle.svg"
        alt="Loader circle"
        width={50}
        height={50}
      />
    </div>
  );
};

export default Loader;
