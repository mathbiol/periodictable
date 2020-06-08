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
       return pt.eval(str)
   }else{
       str=str.replace(/[\+]+/g,'+')
       str=str.replace(/\(\*/g,'(')
       str=str.replace(/\(+/g,'(')
       str=str.replace(/\)+/g,')')
       console.log(show)
       if(show){
           console.log(str)
       }
       let y = eval(str)
       return y
   }
}

(async()=>{
    await pt.dumpMasses()
})()

if(typeof(define)!='undefined'){
    define(pt)
}