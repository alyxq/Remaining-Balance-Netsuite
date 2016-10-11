//current version in SB2

var recType = nlapiGetRecordType();
var recId = nlapiGetRecordId();

//User Event: Before Load
function calculateBalance(){
	
    if(recId ==null)return; 
	
    //Building to load PO. 
    var record = nlapiLoadRecord(recType, recId);
    var remainingBalance = 0;

    var poLineItemCount = record.getLineItemCount('purchaseorders');
    var paymentCount = record.getLineItemCount('links');
    var headerAmount = record.getFieldValue('usertotal'); 
    var types = []
    var billAmount =0; 

    for(var i=1; i<poLineItemCount+1; i++){
        var poAmount = record.getLineItemValue('purchaseorders', 'poamount', i);
        var poId = record.getLineItemValue('purchaseorders', 'id', i);
        var po = nlapiLoadRecord('purchaseorder', poId);
        var poLinks = po.getLineItemCount('links');

        //Load Purchase Order
        for(var k=1; k<poLinks+1; k++){
            var linksType = po.getLineItemValue('links', 'type', k);

            if(linksType=='Bill'){
                var bills = po.getLineItemValue('links', 'total', k);
                types.push(linksType);
                console.log(types);
                billAmount = parseFloat(bills) +parseFloat(billAmount)
            }
        }

        if(paymentCount){
            for(var j=1; j<paymentCount+1; j++){
                var payType = record.getLineItemValue('links', 'type', j)   
                    
                if(payType=='Total'){
                    var payAmount = record.getLineItemValue('links', 'total', j)
                    remainingBalance = parseFloat(poAmount)-parseFloat(payAmount)
                }
            }
        }else if(billAmount!=null && types.length>0){
            remainingBalance = parseFloat(poAmount) -parseFloat(billAmount)
        }else{
            remainingBalance =parseFloat(poAmount) -parseFloat(headerAmount);
        }
        record.setFieldValue('custbody_remain_balance', remainingBalance)
        nlapiSubmitRecord(record);
    }
}

//User Event: After Submit
function whenToRun(){
    rec = nlapiLoadRecord(nlapiGetRecordType(), nlapiGetRecordId());
    if(rec.getFieldValue('custbody_remain_balance')==null){
        calculateBalance();
    }
}


/*DEBUG: CHROME CONSOLE

var recType = nlapiGetRecordType();
var recId = nlapiGetRecordId();

function calculateBalance(){
    if(recId ==null)return; 
    //Building to load PO. 
    var record = nlapiLoadRecord(recType, recId);
    var remainingBalance = 0;

    var poLineItemCount = record.getLineItemCount('purchaseorders');
    var paymentCount = record.getLineItemCount('links');
    var headerAmount = record.getFieldValue('usertotal'); 
    var types = []
    var billAmount =0; 

    for(var i=1; i<poLineItemCount+1; i++){
        var poAmount = record.getLineItemValue('purchaseorders', 'poamount', i);
        var poId = record.getLineItemValue('purchaseorders', 'id', i);
        var po = nlapiLoadRecord('purchaseorder', poId);
        var poLinks = po.getLineItemCount('links');

        //Load Purchase Order
        for(var k=1; k<poLinks+1; k++){
            var linksType = po.getLineItemValue('links', 'type', k);

            if(linksType=='Bill'){
                var bills = po.getLineItemValue('links', 'total', k);
                types.push(linksType);
                console.log(types);
                billAmount = parseFloat(bills) +parseFloat(billAmount)
            }
        }

        if(paymentCount){
            for(var j=1; j<paymentCount+1; j++){
                var payType = record.getLineItemValue('links', 'type', j)   
                    
                if(payType=='Total'){
                    var payAmount = record.getLineItemValue('links', 'total', j)
                    remainingBalance = parseFloat(poAmount)-parseFloat(payAmount)
                }
            }
        }else if(billAmount!=null && types.length>0){
            remainingBalance = parseFloat(poAmount) -parseFloat(billAmount)
        }else{
            remainingBalance =parseFloat(poAmount) -parseFloat(headerAmount);
        }
        record.setFieldValue('custbody_remain_balance', remainingBalance)
        nlapiSubmitRecord(record);
    }
}


function whenToRun(){
    rec = nlapiLoadRecord(nlapiGetRecordType(), nlapiGetRecordId());
    if(rec.getFieldValue('custbody_remain_balance')==null){
        calculateBalance();
    }
}

*/


