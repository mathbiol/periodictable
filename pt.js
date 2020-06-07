console.log('pt.js loaded');

pt={};

pt.getData=async _=>{
    let dt = await(await fetch('https://raw.githubusercontent.com/Bowserinator/Periodic-Table-JSON/master/PeriodicTableJSON.json')).json()
    pt.sbl = {}
    dt.elements.forEach(el=>{ // index by symbol to pt.sbl
        pt.sbl[el.symbol]=el
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

(async()=>{
    await pt.dumpMasses()
})()

if(typeof(define)!='undefined'){
    define(pt)
}