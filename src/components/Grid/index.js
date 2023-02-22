import React from 'react';
import Card from '../Card/Resource';

const Index = (props) => {
    return (
        <div className={styles.place__grid}>
            {props.item && props.item.map((item) => (
                <Link href={{
                    pathname: `/${props.item}/[id]`,
                    query: {
                        id: place._id, // should be `title` not `id`
                    },
                }}
                
                >
                    {props.card}
                </Link>
            ))}
        </div>
    );
}

export default Index;
