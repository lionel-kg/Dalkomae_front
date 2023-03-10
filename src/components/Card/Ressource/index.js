import React from 'react';
import styles from "./index.module.scss";
import Link from "next/link";
import moment from 'moment'
import { useRouter } from 'next/router';

const Index = ({ressource, count, daysLeft, isExpired}) => {
    const router = useRouter();
    
    return (
        <div className={styles.card__wrapper} onClick={()=>{
            router.push("/admin/ressource/"+ressource._id);
        }}>
            
                    
        
                <div className={styles.card__img}>
                    <img src={ressource.path} alt={ressource.img__alt}/>
                </div>
                <div className={styles.card__content}>
                    <p>{ressource.type}</p>
                    <h3>{ressource.file}</h3>
                    <p>Date d'expiration : {moment(ressource.dateFinExploitation).format("DD-MM-YYYY")}</p>
                    {isExpired ?  ( 
                        <p className={styles.expired}>Attention droit d'images expirés !</p>
                    ) : (
                        <p>Les droits à l'image expireront dans {daysLeft} jours</p>
                    )}
                    
                    <ul className={styles.campagnes}>
                        <p>Image utilisé dans <span className={styles.count}>{count}</span> {count > 0 ? ("campagnes :") : ("campagne" )} </p>
                        {ressource.campagnes && ressource.campagnes.map((campagne) => (
                            <li>
                                <Link href={{
                                        pathname: `/campagne/[id]`,
                                        query: {
                                            id: campagne._id, // should be `title` not `id`
                                        },
                                    }}>
                                    <span>{campagne.name}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                    
                </div>
            
        </div>
    );
}

export default Index;
