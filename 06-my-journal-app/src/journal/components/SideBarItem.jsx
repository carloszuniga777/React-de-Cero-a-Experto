import { TurnedInNot } from "@mui/icons-material"
import Grid from "@mui/material/Grid2"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import { useMemo } from "react"
import { useDispatch } from "react-redux"
import { setActiveNote } from "../../store"

export const SidebarItem = ({title = '', body, id, date, imageUrls = []}) => {
  
  //Dispara las acciones de los reducer del redux
  const dispatch = useDispatch()

  //Acorta el titulo cuando este es demasiado largo
    const newTitle = useMemo(()=>{
      return title.length > 17 ? `${title.substring(0,17)}...` : title
    }, [title])
  

    const onClickNote = ()=>{
      dispatch(setActiveNote({id, title, body, date,  imageUrls}))    //reducer redux: Configura la nota activa del state de redux
    }

  return (
    <ListItem disablePadding onClick={onClickNote}>
        <ListItemButton>
            <ListItemIcon>
                <TurnedInNot/>
            </ListItemIcon>
            <Grid container direction={'column'}>
                <ListItemText primary={newTitle} 
                              sx={{whiteSpace: 'nowrap'}}
                />
                <ListItemText secondary={body}/>   
            </Grid>
        </ListItemButton>
    </ListItem>
  )
}
