import React, {useState} from "react";
import './search.scss'
import SearchItem from "./search-item/SearchItem";
import {search} from "../../store/action-creators";
import {useDispatch} from "react-redux";
import { ISearchResult } from "../../interfaces";
import LoadingSpinner from "../hotify-ui/LoadingSpiner/LodaingSpiner";
import useTypedSelector from "../../hooks/useTypedSelector";
import trackSlice from "../../store/reducers/trackSlice";

const searchRef = React.createRef()
const Search = () => {

    const [result,setResult] = useState<ISearchResult>({} as ISearchResult)
    const [loading,setLoading] = useState(false)
    const {isTrackPlaying} = useTypedSelector(state => state.track)
    const {trackSwitch,addSongToPlaylist,removeSongFromPlaylist} = trackSlice.actions
    const dispatch = useDispatch()


    function getSearchResults(ref:any) {
        const {current} = ref
        setLoading(true)
        setResult({} as ISearchResult)
        // @ts-ignore
        dispatch(search({query:current.value})).then((result:any)=>{

                setResult(result.payload)
                setLoading(false)
            })

    }

    return (
        <div className = "flexsearch" >
            <div className = "flexsearch--wrapper" >
                <form className = "flexsearch--form" action = "#" method = "post" >
                 <div className = "flexsearch--input-wrapper" >
                     <input ref={searchRef as  React.RefObject<HTMLInputElement>} className = "flexsearch--input" type = "search" placeholder = "search" />
                </div>
                <input onClick={()=>{getSearchResults(searchRef)}}  className="flexsearch--submit" type="button" value="&#10140;"/>
                </form>
            </div>
            { !loading
                ? <SearchItem
                data={result}
                type={result?.type}
                trackSwitch={(track:any)=>{
                    dispatch(trackSwitch({track}))
                }
                }
                likeSong={(track)=>dispatch(addSongToPlaylist({playlistId:'fav',songs:[track]}))}
                dislikeSong={(id:string)=>dispatch(removeSongFromPlaylist({id,playlistId:'fav'}))}
                isTrackPlaying={isTrackPlaying}
                />
                : <LoadingSpinner/> }
        </div>
    )
}

export default Search
