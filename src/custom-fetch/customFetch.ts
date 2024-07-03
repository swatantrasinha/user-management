import { UserCardProps } from "../types/User.type";

const myFetch = {
    baseURL: 'https://660160fd87c91a11641ab523.mockapi.io/users',
    headers: { 'Content-Type': 'application/json' },
};

const customFetch = async (asyncData: any) => {
        const { searchParam, id, ...others}= asyncData;
        const urlString= id? `${myFetch.baseURL}/${id}` :`${myFetch.baseURL}`;
        const url= new URL(urlString);
        
        if(searchParam?.page && searchParam?.limit) {
            url.searchParams.append('page',asyncData.searchParam.page); 
            url.searchParams.append('limit', asyncData.searchParam.limit);
        }
                
        const rawDataFromApi= await fetch(`${url}`, {
            headers: myFetch.headers, 
            ...others
        });
        
        let responseFromApi: {
            status:number, 
            data: Error | UserCardProps | UserCardProps[]
        };
        
        
        if(rawDataFromApi.status === 200) {
            const data= {
                status: rawDataFromApi.status,
                data: await rawDataFromApi.json()
            }
            responseFromApi= data;
            
        } else {
            const errorData= {
                status: rawDataFromApi.status,
                data: new Error(`Some error in operation ${asyncData.method}`)
            }
            responseFromApi = errorData;
        }
        return responseFromApi;
}
export default customFetch;