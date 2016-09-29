//current version in SB2
function calculateTotal(){
	if(nlapiGetRecordId() != null){
	var record = nlapiLoadRecord(nlapiGetRecordType(), nlapiGetRecordId());
	var lineItemCount = nlapiGetLineItemCount('links'); 
	var remainingBalance = 0; 
	nlapiLogExecution('DEBUG', 'lineItemCount',  lineItemCount);

		for(var i=1; i<lineItemCount+1; i++){
		var type = record.getLineItemValue('links', 'type', i);
		nlapiLogExecution('DEBUG', 'type', type);
		//console.log(type)

		if(type=='Total'){
			var lineAmount = record.getLineItemValue('links', 'total', i);
			var headAmount = record.getFieldValue('usertotal')
			var remainingBalance = (parseFloat(headAmount) -parseFloat(lineAmount)) ;		
			nlapiLogExecution('DEBUG', 'record', record);
			//console.log(amount);
			//console.log(remainingBalance);
		}
	 }
	record.setFieldValue('custbody_remain_balance', remainingBalance);
	nlapiSubmitRecord(record);
  }
}
/*DEBUG: CHROME CONSOLE

function testIt(){
	var record = nlapiLoadRecord(nlapiGetRecordType(), nlapiGetRecordId());
	var lineItemCount = record.getLineItemCount('links');
	var remainingBalance = 0; 

	for(var i=1; i<lineItemCount+1; i++){
		var type = record.getLineItemValue('links', 'type', i);
		console.log(type);

		if(type=='Bill Payment'){
			var amount = record.getLineItemValue('links', 'total', i);
			var headerAmount = record.getFieldValue('usertotal')
			var remainingBalance = (parseFloat(headerAmount) -parseFloat(amount)) +parseFloat(remainingBalance) ;
			console.log(amount);
			console.log(headerAmount);
			console.log(remainingBalance);
		}
		record.setFieldValue('custbody_remain_balance', remainingBalance)
		nlapiSubmitRecord(record);
	}
}

*/


