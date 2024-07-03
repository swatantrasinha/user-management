import { UserCardProps } from '../../types/User.type';
import { locations } from '../../constants/constants';
type ShowUsersByLocationProps = {
    data: UserCardProps[];
}

const ShowUsersByLocation = ({data}:ShowUsersByLocationProps) => {
    const tableData =[];
    for(let i=0;i<locations.length;i++) {
        const location= locations[i];
        const frequency= data.filter(ele => ele.location === location).length;
        const loc = {
            location,
            frequency
        }
        tableData.push(loc);
    }
    
  return (
    <div>
        <table>
        <tbody>
            <tr className='m-4'>
                <th>Location</th>
                <th>Frequency</th>
            </tr>
            
            {tableData.map(ele => (
                <tr className='m-4' key={ele.location}>
                    <td className='border border-black'>{ele.location}</td>
                    <td className='border border-black'>{ele.frequency}</td>
                </tr>))}
        </tbody>

        </table>
    </div>
  )
}

export default ShowUsersByLocation