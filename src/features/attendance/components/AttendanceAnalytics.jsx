import Card from "../../../components/ui/Card";


function AttendanceAnalytics({

  records,

}) {
 
const totalPresent = records.filter(

  (record)=>
  
  (
  
  record.status==="present"
  
  ||
  
  record.status==="late"
  
  )
  
  &&
  
  record.employees?.is_active===true
  
  &&
  
  record.is_archived!==true
  
  ).length;
  
  
  const totalAbsent = records.filter(
  
  (record)=>
  
  record.status==="absent"
  
  &&
  
  record.employees?.is_active===true
  
  &&
  
  record.is_archived!==true
  
  ).length;


  return (

    <div
      className="
        grid
        grid-cols-1
        md:grid-cols-2
        gap-4
      "
    >

      {/* Present count */}
      <Card>

        <h3 className="text-xl font-bold">

          Present

        </h3>

        <p className="text-3xl mt-2">

          {totalPresent}

        </p>

      </Card>


      {/* Absent count */}
      <Card>

        <h3 className="text-xl font-bold">

          Absent

        </h3>

        <p className="text-3xl mt-2">

          {totalAbsent}

        </p>

      </Card>

    </div>
  );
}

export default AttendanceAnalytics;