

export const getApiUrl = url => {
    const host = 'http://localhost:3333';
    return `${host}${url}`;
}

//TO RUN ON YOUR phone, comment out the top part, REPLACE THE LINK WITH YOUR LOCAL IP

//TO TEST ON YOU LOCAL NETWORK (PHONE ETC ... ) REPLACE THE LINK WITH YOUR IP

// testing on phone tool, the IP shouldn be replaced with your local IP 

//UNCOMMENT /*getImageUrl*/ IN HOME.JS LINE 66

/*
export const getApiUrl = url => {
    const host = 'http://192.168.1.104:3333';
    return `${host}${url}`;
}
export const getImageUrl = url => {
    const host = url.replace('http://localhost:3333', 'http://192.168.1.104:3333');
    return host;
}

*/
