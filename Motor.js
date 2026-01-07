/*
====================================================
MOTOR INSURANCE PREMIUM CALCULATOR – CORE LOGIC FILE
----------------------------------------------------
This file contains the complete business logic for
calculating Motor Insurance premiums including:

• Own Damage (OD) premium
• Third Party (TP) premium
• Add-on eligibility & pricing
• Vehicle-wise underwriting rules
• GST and final payable premium

IMPORTANT NOTES:
• OD rates are company-specific
• TP rates are IRDAI notified
• Add-on rules depend on underwriting guidelines
• UI (HTML) is tightly coupled with logic in this file

Any change in tariff or underwriting rules should be
reflected carefully in this file.
====================================================
*/


/* ==================================================
   UI ELEMENT BINDINGS (DOM REFERENCES)
====================================================
Each constant maps to an HTML input or output field.
All calculations directly read from / write to these
DOM elements.
==================================================== */


// IDV related fields
const oldidv=document.getElementById("oldidv"); 	// Previous year IDV
const dep=document.getElementById("dep");			// Depreciation percentage
const newidv=document.getElementById("newidv");		// Calculated current IDV

// Date fields
const rdate=document.getElementById("rdate");		// Registration date
const rsdate=document.getElementById("rsdate");		// Risk start date

// Vehicle classification inputs
const zone=document.getElementById("zone");			// Zone A / B / C
const vtype=document.getElementById("vtype");		// Vehicle type
const gvw=document.getElementById("gvw");			// Gross Vehicle Weight
const cc=document.getElementById("cc");				// Cubic Capacity
const nps=document.getElementById("nps");			// Number of passengers

// Liability & OD related inputs
const lld=document.getElementById("lld");			// Legal liability to driver
const rate=document.getElementById("rate");			// OD rate (%)

// Add-on checkboxes
const ND=document.getElementById("ND");				// Nil Depreciation
const EP=document.getElementById("EP");				// Engine Protect
const CM=document.getElementById("CM");				// Consumables
const RTI=document.getElementById("RTI");			// Return to Invoice
const LK=document.getElementById("LK");				// Key Loss
const EMP=document.getElementById("EMP");			// Electrical accessories
const RSA=document.getElementById("RSA");			// Road Side Assistance
const LPG=document.getElementById("LPG");			// LPG/CNG Kit
const GE=document.getElementById("GE");				// Geographical Extension
const tyreV=document.getElementById("tyreV");		// Tyre protection
const towingAmt=document.getElementById("towingAmt");	// Towing add-on
const OT=document.getElementById("OT");				// Own trailer
const NP=document.getElementById("NP");				// NCB Protection
const imt23=document.getElementById("imt23");		// IMT 23 endorsement

// OD Discount %
const odd=document.getElementById("odd");			// OD discount (%)

// Personal Accident & Liability related inputs
const paodch=document.getElementById("paodch");		// PA Owner Driver checkbox
const paodt=document.getElementById("paodt");		// PA tenure
const ncbd=document.getElementById('ncbd');			// No Claim Bonus %
const nopd=document.getElementById("nopd");			// No. of paid drivers
const csinopd=document.getElementById('csinopd');	// CSI for paid driver
const nopp=document.getElementById("nopp");			// No. of passengers
const csinopp=document.getElementById('csinopp');	// CSI for passengers
const ELA=document.getElementById("ELA");			// Electrical accessories SI

/* ==================================================
   DATE FORMAT UTILITY
====================================================
Formats JavaScript Date object into YYYY-MM-DD
Used to restrict date inputs in HTML.
==================================================== */
const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

// Get current date and restrict registration date input
const currentDate = new Date();
console.log(formatDate(currentDate));
rdate.setAttribute("max",formatDate(currentDate));

/* ==================================================
   OD & TP OUTPUT FIELDS
====================================================
These elements display calculated premium components
for Own Damage and Liability sections.
==================================================== */

// OD premium components
const OD1P=document.getElementById("OD1P");		// Base OD
const OD2P=document.getElementById("OD2P");		// OD Discount
const OD3P=document.getElementById("OD3P");		// IMT 23
const OD4P=document.getElementById("OD4P");		// Nil Dep
const OD5P=document.getElementById("OD5P");		// Engine Protect
const OD6P=document.getElementById("OD6P");		// Consumables
const OD7P=document.getElementById("OD7P");		// RTI
const OD8P=document.getElementById("OD8P");		// Key Loss
const OD9P=document.getElementById("OD9P");		// Electrical accessories
const OD10P=document.getElementById("OD10P");	// RSA
const OD11P=document.getElementById("OD11P");	// Tyre cover
const OD12P=document.getElementById("OD12P");	// NCB protection
const OD13P=document.getElementById("OD13P");	// Geographical extension
const OD14P=document.getElementById("OD14P");	// LPG loading
const OD15P=document.getElementById("OD15P");	// Own trailer
const OD16P=document.getElementById("OD16P");	// Towing
const OD17P=document.getElementById("OD17P");	// NCB discount
const OD18P=document.getElementById("OD18P");	// EV Protect
const OD19P=document.getElementById("OD19P");	// Electrical accessories loading
const OD20P=document.getElementById("OD20P");	// Trailer OD

// Liability premium components
const Liability1P=document.getElementById("Liability1P");	// Basic TP
const Liability2P=document.getElementById("Liability2P");	// Passenger liability
const Liability3P=document.getElementById("Liability3P");	// Paid driver
const Liability4P=document.getElementById("Liability4P");	// PA Owner Driver
const Liability5P=document.getElementById("Liability5P");	// Paid driver CSI
const Liability6P=document.getElementById("Liability6P");	// Passenger CSI
const Liability7P=document.getElementById("Liability7P");	// Geographical extension
const Liability8P=document.getElementById("Liability8P");	// LPG TP
const Liability9P=document.getElementById("Liability9P");	// Trailer TP

// Totals & GST
const tod=document.getElementById('tod');	// Total OD
const god=document.getElementById('god');	// GST on OD
const ttp=document.getElementById('ttp');	// Total TP
const gttp=document.getElementById('gttp');	// GST on TP

// Electric vehicle type selector & EV protection
const eTypeSelect=document.getElementById('eTypeSelect');	// EV / Hybrid type
const EVP=document.getElementById("EVP");					// EV Protect add-on
const TrOD=document.getElementById('TrOD');					// Trailer OD SI

/* ==================================================
   INITIAL RESET ON PAGE LOAD
====================================================
Clears all premium values when the page loads
to avoid displaying stale data.
==================================================== */

(function(){
  resetPremiumAmount();
})();

/* =============================================================
   OWN DAMAGE (OD) RATE CALCULATION FUNCTIONS FOR GCV, PC and TW
================================================================
Each function below calculates the OD rate (%) based on:
• Vehicle age (derived from registration & risk dates)
• Zone (A / B / C)
• Vehicle-specific rating parameters (CC / GVW / NPS)
• Electric / Hybrid classification (where applicable)

These functions strictly represent tariff tables.
==================================================== */

/* --------------------------------------------------
   FUNCTION: gcvODRate
-----------------------------------------------------
Calculates OD rate for:
• Goods Carrying Vehicles (4+ wheelers)

Factors considered:
• Vehicle age
• Zone classification

Output:
• Updates OD rate (%) in UI
-------------------------------------------------- */

