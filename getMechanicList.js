

function GetMechanicList(req, resp){
    var records = pjs.query( "SELECT  " + 
      "mechanic.id as mechanicId, " + 
      "mechanic.name, " + 
      "branch.name as branchname, " + 
      "department.name as department, " + 
      "shiftpattern.name as pattern, " + 
      "(select group_concat(exception) from exception where exception.mechanicId = mechanic.id) as exceptions, " + 
      "(select exception from exception where exception.mechanicId = mechanic.id limit 1) is not null as excflag, " + 
      "notes is not null and notes > '' as noteflag " + 
      " FROM mechanic " + 
      "join branch on branch.id = branchid " + 
      "join department on department.id = departmentid " + 
      "join shiftpattern on shiftpattern.id = shiftpatternid ");
    resp.send(records);
}
exports.default = GetMechanicList;