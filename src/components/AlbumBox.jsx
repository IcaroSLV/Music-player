import style from "./AlbumBox.module.css"
import Songs from "./Songs"

function AlbumBox({ album_type, image, total_tracks, name, tracks, isOpen }) {

    return (
        <div className={style.albumBox}>
            <div>
                <img alt="foto do album" src={image}></img>
                <h1>{name}</h1>
            </div>
            <div className={style.albumInfo}>
                <div>
                    <p>TIPO</p>
                    <span>{album_type.toUpperCase()}</span>
                </div>
                <div>
                    <p>TRACKS</p>
                    <span>{total_tracks}</span>
                </div>
            </div>
            {isOpen && (
                <div className={style.SongsList}>
                    {tracks.map((song) => (
                        <Songs
                        key={song.id}
                        name={song.name}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}

export default AlbumBox