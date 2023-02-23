import Input from '@/components/Input';
import campagneService from '@/services/campagne.service';
import ressourceService from '@/services/ressource.service';
import moment from 'moment/moment';
import { useRouter } from 'next/router';
import {React, useEffect ,useState} from 'react';
import styles from "./index.module.scss";


const Index = () => {
    const router = useRouter()
    const { id } = router.query;
    const [ressource, setRessource] = useState({});
    const [loading, setLoading] = useState(true);
    const [formField, setFormField] = useState(["fileName","type","dateFinExploitation","campagnes"]);
    // const [value, setValue] = useState({
    //     fileName: "",
    //     type:"",
    // });
    const [campagnes, setCampagnes] = useState();
    const [ressourceForm, setRessourceForm] = useState({
        fileName: "",
        dateFinExploitation: "",
        type: "image",
        campagnes: []
      });
    const [defaultDateExpi, setDefaultDateExpi] = useState();
   
  
    

    useEffect(() => {
      campagneService.getCampagnes()
      .then((campagnes) => {
        setCampagnes(campagnes);
        console.log(campagnes);
      })
    }, [])

    useEffect(() => {
        if(id !== undefined) {
            ressourceService.getRessource(id).then((res)=> {
                setRessource(res);
                setDefaultDateExpi(moment(res.dateFinExploitation).format('YYYY-MM-DD'))
                setLoading(false)
            })
        }
    }, [id]);

    useEffect(()=> {
        let newValue = {...ressourceForm};
        Object.entries(ressource).forEach(([key, item])=>{
            if(formField.includes(key)){
                console.log(key,item);
                if(key === "campagnes"){
                    let arrayCampagne = [];
                    item.forEach((item)=>{
                        arrayCampagne.push(item._id);
                    })
                    newValue[key] = arrayCampagne;
                } else {
                    newValue[key] = item;
                }
            }
        })
        console.log(newValue)
        setRessourceForm(newValue)
    },[ressource])

    
  const handleChangeInput = (e) => {
    setRessourceForm({ ...ressourceForm, [e.target.name]: e.target.value })
  }

  const handleSelect = (e) => {
    let value = Array.from(e.target.selectedOptions, option => option.value);
    setRessourceForm({ ...ressourceForm, campagnes: value });
  }
  const submit = () => {
    console.log(ressourceForm);
    ressourceService.updateRessource(id,ressourceForm);
  }


    return (
        <div className={styles.add__page}>
            <div className={styles.form__wrapper}>
                {loading === true ? "loading":
                <>
                <div className={styles.input__wrapper}>
                    <Input name="fileName" classes="form_input" type="text" label="nom"  defaultValue={ressource?.fileName} /*value={value.price_Min}*/ handleChange={(e) => handleChangeInput(e)}/>
                </div>
                <div className={styles.input__wrapper}>

                    <Input name="type" classes="form_input" type="text" label="type"  defaultValue={ressource?.type} /*value={value.price_Min}*/ handleChange={(e) => handleChangeInput(e)}/>
                </div>
                    <div className={styles.input__wrapper}>
                    <label>Fin d'exploitation</label>
                    <input type="date" name="dateFinExploitation" onChange={(e) => {
                        handleChangeInput(e);
                    }} defaultValue={defaultDateExpi}/>
                </div>
                <div className={styles.input__wrapper}>
                    <p>Campagnes</p>
                    <select name="campagnes" id="cars" onChange={(e) => handleSelect(e)} defaultValue={ressource?.type} multiple> 
                      {campagnes && campagnes.map((campagne) => (
                        <option value={campagne._id}>{campagne.name}</option>
                      ))}
                    </select>
                </div> <button type='button' onClick={()=> {
                    submit();
                }}>Update</button>
                </>
}
                       
            </div>
        </div>
    );
}

export default Index;
