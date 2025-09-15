//console.log("hello");


const oldidv=document.getElementById("oldidv");
const dep=document.getElementById("dep");
const newidv=document.getElementById("newidv");
const rdate=document.getElementById("rdate");
const rsdate=document.getElementById("rsdate");
const zone=document.getElementById("zone");
const vtype=document.getElementById("vtype");
const gvw=document.getElementById("gvw");
const cc=document.getElementById("cc");
const nps=document.getElementById("nps");
const lld=document.getElementById("lld");
const rate=document.getElementById("rate");
const ND=document.getElementById("ND");
const EP=document.getElementById("EP");
const CM=document.getElementById("CM");
const RTI=document.getElementById("RTI");
const LK=document.getElementById("LK");
const EMP=document.getElementById("EMP");
const RSA=document.getElementById("RSA");
const LPG=document.getElementById("LPG");
const GE=document.getElementById("GE");
const tyreV=document.getElementById("tyreV");
const towingAmt=document.getElementById("towingAmt");
const OT=document.getElementById("OT");
const NP=document.getElementById("NP");
const imt23=document.getElementById("imt23");
const odd=document.getElementById("odd");
const paodch=document.getElementById("paodch");
const paodt=document.getElementById("paodt");
const ncbd=document.getElementById('ncbd');
const nopd=document.getElementById("nopd");
const csinopd=document.getElementById('csinopd');
const nopp=document.getElementById("nopp");
const csinopp=document.getElementById('csinopp');
const ELA=document.getElementById("ELA");
const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

// Example usage
const currentDate = new Date();
console.log(formatDate(currentDate));
rdate.setAttribute("max",formatDate(currentDate));
//console.log(formattedDate);
const OD1P=document.getElementById("OD1P");
const OD2P=document.getElementById("OD2P");
const OD3P=document.getElementById("OD3P");
const OD4P=document.getElementById("OD4P");
const OD5P=document.getElementById("OD5P");
const OD6P=document.getElementById("OD6P");
const OD7P=document.getElementById("OD7P");
const OD8P=document.getElementById("OD8P");
const OD9P=document.getElementById("OD9P");
const OD10P=document.getElementById("OD10P");
const OD11P=document.getElementById("OD11P");
const OD12P=document.getElementById("OD12P");
const OD13P=document.getElementById("OD13P");
const OD14P=document.getElementById("OD14P");
const OD15P=document.getElementById("OD15P");
const OD16P=document.getElementById("OD16P");
const OD17P=document.getElementById("OD17P");
const OD18P=document.getElementById("OD18P");
const OD19P=document.getElementById("OD19P");
const OD20P=document.getElementById("OD20P");
const Liability1P=document.getElementById("Liability1P");
const Liability2P=document.getElementById("Liability2P");
const Liability3P=document.getElementById("Liability3P");
const Liability4P=document.getElementById("Liability4P");
const Liability5P=document.getElementById("Liability5P");
const Liability6P=document.getElementById("Liability6P");
const Liability7P=document.getElementById("Liability7P");
const Liability8P=document.getElementById("Liability8P");
const Liability9P=document.getElementById("Liability9P");
const tod=document.getElementById('tod');
const god=document.getElementById('god');
const ttp=document.getElementById('ttp');
const gttp=document.getElementById('gttp');
const eTypeSelect=document.getElementById('eTypeSelect');
const EVP=document.getElementById("EVP");
const TrOD=document.getElementById('TrOD');
(function(){
  resetPremiumAmount();
})();


