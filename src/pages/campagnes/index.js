import { useEffect, useState } from "react";
import { useRouter } from 'next/router'
import Link from "next/link";
import CardCampagne from "../../components/Card/Campagne"
import CampagneService from "../../services/campagne.service"
import styles from "./index.module.scss";
import WithAuth from "@/HOC/withAuth";

const Index = () => {

    const router = useRouter();

    const [campagnes, setCampagnes] = useState();

    useEffect(() => {
      CampagneService.getCampagnes()
      .then((campagnes) => {
        setCampagnes(campagnes);
        console.log(campagnes);
      })
    }, [])

    const searchForm = (input) => {
      router.push({
        pathname: "/campagnes",
        query: {type: input}
        }
      )
      if (router.isReady) {
        CampagneService.getSearchedCampagnes(input)
        .then((campagnes) => {
          setCampagnes(campagnes);
        })
      }
    }


  return (
    <div className={styles.campagne__page}>
        <h1 className={styles.page__title}>Toutes les campagnes</h1>
        <div className={styles.page__nav}>
          {/* <div className={styles.filters}>
              
              <button onClick={() => setFilterOpen(!filterOpen)}>Trier</button>
              
              {filterOpen ? (
                <ul div className={styles.filters__list}>
                  <li onClick={() => sortByExpiration()}>Date expiration</li>
                  <li onClick={() => sortByUsageDesc()}>Les + utilisé</li>
                  <li onClick={() => sortByUsageAsc()}>Les - utilisé</li>
                </ul>
              ) : ( "" )
              } 
          </div> */}
          <div className={styles.searchbar}>
            <input
              type="text"
              name="type"
              id="type"
              placeholder="Rechercher une campagne..."
              onChange={(e) => {
                searchForm(e.target.value);
              }}
            />
          </div>
        </div>
        <div className={styles.grid__wrapper}>
        {campagnes && campagnes.map((campagne) => (
                    <Link href={{
                        pathname: `/campagne/[id]`,
                        query: {
                            id: campagne._id, // should be `title` not `id`
                        },
                    }}
                    
                    >
                        <CardCampagne key={campagne._id} campagne={campagne}/>
                    </Link>
                ))}
        </div>
    </div>
  );
}

export default WithAuth(Index);
