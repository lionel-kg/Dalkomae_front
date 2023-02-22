import { useEffect, useState } from "react";
import { useRouter } from 'next/router'
import Link from "next/link";
import styles from "./index.module.scss";
import WithAuth from "@/HOC/withAuth";
import ressourceService from "@/services/ressource.service";
import campagneService from "@/services/campagne.service";

const Index = () => {


    const [campagnes, setCampagnes] = useState();

    useEffect(() => {
      campagneService.getCampagnes()
      .then((campagnes) => {
        setCampagnes(campagnes);
        console.log(campagnes);
      })
    }, [])
    
    const [ressourceForm, setRessourceForm] = useState({
        fileName: "",
        dateFinExploitation: "",
        path: "",
        type: "image",
        campagnes: []
      });
  
            
        const handleInput = (e) => {
            setRessourceForm({ ...ressourceForm, [e.target.name]: e.target.value });
            console.log(ressourceForm);
        }

        const handleSelect = (e) => {
          let value = Array.from(e.target.selectedOptions, option => option.value);
          setRessourceForm({ ...ressourceForm, campagnes: value });
        }

     // File uploader
     const handleUploadInput = (e) => {
        const files = [...e.target.files];
        const formData = new FormData();
  
        for (let file of files) {
          formData.append("file", file);
        }
  
        formData.append("upload_preset", "images");
  
        const res = fetch(
          "https://api.cloudinary.com/v1_1/dcsblwqid/image/upload",
          {
            method: "POST",
            body: formData,
          }
        ).then(res => {
          res.json().then(data => {
            console.log(data);
            setRessourceForm(ressourceForm => ({ ...ressourceForm, path : data.secure_url}));
          })
        });
    
      };

      const submitForm = (e) => {
        e.preventDefault();
        ressourceService.createRessource(ressourceForm)
            .then(ressource => console.log(ressource))
            .catch(err=>console.log(err))
      }

  return (
    <div className={styles.add__page}>
        <div className={styles.form__wrapper}>
          <h1 className={styles.page__title}>Ajouter une ressource</h1>
            <form>
                <div className={styles.input__wrapper}>
                    <label>Nom</label>
                    <input type="text" name="fileName" id="fileName"  onChange={(e) => {
                        handleInput(e);
                    }} />
                </div>

                <div className={styles.input__wrapper}>
                    <label>Image</label>
                    <input type="file" name="path" onChange={(e) => {handleUploadInput(e)}}/>
                </div>

                <div className={styles.img__wrapper}>
                {ressourceForm.path ? (
                    <div className={styles.img__card}>
                        <img width="200px" height="170px" src={ressourceForm.path} loading="lazy"/>
                    </div>
                ) : ("")}
        

                </div>

                <div className={styles.input__wrapper}>
                    <label>Fin d'exploitation</label>
                    <input type="date" name="dateFinExploitation" onChange={(e) => {
                        handleInput(e);
                    }} />
                </div>
                <div className={styles.input__wrapper}>
                    <p>Campagnes</p>
                    <select name="campagnes" id="cars" onChange={(e) => handleSelect(e)} multiple> 
                      {campagnes && campagnes.map((campagne) => (
                        <option value={campagne._id}>{campagne.name}</option>
                      ))}
                    </select>
                </div>
                <button type="submit" onClick={(e) => submitForm(e)}>
                    Ajouter
                </button>

            </form>
        </div>
    </div>
  );
}

export default WithAuth(Index);
