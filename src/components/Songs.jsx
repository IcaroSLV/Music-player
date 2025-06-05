import style from './Songs.module.css'

import { FaRegPlayCircle } from "react-icons/fa";

function Songs({name, index}) {
    return(<div className={style.list}>
        <span>{index + 1}</span>
        <h1>{name}</h1>
        <FaRegPlayCircle className={style.playSymbol}/>
    </div>)
}

export default Songs