function gcvODRate(){
  console.log('insdie gcv');

// Calculate vehicle age
  const jrsdate=new Date(rsdate.valueAsDate);
  const jrdate=new Date(rdate.valueAsDate);
  console.log(jrdate);
  console.log(jrsdate);
  const days=(jrsdate.getTime()-jrdate.getTime())/1000/60/60/24;
  var age;
	age = days < 1460 ? days / 365 : (days + 1) / 365.25; //Change 1 - Age Calculation Formula Updated
  console.log(age);

// Apply zone-wise OD rate based on vehicle age
 const ageBand =
  age < 5 ? 0 :
  age < 7 ? 1 : 2;

const gcvRates = {
  zoneb: [1.743, 1.787, 1.830],
  zonec: [1.726, 1.770, 1.812],
  zonea: [1.751, 1.795, 1.839]
};

rate.textContent = gcvRates[zone.value][ageBand];
/* --------------------------------------------------
   FUNCTION: pvtCarODRate
-----------------------------------------------------
Calculates OD rate for:
• Private Cars

Factors considered:
• Vehicle age
• Zone
• Cubic Capacity (CC)
• Electric / Hybrid classification

Electric vehicles have a separate tariff structure.
-------------------------------------------------- */

function pvtCarODRate(){
	// Calculate vehicle age
  const jrsdate=new Date(rsdate.valueAsDate);
  const jrdate=new Date(rdate.valueAsDate);
  console.log(jrdate);
  console.log(jrsdate);
  const days=(jrsdate.getTime()-jrdate.getTime())/1000/60/60/24;
  var age;
 	age = days < 1460 ? days / 365 : (days + 1) / 365.25; 
  console.log(age);
/* -----------------------------------------------
     ELECTRIC / HYBRID VEHICLE OD RATES
  ----------------------------------------------- */  
/* -----------------------------------------------
     INTERNAL COMBUSTION ENGINE (ICE) VEHICLES
  ----------------------------------------------- */
const ageBand =
  age < 5 ? 0 :
  age < 10 ? 1 : 2;

const ccBand =
  cc.value <= 1000 ? 0 :
  cc.value <= 1500 ? 1 : 2;

const evRates = {
  zoneb: [3.191, 3.351, 3.430],
  zonec: [3.191, 3.351, 3.430],
  zonea: [3.283, 3.447, 3.529]
};

const iceRates = {
  zoneb: [
    [3.039, 3.191, 3.343],
    [3.191, 3.351, 3.510],
    [3.267, 3.430, 3.594]
  ],
  zonec: [
    [3.039, 3.191, 3.343],
    [3.191, 3.351, 3.510],
    [3.267, 3.430, 3.594]
  ],
  zonea: [
    [3.127, 3.283, 3.440],
    [3.283, 3.447, 3.612],
    [3.362, 3.529, 3.698]
  ]
};

if (eTypeSelect.selectedIndex == '1') {
  rate.textContent = evRates[zone.value][ageBand];
} else {
  rate.textContent = iceRates[zone.value][ageBand][ccBand];
}
	

/* --------------------------------------------------
   FUNCTION: twoWheelerODRate
-----------------------------------------------------
Calculates OD rate for:
• Two Wheelers (including Scooter / Motorcycle)

Factors considered:
• Vehicle age
• Zone
• Cubic Capacity
• Electric classification

Lower CC vehicles attract lower OD rates.
-------------------------------------------------- */
function twoWheelerODRate(){
  console.log('insdie gcv');
	// Calculate vehicle age
  const jrsdate=new Date(rsdate.valueAsDate);
  const jrdate=new Date(rdate.valueAsDate);
  console.log(jrdate);
  console.log(jrsdate);
  const days=(jrsdate.getTime()-jrdate.getTime())/1000/60/60/24;
  var age;
	age = days < 1460 ? days / 365 : (days + 1) / 365.25; 
  console.log(age);

/* -----------------------------------------------
     TWO WHEELER OD RATES (LOOKUP TABLE VERSION)
----------------------------------------------- */

// AGE BAND: 0 = <5 yrs, 1 = 5–10 yrs, 2 = >10 yrs
const ageBand =
  age < 5 ? 0 :
  age < 10 ? 1 : 2;

// CC BAND: 0 = ≤150cc, 1 = 151–350cc, 2 = >350cc
const ccBand =
  cc.value <= 150 ? 0 :
  cc.value <= 350 ? 1 : 2;

/* -----------------------------------------------
     ELECTRIC TWO WHEELER OD RATES
----------------------------------------------- */
const electricTWODRates = {
  zoneb: [1.760, 1.848, 1.892],
  zonec: [1.760, 1.848, 1.892],
  zonea: [1.793, 1.883, 1.928]
};

/* -----------------------------------------------
     ICE TWO WHEELER OD RATES
----------------------------------------------- */
const iceTWODRates = {
  zoneb: [
    [1.676, 1.760, 1.844],
    [1.760, 1.848, 1.936],
    [1.802, 1.892, 1.982]
  ],
  zonec: [
    [1.676, 1.760, 1.844],
    [1.760, 1.848, 1.936],
    [1.802, 1.892, 1.982]
  ],
  zonea: [
    [1.708, 1.793, 1.879],
    [1.793, 1.883, 1.973],
    [1.836, 1.928, 2.020]
  ]
};

/* -----------------------------------------------
     RATE SELECTION
----------------------------------------------- */
if (eTypeSelect.selectedIndex == 1) {
  // ELECTRIC TWO WHEELER
  rate.textContent = electricTWODRates[zone.value][ageBand];
} else {
  // ICE TWO WHEELER
  rate.textContent = iceTWODRates[zone.value][ageBand][ccBand];
}
/* ==================================================
   COMMERCIAL & PASSENGER VEHICLE – OD RATE FUNCTIONS
====================================================
This section handles OD rate calculation for:
• Taxi
• Passenger Carrying Vehicles (Bus / School Bus)
• Miscellaneous Vehicles
• 3-Wheeler Goods & Passenger Vehicles

Rates depend on:
• Vehicle age
• Zone classification
• CC / Passenger capacity (where applicable)
==================================================== */

/* --------------------------------------------------
   FUNCTION: taxiODRate
-----------------------------------------------------
Calculates OD rate for:
• Passenger Carrying Taxi Vehicles

Factors considered:
• Vehicle age
• Zone
• Engine cubic capacity

Taxi vehicles attract higher OD rates due to
higher frequency of commercial usage.
-------------------------------------------------- */
}
function taxiODRate(){
  console.log('insdie taxi');
	// Calculate vehicle age
  const jrsdate=new Date(rsdate.valueAsDate);
  const jrdate=new Date(rdate.valueAsDate);
  console.log(jrdate);
  console.log(jrsdate);
  const days=(jrsdate.getTime()-jrdate.getTime())/1000/60/60/24;
  var age;
	age = days < 1460 ? days / 365 : (days + 1) / 365.25; 
  console.log(age);
 /* -----------------------------------------------
     OD RATES – OPTIMIZED LOOKUP TABLE VERSION
     (Replaces entire switch(zone.value) block)
----------------------------------------------- */

{
  // AGE BAND: 0 = <5 yrs, 1 = 5–7 yrs, 2 = >7 yrs
  const ageBand =
    age < 5 ? 0 :
    age < 7 ? 1 : 2;

  // CC BAND: 0 = ≤1000cc, 1 = 1001–1500cc, 2 = >1500cc
  const ccBand =
    cc.value <= 1000 ? 0 :
    cc.value <= 1500 ? 1 : 2;

  // ZONE → AGE → CC lookup table
  const odRates = {
    zoneb: [
      [3.191, 3.351, 3.510], // age < 5
      [3.271, 3.435, 3.598], // age 5–7
      [3.351, 3.519, 3.686]  // age > 7
    ],
    zonec: [
      [3.191, 3.351, 3.510],
      [3.271, 3.435, 3.598],
      [3.351, 3.519, 3.686]
    ],
    zonea: [
      [3.284, 3.448, 3.612],
      [3.366, 3.534, 3.703],
      [3.448, 3.620, 3.793]
    ]
  };

  // Final rate selection
  rate.textContent = odRates[zone.value][ageBand][ccBand];
}
/* --------------------------------------------------
   FUNCTION: pcvBusODRate
-----------------------------------------------------
Calculates OD rate for:
• Passenger Carrying Buses
• School Buses

Factors considered:
• Vehicle age
• Zone

Passenger buses use flat OD rates without CC
due to uniform risk profile.
-------------------------------------------------- */

function pcvBusODRate(){
  console.log('insdie gcv');
	// Calculate vehicle age
  const jrsdate=new Date(rsdate.valueAsDate);
  const jrdate=new Date(rdate.valueAsDate);
  console.log(jrdate);
  console.log(jrsdate);
  const days=(jrsdate.getTime()-jrdate.getTime())/1000/60/60/24;
  var age;
  	age = days < 1460 ? days / 365 : (days + 1) / 365.25; 
  console.log(age);
  /* -----------------------------------------------
     OD RATES – LOOKUP TABLE VERSION
     (Replaces entire switch(zone.value) block)
----------------------------------------------- */

{
  // AGE BAND: 0 = <5 yrs, 1 = 5–7 yrs, 2 = >7 yrs
  const ageBand =
    age < 5 ? 0 :
    age < 7 ? 1 : 2;

  // ZONE → AGE lookup table
  const odRates = {
    zoneb: [1.672, 1.714, 1.756],
    zonec: [1.656, 1.697, 1.739],
    zonea: [1.680, 1.722, 1.764]
  };

  // Final rate selection
  rate.textContent = odRates[zone.value][ageBand];
}
/* --------------------------------------------------
   FUNCTION: miscODRate
-----------------------------------------------------
Calculates OD rate for:
• Miscellaneous Vehicles

These vehicles usually have lower risk exposure
and hence lower OD rates.
-------------------------------------------------- */

function miscODRate(){
  console.log('insdie misc');
  const jrsdate=new Date(rsdate.valueAsDate);
  const jrdate=new Date(rdate.valueAsDate);
  console.log(jrdate);
  console.log(jrsdate);
  const days=(jrsdate.getTime()-jrdate.getTime())/1000/60/60/24;
  var age;
	age = days < 1460 ? days / 365 : (days + 1) / 365.25; 
  console.log(age);
  {
  // AGE BAND: 0 = <5 yrs, 1 = 5–7 yrs, 2 = >7 yrs
  const ageBand =
    age < 5 ? 0 :
    age < 7 ? 1 : 2;

  // ZONE → AGE lookup table
  const odRates = {
    zoneb: [1.202, 1.232, 1.262],
    zonec: [1.190, 1.220, 1.250],
    zonea: [1.208, 1.238, 1.268]
  };

  // Final rate selection
  rate.textContent = odRates[zone.value][ageBand];
}

/* --------------------------------------------------
   FUNCTION: threegcvODRate
-----------------------------------------------------
Calculates OD rate for:
• 3-Wheeler Goods Carrying Vehicles

Rates are lower than 4-wheeler GCV due to
lower asset value and exposure.
-------------------------------------------------- */
function threegcvODRate(){
  console.log('insdie 3gcv');
	//Calculate the Age of the Vehicle
  const jrsdate=new Date(rsdate.valueAsDate);
  const jrdate=new Date(rdate.valueAsDate);
  console.log(jrdate);
  console.log(jrsdate);
  const days=(jrsdate.getTime()-jrdate.getTime())/1000/60/60/24;
  var age;
  	age = days < 1460 ? days / 365 : (days + 1) / 365.25; 
  console.log(age);
 /* -----------------------------------------------
     OD RATES – LOOKUP TABLE VERSION
     (Replaces entire switch(zone.value) block)
----------------------------------------------- */

{
  // AGE BAND: 0 = <5 yrs, 1 = 5–7 yrs, 2 = >7 yrs
  const ageBand =
    age < 5 ? 0 :
    age < 7 ? 1 : 2;

  // ZONE → AGE lookup table
  const odRates = {
    zoneb: [1.656, 1.697, 1.739],
    zonec: [1.640, 1.681, 1.722],
    zonea: [1.664, 1.706, 1.747]
  };

  // Final rate selection
  rate.textContent = odRates[zone.value][ageBand];
}
/* --------------------------------------------------
   FUNCTION: threepcvODRate
-----------------------------------------------------
Calculates OD rate for:
• 3-Wheeler Passenger Carrying Vehicles

Passenger risk is higher than goods carriers,
but lower than buses.
-------------------------------------------------- */
function threepcvODRate(){
  console.log('insdie 3pcv');
	//Calculate the Age of the Vehicle
  const jrsdate=new Date(rsdate.valueAsDate);
  const jrdate=new Date(rdate.valueAsDate);
  console.log(jrdate);
  console.log(jrsdate);
  const days=(jrsdate.getTime()-jrdate.getTime())/1000/60/60/24;
  var age;
  	age = days < 1460 ? days / 365 : (days + 1) / 365.25; 
  console.log(age);
  /* -----------------------------------------------
     OD RATES – LOOKUP TABLE VERSION
     (Replaces entire switch(zone.value) block)
----------------------------------------------- */

{
  // AGE BAND: 0 = <5 yrs, 1 = 5–7 yrs, 2 = >7 yrs
  const ageBand =
    age < 5 ? 0 :
    age < 7 ? 1 : 2;

  // ZONE → AGE lookup table
  const odRates = {
    zoneb: [1.272, 1.304, 1.336],
    zonec: [1.260, 1.292, 1.323],
    zonea: [1.278, 1.310, 1.342]
  };

  // Final rate selection
  rate.textContent = odRates[zone.value][ageBand];
}
/* ==================================================
   EVENT LISTENERS – INPUT CHANGE HANDLING
====================================================
This section ensures that:
• Premium is recalculated whenever a rating parameter changes
• Stale premium values are cleared
• Invalid combinations are prevented
• Underwriting discipline is enforced

Insurance premiums MUST be recalculated immediately
on any change in risk parameters.
==================================================== */

/* --------------------------------------------------
   REGISTRATION DATE CHANGE
-----------------------------------------------------
Changing registration date affects:
• Vehicle age
• OD rate
• Add-on eligibility

Hence all dependent values are reset.
-------------------------------------------------- */

rdate.addEventListener("change",function(){
  const checkDate=new Date(rdate.value);
	// Reset all rating parameters
  cc.value=null;
  gvw.value=null;
  lld.value=null;
  nps.value=null;
  rate.textContent='';
  newidv.textContent='';
  oldidv.value=null;
  dep.value=null;
  odd.value=null;
	// Reset discounts and add-ons
  ncbd.selectedIndex='0';
  tyreV.selectedIndex='0';
  towingAmt.value=null;
  nopd.value=null;
  csinopd.selectedIndex='0';
  nopp.value=null;
  csinopp.selectedIndex='0';
  eTypeSelect.selectedIndex='0';
  eTypeSelect.disabled=true;
  ELA.value=null;
  EMP.value=null;
 // Validate date and recalculate
  if(!isNaN(checkDate.getTime())){
  resetAddon();					// Clear all add-ons
  checkAddonApplicable();		// Re-evaluate add-on eligibility
  resetPremiumAmount();			// Clear premium values
  basicODRate(rdate.value,rsdate.value,zone.value,vtype.value,gvw.value,cc.value,nps.value);
  		  
  console.log("Inside rdate event");
  }
  else{
    window.alert("Please Enter Valid Date");
    return;
  }
  
});

/* --------------------------------------------------
   ZONE CHANGE
-----------------------------------------------------
Zone impacts OD rate directly.
Premium must be recalculated.
-------------------------------------------------- */
zone.addEventListener("change",function(){
  console.log(rsdate.value);
  console.log(typeof rsdate.value);
  basicODRate(rdate.value,rsdate.value,zone.value,vtype.value,gvw.value,cc.value,nps.value);
  console.log("Inside zone event");
	resetAddon();
  resetPremiumAmount();
  checkAddonApplicable();
  
});

/* --------------------------------------------------
   GVW CHANGE (Commercial Vehicles)
-----------------------------------------------------
Gross Vehicle Weight impacts OD rate and loadings.
-------------------------------------------------- */
gvw.addEventListener("input",function(){
  console.log(rsdate.value);
  console.log(typeof rsdate.value);
  basicODRate(rdate.value,rsdate.value,zone.value,vtype.value,gvw.value,cc.value,nps.value);
  console.log("Inside gvw event");
	resetPremiumAmount();
});

/* --------------------------------------------------
   CC CHANGE (Private / Two Wheeler / Taxi)
-----------------------------------------------------
Cubic Capacity is a core OD rating parameter.
-------------------------------------------------- */
cc.addEventListener("input",function(){
  console.log(rsdate.value);
  console.log(typeof rsdate.value);
  basicODRate(rdate.value,rsdate.value,zone.value,vtype.value,gvw.value,cc.value,nps.value);
  console.log("Inside cc event");
	resetPremiumAmount();
});

/* --------------------------------------------------
   VEHICLE TYPE CHANGE
-----------------------------------------------------
Changing vehicle type changes:
• Applicable tariffs
• Mandatory fields
• Allowed add-ons
-------------------------------------------------- */
vtype.addEventListener("input",function(){
  console.log(rsdate.value);
  console.log(typeof rsdate.value);
	// Reset all dependent inputs
  cc.value=null;
  gvw.value=null;
  nps.value=null;
  rate.textContent='';
  newidv.textContent='';
  oldidv.value=null;
  dep.value=null;
  odd.value=null;
  lld.value=null;
	// Reset discounts and add-ons
  ncbd.selectedIndex='0';
  tyreV.selectedIndex='0';
  towingAmt.value=null;
  nopd.value=null;
  csinopd.selectedIndex='0';
  nopp.value=null;
  csinopp.selectedIndex='0';
  eTypeSelect.selectedIndex='0';
  eTypeSelect.disabled=true;
  ELA.value=null;
 
  
  console.log("back to vtype event");
  resetAddon();
  checkAddonApplicable();
  resetPremiumAmount();	
	// Recalculate OD rate for new vehicle type
  basicODRate(rdate.value,rsdate.value,zone.value,vtype.value,gvw.value,cc.value,nps.value);	
});

/* --------------------------------------------------
   ELECTRIC VEHICLE TYPE CHANGE
-----------------------------------------------------
EV / Hybrid selection alters:
• OD rates
• Add-on eligibility
-------------------------------------------------- */
eTypeSelect.addEventListener("input" ,function(){
  basicODRate(rdate.value,rsdate.value,zone.value,vtype.value,gvw.value,cc.value,nps.value);
  resetPremiumAmount();
  resetAddon();
  checkAddonApplicable();
});

/* --------------------------------------------------
   NUMBER OF PASSENGERS CHANGE
-----------------------------------------------------
Passenger count affects:
• OD loadings
• TP passenger liability
-------------------------------------------------- */

nps.addEventListener("input",function(){
  // Reset dependent parameters
  gvw.value=null;
  rate.textContent='';
  document.getElementById('rupees').textContent
  newidv.textContent='';
  oldidv.value=null;
  dep.value=null;
  odd.value=null;
  ncbd.selectedIndex='0';
  tyreV.selectedIndex='0';
  towingAmt.value=null;
  nopd.value=null;
  csinopd.selectedIndex='0';
  nopp.value=null;
  csinopp.selectedIndex='0';
  console.log(rsdate.value);
  console.log(typeof rsdate.value);
  
  console.log("Inside nps event");
  resetAddon();
  checkAddonApplicable();
  resetPremiumAmount();	
  basicODRate(rdate.value,rsdate.value,zone.value,vtype.value,gvw.value,cc.value,nps.value);	
});

/* --------------------------------------------------
   NIL DEPRECIATION SELECTION VALIDATION
-----------------------------------------------------
Triggered when Nil Dep checkbox is toggled.

Validations performed:
• Vehicle age limits
• Vehicle category eligibility
• Mandatory IMT 23 for certain vehicles
• Minimum NCB requirement for older vehicles
-------------------------------------------------- */
ND.addEventListener("change",function(){

	// Calculate vehicle age
  const jrsdate=new Date(rsdate.valueAsDate);
  const jrdate=new Date(rdate.valueAsDate);
  console.log(jrdate);
  console.log(jrsdate);
  const days=(jrsdate.getTime()-jrdate.getTime())/1000/60/60/24;
  var age;
 	age = days < 1460 ? days / 365 : (days + 1) / 365.25; 
  if(ND.checked){
	  // IMT 23 mandatory for commercial vehicles with Nil Dep
    if(vtype.value=='GCV4' || vtype.value=='PCV Bus'||vtype.value=='PCV School Bus'||vtype.value=='MISC'){
      imt23.checked=true;
      imt23.disabled=true;
    }
	/* ----------------------------------------------
       COMMERCIAL VEHICLE NIL DEP CONDITIONS
    ---------------------------------------------- */
    if(age>2.6 && (vtype.value=='GCV4' || vtype.value=='PCV Bus'||vtype.value=='PCV School Bus'||vtype.value=='MISC' || vtype.vlaue=='PCV Taxi'||vtype.value=='3GCV')){
      window.alert("NIL Dep is only applicable for commercial vehicle age greater than 2.6, if ncb is min 20% for renewal & 25% for rollover");
      if(ncbd.selectedIndex=='0'){
        ND.checked=false;
        imt23.disabled=false;
      }
    }

	/* ----------------------------------------------
       PRIVATE CAR / TWO WHEELER NIL DEP CONDITIONS
    ---------------------------------------------- */
    if(age>4.6 && (vtype.value=='PvtCar'||vtype.value=='2W'||vtype.value=='2WSS'||vtype.value=='PvtCarS')){
      window.alert("NIL Dep is only applicable for age greater than 4.6, if ncb is min 20% for renewal & 25% for rollover");
      if(ncbd.selectedIndex=='0'){
        ND.checked=false;
      }
    }
  }
  else{
	  // Re-enable IMT 23 if Nil Dep is deselected
    if(vtype.value=='GCV4' || vtype.value=='PCV Bus'||vtype.value=='PCV School Bus'||vtype.value=='MISC'){
	  imt23.disabled=false;  
    }
	 
  }
});
/* --------------------------------------------------
   NCB CHANGE VALIDATION
-----------------------------------------------------
Triggered when NCB percentage is changed.

Revalidates Nil Dep eligibility dynamically.
-------------------------------------------------- */

ncbd.addEventListener("input",function(){
	// Recalculate vehicle age
  const jrsdate=new Date(rsdate.valueAsDate);
  const jrdate=new Date(rdate.valueAsDate);
  console.log(jrdate);
  console.log(jrsdate);
  const days=(jrsdate.getTime()-jrdate.getTime())/1000/60/60/24;
  var age;
  	age = days < 1460 ? days / 365 : (days + 1) / 365.25; 
  if(ND.checked){
	  // Commercial vehicle NCB dependency
    if(age>2.6 && (vtype.value=='GCV4' || vtype.value=='PCV Bus'||vtype.value=='PCV School Bus'||vtype.value=='MISC' || vtype.vlaue=='PCV Taxi')){
      window.alert("NIL Dep is only applicable for commercial vehicle age greater than 2.6, if ncb is min 20% for renewal & 25% for rollover");
		// IMT 23 mandatory for commercial vehicles with Nil Dep
      if(ncbd.selectedIndex=='0'){
        ND.checked=false;
        imt23.disabled=false;
      }
    }
// Private vehicle NCB dependency
    if(age>4.6 && (vtype.value=='PvtCar'||vtype.value=='2W'||vtype.value=='2WSS'||vtype.value=='PvtCarS')){
      window.alert("NIL Dep is only applicable for age greater than 4.6, if ncb is min 20% for renewal & 25% for rollover");
		// If NCB not selected, disallow Nil Dep
      if(ncbd.selectedIndex=='0'){
        ND.checked=false;
      }
    }
  }
});


/* ==================================================
   IDV CALCULATION & CORE OD RATE ENGINE
====================================================
This section controls:
• IDV calculation based on depreciation
• Mandatory input enforcement
• Field enable / disable logic
• Routing to correct OD rate function

This function acts as the CENTRAL UNDERWRITING
DECISION ENGINE.
==================================================== */



rsdate.addEventListener("change",function(){
  console.log(rsdate.value);
  console.log(typeof rsdate.value);
  cc.value=null;
  gvw.value=null;
  nps.value=null;
  lld.value=null;
  rate.textContent='';
  newidv.textContent='';
  oldidv.value=null;
  dep.value=null;
  odd.value=null;
  ncbd.selectedIndex='0';
  tyreV.selectedIndex='0';
  towingAmt.value=null;
  nopd.value=null;
  csinopd.selectedIndex='0';
  nopp.value=null;
  csinopp.selectedIndex='0';
  eTypeSelect.selectedIndex='0';
  eTypeSelect.disabled=true;
  ELA.value=null;
  EMP.value=null;
  
  
  console.log("Inside rsdate event");
  resetAddon();
  checkAddonApplicable();
  basicODRate(rdate.value,rsdate.value,zone.value,vtype.value,gvw.value,cc.value,nps.value);	
});

/* --------------------------------------------------
   IDV CALCULATION
-----------------------------------------------------
Whenever Old IDV or Depreciation changes,
New IDV is recalculated.

Formula:
New IDV = Old IDV × (100 − Dep%) / 100
-------------------------------------------------- */
oldidv.addEventListener("input",()=>{
  document.getElementById('rupees').textContent
  newidv.textContent=Number((Number(oldidv.value)*(100-Number(dep.value))/100).toFixed(0));
});
dep.addEventListener("input",()=>{
  document.getElementById('rupees').textContent
  newidv.textContent=Number((Number(oldidv.value)*(100-Number(dep.value))/100).toFixed(0));
});

/* --------------------------------------------------
   FUNCTION: basicODRate (MASTER ROUTER)
-----------------------------------------------------
Determines:
• Which OD rate function to call
• Which fields are mandatory
• Which add-ons are allowed
• Which inputs are disabled

This is NOT a calculation function.
It is a DECISION & CONTROL function.
-------------------------------------------------- */
function basicODRate(r_date,rs_date,zonetype,vehicleType,grossVW,cubicCap,nops){
	 // Ensure both dates exist
  if(r_date && rs_date){
      const tempDate=new Date(rdate.valueAsDate);
      const tempDate1=new Date();
/* ------------------------------------------------
     GOODS CARRYING VEHICLE (4W)
  ------------------------------------------------- */
      if(vehicleType=="GCV4"){
		  // Mandatory & disabled field configuration
        lld.disabled=false;
        paodch.checked=false;
        paodch.disabled=false;
        paodt.selectedIndex='0';
        paodt.disabled=true;
        imt23.disabled=false;
        imt23.checked=false;
        cc.value=null;
        nps.value=null;
        cc.disabled=true;
        nps.disabled=true;
        cc.style.backgroundColor='white';
        nps.style.backgroundColor='white';
        gvw.disabled=false;
        nopp.value==null;
        csinopp.selectedIndex='0';
        nopp.disabled=true;
        csinopp.disabled=true;
        nopd.value=null;
        csinopd.selectedIndex='0';
        nopd.disabled=false;
        csinopd.disabled=false;
		  // Disable incompatible add-ons
	      OT.disabled=true;
	      OT.checked=false;
        eTypeSelect.selectedIndex='0';
        eTypeSelect.disabled=true; 
        EVP.checked=false;
        EVP.disabled=true;     
        // GVW mandatory highlight
        gvw.style.backgroundColor='rgb(240, 160, 160)';
               
        if(grossVW){
          console.log("yes");
          gcvODRate();
        }
        else{
                    
        }
      }
	/* ------------------------------------------------
     THREE WHEELER – GOODS
  ------------------------------------------------- */
      else if(vehicleType=='3GCV'){
        lld.disabled=false;
        paodch.checked=false;
        paodch.disabled=false;
        paodt.selectedIndex='0';
        paodt.disabled=true;
        imt23.disabled=false;
        imt23.checked=false;
        cc.value=null;
        nps.value=null;
        cc.disabled=true;
        nps.disabled=true;
        cc.style.backgroundColor='white';
        nps.style.backgroundColor='white';
        gvw.style.backgroundColor='white';
        gvw.disabled=true;
        nopp.value==null;
        csinopp.selectedIndex='0';
        nopp.disabled=true;
        csinopp.disabled=true;
        nopd.value=null;
        csinopd.selectedIndex='0';
        nopd.disabled=false;
        csinopd.disabled=false;
	      OT.disabled=true;
	      OT.checked=false;

        EVP.checked=false;
        EVP.disabled=true;
        eTypeSelect.disabled=false;
        eTypeSelect.options[2].disabled=true;
        threegcvODRate();
        
      }

	/* ------------------------------------------------
     THREE WHEELER – PASSENGER
  ------------------------------------------------- */
      else if(vehicleType=='3PCV'){
        lld.disabled=false;
        paodch.checked=false;
        paodch.disabled=false;
        paodt.selectedIndex='0';
        paodt.disabled=true;
        imt23.disabled=false;
        imt23.checked=false;
        cc.value=null;

        cc.disabled=true;
        nps.disabled=false; //madatory field enabled
        nps.style.backgroundColor='rgb(240, 160, 160)'; //mandatory field highlight
        cc.style.backgroundColor='white';
        gvw.style.backgroundColor='white';
        gvw.disabled=true;
        nopp.value==null;
        csinopp.selectedIndex='0';
        nopp.disabled=true;
        csinopp.disabled=true;
        nopd.value=null;
        csinopd.selectedIndex='0';
        nopd.disabled=false;
        csinopd.disabled=false;
	      OT.disabled=true;
	      OT.checked=false;
        eTypeSelect.disabled=true; 
        EVP.checked=false;
        EVP.disabled=true;
        eTypeSelect.disabled=false;
        eTypeSelect.options[2].disabled=true;   
        threepcvODRate();
        
      }

/* ------------------------------------------------
     MISCELLANEOUS VEHICLES
  ------------------------------------------------- */
      else if(vehicleType=="MISC"){
        nopp.value==null;
        csinopp.selectedIndex='0';
        nopp.disabled=true;
        csinopp.disabled=true;
        nopd.value=null;
        csinopd.selectedIndex='0';
        nopd.disabled=false;
        csinopd.disabled=false;
        lld.disabled=false;
        paodch.checked=false;
        paodch.disabled=false;
        paodt.selectedIndex='0';
        paodt.disabled=true;
        gvw.style.backgroundColor='white';
        gvw.value=null;
        nps.value=null;
        cc.value=null;
        gvw.disabled=true;
        nps.disabled=true;
        cc.disabled=true;
        cc.style.backgroundColor='white';
        nps.style.backgroundColor='white';
        imt23.disabled=false;
        imt23.checked=false;
	      OT.disabled=false;
	      OT.checked=false;
        eTypeSelect.selectedIndex='0';
        eTypeSelect.disabled=true;
        EVP.checked=false;
        EVP.disabled=true;
        miscODRate();
 /* ------------------------------------------------
     PRIVATE CAR
  ------------------------------------------------- */

      }else if(vehicleType=="PvtCar") {
		  
        nopp.value==null;
        csinopp.selectedIndex='0';
        nopp.disabled=false;
        csinopp.disabled=false;
        nopd.value=null;
        csinopd.selectedIndex='0';
        nopd.disabled=false;
        csinopd.disabled=false;
        lld.disabled=false;
        paodch.checked=false;
        paodch.disabled=false;
        paodt.selectedIndex='0';
		   // PA Owner Driver allowed only if same-day registration
        if(tempDate1.setHours(0,0,0,0)==tempDate.setHours(0,0,0,0)){
          paodt.disabled=false;
          paodt.options[2].disabled=true;
          paodt.options[1].disabled=false;
        }
        
        imt23.checked=false;
        imt23.disabled=true;
        gvw.style.backgroundColor='white';
        nps.style.backgroundColor='white';
        gvw.value=null;
        nps.value=null;
        gvw.disabled=true;
        nps.disabled=true;
        cc.disabled=false;
	      OT.disabled=true;
	      OT.checked=false; 
        
        eTypeSelect.disabled=false;  
        eTypeSelect.options[2].disabled=false;   

        cc.style.backgroundColor='rgb(240, 160, 160)';
          if(cubicCap){
            pvtCarODRate();
          }else{

          }

	/* ------------------------------------------------
     TWO WHEELER
  ------------------------------------------------- */
      }else if(vehicleType=='2W'){
        nopp.value==null;
        csinopp.selectedIndex='0';
        nopp.disabled=false;
        csinopp.disabled=false;
        nopd.value=null;
        csinopd.selectedIndex='0';
        nopd.disabled=false;
        csinopd.disabled=false;
        lld.disabled=false;
        paodch.checked=false;
        paodch.disabled=false;
        
        paodt.selectedIndex='0';
        if(tempDate1.setHours(0,0,0,0)==tempDate.setHours(0,0,0,0)){
          paodt.disabled=false;
          paodt.options[2].disabled=false;
          paodt.options[1].disabled=true;
        }
        
        imt23.checked=false;
        imt23.disabled=true;
        gvw.style.backgroundColor='white';
        gvw.value=null;
        nps.value=null;
        gvw.disabled=true;
        nps.disabled=true;
        nps.style.backgroundColor='white';
        cc.disabled=false;
	      OT.disabled=true;
	      OT.checked=false;
        EVP.disabled=true;
        eTypeSelect.disabled=false;      
        
        cc.style.backgroundColor='rgb(240, 160, 160)';
        if(cubicCap){
          twoWheelerODRate();
        }
        else{
          
        }

 /* ------------------------------------------------
     TAXI
  ------------------------------------------------- */
      }else if(vehicleType=="PCV Taxi"){
        nopp.value==null;
        csinopp.selectedIndex='0';
        nopp.disabled=true;
        csinopp.disabled=true;
        lld.disabled=false;
        nopd.value=null;
        csinopd.selectedIndex='0';
        nopd.disabled=false;
        csinopd.disabled=false;
        paodch.checked=false;
        paodch.disabled=false;
        paodt.selectedIndex='0';
        paodt.disabled=true;
        imt23.checked=false;
        imt23.disabled=true;
        gvw.style.backgroundColor='white';
        gvw.value=null;
        gvw.disabled=true;
        cc.disabled=false;
        nps.disabled=false;
	      OT.disabled=true;
	      OT.checked=false;      
        nps.style.backgroundColor='rgb(240, 160, 160)';
        cc.style.backgroundColor='rgb(240, 160, 160)';
        eTypeSelect.selectedIndex='0';
        eTypeSelect.disabled=true;
        EVP.checked=false;
        EVP.disabled=true;
           
        if(cubicCap && nops){
          if(nops>6 && nops <=0){
            window.alert("Number Of Passenger Must Be Greater Than 0 and less than 7");
            return;
          }
          taxiODRate();
        }else if(!nops){
          //nps.focus();
          //window.alert("Please Enter No. Of Passengers");
        }
        else{
          //cc.focus();
         // window.alert("Please Enter Cubic Capacity");
        }
/* ------------------------------------------------
     BUS / SCHOOL BUS
  ------------------------------------------------- */
      }else if((vehicleType=="PCV Bus") || (vehicleType=="PCV School Bus")){
        nopp.value==null;
        csinopp.selectedIndex='0';
        nopp.disabled=true;
        csinopp.disabled=true;
        console.log("Bus");
        lld.disabled=false;
        paodch.checked=false;
        paodch.disabled=false;
        paodt.selectedIndex='0';
        paodt.disabled=true;
        imt23.checked=false;
        imt23.disabled=false;
        cc.value=null;
        gvw.value=null;
        cc.disabled=true;
        gvw.disabled=true;
        nps.disabled=false;
	      OT.disabled=true;
	      OT.checked=false;      
        cc.style.backgroundColor='white';
        gvw.style.backgroundColor='white';
        nps.style.backgroundColor='rgb(240, 160, 160)';
        eTypeSelect.selectedIndex='0';
        eTypeSelect.disabled=true;
        EVP.checked=false;
        EVP.disabled=true;
        //nps.focus();
        if(nops){
          pcvBusODRate();
        }
        else{
          //window.alert("Please Enter No. Of Passengers");
        }
/* ------------------------------------------------
     TWO WHEELER STANDALONE
  ------------------------------------------------- */
      }else if(vehicleType=="2WSS"){
        nopp.value==null;
        csinopp.selectedIndex='0';
        nopp.disabled=true;
        csinopp.disabled=true;
        nopd.value=null;
        csinopd.selectedIndex='0';
        nopd.disabled=true;
        csinopd.disabled=true;
        lld.disabled=true;
        paodch.checked=false;
        paodch.disabled=true;
        imt23.checked=false;
        imt23.disabled=true;
        paodt.selectedIndex='0';
        paodt.disabled=true;
        gvw.style.backgroundColor='white';
        gvw.value=null;
        nps.value=null;
        gvw.disabled=true;
        nps.disabled=true;
        nps.style.backgroundColor='white';
        cc.disabled=false;
	      OT.disabled=true;
	      OT.checked=false; 
        EVP.disabled=true;
        eTypeSelect.disabled=false;     
        //cc.value=null;
        //cc.focus();
        cc.style.backgroundColor='rgb(240, 160, 160)';
        if(cubicCap){
          twoWheelerODRate();
        }
        else{
          //window.alert("Please Enter Cubic Capacity");
        }

/* ------------------------------------------------
     PRIVATE CAR STANDALONE
  ------------------------------------------------- */
      }else if(vehicleType=="PvtCarS"){
        nopp.value==null;
        csinopp.selectedIndex='0';
        nopp.disabled=true;
        csinopp.disabled=true;
        nopd.value=null;
        csinopd.selectedIndex='0';
        csinopd.disabled=true;
        lld.disabled=true;
        paodch.checked=false;
        paodch.disabled=true;
        paodt.selectedIndex='0';
        paodt.disabled=true;
        imt23.checked=false;
        imt23.disabled=true;
        gvw.style.backgroundColor='white';
        nps.style.backgroundColor='white';
        gvw.value=null;
        nps.value=null;
        gvw.disabled=true;
        nps.disabled=true;
        cc.disabled=false;
	      OT.disabled=true;
	      OT.checked=false;  
        //eTypeSelect.selectedIndex='0';
        eTypeSelect.disabled=false;    
        //cc.focus();
        cc.style.backgroundColor='rgb(240, 160, 160)';
          if(cubicCap){
            pvtCarODRate();
          }else{
            //window.alert("Please Enter Cubic Capacity");
          }
      }
      
  }
  else{
    return;
  }  
}

/* ==================================================
   BASE OWN DAMAGE (OD) PREMIUM CALCULATION
====================================================
This function converts:
• OD Rate (%)
• IDV
• Vehicle-specific loadings

into the BASE OD PREMIUM amount.

This is the FIRST monetary computation in the system.
==================================================== */

/* --------------------------------------------------
   FUNCTION: basicODPremium
-----------------------------------------------------
Purpose:
• Validate mandatory inputs
• Apply vehicle-specific loadings
• Calculate base OD premium

Returns:
• true  → calculation successful
• false → mandatory data missing
-------------------------------------------------- */

function basicODPremium() {

  const rateVal = Number(rate.textContent);
  const idvVal  = Number(newidv.textContent);
  const baseOD  = (rateVal * idvVal) / 100;
  const odField = document.getElementById("OD1P");

  /* ----------------------------------------------
     PRIVATE CAR / TWO WHEELER
  ---------------------------------------------- */
  if (
    vtype.value === "PvtCar" ||
    vtype.value === "PvtCarS" ||
    vtype.value === "2W" ||
    vtype.value === "2wss"
  ) {

    if (cc.value == null) {
      window.alert("Cubic Capacity is a Manadatory Input For Calculation of Premium");
      return false;
    }

    odField.textContent = baseOD.toFixed(2);
    return true;
  }

  /* ----------------------------------------------
     GOODS CARRYING VEHICLE (4W)
  ---------------------------------------------- */
  if (vtype.value === "GCV4") {

    if (gvw.value == null) {
      window.alert("Gross Vehicle Weight is a Manadatory Input For Calculation of Premium");
      return false;
    }

    let odAmount = baseOD;

    if (gvw.value > 12000) {
      odAmount += (gvw.value - 12000) * 0.27;
    }

    odField.textContent = odAmount.toFixed(2);
    return true;
  }

  /* ----------------------------------------------
     TAXI
  ---------------------------------------------- */
  if (vtype.value === "PCV Taxi") {

    if (cc.value == null || nps.value == null || nps.value > 6) {
      window.alert("Cubic Capacity and No Of passengers(Less Than 7) are required Field For Taxi");
      return false;
    }

    odField.textContent = baseOD.toFixed(2);
    return true;
  }

  /* ----------------------------------------------
     BUS / SCHOOL BUS
  ---------------------------------------------- */
  if (vtype.value === "PCV Bus" || vtype.value === "PCV School Bus") {

    if (nps.value == null || nps.value <= 6) {
      window.alert("Number of Passengers Must Be Greater Than 6");
      return false;
    }

    let loading = 0;

    if (nps.value <= 18) loading = 350;
    else if (nps.value <= 36) loading = 450;
    else if (nps.value <= 60) loading = 550;
    else loading = 680;

    odField.textContent = (baseOD + loading).toFixed(2);
    return true;
  }

  /* ----------------------------------------------
     DEFAULT (Misc, 3W, Others)
  ---------------------------------------------- */
  odField.textContent = baseOD.toFixed(2);
  return true;
}

/* ==================================================
   THIRD PARTY (TP) PREMIUM CALCULATION
====================================================
This function calculates:
• Basic TP premium
• Passenger TP liability
• Employee / Driver TP
• LPG / CNG / GE TP additions

TP premiums are based on IRDAI tariff and
DO NOT depend on IDV or OD rate.
==================================================== */

/* --------------------------------------------------
   FUNCTION: basicTP
-----------------------------------------------------
Purpose:
• Apply IRDAI-notified TP premiums
• Apply passenger / employee liabilities
• Handle multi-year TP for new vehicles
-------------------------------------------------- */
function basicTP() {

  /* -------------------- helpers -------------------- */
  const show = id => document.getElementById(id).style.display = 'flex';
  const set  = (id, val) => document.getElementById(id).textContent = val;

  const applyCommonTPAddons = (mult = 1) => {

    if (LPG.checked) {
      set("Liability8P", 60 * mult);
      show("Liability8");
    }

    if (GE.checked) {
      set("Liability7P", 100 * mult);
      show("Liability7");
    }

    if (nopd.value) {
      const rate = (csinopd.selectedIndex == '1') ? 60 : 120;
      set("Liability5P", nopd.value * rate * mult);
      show("Liability5");
    }

    if (nopp?.value) {
      const rate = (csinopp.selectedIndex == '1') ? 50 : 100;
      set("Liability6P", nopp.value * rate * mult);
      show("Liability6");
    }
  };

  const today = new Date().setHours(0,0,0,0);
  const reg   = new Date(rdate.valueAsDate).setHours(0,0,0,0);
  const isNewVehicle = today === reg;

  /* -------------------- GCV (4W) -------------------- */
  if (vtype.value === "GCV4") {

    applyCommonTPAddons();

    if (TrOD.value) {
      show("Liability9");
      set("Liability9P", 2485);
    }

    show("Liability1");

    if (gvw.value <= 7500) set("Liability1P", 16049);
    else if (gvw.value <= 12000) set("Liability1P", 27186);
    else if (gvw.value <= 20000) set("Liability1P", 35313);
    else if (gvw.value <= 40000) set("Liability1P", 43950);
    else set("Liability1P", 44242);

    return;
  }

  /* -------------------- 3W GOODS -------------------- */
  if (vtype.value === "3GCV") {

    applyCommonTPAddons();
    show("Liability1");

    set(
      "Liability1P",
      eTypeSelect.selectedIndex == '0' ? 4492 : 3139
    );
    return;
  }

  /* -------------------- 3W PASSENGER -------------------- */
  if (vtype.value === "3PCV") {

    applyCommonTPAddons();
    show("Liability1");
    show("Liability2");

    if (eTypeSelect.selectedIndex == '0') {
      set("Liability1P", 2371);
      set("Liability2P", nps.value * 1134);
    } else {
      set("Liability1P", 1539);
      set("Liability2P", nps.value * 737);
    }
    return;
  }

  /* -------------------- BUS / SCHOOL BUS -------------------- */
  if (vtype.value === "PCV Bus" || vtype.value === "PCV School Bus") {

    applyCommonTPAddons();
    show("Liability1");
    show("Liability2");

    if (vtype.value === "PCV Bus") {
      set("Liability1P", 14343);
      set("Liability2P", nps.value * 877);
    } else {
      set("Liability1P", 12192);
      set("Liability2P", nps.value * 745);
    }
    return;
  }

  /* -------------------- MISC -------------------- */
  if (vtype.value === "MISC") {

    applyCommonTPAddons();

    if (TrOD.value) {
      show("Liability9");
      set("Liability9P", 2485);
    }

    show("Liability1");
    set("Liability1P", 7267);
    return;
  }

  /* -------------------- TAXI -------------------- */
  if (vtype.value === "PCV Taxi") {

    applyCommonTPAddons();
    show("Liability1");
    show("Liability2");

    if (cc.value <= 1000) {
      set("Liability1P", 6040);
      set("Liability2P", nps.value * 1162);
    } else if (cc.value <= 1500) {
      set("Liability1P", 7940);
      set("Liability2P", nps.value * 978);
    } else {
      set("Liability1P", 10523);
      set("Liability2P", nps.value * 1117);
    }
    return;
  }

  /* -------------------- PRIVATE CAR -------------------- */
  if (vtype.value === "PvtCar") {

    show("Liability1");

    const base = isNewVehicle
      ? [6521, 10640, 24596]
      : [2094, 3416, 7897];

    const ccBand =
      cc.value <= 1000 ? 0 :
      cc.value <= 1500 ? 1 : 2;

    let factor = 1;
    if (eTypeSelect.selectedIndex == 1) factor = 0.85;
    else if (eTypeSelect.selectedIndex == 2) factor = 0.925;

    set("Liability1P", Math.round(base[ccBand] * factor));

    applyCommonTPAddons(isNewVehicle ? 3 : 1);
    return;
  }

  /* -------------------- TWO WHEELER -------------------- */
  if (vtype.value === "2W") {

    show("Liability1");

    const base = isNewVehicle
      ? [2901, 3851, 7365, 15117]
      : [538, 714, 1366, 2804];

    const ccBand =
      cc.value <= 75 ? 0 :
      cc.value <= 150 ? 1 :
      cc.value <= 350 ? 2 : 3;

    let factor = (eTypeSelect.selectedIndex == 1) ? 0.85 : 1;
    set("Liability1P", Math.round(base[ccBand] * factor));

    applyCommonTPAddons(isNewVehicle ? 5 : 1);
  }
}

/* ==================================================
   FUNCTION: totalAmount
====================================================
PURPOSE:
This is the FINAL premium computation function.

It:
• Calculates Base OD
• Applies discounts & loadings
• Applies all selected add-ons
• Calculates Third Party premium
• Applies GST
• Derives FINAL PAYABLE AMOUNT

This function should be triggered ONLY after:
• Vehicle details are entered
• IDV is calculated
• OD rate is available
==================================================== */
function totalAmount(){
	// Registration date (used for new vs renewal logic)
  const jrdate=new Date(rdate.valueAsDate);
  var presentDate=new Date();
	  /* ----------------------------------------------
     STEP 0: RESET ALL PREVIOUS PREMIUM VALUES
  ----------------------------------------------
  Prevents stale values from previous calculations
  ---------------------------------------------- */
  resetPremiumAmount();
	/* ----------------------------------------------
     STEP 1: VALIDATE MANDATORY CONDITIONS
  ----------------------------------------------
  Ensures:
  • OD rate exists
  • IDV is calculated
  • Base OD premium is computable
  ---------------------------------------------- */
  if(rate.textContent!=''&& newidv.textContent!='' && basicODPremium()){
	    /* --------------------------------------------
       STEP 2: CALCULATE THIRD PARTY PREMIUM
    --------------------------------------------
    TP premium is tariff-driven (IRDAI)
    -------------------------------------------- */
    basicTP();
	/* --------------------------------------------
       STEP 3: OD DISCOUNT (UW / SPECIAL DISCOUNT)
    --------------------------------------------
    Applied as a negative percentage on Base OD
    -------------------------------------------- */
    if(odd.value!=null){
      OD2P.textContent=((Number(OD1P.textContent)*odd.value)/(-100)).toFixed(2);
    }

	      /* --------------------------------------------
       STEP 4: ELECTRICAL ACCESSORIES (ELA)
    --------------------------------------------
    • Rated at 4% of accessory value
    • Discount adjusted if OD discount exists
    -------------------------------------------- */
    if(ELA.value){
      document.getElementById("OD19").style.display='flex';
      OD19P.textContent=((ELA.value*0.04)*(1-Number(odd.value)/100)).toFixed(2);
    }
	     /* --------------------------------------------
       STEP 5: TRAILER OD PREMIUM
    --------------------------------------------
    • Rated at 1.05% of trailer value
    -------------------------------------------- */
    if(TrOD.value){
      document.getElementById("OD20").style.display='flex';
      OD20P.textContent=((TrOD.value*0.0105)*(1-Number(odd.value)/100)).toFixed(2);
    }
	    /* --------------------------------------------
       STEP 6: IMT 23 – RESTRICTED DRIVING LOADING
    --------------------------------------------
    Adds 15% loading on:
    • Base OD
    • Discounts
    • Accessories
    -------------------------------------------- */
    if(imt23.checked){
      OD3P.textContent=((Number(OD1P.textContent)+Number(OD2P.textContent)+Number(OD19P.textContent)+Number(OD20P.textContent))*0.15).toFixed(2);
      document.getElementById('OD3').style.display='flex';
    }
	/* --------------------------------------------
       STEP 7: PA TO OWNER / DRIVER
    -------------------------------------------- */
    if(paodch.checked){
      if(paodt.value=='1'){
        Liability4P.textContent=275;
        document.getElementById("Liability4").style.display='flex';
      }else if(paodt.value=='3'){
        Liability4P.textContent=705;
        document.getElementById("Liability4").style.display='flex';
      }else{
        
        Liability4P.textContent=1100;
        document.getElementById("Liability4").style.display='flex';
        
      }  
    }
    if(nps.value!=null && nps.value!='' && nps.value!='0'){
      console.log("This is not null");
      console.log(nps.value);
      console.log(typeof nps.value);
      document.getElementById("Liability2").style.display='flex';
    }
	  /* --------------------------------------------
       STEP 8: LEGAL LIABILITY TO DRIVER / EMPLOYEE
    -------------------------------------------- */
    if(lld.value!=null && lld.value!='' && lld.value!='0'){
		// New vehicle attracts multi-year TP
      if(vtype.value=="PvtCar" && jrdate.setHours(0,0,0,0)==presentDate.setHours(0,0,0,0)){
        Liability3P.textContent=lld.value*50*3;
        document.getElementById("Liability3").style.display='flex';
      }else if(vtype.value=="2W" && jrdate.setHours(0,0,0,0)==presentDate.setHours(0,0,0,0)){
        Liability3P.textContent=lld.value*50*5;
        document.getElementById("Liability3").style.display='flex';
      }else{
        Liability3P.textContent=lld.value*50;
        document.getElementById("Liability3").style.display='flex';
      }
    }
	/* --------------------------------------------
       STEP 9: ADD-ON PREMIUMS
    -------------------------------------------- */
  if (ND.checked) {
  nilDep();
  if (OD4P.textContent) showOD('OD4');
}

if (EP.checked) {
  engineProtect();
  if (OD5P.textContent) showOD('OD5');
}

if (CM.checked) {
  consumables();
  if (OD6P.textContent) showOD('OD6');
}

if (RTI.checked) {
  returnToInvoice();
  if (OD7P.textContent) showOD('OD7');
}

if (LK.checked) {
  setOD('OD8P', vtype.value === "2W" ? 50 : 750);
  showOD('OD8');
}

if (EMP.value) {
  showOD('OD9');
  const rate =
    (vtype.value === '2W' || vtype.value === '2WSS') ? 0.02 :
    (vtype.value === 'PCV Taxi' || vtype.value === 'PvtCar' || vtype.value === 'PvtCarS') ? 0.066 :
    0.03;
  setOD('OD9P', (Number(EMP.value) * rate).toFixed(2));
}

if (RSA.checked) {
  const rsaRates = {
    '2W': 25,
    '2WSS': 25,
    'PvtCar': 50,
    'PvtCarS': 50,
    'PCV Taxi': 75,
    'GCV4': 200
  };
  if (rsaRates[vtype.value]) {
    setOD('OD10P', rsaRates[vtype.value]);
    showOD('OD10');
  }
}

if (tyreV.selectedIndex !== '0') {
  showOD('OD11');
  setOD('OD11P', [0, 1000, 2000, 4000, 8000][tyreV.selectedIndex]);
}

if (NP.checked) {
  showOD('OD12');
  const rate = (vtype.value === 'PvtCar' || vtype.value === 'PvtCarS') ? 0.0015 : 0.0024;
  setOD('OD12P', (Number(newidv.textContent) * rate).toFixed(2));
}

if (GE.checked) {
  setOD('OD13P', 400);
  showOD('OD13');
}

if (LPG.checked) {
  setOD(
    'OD14P',
    ((Number(OD1P.textContent) + Number(OD2P.textContent)) * 0.05).toFixed(2)
  );
  showOD('OD14');
}

if (OT.checked) {
  setOD('OD15P', (Number(newidv.textContent) * 0.005).toFixed(2));
  showOD('OD15');
}

if (towingAmt.value && towingAmt.value !== '0') {
  showOD('OD16');
  setOD(
    'OD16P',
    towingAmt.value <= 10000
      ? towingAmt.value * 0.05
      : towingAmt.value * 0.075
  );
}

/* ---------- NCB (Applied LAST) ---------- */
if (ncbd.selectedIndex !== '0') {
  showOD('OD17');
  const ncbBase =
    Number(OD1P.textContent) +
    Number(OD2P.textContent) +
    Number(OD7P.textContent) +
    Number(OD3P.textContent) +
    Number(OD4P.textContent) +
    Number(OD14P.textContent) +
    Number(OD15P.textContent) +
    Number(OD19P.textContent) +
    Number(OD20P.textContent);

  setOD('OD17P', ((ncbBase * Number(ncbd.value)) / 100 * -1).toFixed(2));
}

if (EVP.checked && (eTypeSelect.selectedIndex == 1 || eTypeSelect.selectedIndex == 2)) {
  evProtect();
  showOD('OD18');
}

	/* --------------------------------------------
       STEP 15: TOTAL OD PREMIUM & GST
    -------------------------------------------- */
    
    if(vtype.value=='GCV4' || vtype.value=='3GCV'){

      tod.textContent=
      (Number(OD1P.textContent)+Number(OD2P.textContent)+Number(OD3P.textContent)+Number(OD4P.textContent)+Number(OD5P.textContent)
      +Number(OD6P.textContent)+Number(OD7P.textContent)+Number(OD8P.textContent)+Number(OD9P.textContent)+Number(OD10P.textContent)
      +Number(OD11P.textContent)+Number(OD12P.textContent)+Number(OD13P.textContent)+Number(OD14P.textContent)+Number(OD15P.textContent)
      +Number(OD16P.textContent)+Number(OD17P.textContent)+Number(OD18P.textContent)+Number(OD19P.textContent)+Number(OD20P.textContent)
      ).toFixed(0);
      god.textContent=(Number(tod.textContent)*0.18).toFixed(2);
      ttp.textContent=
      (Number(Liability1P.textContent)+Number(Liability2P.textContent)+Number(Liability3P.textContent)+Number(Liability4P.textContent)+
      Number(Liability5P.textContent)+Number(Liability6P.textContent)+Number(Liability7P.textContent)+Number(Liability8P.textContent)+Number(Liability9P.textContent)).toFixed(0);
      gttp.textContent=
      ((Number(Liability1P.textContent)*0.05)+(Number(Liability2P.textContent)+Number(Liability3P.textContent)+Number(Liability4P.textContent)+
      Number(Liability5P.textContent)+Number(Liability6P.textContent)+Number(Liability7P.textContent)+Number(Liability8P.textContent)+Number(Liability9P.textContent))*0.18).toFixed(2);
      document.getElementById('rupees').textContent=Math.ceil(Number(tod.textContent)+Number(god.textContent)+Number(ttp.textContent)+Number(gttp.textContent)+1);
      
    }
    if(vtype.value!='GCV4' && vtype.value!='3GCV'){
      tod.textContent=
      (Number(OD1P.textContent)+Number(OD2P.textContent)+Number(OD3P.textContent)+Number(OD4P.textContent)+Number(OD5P.textContent)
      +Number(OD6P.textContent)+Number(OD7P.textContent)+Number(OD8P.textContent)+Number(OD9P.textContent)+Number(OD10P.textContent)
      +Number(OD11P.textContent)+Number(OD12P.textContent)+Number(OD13P.textContent)+Number(OD14P.textContent)+Number(OD15P.textContent)
      +Number(OD16P.textContent)+Number(OD17P.textContent)+Number(OD18P.textContent)+Number(OD19P.textContent)
      ).toFixed(0);
      god.textContent=(Number(tod.textContent)*0.18).toFixed(2);
	
		/* --------------------------------------------
       STEP 16: TOTAL TP PREMIUM & GST
    -------------------------------------------- */
      ttp.textContent=
      (Number(Liability1P.textContent)+Number(Liability2P.textContent)+Number(Liability3P.textContent)+Number(Liability4P.textContent)+
      Number(Liability5P.textContent)+Number(Liability6P.textContent)+Number(Liability7P.textContent)+Number(Liability8P.textContent)+Number(Liability9P.textContent)).toFixed(0);
      gttp.textContent=(Number(ttp.textContent)*0.18).toFixed(2);
      document.getElementById('rupees').textContent=Math.ceil(Number(tod.textContent)+Number(god.textContent)+Number(ttp.textContent)+Number(gttp.textContent)+1);
      
    }

  }  
  else{
    window.alert("Mandatory Fields Are Missing");
  }
}

/* ==================================================
   FUNCTION: checkAddonApplicable
====================================================
PURPOSE:
Determines which add-ons are ENABLED or DISABLED
based on:
• Vehicle age
• Vehicle type
• Passenger capacity (where applicable)
• EV / Non-EV status

IMPORTANT:
This function ONLY controls eligibility (UI enable/disable),
NOT premium calculation.
==================================================== */

function checkAddonApplicable() {

  /* -------------------- helpers -------------------- */
  const enable = (...els) => els.forEach(el => el && (el.disabled = false));
  const disable = (...els) => els.forEach(el => el && (el.disabled = true));

  /* -------------------- age calculation -------------------- */
  if (!rdate.valueAsDate || !rsdate.valueAsDate) return;

  const from = new Date(rdate.valueAsDate);
  const to   = new Date(rsdate.valueAsDate);

  const days = (to - from) / (1000 * 60 * 60 * 24);
  const age  = days < 1460 ? days / 365 : (days + 1) / 365.25;

  /* -------------------- GCV (4W) -------------------- */
  if (vtype.value === 'GCV4') {

    enable(EMP, RSA, towingAmt, TrOD);

    if (age < 2.5) {
      enable(ND, CM, RTI);
    } else if (age <= 4.5) {
      enable(ND, CM);
    }

    return;
  }

  /* -------------------- 3W GOODS / PASSENGER -------------------- */
  if (vtype.value === '3GCV' || vtype.value === '3PCV') {

    enable(EMP, RSA);

    if (age < 2.5) {
      enable(ND, CM, RTI);
      disable(towingAmt, TrOD);
    } else if (age <= 4.5) {
      enable(ND, CM);
      disable(towingAmt, TrOD);
    } else {
      enable(towingAmt);
      disable(TrOD);
    }

    return;
  }

  /* -------------------- PRIVATE CAR -------------------- */
  if (vtype.value === 'PvtCar' || vtype.value === 'PvtCarS') {

    enable(RSA, NP);

    if (age < 2.5) {
      enable(ND, CM, LK, EP, tyreV, RTI);
    } else if (age < 4.5) {
      enable(ND, CM, LK, EP, tyreV);
    } else if (age <= 6.5) {
      enable(ND);
    } else {
      enable(EMP);
    }

    // EV Protect only for EV / Hybrid
    disable(EVP);
    if (eTypeSelect.selectedIndex == 1 || eTypeSelect.selectedIndex == 2) {
      enable(EVP);
    }

    return;
  }

  /* -------------------- TAXI -------------------- */
  if (vtype.value === 'PCV Taxi') {

    enable(RSA, NP, EMP);

    if (age < 2.5) {
      enable(ND, CM, EP, RTI, LK);
    } else if (age <= 4.5) {
      enable(ND, CM, LK);
    }

    return;
  }

  /* -------------------- TWO WHEELER -------------------- */
  if (vtype.value === '2W' || vtype.value === '2WSS') {

    enable(RSA, EMP);

    if (age < 2.5) {
      enable(ND, CM, LK, EP, tyreV, RTI);
    } else if (age < 4.5) {
      enable(ND, CM, LK, EP);
    } else if (age <= 6.5) {
      enable(ND);
    }

    return;
  }

  /* -------------------- BUS / SCHOOL BUS -------------------- */
  if (vtype.value === 'PCV Bus' || vtype.value === 'PCV School Bus') {

    enable(RSA, EMP, towingAmt);

    if (!nps.value) return;

    if (age < 2.5) {
      enable(ND, CM, RTI);
      if (nps.value <= 17) enable(EP, LK);
    }
    else if (age <= 4.5) {
      enable(ND, CM);
      if (nps.value <= 17) enable(EP, LK);
    }

    return;
  }

  /* -------------------- MISC -------------------- */
  if (vtype.value === 'MISC') {

    enable(EMP, TrOD);

    if (age < 4.5) {
      enable(ND, CM);
    }

    return;
  }
}

/* ==================================================
   FUNCTION: resetAddon
====================================================
PURPOSE:
• Clears all selected add-ons
• Disables all add-on inputs
• Prevents carry-forward errors
==================================================== */
function resetAddon(){
  console.log("inside reset add on");
  ND.checked=false;
  EP.checked=false;
  CM.checked=false;
  RTI.checked=false;
  LK.checked=false;
  EMP.value=null;
  RSA.checked=false;
  GE.checked=false;
 
  NP.checked=false;
  OT.checked=false;
  ND.disabled=true;
  EP.disabled=true;
  CM.disabled=true;
  RTI.disabled=true;
  LK.disabled=true;
  EMP.disabled=false;
  RSA.disabled=true;
  tyreV.disabled=true;
  towingAmt.disabled=true;
  NP.disabled=true;
  OT.disabled=true;
  EVP.checked=false;
  TrOD.value=null;
  TrOD.disabled=true;
  

}

/* --------------------------------------------------
   FUNCTION: nilDep
-----------------------------------------------------
Calculates Nil Depreciation add-on premium.

Base:
• Base OD + Electrical Accessories loading
Rate:
• Increases with vehicle age
-------------------------------------------------- */
function nilDep(){
  console.log('insdie gcv');
  const jrsdate=new Date(rsdate.valueAsDate);
  const jrdate=new Date(rdate.valueAsDate);
  console.log(jrdate);
  console.log(jrsdate);
  const days=(jrsdate.getTime()-jrdate.getTime())/1000/60/60/24;
  var age;
  if(days<1460){
    age=days/365;
  }
  else{
    age=(days+1)/365.25;
  }
	  // Commercial & misc vehicles
  if(vtype.value=="GCV4" || vtype.value=="MISC"||vtype.value=="PCV Taxi" || vtype.value=="PCV Bus"|| vtype.value=="PCV School Bus" || vtype.value=="3GCV" || vtype.value=="3PCV"){
    if(age<=0.5){
      document.getElementById("OD4P").textContent=(Number(Number(document.getElementById("OD1P").textContent)+(ELA.value*0.04))*0.10).toFixed(2);
    }
    else if(age>0.5 && age<=1.5){
      document.getElementById("OD4P").textContent=(Number(Number(document.getElementById("OD1P").textContent)+(ELA.value*0.04))*0.20).toFixed(2);
    }
    else if(age>1.5 && age<=2.5){
      document.getElementById("OD4P").textContent=(Number(Number(document.getElementById("OD1P").textContent)+(ELA.value*0.04))*0.30).toFixed(2);
    }else if(age >2.5 && age <=4.5){
      document.getElementById("OD4P").textContent=(Number(Number(document.getElementById("OD1P").textContent)+(ELA.value*0.04))*0.40).toFixed(2);
    }

  }
	    // Private Car & two-wheelers
  else if(vtype.value=="PvtCar" || vtype.value=="PvtCarS" || vtype.value=="2W"|| vtype.value=="2WSS"){
    console.log("pvt add on");
    if(age<=0.5){
      document.getElementById("OD4P").textContent=(Number(Number(document.getElementById("OD1P").textContent)+(ELA.value*0.04))*0.10).toFixed(2); 
    }else if(age>0.5 && age<=1.5){
      document.getElementById("OD4P").textContent=(Number(Number(document.getElementById("OD1P").textContent)+(ELA.value*0.04))*0.20).toFixed(2);
    }else if(age>1.5 && age<=4.5){
      document.getElementById("OD4P").textContent=(Number(Number(document.getElementById("OD1P").textContent)+(ELA.value*0.04))*0.30).toFixed(2);
    }else if(age>4.5 && age <=6.5){
      document.getElementById("OD4P").textContent=(Number(Number(document.getElementById("OD1P").textContent)+(ELA.value*0.04))*0.40).toFixed(2);
    }

  }
}
function engineProtect(){
  console.log('insdie gcv');
  const jrsdate=new Date(rsdate.valueAsDate);
  const jrdate=new Date(rdate.valueAsDate);
  console.log(jrdate);
  console.log(jrsdate);
  const days=(jrsdate.getTime()-jrdate.getTime())/1000/60/60/24;
  var age;
  if(days<1460){
    age=days/365;
  }
  else{
    age=(days+1)/365.25;
  }
  if(vtype.value=="PvtCar" || vtype.value=="PvtCarS"){
    if(age<0.5){
      document.getElementById("OD5P").textContent=(Number(document.getElementById("newidv").textContent)*0.0013).toFixed(2);
    }
    else if(age>=0.5 && age <1.5){
      document.getElementById("OD5P").textContent=(Number(document.getElementById("newidv").textContent)*0.0016).toFixed(2);
    }
    else if(age>=1.5 && age <2.5){
      document.getElementById("OD5P").textContent=(Number(document.getElementById("newidv").textContent)*0.0021).toFixed(2);
    }else if(age>=2.5 && age <3.5){
      document.getElementById("OD5P").textContent=(Number(document.getElementById("newidv").textContent)*0.0027).toFixed(2);
    }else if(age>=3.5 && age <4.5){
      document.getElementById("OD5P").textContent=(Number(document.getElementById("newidv").textContent)*0.0032).toFixed(2);
    }
  }
  else if(vtype.value=="2W" || vtype.value=="2WSS"){
    if(age<0.5){
      document.getElementById("OD5P").textContent=(Number(document.getElementById("newidv").textContent)*0.0007).toFixed(2);
    }
    else if(age>=0.5 && age <1.5){
      document.getElementById("OD5P").textContent=(Number(document.getElementById("newidv").textContent)*0.0009).toFixed(2);
    }
    else if(age>=1.5 && age <2.5){
      document.getElementById("OD5P").textContent=(Number(document.getElementById("newidv").textContent)*0.0012).toFixed(2);
    }else if(age>=2.5 && age <3.5){
      document.getElementById("OD5P").textContent=(Number(document.getElementById("newidv").textContent)*0.0017).toFixed(2);
    }else if(age>=3.5 && age <4.5){
      document.getElementById("OD5P").textContent=(Number(document.getElementById("newidv").textContent)*0.0022).toFixed(2);
    }
  }
  else if(vtype.value=="PCV Taxi" || vtype.value=="PCV School Bus" || vtype.value=="PCV School Bus"){
    if(age<0.5){
      document.getElementById("OD5P").textContent=(Number(document.getElementById("newidv").textContent)*0.0015).toFixed(2);
    }
    else if(age>=0.5 && age<1.5){
      document.getElementById("OD5P").textContent=(Number(document.getElementById("newidv").textContent)*0.0020).toFixed(2);
    }
    else if(age>=1.5 && age <2.5){
      document.getElementById("OD5P").textContent=(Number(document.getElementById("newidv").textContent)*0.0026).toFixed(2);
    }
  }
}
function consumables(){
  console.log('insdie gcv');
  const jrsdate=new Date(rsdate.valueAsDate);
  const jrdate=new Date(rdate.valueAsDate);
  console.log(jrdate);
  console.log(jrsdate);
  const days=(jrsdate.getTime()-jrdate.getTime())/1000/60/60/24;
  var age;
  if(days<1460){
    age=days/365;
  }
  else{
    age=(days+1)/365.25;
  }
  if(vtype.value=="PvtCar" || vtype.value=="PvtCarS"||vtype.value=="2W" || vtype.value=="2WSS"){
    if(age<0.5){
      document.getElementById("OD6P").textContent=(Number(document.getElementById("newidv").textContent)*0.0010).toFixed(2);
    }
    else if(age>=0.5 && age<1.5){
      document.getElementById("OD6P").textContent=(Number(document.getElementById("newidv").textContent)*0.0012).toFixed(2);
    }
    else if(age >=1.5 && age<2.5){
      document.getElementById("OD6P").textContent=(Number(document.getElementById("newidv").textContent)*0.0015).toFixed(2);
    }
    else if(age>=2.5 && age<3.5){
      document.getElementById("OD6P").textContent=(Number(document.getElementById("newidv").textContent)*0.0017).toFixed(2);
    }
    else if(age>=3.5 && age<4.5){
      document.getElementById("OD6P").textContent=(Number(document.getElementById("newidv").textContent)*0.0020).toFixed(2);
    }
  }
  else{
    if(age<0.5){
      document.getElementById("OD6P").textContent=(Number(document.getElementById("newidv").textContent)*0.0015).toFixed(2);
    }
    else if(age>=0.5 && age<1.5){
      document.getElementById("OD6P").textContent=(Number(document.getElementById("newidv").textContent)*0.0018).toFixed(2);
    }
    else if(age >=1.5 && age<2.5){
      document.getElementById("OD6P").textContent=(Number(document.getElementById("newidv").textContent)*0.0022).toFixed(2);
    }
    else if(age>=2.5 && age<3.5){
      document.getElementById("OD6P").textContent=(Number(document.getElementById("newidv").textContent)*0.0025).toFixed(2);
    }
    else if(age>=3.5 && age<4.5){
      document.getElementById("OD6P").textContent=(Number(document.getElementById("newidv").textContent)*0.0030).toFixed(2);
    }
  }
}
function returnToInvoice(){
  console.log('insdie gcv');
  const jrsdate=new Date(rsdate.valueAsDate);
  const jrdate=new Date(rdate.valueAsDate);
  console.log(jrdate);
  console.log(jrsdate);
  const days=(jrsdate.getTime()-jrdate.getTime())/1000/60/60/24;
  var age;
  if(days<1460){
    age=days/365;
  }
  else{
    age=(days+1)/365.25;
  }
  if(vtype.value=="PvtCar" || vtype.value=="PvtCarS"||vtype.value=="2W" || vtype.value=="2WSS"||vtype.value=="GCV4" || vtype.value=="PCV Taxi"){
    if(age<0.5){
      document.getElementById("OD7P").textContent=(Number(document.getElementById("newidv").textContent)*0.0015).toFixed(2);
    }
    else if(age>=0.5 && age<1.5){
      document.getElementById("OD7P").textContent=(Number(document.getElementById("newidv").textContent)*0.0020).toFixed(2);
    }
    else if(age>=1.5 && age <2.5){
      document.getElementById("OD7P").textContent=(Number(document.getElementById("newidv").textContent)*0.0025).toFixed(2);
    }
  }
  else if(vtype.value=="MISC"){
    if(age<0.5){
      document.getElementById("OD7P").textContent=(Number(document.getElementById("newidv").textContent)*0.0010).toFixed(2);
    }
    else if(age>=0.5 && age<1.5){
      document.getElementById("OD7P").textContent=(Number(document.getElementById("newidv").textContent)*0.0015).toFixed(2);
    }
    else if(age>=1.5 && age <2.5){
      document.getElementById("OD7P").textContent=(Number(document.getElementById("newidv").textContent)*0.0020).toFixed(2);
    }
  }
  else if(vtype.value=="PCV Bus" || vtype.value=="PCV School Bus"){
    if(age<0.5){
      document.getElementById("OD7P").textContent=(Number(document.getElementById("newidv").textContent)*0.0020).toFixed(2);
    }
    else if(age>=0.5 && age<1.5){
      document.getElementById("OD7P").textContent=(Number(document.getElementById("newidv").textContent)*0.0025).toFixed(2);
    }
    else if(age>=1.5 && age <2.5){
      document.getElementById("OD7P").textContent=(Number(document.getElementById("newidv").textContent)*0.0030).toFixed(2);
    }
  }
    
}
/* ==================================================
   FUNCTION: resetPremiumAmount
====================================================
PURPOSE:
• Clears all OD & TP components
• Hides premium rows
• Prevents stale premium display
==================================================== */
function resetPremiumAmount(){
document.getElementById("OD3").style.display='none';
document.getElementById("OD4").style.display='none';
document.getElementById("OD5").style.display='none';
document.getElementById("OD6").style.display='none';
document.getElementById("OD7").style.display='none';
document.getElementById("OD8").style.display='none';
document.getElementById("OD9").style.display='none';
document.getElementById("OD10").style.display='none';
document.getElementById("OD11").style.display='none';
document.getElementById("OD12").style.display='none';
document.getElementById("OD13").style.display='none';
document.getElementById("OD14").style.display='none';
document.getElementById("OD15").style.display='none';
document.getElementById("OD16").style.display='none';
document.getElementById("OD17").style.display='none';
document.getElementById("OD18").style.display='none';
document.getElementById("OD19").style.display='none';
document.getElementById("OD20").style.display='none';
document.getElementById("Liability1").style.display='none';
document.getElementById("Liability2").style.display='none';
document.getElementById("Liability3").style.display='none';
document.getElementById("Liability4").style.display='none';
document.getElementById("Liability5").style.display='none';
document.getElementById("Liability6").style.display='none';
document.getElementById("Liability7").style.display='none';
document.getElementById("Liability8").style.display='none';
document.getElementById("Liability9").style.display='none';
document.getElementById("OD1P").textContent='';
document.getElementById("OD2P").textContent='';
document.getElementById("OD3P").textContent='0';
document.getElementById("OD4P").textContent='0';
document.getElementById("OD5P").textContent='0';
document.getElementById("OD6P").textContent='0';
document.getElementById("OD7P").textContent='0';
document.getElementById("OD8P").textContent='0';
document.getElementById("OD9P").textContent='0';
document.getElementById("OD10P").textContent='0';
document.getElementById("OD11P").textContent='0';
document.getElementById("OD12P").textContent='0';
document.getElementById("OD13P").textContent='0';
document.getElementById("OD14P").textContent='0';
document.getElementById("OD15P").textContent='0';
document.getElementById("OD16P").textContent='0';
document.getElementById("OD17P").textContent='0';
document.getElementById("OD18P").textContent='0';
document.getElementById("OD19P").textContent='0';
document.getElementById("OD20P").textContent='0';
document.getElementById("Liability1P").textContent='0';
document.getElementById("Liability2P").textContent='0';
document.getElementById("Liability3P").textContent='0';
document.getElementById("Liability4P").textContent='0';
document.getElementById("Liability5P").textContent='0';
document.getElementById("Liability6P").textContent='0';
document.getElementById("Liability7P").textContent='0';
document.getElementById("Liability8P").textContent='0';
document.getElementById("Liability9P").textContent='0';
tod.textContent='';
god.textContent='';
ttp.textContent='';
gttp.textContent='';
document.getElementById('rupees').textContent='';	
}
function saveAsImage() {
  const findEl = document.getElementById('container')
  html2canvas(findEl).then((canvas) => {
      const link = document.createElement('a')
      document.body.appendChild(link)
      link.download = document.getElementById('Pname').value+'_'+document.getElementById('regno').value+'_'+'Quote.jpg';
      link.href = canvas.toDataURL()
      link.click()
      link.remove()
  })
}

/* --------------------------------------------------
   EXPORT QUOTATION AS IMAGE
--------------------------------------------------
Used for agent sharing (WhatsApp / print)
-------------------------------------------------- */
function htmlAsImage(){
htmlToImage.toJpeg(document.getElementById('container'), { quality: 0.95,style:{background:"white"} })
  .then(function (dataUrl) {
    var link = document.createElement('a');
    link.download = document.getElementById('Pname').value+'_'+document.getElementById('regno').value+'_'+'Quote.jpg';
    link.href = dataUrl;
    link.click();
    
  });
}

/* --------------------------------------------------
   FUNCTION: evProtect
-----------------------------------------------------
Calculates EV Battery Protection premium
based on:
• EV / Hybrid type
• Vehicle age
-------------------------------------------------- */
function evProtect(){
  console.log('insdie gcv');
  const jrsdate=new Date(rsdate.valueAsDate);
  const jrdate=new Date(rdate.valueAsDate);
  console.log(jrdate);
  console.log(jrsdate);
  const days=(jrsdate.getTime()-jrdate.getTime())/1000/60/60/24;
  var age;
  if(days<1460){
    age=days/365;
  }
  else{
    age=(days+1)/365.25;
  }
  if(eTypeSelect.selectedIndex==1){
    if(age<0.5){
      OD18P.textContent=(Number(newidv.textContent)*0.0025).toFixed(2);
    }
    else if(age>=0.5 && age <1.5){
      OD18P.textContent=(Number(newidv.textContent)*0.0030).toFixed(2);
    }
    else if(age>=1.5 && age <2.5){
      OD18P.textContent=(Number(newidv.textContent)*0.0035).toFixed(2);
    }
    else if(age>=2.5 && age <3.5){
      OD18P.textContent=(Number(newidv.textContent)*0.004).toFixed(2);
    }
    else{
      OD18P.textContent=(Number(newidv.textContent)*0.005).toFixed(2);
    }
    
  }else if(eTypeSelect.selectedIndex==2){
    if(age<0.5){
      OD18P.textContent=(Number(newidv.textContent)*0.0015).toFixed(2);
    }
    else if(age>=0.5 && age <1.5){
      OD18P.textContent=(Number(newidv.textContent)*0.0020).toFixed(2);
    }
    else if(age>=1.5 && age <2.5){
      OD18P.textContent=(Number(newidv.textContent)*0.0025).toFixed(2);
    }
    else if(age>=2.5 && age <3.5){
      OD18P.textContent=(Number(newidv.textContent)*0.003).toFixed(2);
    }
    else{
      OD18P.textContent=(Number(newidv.textContent)*0.0035).toFixed(2);
    }
  }
}








