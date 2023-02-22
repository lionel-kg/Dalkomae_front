import Input from '@/component/Input';
import campagneService from '@/services/campagne.service';
import { useRouter } from 'next/router';
import {React, useEffect ,useState} from 'react';


const Index = () => {
    const router = useRouter()
    const { id } = router.query;
    const [campagne, setCampagne] = useState({});
    const [loading, setLoading] = useState(true);
    const [value, setValue] = useState({});

    useEffect(() => {
        if(id !== undefined) {
            campagneService.getCampagne(id).then((res)=> {
                setCampagne(res.data);
                setLoading(false)
            })
        }
    }, [id]);

    
  const handleChangeInput = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value })
  }

    return (
        <div className='page_wrapper'>
            <div className='container_input'>
                {loading === true ? "loading":<><Input name="name" classes="form_input" type="text" label="nom" fullSize defaultValue={campagne?.name} /*value={value.price_Min}*/ handleChange={(e) => handleChangeInput(e)}/>
            <Input name="type" classes="form_input" type="text" label="type" fullSize defaultValue={campagne?.type} /*value={value.price_Min}*/ handleChange={(e) => handleChangeInput(e)}/></>
}
                       
            </div>
        </div>
    );
}

export default Index;
