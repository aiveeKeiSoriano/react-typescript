
import { AiFillHeart } from "react-icons/ai"

interface Types {
    url: string,
    favorite: boolean,
    toggleFavorite(arg: string): void;
}

let Picture: React.FC<Types> = ({ url, favorite, toggleFavorite }) => {
    return (
        <div className="picture">
            <img src={url} alt="random dog" />
            <div className={favorite ? "red-heart heart picture-heart" : "white-heart heart picture-heart"} onClick={() => toggleFavorite(url)}>
                <AiFillHeart />
            </div>
        </div>
    )
}

export default Picture