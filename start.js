

function start() {

  pjs.defineDisplay("display", "main.json");
  
  var exit;
  while(!exit){

    getMechanicList();
    display.Main.execute();
    display.Grid1.getRecord(currentRecord);
    if(display.found()){
      getMechanic(mechanicId);
    }
  }

  function getMechanicList(){

    var list = pjs.sendRequest({
      method: "get",
      uri: "/getMechanicList"
    });
    
    display.Grid1.replaceRecords(list);
  }

  function getMechanic(mechanicId){

    var mechanic = pjs.query( "SELECT  m.id as mechanicId,m.* FROM mechanic m where id = ? limit 1", mechanicId)[0];

     pjs.setFields(mechanic);
     resource = 1;
     btnCancel = '0';
     btnOk = '0';
     filename = mechanicId + '.jpg';
     while(!btnOk && !btnCancel){
       imagePath = 'public/files/' + mechanicId + '.jpg?ran=' + Math.random();
       display.Update.execute();
        if(btnOk){
          updateMechanic();
        }
     } 
     

  }
  function updateMechanic(){
    var fieldsToUpdate = { name, branchId, departmentId, shiftPatternId, teamId, skillFact, grade, inPlan, resource, skanotherN, skserviceN, skengineN, skelectricalN, skbrakesN, sktransN, sksuspenN, skframesN, skbodyN, skadditN, notes, shiftDate, startDate, endDate };
    pjs.query("UPDATE mechanic SET ? WHERE id = ?", [fieldsToUpdate, mechanicId]);   
  }

}

exports.run = start;
