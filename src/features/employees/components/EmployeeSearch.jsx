function EmployeeSearch({

    search,
  
    setSearch,
  
  }) {
  
    return (
  
      <input
        type="text"
        placeholder="Search employees..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="
          w-full
          border
          p-3
          rounded
        "
      />
    );
  }
  
  export default EmployeeSearch;