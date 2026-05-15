function AttendanceFilters({

    filterStatus,
  
    setFilterStatus,
  
  }) {
  
    return (
  
      <select
        value={filterStatus}
        onChange={(e) =>
          setFilterStatus(e.target.value)
        }
        className="
          border
          rounded
          p-3
        "
      >
  
        <option value="">
          All Status
        </option>
  
        <option value="present">
          Present
        </option>
  
        <option value="absent">
          Absent
        </option>
  
        <option value="late">
          Late
        </option>
  
        <option value="leave">
          Leave
        </option>
  
      </select>
    );
  }
  
  export default AttendanceFilters;