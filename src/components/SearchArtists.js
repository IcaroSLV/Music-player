import { useState } from "react";
import style from "./SearchArtists.module.css"
import noProfileImg from '../images/noprofile.png'

function SearchArtist({artistData}) {

    const [name] = useState(artistData.name);
    const [followers] = useState(artistData.followers.total);
    const [popularity] = useState(artistData.popularity);
    const [artistImage] = useState(artistData.images[2]?.url || noProfileImg);

    return(
        <div className={style.content}>
            <div className={style.image}>
                <img alt={name} src={artistImage}></img>
            </div>
            <div className={style.desc}>
                <p className={style.name}>{name}</p>
                <div className={style.info}>
                    <div>
                        <p>POPULARIDADE</p>
                        <span>{popularity}</span>
                    </div>
                    <div>
                        <p>SEGUIDORES</p>
                        <span>{followers}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchArtist;