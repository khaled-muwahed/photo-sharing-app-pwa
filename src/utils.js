//TO RUN ON YOUR MACHINE REPLACE THE LINK WITH http://localhost:3333/

//TO TEST ON YOU LOCAL NETWORK (PHONE ETC ... ) REPLACE THE LINK WITH YOUR IP

export const getApiUrl = url => {
    const host = 'http://192.168.1.104:3333';
    return `${host}${url}`;
}
export const getImageUrl = url => {
    const host = url.replace('http://localhost:3333', 'http://192.168.1.104:3333');
    return host;
}