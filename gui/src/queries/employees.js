import backendAxios from "./_axios";
export async function getEmployees(search) {
    console.log('getEmployees', search);
    const { data } = await backendAxios.get(`${import.meta.env.VITE_IDM_URL}/employees?q=${search}`);
    console.dir(data);
    return data;
}
