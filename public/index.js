
async function fetchData(){
    let haltestelle = 660009989
    let url = `https://efa.sta.bz.it/apb/XML_DM_REQUEST?&locationServerActive=1&stateless=1&type_dm=any&name_dm=${haltestelle}&mode=direct&outputFormat=JSON`
    //'https://efa.sta.bz.it/apb/XML_DM_REQUEST?&locationServerActive=1&stateless=1&type_dm=any&name_dm=Brixen%20Brixen%20Bahnhof&mode=direct&outputFormat=JSON'

    const response = await fetch(url, {
        method: 'get',
    })
    
    return response.json();

}

fetchData();