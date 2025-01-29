import { Navigate, useParams } from "react-router"
import { getHeroById } from "../helpers"
import { useNavigate } from "react-router";
import { useMemo } from "react";

export const HeroPage = () => {
  
  const {id} = useParams()
  
  const navigate = useNavigate();

  //const hero =
  const hero = useMemo(()=> getHeroById(id), [id]) 




 //Regresa a la pantalla anterior
  const onNavigateBack = ()=>{
    navigate(-1);                     //-1: Va a navegar al historial anterior
  }



  //Recomendado: Hacer el redireccionamiento usando <Navigate> y no el hook useNavigate antes del renderizado, como este escenario
  //Si el id no existe en la base de Hero, redirige a la pagina de marvel
  if(!hero) {
    return <Navigate to={'/marvel'} replace/>
  }

  return (
    <div className="row mt-5 animate__animated animate__fadeInLeft">
      <div className="col-4">
          <img 
              src={`/assets/${id}.jpg`} 
              alt={hero.superhero} 
              className="img-thumbnail"
            />
      </div>

      <div className="col-8">
          <h3>{hero.superhero}</h3>
          <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <b>Alter Ego:</b>{ hero.alter_ego}
              </li>
              <li className="list-group-item">
                <b>Publisher:</b> { hero.publisher}
              </li>
              <li className="list-group-item">
                <b>First appearence:</b> { hero.first_appearance}
              </li>
          </ul>  

          <h5 className="mt-3">Characters</h5>
          <p>{hero.characters}</p>
          
          <button 
              className="btn btn-primary"
              onClick={onNavigateBack}
          >
              Regresar
          </button>
      </div>

    </div>
  )
}
