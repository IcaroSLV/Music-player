import { useEffect, useState } from "react";
import style from "./SearchArtists.module.css"

function SearchArtist({artistData}) {

    const [name] = useState(artistData.name);
    const [followers] = useState(artistData.followers.total);
    const [popularity] = useState(artistData.popularity);
    const [spotifyLink] = useState(artistData.external_urls.spotify);
    const [artistImage] = useState(artistData.images[1].url);

    return(
        <div className={style.content}>
            <div className={style.image}>
                <img src={artistImage}></img>
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