function gcvODRate(){
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
  console.log(age);
  switch(zone.value){
    case 'zoneb':
      if(age<5){
        rate.textContent=1.743;
      }else if(age>=5&&age<7){
        rate.textContent=1.787;
      }else{
        rate.textContent=1.830;
      }
      break;
      case 'zonec':
      if(age<5){
        rate.textContent=1.726;
      }else if(age>=5&&age<7){
        rate.textContent=1.770;
      }else{
        rate.textContent=1.812;
      }
      break;
      case 'zonea':
      if(age<5){
        rate.textContent=1.751;
      }else if(age>=5&&age<7){
        rate.textContent=1.795;
      }else{
        rate.textContent=1.839;
      }
      break;

}

}
function pvtCarODRate(){
  //console.log('insdie gcv');
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
  console.log(age);
  if(eTypeSelect.selectedIndex=='1'){
    switch (zone.value){
      case 'zoneb':
        if(age<5){
          rate.textContent=3.191;
        }else if(age>=5 && age<10){
          rate.textContent=3.351;
        }else{
          rate.textContent=3.430;
        }
        break;
      case 'zonec':
        if(age<5){
          rate.textContent=3.191;
        }else if(age>=5 && age<10){
          rate.textContent=3.351;
        }else{
          rate.textContent=3.430;
        }
        break;
      case 'zonea':
        if(age<5){
          rate.textContent=3.283;
        }else if(age>=5 && age<10){
          rate.textContent=3.447;
        }else{
          rate.textContent=3.529;
        }
        break;  

    }
    return;
  }
  switch(zone.value){
    case 'zoneb':
      if(age<5){
        if(cc.value<=1000)
         rate.textContent=3.039;
        else if(cc.value>1000 && cc.value<=1500)
          rate.textContent=3.191;
        else
          rate.textContent=3.343; 
      }else if(age>=5&&age<10){
        if(cc.value<=1000)
          rate.textContent=3.191;
         else if(cc.value>1000 && cc.value<=1500)
           rate.textContent=3.351;
         else
           rate.textContent=3.510; 
      }else{
        if(cc.value<=1000)
          rate.textContent=3.267;
         else if(cc.value>1000 && cc.value<=1500)
           rate.textContent=3.430;
         else
           rate.textContent=3.594; 
      }
      break;
      case 'zonec':
        if(age<5){
          if(cc.value<=1000)
           rate.textContent=3.039;
          else if(cc.value>1000 && cc.value<=1500)
            rate.textContent=3.191;
          else
            rate.textContent=3.343; 
        }else if(age>=5&&age<10){
          if(cc.value<=1000)
            rate.textContent=3.191;
           else if(cc.value>1000 && cc.value<=1500)
             rate.textContent=3.351;
           else
             rate.textContent=3.510; 
        }else{
          if(cc.value<=1000)
            rate.textContent=3.267;
           else if(cc.value>1000 && cc.value<=1500)
             rate.textContent=3.430;
           else
             rate.textContent=3.594; 
        }
      break;
      case 'zonea':
        if(age<5){
          if(cc.value<=1000)
           rate.textContent=3.127;
          else if(cc.value>1000 && cc.value<=1500)
            rate.textContent=3.283;
          else
            rate.textContent=3.440; 
        }else if(age>=5&&age<10){
          if(cc.value<=1000)
            rate.textContent=3.283;
           else if(cc.value>1000 && cc.value<=1500)
             rate.textContent=3.447;
           else
             rate.textContent=3.612; 
        }else{
          if(cc.value<=1000)
            rate.textContent=3.362;
           else if(cc.value>1000 && cc.value<=1500)
             rate.textContent=3.529;
           else
             rate.textContent=3.698; 
        }
      break;

}

}
function twoWheelerODRate(){
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
  console.log(age);
  if(eTypeSelect.selectedIndex==1){
    switch (zone.value){
      case 'zoneb':
        if(age<5){
          rate.textContent=1.760;
        }else if(age>=5 && age<10){
          rate.textContent=1.848;
        }else{
          rate.textContent=1.892;
        }
        break;
      case 'zonec':
        if(age<5){
          rate.textContent=1.760;
        }else if(age>=5 && age<10){
          rate.textContent=1.848;
        }else{
          rate.textContent=1.892;
        }
        break;
      case 'zonea':
        if(age<5){
          rate.textContent=1.793;
        }else if(age>=5 && age<10){
          rate.textContent=1.883;
        }else{
          rate.textContent=1.928;
        }
        break;  

    }
    return;
  }
  switch(zone.value){
    case 'zoneb':
      if(age<5){
        if(cc.value<=150)
         rate.textContent=1.676;
        else if(cc.value>150 && cc.value<=350)
          rate.textContent=1.760;
        else
          rate.textContent=1.844;
      }else if(age>=5&&age<10){
        if(cc.value<=150)
          rate.textContent=1.760;
         else if(cc.value>150 && cc.value<=350)
           rate.textContent=1.848;
         else
           rate.textContent=1.936; 
      }else{
        if(cc.value<=150)
          rate.textContent=1.802;
         else if(cc.value>150 && cc.value<=350)
           rate.textContent=1.892;
         else
           rate.textContent=1.982; 
      }
      break;
      case 'zonec':
        if(age<5){
          if(cc.value<=150)
           rate.textContent=1.676;
          else if(cc.value>150 && cc.value<=350)
            rate.textContent=1.760;
          else
            rate.textContent=1.844;
        }else if(age>=5&&age<10){
          if(cc.value<=150)
            rate.textContent=1.760;
           else if(cc.value>150 && cc.value<=350)
             rate.textContent=1.848;
           else
             rate.textContent=1.936; 
        }else{
          if(cc.value<=150)
            rate.textContent=1.802;
           else if(cc.value>150 && cc.value<=350)
             rate.textContent=1.892;
           else
             rate.textContent=1.982; 
        }
      break;
      case 'zonea':
        if(age<5){
          if(cc.value<=150)
           rate.textContent=1.708;
          else if(cc.value>150 && cc.value<=350)
            rate.textContent=1.793;
          else
            rate.textContent=1.879;
        }else if(age>=5&&age<10){
          if(cc.value<=150)
            rate.textContent=1.793;
           else if(cc.value>150 && cc.value<=350)
             rate.textContent=1.883;
           else
             rate.textContent=1.973; 
        }else{
          if(cc.value<=150)
            rate.textContent=1.836;
           else if(cc.value>150 && cc.value<=350)
             rate.textContent=1.928;
           else
             rate.textContent=2.020; 
        }
      break;

}

}
function taxiODRate(){
  console.log('insdie taxi');
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
  console.log(age);
  switch(zone.value){
    case 'zoneb':
      if(age<5){
        if(cc.value<=1000)
         rate.textContent=3.191;
        else if(cc.value>1000 && cc.value<=1500)
          rate.textContent=3.351;
        else
          rate.textContent=3.510; 
      }else if(age>=5&&age<7){
        if(cc.value<=1000)
          rate.textContent=3.271;
         else if(cc.value>1000 && cc.value<=1500)
           rate.textContent=3.435;
         else
           rate.textContent=3.598; 
      }else{
        if(cc.value<=1000)
          rate.textContent=3.351;
         else if(cc.value>1000 && cc.value<=1500)
           rate.textContent=3.519;
         else
           rate.textContent=3.686; 
      }
      break;
      case 'zonec':
        if(age<5){
          if(cc.value<=1000)
           rate.textContent=3.191;
          else if(cc.value>1000 && cc.value<=1500)
            rate.textContent=3.351;
          else
            rate.textContent=3.510; 
        }else if(age>=5&&age<7){
          if(cc.value<=1000)
            rate.textContent=3.271;
           else if(cc.value>1000 && cc.value<=1500)
             rate.textContent=3.435;
           else
             rate.textContent=3.598; 
        }else{
          if(cc.value<=1000)
            rate.textContent=3.351;
           else if(cc.value>1000 && cc.value<=1500)
             rate.textContent=3.519;
           else
             rate.textContent=3.686; 
        }
      break;
      case 'zonea':
        if(age<5){
          if(cc.value<=1000)
           rate.textContent=3.284;
          else if(cc.value>1000 && cc.value<=1500)
            rate.textContent=3.448;
          else
            rate.textContent=3.612; 
        }else if(age>=5&&age<7){
          if(cc.value<=1000)
            rate.textContent=3.366;
           else if(cc.value>1000 && cc.value<=1500)
             rate.textContent=3.534;
           else
             rate.textContent=3.703; 
        }else{
          if(cc.value<=1000)
            rate.textContent=3.448;
           else if(cc.value>1000 && cc.value<=1500)
             rate.textContent=3.620;
           else
             rate.textContent=3.793; 
        }
      break;

}
}
function pcvBusODRate(){
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
  console.log(age);
  switch(zone.value){
    case 'zoneb':
      if(age<5){
        rate.textContent=1.672;
      }else if(age>=5&&age<7){
        rate.textContent=1.714;
      }else{
        rate.textContent=1.756;
      }
      break;
      case 'zonec':
      if(age<5){
        rate.textContent=1.656;
      }else if(age>=5&&age<7){
        rate.textContent=1.697;
      }else{
        rate.textContent=1.739;
      }
      break;
      case 'zonea':
      if(age<5){
        rate.textContent=1.680;
      }else if(age>=5&&age<7){
        rate.textContent=1.722;
      }else{
        rate.textContent=1.764;
      }
      break;

}
}
function miscODRate(){
  console.log('insdie misc');
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
  console.log(age);
  switch(zone.value){
    case 'zoneb':
      if(age<5){
        rate.textContent=1.202;
      }else if(age>=5&&age<7){
        rate.textContent=1.232;
      }else{
        rate.textContent=1.262;
      }
      break;
      case 'zonec':
      if(age<5){
        rate.textContent=1.190;
      }else if(age>=5&&age<7){
        rate.textContent=1.220;
      }else{
        rate.textContent=1.250;
      }
      break;
      case 'zonea':
      if(age<5){
        rate.textContent=1.208;
      }else if(age>=5&&age<7){
        rate.textContent=1.238;
      }else{
        rate.textContent=1.268;
      }
      break;

}
}
function threegcvODRate(){
  console.log('insdie 3gcv');
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
  console.log(age);
  switch(zone.value){
    case 'zoneb':
      if(age<5){
        rate.textContent=1.656;
      }else if(age>=5&&age<7){
        rate.textContent=1.697;
      }else{
        rate.textContent=1.739;
      }
      break;
      case 'zonec':
      if(age<5){
        rate.textContent=1.640;
      }else if(age>=5&&age<7){
        rate.textContent=1.681;
      }else{
        rate.textContent=1.722;
      }
      break;
      case 'zonea':
      if(age<5){
        rate.textContent=1.664;
      }else if(age>=5&&age<7){
        rate.textContent=1.706;
      }else{
        rate.textContent=1.747;
      }
      break;
}
}
function threepcvODRate(){
  console.log('insdie 3pcv');
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
  console.log(age);
  switch(zone.value){
    case 'zoneb':
      if(age<5){
        rate.textContent=1.272;
      }else if(age>=5&&age<7){
        rate.textContent=1.304;
      }else{
        rate.textContent=1.336;
      }
      break;
      case 'zonec':
      if(age<5){
        rate.textContent=1.260;
      }else if(age>=5&&age<7){
        rate.textContent=1.292;
      }else{
        rate.textContent=1.323;
      }
      break;
      case 'zonea':
      if(age<5){
        rate.textContent=1.278;
      }else if(age>=5&&age<7){
        rate.textContent=1.310;
      }else{
        rate.textContent=1.342;
      }
      break;
}
}

