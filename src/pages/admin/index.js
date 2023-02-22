import campagneService from '@/services/campagne.service';
import moment from 'moment/moment';
import {React,useEffect,useState} from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Edit } from '@mui/icons-material';
import { useRouter } from 'next/router';


const Index = () => {
    const [campagnes, setCampagnes] = useState({});
    const [titleTable, setTitleTable] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    useEffect(() => {
        campagneService.getCampagnes().then((res)=>{
            let resData = res.data;
            setCampagnes(resData);
            let keys = Object.keys(resData[0]);
            for (var key in keys) {
                console.log(keys)
                if (keys[key] == "__v") {
                    keys[key] = "actions";
                }
            }
            setTitleTable(keys)
            setLoading(false)
        })
    }, []);

    
    return (
        <div className='page_wrapper'>
            { loading === false ? <>
            
                    <table>
                        <thead>
                        <tr>
                            {titleTable.map((title)=>{
                                return  <th className=''>
                                {title}
                            </th>
                            })}
                        </tr>
                        
                        </thead>
                        <tbody>
                            
                            
                            {campagnes.map((campagne, key, arr) => {
                                    return (
                                        <tr>
                                            <td>
                                                {campagne._id}
                                            </td>
                                            <td>
                                                {campagne.name}
                                            </td>
                                            <td>
                                                {campagne.type}
                                            </td>
                                            <td>
                                                {moment(campagne.date).format('YYYY-MM-DD HH:m:s')}
                                            </td>
                                            <td>
                                                {campagne.target}
                                            </td>
                                            <td>
                                                {campagne.ressources ? campagne.ressources.map((ressource) => {
                                                    return <p>{ressource.fileName}</p>
                                                }):null}
                                            </td>
                                            <td>
                                                <div>
                                                    <button onClick={()=>{
                                                        router.push("admin/campagne/"+campagne._id)
                                                    }}><Edit/></button>
                                                </div>
                                            </td>
                                           
                                        </tr>

                                    )
                             })}  
                        </tbody>
                    </table>
                
                
            </> : "loading"

            }
             
        </div>
    );
}

export default Index;
