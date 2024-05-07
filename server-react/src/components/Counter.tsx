interface CounterProps {
  count: number;
}
function Counter({ count }: CounterProps) {
  return (
    <div className="block rounded-lg p-8 max-w-[150px] scale-75 -ml-10  bg-neutral-700 hover:scale-[.8] max-h-36 transition-all">
      <p className="mb-4 text-7xl align-middle dark:text-neutral-200 ">
        {count}
      </p>
    </div>
  );
}

export default Counter;
