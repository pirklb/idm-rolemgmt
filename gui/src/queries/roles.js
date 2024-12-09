import backendAxios from "./_axios";
export async function getRoles(search, cn) {
    const url = `${import.meta.env.VITE_IDM_URL}/roles?q=${search}&owner=${cn}`
    console.log('getRoles', search, cn, url);
    const { data } = await backendAxios.get(url);
    console.dir(data);
    return data;
}

export async function getRoleByRouteId(roleId) {
    const routeId = encodeURIComponent(roleId);
    console.log('getRoleByRouteId');
    const { data } = await backendAxios.get(`${import.meta.env.VITE_IDM_URL}/roles/${routeId}`);
    console.dir(data);
    return data;
}
