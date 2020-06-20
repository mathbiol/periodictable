console.log('pt.js loaded');

pt={};

pt.getData=async _=>{
    //pt.data = await(await fetch('https://raw.githubusercontent.com/Bowserinator/Periodic-Table-JSON/master/PeriodicTableJSON.json')).json()
    pt.data = await(await fetch('PeriodicTableJSON.json')).json()
    // index
    pt.sbl = {}
    pt.data.elements.forEach(el=>{ // index by symbol to pt.sbl
        pt.sbl[el.symbol]=pt[el.symbol]=el // element both as pt[] and pt.sbl[]
    })
    //debugger
}

pt.dumpMasses= async()=>{ // by creating (dumping...) variables in the global scope with names of the elements
    if(!pt.sbl){
        await pt.getData()
    }
    Object.keys(pt.sbl).forEach(k=>{
        window[k]=pt.sbl[k].atomic_mass
    })
    //debugger
} ;

pt.eval=(str,show)=>{
   str = str.replace(/([A-Z])([a-z]*)(\d)/g,'$1$2*$3')
   str = str.replace(/([A-Z])([A-Z])/g,'$1\+$2')
   str = str.replace(/(\d)(\D)/g,'$1\+$2')
   str = str.replace(/([a-z])([A-Z]+)/g,'$1\+$2')
   str = str.replace(/\+\)/g,')')
   str = str.replace(/^(\d+)(.*)/,'$1\*\($2\)')
   str = str.replace(/\(\+/g,'(')
   if(str.match(/[A-Z][A-Z]/g)){
       return pt.eval(str,show)
   }else{
       str=str.replace(/[\+]+/g,'+')
       str=str.replace(/\(\*/g,'(')
       str=str.replace(/\(+/g,'(')
       str=str.replace(/\)+/g,')')
       str=str.replace(/([a-z,A-Z])\(/g,'$1+(')
       str=str.replace(/(\))(\d)/g,'$1\*$2')
       if(show){
           console.log(str)
       }
       return eval(str)
   }
}

// Constants and conversion
pt.R=8.31446261815324 // as in PV=nRT at 0 oC, in SI units
pt.A=6.02214076E23 // particles in a mole
// --- E = h · c / λ ---
pt.h=6.62607004E-34 // planks constant in SI, 
pt.c=299792458 // speed of light SI
// ---|---
pt.k2c=(k=0)=>(k-273.15); //kelvin to celsius
pt.c2k=(c=0)=>(c+273.15); //celsius to kelvin
pt.p2a=(p=1)=>(p/1.01325E5); // pascal to atmospheres at 0 oC
pt.a2p=(a=1)=>(a*1.01325E5); // atmospheres to pascal at 0 oC

(async()=>{
    await pt.dumpMasses()
})();

if(typeof(define)!='undefined'){
    define(pt)
}