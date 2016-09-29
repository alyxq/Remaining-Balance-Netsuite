# Remaining Balance : Netsuite 
<a><img src="http://shopping.netsuite.com/core/media/media.nl?id=1&c=3423663&h=a53782632d930713b9ee" align="left" hspace="10" vspace="6"></a>
Calculate remaining balance on vendor bills paid with split terms in Netsuite.
Use SuiteScript 1.0 to capture multiple payments and display the remainder on each vendor bill.  
Use **remainingBalance.js** to upload into Netsuite and deploy on vendor bills for all roles 

## Resources
* [API Overview](https://netsuite.custhelp.com/app/answers/detail/a_id/29241/kw/suitescript%201.0)
* [API Reference (Suite Coder)](https://github.com/d3/d3/wiki)
* [Record Broswer](https://system.netsuite.com/help/helpcenter/en_US/srbrowser/Browser2015_2/script/record/account.html)<a><img src="https://system.netsuite.com/images/logos/netsuite-reskin.png" align="right" hspace="5" vspace="2"></a>
* [SuiteScript Objects](https://netsuite.custhelp.com/app/answers/detail/a_id/10285)


## SuiteScript API Version 1.0 
The main function in **remainingBalance.js**  is calculateTotal() which displays the amount remaining for split vendor bills. 

Function call and setup:
```javascript
function calculateTotal(){
	if(nlapiGetRecordId() != null){
	var record = nlapiLoadRecord(nlapiGetRecordType(), nlapiGetRecordId());
	var lineItemCount = record.getLineItemCount('links'); 
	console.log (lineItemCount);
   }
 }

calculateTotal();  // undefined
```
This function requires a record ID and will throw errors if null values are not handled. 
```js
function calculateTotal(){
	var record = nlapiLoadRecord(nlapiGetRecordType(), nlapiGetRecordId());
	var lineItemCount = record.getLineItemCount('links'); 
	console.log (lineItemCount);
 }
 
calculateTotal(); // 	SSS_MISSING_REQD_ARGUMENT : id 
```
## Installing
If logged in Netsuite as Admin, navigate to <b>Customizations>Scripting>Scripts:New</b>. Click the plus sign to upload and name your .js file (remainingBalance) then create a User Event type Script record. 

The functions entry point is <b>before load</b> and should be depolyed on "Vendor Bills" with execution context as Admin.
