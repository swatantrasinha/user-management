import { useEffect, useReducer, useState } from 'react';
import {type Action, type StateType, type UserCardProps} from '../../types/User.type'
import User from '../User/User';
import customFetch from '../../custom-fetch/customFetch';
import ShowUsersByLocation from '../show-users-by-location/ShowUsersByLocation';
import { FETCH_METHODS, PAGE_DATA } from '../../constants/constants';

const HomePage = () => {
    const [showLocationTable, setShowLocationTable]= useState<boolean>(false);
    const dataFetchReducer = (state: StateType, action: Action) => {

    switch (action.type) {
        case 'LOADING':
            return { ...state, loading: true };
        case 'SUCCESS':
            return { ...state, data: action.payload , loading: false };
        case 'ERROR':
            return { ...state, error: action.payload, loading: false };
        default:
            throw new Error();
    }
}
     
    const initialState=     {
        data: [],
        loading: false,
        error: null
    }
    
   
   const [state, dispatch] = useReducer<(state: StateType, actions: Action) => StateType>(dataFetchReducer, initialState);
   
    
    const modifyUserData = (update:boolean, id: string,responseData:UserCardProps) => {
        let newData= null;
        if(update) { // update case
             newData= [...state.data];   
            const findIndex = newData.findIndex(ele => ele.id.toString() === id);
            if(findIndex >=0) {
                newData[findIndex].location= responseData.location;
            }
              
        } else { // delete case
             newData= state.data.filter(ele => ele.id.toString() !== id)
        }
        if(newData) {
            dispatch({ 
                type: 'SUCCESS', 
                payload: newData
            });
        }
       
    }
    const getUsersData = async() => {
        const fetchData= {
            searchParam: {
                page: PAGE_DATA.INITIAL_PAGE_INDEX,
                limit: PAGE_DATA.PAGE_LIMIT
            },
            method: FETCH_METHODS.GET,
        };
        const response= await customFetch(fetchData);
        
        if(response.status !== 200) {
            dispatch({ type: 'ERROR', payload: response.data as Error});
        } else {
            const {data}= response; 
           dispatch({ type: 'SUCCESS', payload: data as UserCardProps[] });
        }

    }

    useEffect(() => {
        dispatch({ type: 'LOADING' });
        getUsersData();
    },[]);

  return (
    <div className=''>
        {!state.error && (
            <div className="flex justify-center ">
                <button className={`underline ${showLocationTable ? 'text-red-500' :'text-green-500'}`} onClick={() => setShowLocationTable(!showLocationTable)}>
                 <span> {showLocationTable ? 'Hide' : 'Show'}</span> Users Based on Location
                </button>
        </div>)}
            {showLocationTable && (
                <div className='border'>
                    {state.data && state.data.length && ( 
                         <div className='flex justify-center'> 
                            <ShowUsersByLocation data={state.data} /> 
                        </div>
                        
                    )}
                </div>
            )}
       
        <hr />
        <div className='grid sm:grid-cols-1 grid-cols-3 gap-x-2.5'>
            {state.loading && (<div>Loading....</div>)}
            {state.error && (<div className='text-red-700'>Some Error in Data Fetching....</div>)}
            {(state?.data?.length>0)  && state.data.map((user: UserCardProps,index: number) => {
            const uniqueKey= `${user.id}-${index}`;
            return (
                <div key={uniqueKey} className='user-container border border-black my-8'>
                    <User 
                        userData={user} 
                        modifyUserData={modifyUserData}
                        />
                </div>
            )

        })}

        
    </div>
    </div>
   
  )
}

export default HomePage;