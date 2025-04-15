import { useState } from "react";
import style from "./SearchArtists.module.css"
import noProfileImg from '../images/noprofile.png'
import {Link} from 'react-router-dom'

function SearchArtist({artistData}) {

    const [name] = useState(artistData.name);
    const [followers] = useState(artistData.followers.total);
    const [popularity] = useState(artistData.popularity);
    const [artistImage] = useState(artistData.images[2]?.url || noProfileImg);

    return(
    <Link to={`/ArtistPage/${artistData.id}`}>
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
    </Link>
    )
}

export default SearchArtist;