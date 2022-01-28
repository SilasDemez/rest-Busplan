
async function geta(){
    url = 'https://efa.sta.bz.it/apb/XML_DM_REQUEST?&locationServerActive=1&stateless=1&type_dm=any&name_dm=Brixen%20Brixen%20Bahnhof&mode=direct&outputFormat=JSON'

    const response = await fetch(url, {
    });
    console.log(response)
    document.write(response.json());
    //return response.json();

}

geta();