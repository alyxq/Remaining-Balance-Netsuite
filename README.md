# Remaining Balance : Netsuite 
<a><img src="http://shopping.netsuite.com/core/media/media.nl?id=1&c=3423663&h=a53782632d930713b9ee" align="left" hspace="10" vspace="6"></a>
Calculate remaining balance on vendor bills paid with split terms in Netsuite.
Use SuiteScript 1.0 to capture multiple payments and display the remainder on each vendor bill.  
Use **remainingBalance.js** to upload into Netsuite and deploy on vendor bills for all roles 

## Resources
* [Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
* [API Overview](https://netsuite.custhelp.com/app/answers/detail/a_id/29241/kw/suitescript%201.0)<a><img src="https://system.netsuite.com/images/logos/netsuite-reskin.png" align="right" hspace="10" vspace="6"></a>
* [API Reference (Suite Coder)](http://suitecoder.appspot.com/static/api.html)
* [Record Broswer](https://system.netsuite.com/help/helpcenter/en_US/srbrowser/Browser2015_2/script/record/account.html)
* [SuiteScript Objects](https://netsuite.custhelp.com/app/answers/detail/a_id/10285)


## SuiteScript API Version 1.0 
The main function in **remainingBalance.js**  is calculateTotal() which displays the amount remaining for split vendor bills. 

### Understanding Basic Concepts
All records and API's refrecnced below can be found under Resources. 

#### Null Values:
```node
// Ensure null values are not passed through

if(nlapiGetRecordId() != null){
 var record = nlapiLoadRecord(nlapiGetRecordType(), nlapiGetRecordId());
 var lineItemCount = record.getLineItemCount('links'); 
}

lineItemCount    // 3 
```
Certain API's require record ID's to iniate -- this means a record would have to have been created for the script to function properlly. 
If the user context is "create" and null values are not checked the script will error. 
```js
 var record = nlapiLoadRecord(nlapiGetRecordType(), nlapiGetRecordId());
 var lineItemCount = record.getLineItemCount('links');    
 
 // SSS_MISSING_REQD_ARGUMENT : id 
```

#### Line Item Logic 
Line items in Netsuite are presented as a list and require line# to be called on. To caputure the Line #, iterate through the item list by leveraging [For Loops](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for) 



###### For example, iterate through item list and display each item type:
```js
function recType(){
    var record = nlapiLoadRecord(nlapiGetRecordType(), nlapiGetRecordId());
    var lineItemCount = record.getLineItemCount('links')

    for(var i=1; i<lineItemCount+1; i++){
        var type = record.getLineItemValue('links', 'type', i);
        nlapiLogExecution('DEBUG', 'type', type);
        console.log(type)
        }
 } 

recType();

  // Bill Payment
  // Bill Payment
  // Total
```

## Installing
If logged in Netsuite as Admin, navigate to <b>Customizations>Scripting>Scripts:New</b>. Click the plus sign to upload and name your .js file (remainingBalance) then create a User Event type Script record. 

Create a custom Transaction Body Field in Netsuite. Navigate to <b>Customizations>List Records & Fields > Transaction Body Fields</b>
The functions entry point is <b>before load</b> and should be depolyed on "Vendor Bills" with execution context as Admin.
