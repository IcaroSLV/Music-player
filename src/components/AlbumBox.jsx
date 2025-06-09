import style from "./AlbumBox.module.css"
import Songs from "./Songs"
import noProfileImg from '../images/noprofile.png'

function AlbumBox({ album_type, image, total_tracks, name, tracks, isOpen, handleOpenSongList }) {

    return (
        <div className={`${style.albumBox} ${isOpen ? style.isOpen:''}`} onClick={handleOpenSongList}>
            <div>
                <img alt="foto do album" src={image || noProfileImg}></img>
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
                    {tracks.map((song, index) => (
                        <Songs
                        trackID={song.id}
                        key={song.id}
                        name={song.name}
                        index={index}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}

export default AlbumBox