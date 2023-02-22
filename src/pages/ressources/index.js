import { useEffect, useState } from "react";
import { useRouter } from 'next/router'
import CardRessource from "../../components/Card/Ressource"
import RessourceService from "../../services/ressource.service";
import styles from "./index.module.scss";
import WithAuth from "@/HOC/withAuth";

const Index = () => {

    const router = useRouter();

    const [ressources, setRessources] = useState();

    const [filterOpen, setFilterOpen] = useState();

    const [search, setSearch] = useState([]);
    

    useEffect(() => {
      RessourceService.getRessources()
      .then((ressources) => {
        setRessources(ressources);
      })
    }, [])

    const searchForm = (input) => {
      router.push({
        pathname: "/ressources",
        query: {file: input}
        }
      )
      if (router.isReady) {
        RessourceService.getSearchedRessources(input)
        .then((ressources) => {
          setRessources(ressources);
        })
      }
    }

    const count = (index) => {
      return ressources[index].campagnes.length;
    }

    const sortByExpiration = () => {
      const sortedRessources = ressources.sort((a, b) => new Date(...a.dateFinExploitation.split('/').reverse()) - new Date(...b.dateFinExploitation.split('/').reverse()));
      setRessources(sortedRessources);
      setFilterOpen(!filterOpen);  
    }
    

    const sortByUsageDesc = () => {
      const copy = [...ressources];
      console.log(copy);
      copy.sort((a, b) => {
        return b.campagnes.length - a.campagnes.length;
        })
      setRessources(copy);
      setFilterOpen(!filterOpen);
    }

    const sortByUsageAsc = () => {
      const copy = [...ressources];
      console.log(copy);
      copy.sort((a, b) => {
        return a.campagnes.length - b.campagnes.length;
        });
      setRessources(copy);
      setFilterOpen(!filterOpen);
    }
    
    
    const isExpired = (index) => {
      const now = new Date();
      const dateFinExploitation = new Date(ressources[index].dateFinExploitation);

      if (dateFinExploitation < now) {
        return true;
      } else {
        return false
      }
    }


    const dateNow = new Date();

    const daysLeft = (index) => {
      const dateFinExploitation = new Date(ressources[index].dateFinExploitation);
      const timeLeft = dateNow.getTime() - dateFinExploitation.getTime(); 
      const daysLeft = Math.floor(Math.abs(timeLeft / (1000 * 3600 * 24)));
      return daysLeft;
    }

  return (
    <div className={styles.ressource__page}>
        <h1 className={styles.page__title}>Toutes les ressources</h1>
        <div className={styles.page__nav}>
          <div className={styles.filters}>
              
              <button onClick={() => setFilterOpen(!filterOpen)}>Trier</button>
              
              {filterOpen ? (
                <ul div className={styles.filters__list}>
                  <li onClick={() => sortByExpiration()}>Date expiration</li>
                  <li onClick={() => sortByUsageDesc()}>Les + utilisé</li>
                  <li onClick={() => sortByUsageAsc()}>Les - utilisé</li>
                </ul>
              ) : ( "" )
              }
          </div>
          <div className={styles.searchbar}>
            <input
              type="text"
              name="file"
              id="file"
              placeholder="Rechercher une ressource..."
              onChange={(e) => {
                searchForm(e.target.value);
              }}
            />
          </div>
        </div>
        <div className={styles.grid__wrapper}>
        {ressources && ressources.map((ressource, index) => (
          
                    
                        <CardRessource key={ressource._id} ressource={ressource} count={count(index)} daysLeft={daysLeft(index)} isExpired={isExpired(index)}/>
              
                ))}
        </div>
    </div>
  );
}

export default WithAuth(Index);
