import style from "./AlbumBox.module.css"

function AlbumBox({ album_type, image, total_tracks, name, tracks, isOpen }) {  

    return (
        <div className={style.AlbumBox}>
            <div>
                <img alt="foto do album" src={image}></img>
                <h1>{name}</h1>
            </div>
            <div className={style.albumInfo}>
                <div>
                    <p>Tipo</p>
                    <span>{album_type}</span>
                </div>
                <div>
                    <p>Tracks</p>
                    <span>{total_tracks}</span>
                </div>
            </div>
            {isOpen &&(<div>Abriu</div>)}
        </div>
    )
}

export default AlbumBox