rdate.addEventListener("change",function(){
  //console.log(rsdate.value);
  //console.log(typeof rsdate.value);
  const checkDate=new Date(rdate.value);
  cc.value=null;
  gvw.value=null;
  lld.value=null;
  nps.value=null;
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
  //document.getElementById('rupees').textContent
  if(!isNaN(checkDate.getTime())){
  resetAddon();
  checkAddonApplicable();
  resetPremiumAmount();
  basicODRate(rdate.value,rsdate.value,zone.value,vtype.value,gvw.value,cc.value,nps.value);
  		  
  console.log("Inside rdate event");
  }
  else{
    window.alert("Please Enter Valid Date");
    return;
  }
  
});
zone.addEventListener("change",function(){
  console.log(rsdate.value);
  console.log(typeof rsdate.value);
  basicODRate(rdate.value,rsdate.value,zone.value,vtype.value,gvw.value,cc.value,nps.value);
  console.log("Inside zone event");
	resetAddon();
  resetPremiumAmount();
  checkAddonApplicable();
  
});
gvw.addEventListener("input",function(){
  console.log(rsdate.value);
  console.log(typeof rsdate.value);
  basicODRate(rdate.value,rsdate.value,zone.value,vtype.value,gvw.value,cc.value,nps.value);
  console.log("Inside gvw event");
	resetPremiumAmount();
});
cc.addEventListener("input",function(){
  console.log(rsdate.value);
  console.log(typeof rsdate.value);
  basicODRate(rdate.value,rsdate.value,zone.value,vtype.value,gvw.value,cc.value,nps.value);
  console.log("Inside cc event");
	resetPremiumAmount();
});
vtype.addEventListener("input",function(){
  console.log(rsdate.value);
  console.log(typeof rsdate.value);
  cc.value=null;
  gvw.value=null;
  nps.value=null;
  rate.textContent='';
  newidv.textContent='';
  oldidv.value=null;
  dep.value=null;
  odd.value=null;
  lld.value=null;
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
 // document.getElementById('rupees').textContent
  
  console.log("back to vtype event");
  resetAddon();
  checkAddonApplicable();
  resetPremiumAmount();	
  basicODRate(rdate.value,rsdate.value,zone.value,vtype.value,gvw.value,cc.value,nps.value);	
});
eTypeSelect.addEventListener("input" ,function(){
  basicODRate(rdate.value,rsdate.value,zone.value,vtype.value,gvw.value,cc.value,nps.value);
  resetPremiumAmount();
  resetAddon();
  checkAddonApplicable();
});
nps.addEventListener("input",function(){
  //cc.value=null;
  gvw.value=null;
  
  //nps.value=null;
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
ND.addEventListener("change",function(){
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
  if(ND.checked){
    if(vtype.value=='GCV4' || vtype.value=='PCV Bus'||vtype.value=='PCV School Bus'||vtype.value=='MISC'){
      imt23.checked=true;
      imt23.disabled=true;
    }
    if(age>2.6 && (vtype.value=='GCV4' || vtype.value=='PCV Bus'||vtype.value=='PCV School Bus'||vtype.value=='MISC' || vtype.vlaue=='PCV Taxi'||vtype.value=='3GCV')){
      window.alert("NIL Dep is only applicable for commercial vehicle age greater than 2.6, if ncb is min 20% for renewal & 25% for rollover");
      if(ncbd.selectedIndex=='0'){
        ND.checked=false;
        imt23.disabled=false;
      }
    }
    if(age>4.6 && (vtype.value=='PvtCar'||vtype.value=='2W'||vtype.value=='2WSS'||vtype.value=='PvtCarS')){
      window.alert("NIL Dep is only applicable for age greater than 4.6, if ncb is min 20% for renewal & 25% for rollover");
      if(ncbd.selectedIndex=='0'){
        ND.checked=false;
      }
    }
  }
  else{
    if(vtype.value=='GCV4' || vtype.value=='PCV Bus'||vtype.value=='PCV School Bus'||vtype.value=='MISC'){
	  imt23.disabled=false;  
    }
	 
  }
});
ncbd.addEventListener("input",function(){
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
  if(ND.checked){
    if(age>2.6 && (vtype.value=='GCV4' || vtype.value=='PCV Bus'||vtype.value=='PCV School Bus'||vtype.value=='MISC' || vtype.vlaue=='PCV Taxi')){
      window.alert("NIL Dep is only applicable for commercial vehicle age greater than 2.6, if ncb is min 20% for renewal & 25% for rollover");
      if(ncbd.selectedIndex=='0'){
        ND.checked=false;
        imt23.disabled=false;
      }
    }
    if(age>4.6 && (vtype.value=='PvtCar'||vtype.value=='2W'||vtype.value=='2WSS'||vtype.value=='PvtCarS')){
      window.alert("NIL Dep is only applicable for age greater than 4.6, if ncb is min 20% for renewal & 25% for rollover");
      if(ncbd.selectedIndex=='0'){
        ND.checked=false;
      }
    }
  }
});




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
  //document.getElementById('rupees').textContent
  
  console.log("Inside rsdate event");
  resetAddon();
  checkAddonApplicable();
  basicODRate(rdate.value,rsdate.value,zone.value,vtype.value,gvw.value,cc.value,nps.value);	
});
oldidv.addEventListener("input",()=>{
  document.getElementById('rupees').textContent
  newidv.textContent=Number((Number(oldidv.value)*(100-Number(dep.value))/100).toFixed(0));
});
dep.addEventListener("input",()=>{
  document.getElementById('rupees').textContent
  newidv.textContent=Number((Number(oldidv.value)*(100-Number(dep.value))/100).toFixed(0));
});
function basicODRate(r_date,rs_date,zonetype,vehicleType,grossVW,cubicCap,nops){
  //console.log("Inside Basic OD");
  //console.log(grossVW);
  //console.log(vehicleType);

  if(r_date && rs_date){
      const tempDate=new Date(rdate.valueAsDate);
      const tempDate1=new Date();
      if(vehicleType=="GCV4"){
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
	      OT.disabled=true;
	      OT.checked=false;
        eTypeSelect.selectedIndex='0';
        eTypeSelect.disabled=true; 
        EVP.checked=false;
        EVP.disabled=true;     
        
        gvw.style.backgroundColor='rgb(240, 160, 160)';
        //gvw.focus();
        
        if(grossVW){
          console.log("yes");
          gcvODRate();
        }
        else{
          //window.alert("Please Enter Gross Vehicle Weight");
          
        }
      }
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
        //eTypeSelect.selectedIndex='0';
        //eTypeSelect.disabled=true; 
        EVP.checked=false;
        EVP.disabled=true;
        eTypeSelect.disabled=false;
        eTypeSelect.options[2].disabled=true;
        //gvw.style.backgroundColor='rgb(240, 160, 160)';     
        threegcvODRate();
        
      }
      else if(vehicleType=='3PCV'){
        lld.disabled=false;
        paodch.checked=false;
        paodch.disabled=false;
        paodt.selectedIndex='0';
        paodt.disabled=true;
        imt23.disabled=false;
        imt23.checked=false;
        cc.value=null;
        //nps.value=null;
        cc.disabled=true;
        nps.disabled=false; //madatory field enabled
        nps.style.backgroundColor='rgb(240, 160, 160)'; //mandatory field highlight
        cc.style.backgroundColor='white';
        //nps.style.backgroundColor='white';
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
        //eTypeSelect.selectedIndex='0';
        eTypeSelect.disabled=true; 
        EVP.checked=false;
        EVP.disabled=true;
        eTypeSelect.disabled=false;
        eTypeSelect.options[2].disabled=true;
        //gvw.style.backgroundColor='rgb(240, 160, 160)';     
        threepcvODRate();
        
      }
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
        //cc.focus();
        cc.style.backgroundColor='rgb(240, 160, 160)';
          if(cubicCap){
            pvtCarODRate();
          }else{
            //window.alert("Please Enter Cubic Capacity");
          }
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
        //cc.value=null;
        //cc.focus();
        cc.style.backgroundColor='rgb(240, 160, 160)';
        if(cubicCap){
          twoWheelerODRate();
        }
        else{
          //window.alert("Please Enter Cubic Capacity");
        }
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
        //cc.value=null;
       // nps.value=null;
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
function basicODPremium(){
  if(vtype.value=="PvtCar" ||vtype.value=="PvtCarS" ||vtype.value=="2W"||vtype.value=="2wss"){
		if(cc.value==null){
			window.alert("Cubic Capacity is a Manadatory Input For Calculation of Premium");
			return false;
		}
		else{
			document.getElementById("OD1P").textContent=((Number(rate.textContent)*Number(newidv.textContent))/100).toFixed(2);
			return true;
		}
	}else if(vtype.value=="GCV4"){
		if(gvw.value==null){
			window.alert("Gross Vehicle Weight is a Manadatory Input For Calculation of Premium");
			return false;
		}
		else{
			if(gvw.value<=12000){
				document.getElementById("OD1P").textContent=((Number(rate.textContent)*Number(newidv.textContent))/100).toFixed(2);
				return true;
			}
			else{
				document.getElementById("OD1P").textContent=(((Number(rate.textContent)*Number(newidv.textContent))/100)+(gvw.value-12000)*0.27).toFixed(2);
				return true;
			}
		}
	}else if(vtype.value=="PCV Taxi"){
		if(cc.value==null || nps.value==null || nps.value>6){
			window.alert("Cubic Capacity and No Of passengers(Less Than 7) are required Field For Taxi");
			return false;
		}else{
			document.getElementById("OD1P").textContent=((Number(rate.textContent)*Number(newidv.textContent))/100).toFixed(2);
			return true;
		}
	}else if(vtype.value=="PCV Bus" || vtype.value=="PCV School Bus"){
		if(nps.value==null || nps.value<=6){
			window.alert("Number of Passengers Must Be Greater Than 6");
			return false;
		}
		else{
			if(nps.value>=7 && nps.value<=18){
				document.getElementById("OD1P").textContent=(((Number(rate.textContent)*Number(newidv.textContent))/100)+350).toFixed(2);
				return true;
			}
			else if(nps.value>=19 && nps.value<=36){
				document.getElementById("OD1P").textContent=(((Number(rate.textContent)*Number(newidv.textContent))/100)+450).toFixed(2);
				return true;
			}
			else if(nps.value>=37 && nps.value<=60){
				document.getElementById("OD1P").textContent=(((Number(rate.textContent)*Number(newidv.textContent))/100)+550).toFixed(2);
				return true;
			}
			else{
				document.getElementById("OD1P").textContent=(((Number(rate.textContent)*Number(newidv.textContent))/100)+680).toFixed(2);
				return true;
			}
		}
	}else{
		document.getElementById("OD1P").textContent=((Number(rate.textContent)*Number(newidv.textContent))/100).toFixed(2);
		return true;
	}
}

function basicTP(){
  const today1=new Date();
	const reg_date=new Date(rdate.valueAsDate)
  console.log(today1.setHours(0,0,0,0));
  console.log(reg_date.setHours(0,0,0,0));
  console.log("basicTP");
	if(vtype.value=="GCV4"){
    if(LPG.checked){
      document.getElementById("Liability8P").textContent=60;
      document.getElementById('Liability8').style.display='flex';
    }
    if(TrOD.value){
      document.getElementById('Liability9').style.display='flex';
      document.getElementById("Liability9P").textContent=2485;
    }
    if(GE.checked){
      document.getElementById("Liability7P").textContent=100;
      document.getElementById('Liability7').style.display='flex';
    }
    if(nopd.value){
      if(csinopd.selectedIndex=='1'){
        document.getElementById("Liability5P").textContent=nopd.value*60;
        document.getElementById('Liability5').style.display='flex';
      }
      else{
        document.getElementById("Liability5P").textContent=nopd.value*120;
        document.getElementById('Liability5').style.display='flex';
      }
    }
    document.getElementById('Liability1').style.display='flex';
		if(gvw.value<=7500){
			document.getElementById("Liability1P").textContent=16049;
		}
		else if(gvw.value>7500 && gvw.value<=12000){
			document.getElementById("Liability1P").textContent=27186;	
		}
		else if(gvw.value>12000 && gvw.value<=20000){
			document.getElementById("Liability1P").textContent=35313;
		}
		else if(gvw.value>20000 && gvw.value<=40000){
			document.getElementById("Liability1P").textContent=43950;
		}
		else{
			document.getElementById("Liability1P").textContent=44242;
		}
	}
  else if(vtype.value=='3GCV'){
    if(eTypeSelect.selectedIndex=='0'){
    if(LPG.checked){
      document.getElementById("Liability8P").textContent=60;
      document.getElementById('Liability8').style.display='flex';
    }
    if(GE.checked){
      document.getElementById("Liability7P").textContent=100;
      document.getElementById('Liability7').style.display='flex';
    }
    if(nopd.value){
      if(csinopd.selectedIndex=='1'){
        document.getElementById("Liability5P").textContent=nopd.value*60;
        document.getElementById('Liability5').style.display='flex';
      }
      else{
        document.getElementById("Liability5P").textContent=nopd.value*120;
        document.getElementById('Liability5').style.display='flex';
      }
    }
    document.getElementById('Liability1').style.display='flex';
    document.getElementById("Liability1P").textContent=4492;
  }
  else{
    if(LPG.checked){
      document.getElementById("Liability8P").textContent=60;
      document.getElementById('Liability8').style.display='flex';
    }
    if(GE.checked){
      document.getElementById("Liability7P").textContent=100;
      document.getElementById('Liability7').style.display='flex';
    }
    if(nopd.value){
      if(csinopd.selectedIndex=='1'){
        document.getElementById("Liability5P").textContent=nopd.value*60;
        document.getElementById('Liability5').style.display='flex';
      }
      else{
        document.getElementById("Liability5P").textContent=nopd.value*120;
        document.getElementById('Liability5').style.display='flex';
      }
    }
    document.getElementById('Liability1').style.display='flex';
    document.getElementById("Liability1P").textContent=3139;
  }
  }
  else if(vtype.value=='3PCV'){
    if(eTypeSelect.selectedIndex=='0'){
      if(LPG.checked){
        document.getElementById("Liability8P").textContent=60;
        document.getElementById('Liability8').style.display='flex';
      }
      if(GE.checked){
        document.getElementById("Liability7P").textContent=100;
        document.getElementById('Liability7').style.display='flex';
      }
      if(nopd.value){
        if(csinopd.selectedIndex=='1'){
          document.getElementById("Liability5P").textContent=nopd.value*60;
          document.getElementById('Liability5').style.display='flex';
        }
        else{
          document.getElementById("Liability5P").textContent=nopd.value*120;
          document.getElementById('Liability5').style.display='flex';
        }
      }
      document.getElementById('Liability1').style.display='flex';
      document.getElementById('Liability2').style.display='flex';
      document.getElementById("Liability1P").textContent=2371;
      document.getElementById("Liability2P").textContent=nps.value*1134;
    }
    else{
      document.getElementById('Liability1').style.display='flex';
      document.getElementById('Liability2').style.display='flex';
      document.getElementById("Liability1P").textContent=1539;
      document.getElementById("Liability2P").textContent=nps.value*737;

    }  
  }
	else if(vtype.value=="PCV Bus"){
    if(LPG.checked){
      document.getElementById("Liability8P").textContent=60;
      document.getElementById('Liability8').style.display='flex';
    }
    if(GE.checked){
      document.getElementById("Liability7P").textContent=100;
      document.getElementById('Liability7').style.display='flex';
    }
    if(nopd.value){
      if(csinopd.selectedIndex=='1'){
        document.getElementById("Liability5P").textContent=nopd.value*60;
        document.getElementById('Liability5').style.display='flex';
      }
      else{
        document.getElementById("Liability5P").textContent=nopd.value*120;
        document.getElementById('Liability5').style.display='flex';
      }
    }  
    document.getElementById('Liability1').style.display='flex';
    document.getElementById('Liability2').style.display='flex';
		document.getElementById("Liability1P").textContent=14343;
		document.getElementById("Liability2P").textContent=nps.value*877;
	}
	else if(vtype.value=="PCV School Bus"){
    if(LPG.checked){
      document.getElementById("Liability8P").textContent=60;
      document.getElementById('Liability8').style.display='flex';
    }
    if(GE.checked){
      document.getElementById("Liability7P").textContent=100;
      document.getElementById('Liability7').style.display='flex';
    }
    if(nopd.value){
      if(csinopd.selectedIndex=='1'){
        document.getElementById("Liability5P").textContent=nopd.value*60;
        document.getElementById('Liability5').style.display='flex';
      }
      else{
        document.getElementById("Liability5P").textContent=nopd.value*120;
        document.getElementById('Liability5').style.display='flex';
      }
    }  
    document.getElementById('Liability1').style.display='flex';
    document.getElementById('Liability2').style.display='flex';
		document.getElementById("Liability1P").textContent=12192;
		document.getElementById("Liability2P").textContent=nps.value*745;
	}
	else if(vtype.value=="MISC"){
    if(LPG.checked){
      document.getElementById("Liability8P").textContent=60;
      document.getElementById('Liability8').style.display='flex';
    }
    if(TrOD.value){
      document.getElementById('Liability9').style.display='flex';
      document.getElementById('Liability9P').textContent=2485;
    }
    if(GE.checked){
      document.getElementById("Liability7P").textContent=100;
      document.getElementById('Liability7').style.display='flex';
    }
    if(nopd.value){
      if(csinopd.selectedIndex=='1'){
        document.getElementById("Liability5P").textContent=nopd.value*60;
        document.getElementById('Liability5').style.display='flex';
      }
      else{
        document.getElementById("Liability5P").textContent=nopd.value*120;
        document.getElementById('Liability5').style.display='flex';
      }
    }  
    document.getElementById('Liability1').style.display='flex';
		document.getElementById("Liability1P").textContent=7267;
	}
	else if(vtype.value=="PCV Taxi"){
    if(LPG.checked){
      document.getElementById("Liability8P").textContent=60;
      document.getElementById('Liability8').style.display='flex';
    }
    if(GE.checked){
      document.getElementById("Liability7P").textContent=100;
      document.getElementById('Liability7').style.display='flex';
    }
    if(nopd.value){
      if(csinopd.selectedIndex=='1'){
        document.getElementById("Liability5P").textContent=nopd.value*60;
        document.getElementById('Liability5').style.display='flex';
      }
      else{
        document.getElementById("Liability5P").textContent=nopd.value*120;
        document.getElementById('Liability5').style.display='flex';
      }
    }  
    document.getElementById('Liability1').style.display='flex';
    document.getElementById('Liability2').style.display='flex';
		if(cc.value<=1000){
			document.getElementById("Liability1P").textContent=6040;
			document.getElementById("Liability2P").textContent=nps.value*1162;
		}
		else if(cc.value>1000 && cc.value<=1500){
			document.getElementById("Liability1P").textContent=7940;
			document.getElementById("Liability2P").textContent=nps.value*978;
		}
		else{
			document.getElementById("Liability1P").textContent=10523;
			document.getElementById("Liability2P").textContent=nps.value*1117;
		}
	}else if(vtype.value=="PvtCar"){
    document.getElementById('Liability1').style.display='flex';
		if(today1.setHours(0,0,0,0)==reg_date.setHours(0,0,0,0)){
			if(eTypeSelect.selectedIndex=='0'){
        if(cc.value<=1000){
          document.getElementById("Liability1P").textContent=6521;
        }
        else if(cc.value>1000 && cc.value<=1500){
          document.getElementById("Liability1P").textContent=10640;
        }
        else{
          document.getElementById("Liability1P").textContent=24596;
        }
      }else if(eTypeSelect.selectedIndex=='1'){
        if(cc.value<=30){
          document.getElementById("Liability1P").textContent=Math.round(6521*0.85);
        }
        else if(cc.value>30 && cc.value<=65){
          document.getElementById("Liability1P").textContent=Math.round(10640*0.85);
        }
        else{
          document.getElementById("Liability1P").textContent=Math.round(24596*0.85);
        }
      }else{
        if(cc.value<=1000){
          document.getElementById("Liability1P").textContent=Math.round(6521*0.925);
        }
        else if(cc.value>1000 && cc.value<=1500){
          document.getElementById("Liability1P").textContent=Math.round(10640*0.925);
        }
        else{
          document.getElementById("Liability1P").textContent=Math.round(24596*0.925);
        }
      }  
      if(LPG.checked){
        document.getElementById("Liability8P").textContent=60*3;
        document.getElementById('Liability8').style.display='flex';
      }
      if(GE.checked){
        document.getElementById("Liability7P").textContent=100*3;
        document.getElementById('Liability7').style.display='flex';
      }
      if(nopd.value){
        if(csinopd.selectedIndex=='1'){
          document.getElementById("Liability5P").textContent=nopd.value*50*3;
          document.getElementById('Liability5').style.display='flex';
        }
        else{
          document.getElementById("Liability5P").textContent=nopd.value*100*3;
          document.getElementById('Liability5').style.display='flex';
        }
      }
      if(nopp.value){
        if(csinopp.selectedIndex=='1'){
          document.getElementById("Liability6P").textContent=nopp.value*50*3;
          document.getElementById('Liability6').style.display='flex';
        }
        else{
          document.getElementById("Liability6P").textContent=nopp.value*100*3;
          document.getElementById('Liability6').style.display='flex';
        }
      }    
		}else{
      if(LPG.checked){
        document.getElementById("Liability8P").textContent=60;
        document.getElementById('Liability8').style.display='flex';
      }
      if(GE.checked){
        document.getElementById("Liability7P").textContent=100;
        document.getElementById('Liability7').style.display='flex';
      }
      if(nopd.value){
        if(csinopd.selectedIndex=='1'){
          document.getElementById("Liability5P").textContent=nopd.value*50;
          document.getElementById('Liability5').style.display='flex';
        }
        else{
          document.getElementById("Liability5P").textContent=nopd.value*100;
          document.getElementById('Liability5').style.display='flex';
        }
      }
      if(nopp.value){
        if(csinopp.selectedIndex=='1'){
          document.getElementById("Liability6P").textContent=nopp.value*50;
          document.getElementById('Liability6').style.display='flex';
        }
        else{
          document.getElementById("Liability6P").textContent=nopp.value*100;
          document.getElementById('Liability6').style.display='flex';
        }
      }
      if(eTypeSelect.selectedIndex==0){
        if(cc.value<=1000){
          document.getElementById("Liability1P").textContent=2094;
        }
        else if(cc.value>1000 && cc.value<=1500){
          document.getElementById("Liability1P").textContent=3416;
        }
        else{
          document.getElementById("Liability1P").textContent=7897;
        }
      }else if(eTypeSelect.selectedIndex==1){
        if(cc.value<=30){
          document.getElementById("Liability1P").textContent=Math.round(2094*0.85);
        }
        else if(cc.value>30 && cc.value<=65){
          document.getElementById("Liability1P").textContent=Math.round(3416*0.85);
        }
        else{
          document.getElementById("Liability1P").textContent=Math.round(7897*0.85);
        }
      }else{
        if(cc.value<=1000){
          document.getElementById("Liability1P").textContent=Math.round(2094*0.925);
        }
        else if(cc.value>1000 && cc.value<=1500){
          document.getElementById("Liability1P").textContent=Math.round(3416*0.925);
        }
        else{
          document.getElementById("Liability1P").textContent=Math.round(7897*0.925);
        }
      }   
      
		}
	}else if(vtype.value=="2W"){
    document.getElementById('Liability1').style.display='flex';
		if(today1.setHours(0,0,0,0)==reg_date.setHours(0,0,0,0)){
			if(eTypeSelect.selectedIndex==0 || eTypeSelect.selectedIndex==2){
        if(cc.value<=75){
          document.getElementById("Liability1P").textContent=2901;
        }
        else if(cc.value>75 && cc.value<=150){
          document.getElementById("Liability1P").textContent=3851;
        }
        else if(cc.value>150 && cc.value<=350){
          document.getElementById("Liability1P").textContent=7365;
        }
        else{
          document.getElementById("Liability1P").textContent=15117;
        }
      }else{
        if(cc.value<=3){
          document.getElementById("Liability1P").textContent=Math.round(2901*0.85);
        }
        else if(cc.value>3 && cc.value<=7){
          document.getElementById("Liability1P").textContent=Math.round(3851*0.85);
        }
        else if(cc.value>7 && cc.value<=16){
          document.getElementById("Liability1P").textContent=Math.round(7365*0.85);
        }
        else{
          document.getElementById("Liability1P").textContent=Math.round(15117*0.85);
        }
      }
      if(LPG.checked){
        document.getElementById("Liability8P").textContent=60*5;
        document.getElementById('Liability8').style.display='flex';
      }
      if(GE.checked){
        document.getElementById("Liability7P").textContent=100*5;
        document.getElementById('Liability7').style.display='flex';
      }
      if(nopd.value){
        if(csinopd.selectedIndex=='1'){
          document.getElementById("Liability5P").textContent=nopd.value*70*5;
          document.getElementById('Liability5').style.display='flex';
        }
        else{
          document.getElementById("Liability5P").textContent=nopd.value*140*5;
          document.getElementById('Liability5').style.display='flex';
        }
      }
      if(nopp.value){
        if(csinopp.selectedIndex=='1'){
          document.getElementById("Liability6P").textContent=nopp.value*50*5;
          document.getElementById('Liability6').style.display='flex';
        }
        else{
          document.getElementById("Liability6P").textContent=nopp.value*100*5;
          document.getElementById('Liability6').style.display='flex';
        }
      }  
		}    
		else
    {
      if(LPG.checked){
        document.getElementById("Liability8P").textContent=60;
        document.getElementById('Liability8').style.display='flex';
      }
      if(GE.checked){
        document.getElementById("Liability7P").textContent=100;
        document.getElementById('Liability7').style.display='flex';
      }
      if(nopd.value){
        if(csinopd.selectedIndex=='1'){
          document.getElementById("Liability5P").textContent=nopd.value*70;
          document.getElementById('Liability5').style.display='flex';
        }
        else{
          document.getElementById("Liability5P").textContent=nopd.value*140;
          document.getElementById('Liability5').style.display='flex';
        }
      }
      if(nopp.value){
        if(csinopp.selectedIndex=='1'){
          document.getElementById("Liability6P").textContent=nopp.value*50;
          document.getElementById('Liability6').style.display='flex';
        }
        else{
          document.getElementById("Liability6P").textContent=nopp.value*100;
          document.getElementById('Liability6').style.display='flex';
        }
      }  
      if(eTypeSelect.selectedIndex==0||eTypeSelect.selectedIndex==2){
        if(cc.value<=75){
          document.getElementById("Liability1P").textContent=538;
        }
        else if(cc.value>75 && cc.value<=150){
          document.getElementById("Liability1P").textContent=714;
        }
        else if(cc.value>150 && cc.value<=350){
          document.getElementById("Liability1P").textContent=1366;
        }
        else{
          document.getElementById("Liability1P").textContent=2804;
        }
      }else{
        if(cc.value<=3){
          document.getElementById("Liability1P").textContent=Math.round(538*0.85);
        }
        else if(cc.value>3 && cc.value<=7){
          document.getElementById("Liability1P").textContent=Math.round(714*0.85);
        }
        else if(cc.value>7 && cc.value<=16){
          document.getElementById("Liability1P").textContent=Math.round(1366*0.85);
        }
        else{
          document.getElementById("Liability1P").textContent=Math.round(2804*0.85);
        }
      } 
			
		}
	}
}
function totalAmount(){
  const jrdate=new Date(rdate.valueAsDate);
  var presentDate=new Date();
  resetPremiumAmount();
  if(rate.textContent!=''&& newidv.textContent!='' && basicODPremium()){
    basicTP();
    if(odd.value!=null){
      OD2P.textContent=((Number(OD1P.textContent)*odd.value)/(-100)).toFixed(2);
    }
    if(ELA.value){
      document.getElementById("OD19").style.display='flex';
      OD19P.textContent=((ELA.value*0.04)*(1-Number(odd.value)/100)).toFixed(2);
    }
    if(TrOD.value){
      document.getElementById("OD20").style.display='flex';
      OD20P.textContent=((TrOD.value*0.0105)*(1-Number(odd.value)/100)).toFixed(2);
    }
    if(imt23.checked){
      OD3P.textContent=((Number(OD1P.textContent)+Number(OD2P.textContent)+Number(OD19P.textContent)+Number(OD20P.textContent))*0.15).toFixed(2);
      document.getElementById('OD3').style.display='flex';
    }
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
    if(lld.value!=null && lld.value!='' && lld.value!='0'){
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
    if(ND.checked){
      nilDep();
      if(OD4P.textContent!=''){
        document.getElementById('OD4').style.display='flex';
      }
    }
    if(EP.checked){
      engineProtect();
      if(OD5P.textContent!=''){
        document.getElementById('OD5').style.display='flex';
      }
    }
    if(CM.checked){
      consumables();
      if(OD6P.textContent!=''){
        document.getElementById('OD6').style.display='flex';
      }
    }
    if(RTI.checked){
      returnToInvoice();
      if(OD7P.textContent!=''){
        document.getElementById('OD7').style.display='flex';
      }
    }
    if(LK.checked){
      if(vtype.value=="2W"){
        OD8P.textContent=50;
        document.getElementById('OD8').style.display='flex';

      }else{
        OD8P.textContent=750;
        document.getElementById('OD8').style.display='flex';
      }
    }
    if(EMP.value){
      //OD9P.textContent=1500;
      document.getElementById('OD9').style.display='flex';
      if(vtype.value=='2W' || vtype.value=='2WSS'){
        OD9P.textContent=(Number(EMP.value)*0.02).toFixed(2);
      }else if(vtype.value=="PCV Taxi" || vtype.value=='PvtCar'||vtype.value=='PvtCarS'){
        OD9P.textContent=(Number(EMP.value)*0.066).toFixed(2);
      }else{
        OD9P.textContent=(Number(EMP.value)*0.03).toFixed(2);
      }
    }
    if(RSA.checked){
      if(vtype.value=='2W' || vtype.value=='2WSS'){
        OD10P.textContent=25;
        document.getElementById('OD10').style.display='flex';
      }else if(vtype.value=='PvtCar' || vtype.value=='PvtCarS'){
        OD10P.textContent=50;
        document.getElementById('OD10').style.display='flex';
      }else if(vtype.value=="PCV Taxi"){
        OD10P.textContent=75;
        document.getElementById('OD10').style.display='flex';
      }else if(vtype.value=="GCV4"){
        OD10P.textContent=200;
        document.getElementById('OD10').style.display='flex';
      }
    }if(tyreV.selectedIndex!='0'){
      document.getElementById('OD11').style.display='flex';
      switch(tyreV.selectedIndex){
        case 1:
          OD11P.textContent=1000;
          break;
        case 2:
          OD11P.textContent=2000;
          break;
        case 3:
          OD11P.textContent=4000;
          break;
        case 4:
          OD11P.textContent=8000;
      }
    }if(NP.checked){
      document.getElementById('OD12').style.display='flex';
      if(vtype.value=='PvtCar'||vtype.value=='PvtCarS'){
        OD12P.textContent=(Number(newidv.textContent)*0.0015).toFixed(2);
      }else{
        OD12P.textContent=(Number(newidv.textContent)*0.0024).toFixed(2);
      }
    }
    if(GE.checked){
      OD13P.textContent=400;
      document.getElementById('OD13').style.display='flex';
    }
    if(LPG.checked){
      OD14P.textContent=((Number(OD1P.textContent)+Number(OD2P.textContent))*0.05).toFixed(2);
      document.getElementById('OD14').style.display='flex';
    }
    if(OT.checked){
      OD15P.textContent=(Number(newidv.textContent)*0.005).toFixed(2);
      document.getElementById('OD15').style.display='flex';
    }
    if(towingAmt.value!='' && towingAmt.value!=null && towingAmt.value!='0'){
      document.getElementById('OD16').style.display='flex';
      if(towingAmt.value<=10000){
        OD16P.textContent=towingAmt.value*0.05;
      }else{
        OD16P.textContent=towingAmt.value*0.075;
      }
    }if(ncbd.selectedIndex!='0'){
      document.getElementById('OD17').style.display='flex';
      if(!ND.checked && !LPG.checked){
        OD17P.textContent=(((Number(OD1P.textContent)+Number(OD2P.textContent)+Number(OD3P.textContent)+Number(OD15P.textContent)+Number(OD19P.textContent)+Number(OD20P.textContent))*Number(ncbd.value))/100).toFixed(2)*-1;
      }else if(ND.checked && !LPG.checked){
        OD17P.textContent=(((Number(OD1P.textContent)+Number(OD2P.textContent)+Number(OD3P.textContent)+Number(OD4P.textContent)+Number(OD15P.textContent)+Number(OD19P.textContent)+Number(OD20P.textContent))*Number(ncbd.value))/100).toFixed(2)*-1;
      }else if(!ND.checked && LPG.checked){
        OD17P.textContent=(((Number(OD1P.textContent)+Number(OD2P.textContent)+Number(OD3P.textContent)+Number(OD14P.textContent)+Number(OD15P.textContent)+Number(OD19P.textContent)+Number(OD20P.textContent))*Number(ncbd.value))/100).toFixed(2)*-1;
      }else if(ND.checked && LPG.checked){
        OD17P.textContent=(((Number(OD1P.textContent)+Number(OD2P.textContent)+Number(OD3P.textContent)+Number(OD4P.textContent)+Number(OD14P.textContent)+Number(OD15P.textContent)+Number(OD19P.textContent)+Number(OD20P.textContent))*Number(ncbd.value))/100).toFixed(2)*-1;
      }
    }
    if(EVP.checked){
      if(eTypeSelect.selectedIndex==1 || eTypeSelect.selectedIndex==2){
        evProtect();
        document.getElementById("OD18").style.display='flex';
      }
    }
    
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
      ((Number(Liability1P.textContent)*0.12)+(Number(Liability2P.textContent)+Number(Liability3P.textContent)+Number(Liability4P.textContent)+
      Number(Liability5P.textContent)+Number(Liability6P.textContent)+Number(Liability7P.textContent)+Number(Liability8P.textContent)+Number(Liability9P.textContent))*0.18).toFixed(2);
      document.getElementById('rupees').textContent=Math.ceil(Number(tod.textContent)+Number(god.textContent)+Number(ttp.textContent)+Number(gttp.textContent)+1);
      //document.getElementById('rupees').style.fontSize='18px';
    }
    if(vtype.value!='GCV4' && vtype.value!='3GCV'){
      tod.textContent=
      (Number(OD1P.textContent)+Number(OD2P.textContent)+Number(OD3P.textContent)+Number(OD4P.textContent)+Number(OD5P.textContent)
      +Number(OD6P.textContent)+Number(OD7P.textContent)+Number(OD8P.textContent)+Number(OD9P.textContent)+Number(OD10P.textContent)
      +Number(OD11P.textContent)+Number(OD12P.textContent)+Number(OD13P.textContent)+Number(OD14P.textContent)+Number(OD15P.textContent)
      +Number(OD16P.textContent)+Number(OD17P.textContent)+Number(OD18P.textContent)+Number(OD19P.textContent)
      ).toFixed(0);
      god.textContent=(Number(tod.textContent)*0.18).toFixed(2);
      ttp.textContent=
      (Number(Liability1P.textContent)+Number(Liability2P.textContent)+Number(Liability3P.textContent)+Number(Liability4P.textContent)+
      Number(Liability5P.textContent)+Number(Liability6P.textContent)+Number(Liability7P.textContent)+Number(Liability8P.textContent)+Number(Liability9P.textContent)).toFixed(0);
      gttp.textContent=(Number(ttp.textContent)*0.18).toFixed(2);
      document.getElementById('rupees').textContent=Math.ceil(Number(tod.textContent)+Number(god.textContent)+Number(ttp.textContent)+Number(gttp.textContent)+1);
      //document.getElementById('rupees').style.fontSize='18px';
    }

  }  
  else{
    window.alert("Mandatory Fields Are Missing");
  }
}
function checkAddonApplicable(){
  const jrsdate=new Date(rsdate.valueAsDate);
  const jrdate=new Date(rdate.valueAsDate);
  console.log("insdie check add on");
   
  const days=(jrsdate.getTime()-jrdate.getTime())/1000/60/60/24;
  var age=0;
  //console.log(days);
  if(days<1460){
    age=days/365;
    //console.log(age);
  }
  else{
    age=(days+1)/365.25;
    console.log(age);
  }
  if(rdate.valueAsDate && rsdate.valueAsDate){
    
    if(vtype.value=='GCV4'){
      console.log(days);
      if(age>=2.5&&age<=4.5){
        ND.disabled=false;
        CM.disabled=false;
        EMP.disabled=false;
        RSA.disabled=false;
        towingAmt.disabled=false;
        TrOD.disabled=false;
      }
      else if(age>4.5){
        towingAmt.disabled=false;
        EMP.disabled=false;
        RSA.disabled=false;
        TrOD.disabled=false;
      }else{
        ND.disabled=false;
        CM.disabled=false;
        EMP.disabled=false;
        RSA.disabled=false;
        towingAmt.disabled=false;
        RTI.disabled=false;
        TrOD.disabled=false;
      }
    }
    else if(vtype.value=='3GCV'|| vtype.value=='3PCV'){
      if(age>=2.5&&age<=4.5){
        ND.disabled=false;
        CM.disabled=false;
        EMP.disabled=false;
        RSA.disabled=false;
        towingAmt.disabled=true;
        TrOD.disabled=true;
      }
      else if(age>4.5){
        towingAmt.disabled=false;
        EMP.disabled=false;
        RSA.disabled=false;
        TrOD.disabled=true;
      }else{
        ND.disabled=false;
        CM.disabled=false;
        EMP.disabled=false;
        RSA.disabled=false;
        towingAmt.disabled=true;
        RTI.disabled=false;
        TrOD.disabled=true;
      }
    }
    else if(vtype.value=="PvtCar" || vtype.value=="PvtCarS"){
      console.log(age);
      console.log(typeof age);
      console.log("inside privte car");
      if(age>=2.5 && age< 4.5){
        ND.disabled=false;
        RSA.disabled=false;
        NP.disabled=false;
        CM.disabled=false;
        LK.disabled=false;
        EP.disabled=false;
        tyreV.disabled=false;
        EVP.disabled=true;
        if(eTypeSelect.selectedIndex==1 || eTypeSelect.selectedIndex==2){
          EVP.disabled=false;
        }
        
      }
      else if(age>=4.5 && age<=6.5){
        ND.disabled=false;
        RSA.disabled=false;
        NP.disabled=false;
      }
      else if(age <2.5){
        console.log("Age Is Less Than 3");
        ND.disabled=false;
        RSA.disabled=false;
        NP.disabled=false;
        CM.disabled=false;
        LK.disabled=false;
        EP.disabled=false;
        tyreV.disabled=false;
        RTI.disabled=false;
        EVP.disabled=true;
        if(eTypeSelect.selectedIndex==1 || eTypeSelect.selectedIndex==2){
          EVP.disabled=false;
        }
      }
      else{
        RSA.disabled=false;
        NP.disabled=false;
        EMP.disabled=false;
      }
    }else if(vtype.value=="PCV Taxi"){
      if(age>=2.5&&age<=4.5){
        ND.disabled=false;
        CM.disabled=false;
        //EMP.disabled=false;
        RSA.disabled=false;
        //towingAmt.disabled=false;
        LK.disabled=false;
        NP.disabled=false;
        EMP.disabled=false;
      }
      else if(age>4.5){
        //towingAmt.disabled=false;
        //EMP.disabled=false;
        RSA.disabled=false;
        NP.disabled=false;
        EMP.disabled=false;
      }else{
        ND.disabled=false;
        CM.disabled=false;
        EP.disabled=false;
        //EMP.disabled=false;
        RSA.disabled=false;
        //towingAmt.disabled=false;
        RTI.disabled=false;
        LK.disabled=false;
        NP.disabled=false;
        EMP.disabled=false;
      }
    }else if(vtype.value=="2W" || vtype.value=="2WSS"){
      if(age>=2.5 && age<4.5){
        ND.disabled=false;
        RSA.disabled=false;
        //NP.disabled=false;
        CM.disabled=false;
        LK.disabled=false;
        EP.disabled=false;
        EMP.disabled=false;
        
        //tyreV.disabled=false;
      }
      else if(age>=4.5 && age<=6.5){
        ND.disabled=false;
        RSA.disabled=false;
        //NP.disabled=false;
        EMP.disabled=false;
      }
      else if(age <2.5){
        ND.disabled=false;
        RSA.disabled=false;
        //NP.disabled=false;
        CM.disabled=false;
        LK.disabled=false;
        EP.disabled=false;
        tyreV.disabled=false;
        RTI.disabled=false;
        EMP.disabled=false;
        
      }
      else{
        RSA.disabled=false;
        //NP.disabled=false;
        EMP.disabled=false;
      }

    }else if(vtype.value=="PCV Bus" || vtype.value=="PCV School Bus"){
      RSA.disabled=false;
      EMP.disabled=false;
      towingAmt.disabled=false;
      console.log(nps.value);
      if(nps.value){
        if(nps.value<=17 && age<2.5){
          ND.disabled=false;
          CM.disabled=false;
          RTI.disabled=false;
          EP.disabled=false;
          LK.disabled=false;
        }else if(nps.value>17 && age<2.5){
          ND.disabled=false;
          CM.disabled=false;
          RTI.disabled=false;
          //EP.disabled=false;
        }else if(nps.value>17 && age <=4.5 && age>=2.5){
          ND.disabled=false;
          //EP.disabled=false;
          CM.disabled=false;
        }else if(nps.value<=17 && age>=2.5 && age<=4.5){
          ND.disabled=false;
          CM.disabled=false;
          //RTI.disabled=false;
          EP.disabled=false;
          LK.disabled=false;
        }
      }
      

    }else if(vtype.value=="MISC"){
      EMP.disabled=false;
      TrOD.disabled=false;
      console.log("misc add on check");
      if(age<4.5)
      {
        ND.disabled=false;
        CM.disabled=false;
      }

    }

  }
  else{
    return;
  }
}
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
  //tyreV.checked=false;
  //towingAmt.checked=false;
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
  //towingAmt.disabled=true;

}
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

  }else if(vtype.value=="PvtCar" || vtype.value=="PvtCarS" || vtype.value=="2W"|| vtype.value=="2WSS"){
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
function htmlAsImage(){
htmlToImage.toJpeg(document.getElementById('container'), { quality: 0.95,style:{background:"white"} })
  .then(function (dataUrl) {
    var link = document.createElement('a');
    link.download = document.getElementById('Pname').value+'_'+document.getElementById('regno').value+'_'+'Quote.jpg';
    link.href = dataUrl;
    link.click();
    
  });
}
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
