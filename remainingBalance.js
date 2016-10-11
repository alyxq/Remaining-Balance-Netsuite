//current version in SB2
function calculateTotal(){
	var recType = nlapiGetRecordType();
var recId = nlapiGetRecordId();

function calculateBalance(){
	if(recId==null)return;
		var record = nlapiLoadRecord(recType, recId);
		var poamounts = [];
		var remainingBalance = 0;

		var poLineItemCount = record.getLineItemCount('purchaseorders');
		var paymentCount = record.getLineItemCount('links');
		var headerAmount = record.getFieldValue('usertotal');

		//if (poLineItemCount>0){var test = 'give me a hell yes'};

		for(var i=1; i<poLineItemCount+1; i++){
			var poAmount = record.getLineItemValue('purchaseorders', 'poamount', i);
			var poId = record.getLineItemValue('purchaseorders', 'poid', i);
					
			if(paymentCount){
				for(var j=1; j<paymentCount+1; j++){
					var payType = record.getLineItemValue('links', 'type', j)					
				
					if(payType=='Total'){
						var payAmount = record.getLineItemValue('links', 'total', j)
						remainingBalance = parseFloat(poAmount)-parseFloat(payAmount)
					}
				}
			}else{
			    remainingBalance =parseFloat(poAmount) -parseFloat(headerAmount);
			}
		}
		record.setFieldValue('custbody_remain_balance', remainingBalance)
		nlapiSubmitRecord(record);
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


