export const Spinner = () => {
  return (
    <section className="flex justify-center mt-[20vh]">
      <div className="pt-20 text-sm font-semibold">Loading quiz data..</div>
      <div className="lds-spinner">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </section>
  );
};
