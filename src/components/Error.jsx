function Error({ message }) {
  return (
    <div className="flex justify-center">
      <div className="bg-red-50 text-red-400 outline-3 outline-red-400 font-bold p-2 min-w-sm text-center rounded-4xl">
        <p>{message}</p>
      </div>
    </div>
  );
}

export default Error;
