function Results({ loading, results }) {
  return (
    <div className="flex justify-center">
      {loading ? <LoadingStatus /> : <SearchResults results={results} />}{" "}
    </div>
  );
}

function LoadingStatus() {
  return <div>Loading</div>;
}

function SearchResults({ results }) {
  return <div>{results}</div>;
}

export default Results;
