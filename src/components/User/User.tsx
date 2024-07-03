
import { useState } from 'react';
import {UserCardProps} from '../../types/User.type'
import {locations, FETCH_METHODS} from '../../constants/constants';
import customFetch from '../../custom-fetch/customFetch';
type UserProps = {
    userData: UserCardProps;
    // deleteUserHandler: (id:number) => void;
    modifyUserData : (update:boolean, id:string, responseData: UserCardProps) => void;
}

const User = ({userData, modifyUserData}:UserProps ) => {
    const {id, name, location, hobby, createdAt} =userData;
    const [locationChange, setLocationChange]= useState<string>(location);
    const [isLocationChange, setIsLocationChange]= useState<boolean>(false);
    const [userCardErrorMsg, setUserCardErrorMsg]= useState<string>('');

    const deleteUserHandler = async(deleteId: number) => {
        const fetchData= {
            method: FETCH_METHODS.DELETE,
            id:deleteId,
        };
        const response= await customFetch(fetchData);
        console.log('deleteUserHandler --> response ', response);
        if(response.status !== 200) {
            setUserCardErrorMsg(response.data.toString());
        } else {
            modifyUserData(false, deleteId.toString(), response.data as UserCardProps);
        }
    }

    const handleLocationChange =async(updateId: string) => {
        const fetchData= {
            method: FETCH_METHODS.PUT,
            id: updateId,
            body: JSON.stringify({location: locationChange})
        };
        
        const response= await customFetch(fetchData);
              
        if(response?.status !== 200) {
            setUserCardErrorMsg(response.data.toString());
            cancelLocationChange();
        } else {
            setIsLocationChange(false);
            modifyUserData(true, updateId, response.data as UserCardProps);
        }
        
    }
    const cancelLocationChange = () => {
        setLocationChange(location);
        setIsLocationChange(false)
    }
    


  return (
    <div className='user-data-card relative m-4'>
        {userCardErrorMsg ? (<span className='text-red-700 font-extrabold'>{userCardErrorMsg}</span>): null}
        <div className="user-data-row"> 
            <span className='user-data-label'>Name: </span>
            <span className='user-data-value'>{name}</span>
        </div>

        <div className="user-data-row flex sm:flex-col flex-row">
            <div className='flex'>
                <div>
                    <span className='user-data-label'>Location: </span>
                </div>
                {isLocationChange ? (
                    <div>
                        <label htmlFor='location-change'>Select </label>
                        <select className='border border-black' id='location-change' value={locationChange} onChange={(event) => setLocationChange(event.target.value)}>
                            {locations.map((ele,index) => (<option key={`${index}-${ele}`} value={ele}>{ele}</option>))}
                        </select>
                    </div>
                ): (<span className='user-data-value'>{locationChange}</span>)}
            </div>

            {isLocationChange ? (
                <div className='sm:m-4'>
                    <button className='ml-4 border border-black px-4' onClick={() =>handleLocationChange(id.toString())}>OK</button>
                    <button className='ml-4 border border-black px-4' onClick={() =>cancelLocationChange()}>Cancel</button>
                </div>

            ): (
            <div className=''>
                <button className='ml-8 text-blue-900 underline' onClick={() => setIsLocationChange(true)}>Change Location</button>    
            </div>
            )}
            
        </div>

        <div className="user-data-row"> 
            <span className='user-data-label'>Hobby: </span>
            <span className='user-data-value'>{hobby}</span>
        </div>

        <div className="user-data-row"> 
            <span className='user-data-label'>Date Created: </span>
            <span className='user-data-value'>{createdAt.toString().substring(0,10)}</span>
        </div>

        <div className='delete-btn-container absolute top-0 right-5'>
            <button className='text-red-500' onClick={() => deleteUserHandler(id)}>X</button>
        </div>

    </div>
  )
}

export default User