import { Link } from "react-router"

const CharactersByHero = ({alter_ego, characters})=>{
    return(
        <>
            {
                alter_ego !== characters && ( <p className="card-text">{alter_ego}</p>)
            }
        </>
    )
}


export const HeroCard = ({
    id,
    superhero,
    publisher,
    alter_ego,
    first_appearance,
    characters
 }) => {

    const heroImageUrl = `/heroes/${ id }.jpg`;

  return (
    <div className="col animate__animated animate__fadeIn">
        <div className="card">
                <div className="row no-gutters">

                         {/**Imagen */}
                        <div className="col-4">
                            <img className='card-img'src={heroImageUrl} alt={superhero} />
                        </div>

                        <div className="col-8">
                            <h5 className="card-title">
                                { superhero }
                            </h5>

                            <CharactersByHero alter_ego={alter_ego} characters={characters} />

                            <p className="card-text">
                               <small className="text-muted">{characters}</small> 
                            </p>

                            <Link to={`/hero/${id}`}>
                                Mas..
                            </Link>
                        </div>
                </div>
        </div>
    </div>
  )
}
