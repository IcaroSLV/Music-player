import style from './Songs.module.css'

import { FaRegPlayCircle } from "react-icons/fa";

function Songs({name, index, trackID}) {

    const handlePlayClick = () => {
        const url = `https://open.spotify.com/track/${trackID}`
        window.open(url, '_blank')
    }
    
    return(<div className={style.list} onClick={handlePlayClick}>
        <span>{index + 1}</span>
        <h1>{name}</h1>
        <FaRegPlayCircle className={style.playSymbol}/>
    </div>)
}

export default Songs