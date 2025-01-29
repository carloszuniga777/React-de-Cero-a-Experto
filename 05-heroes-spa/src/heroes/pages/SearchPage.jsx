import { /*useNavigate,*/ useSearchParams } from "react-router"
import { useForm } from "../../hooks"
import { HeroCard } from "../components"
import { getHeroByName } from "../helpers";



export const SearchPage = () => {
 

  //------------------------------------------------------
  //Obteniendo el params de la url

  //const navigate = useNavigate()  //Manera antigua de configurar los params del Navigate

  //Obteniendo el query string
  const [searchParams, setSearchParams] = useSearchParams();
  
  //Obteniendo el query parameters:
  //const {q = ''} = Object.fromEntries(searchParams.entries())  //Otra manera de optener el query string | esto sirve por si se quiere recibir otros parametros
   const q = searchParams.get('q')

   //----------------------------------------------------
   // Se busca el heroe en base 
   
   const heroes = getHeroByName(q)
  

  //------------------------------------------------------
  //Mostrar o esconder encabezado de busqueda
  
  const showSearh = (q?.length === 0)
  const showError = (q?.length > 0) && heroes.length === 0


  //------------------------------------------------------
  //Custom hook para manejo de formulario
  
  const {searchText, onInputChange, onResetForm} = useForm({
    searchText: ''
  })

  //-----------------------------------------------------
  
  const onSearchSubmit = (event)=>{
    event.preventDefault()

   // if(searchText.trim().length <= 1) return

    //navigate(`?q=${searchText}`)     //Manera antigua de configurar los params del Navigate con Query parameters
    
    setSearchParams({q: searchText })  //Configurando el Query parameters
    
    onResetForm()
  }



  return (
    <>
        <h1>SearchPage</h1>
        <hr />

        <div className="row">

              <div className="col-5">
                  <h4>Searching</h4>
                  <hr />
                  <form onSubmit={onSearchSubmit}>
                      <input type="text" 
                            placeholder="Search a hero"
                            className="form-control"
                            name="searchText"
                            autoComplete="off"
                            value={searchText}
                            onChange={onInputChange}
                      />

                      <button className="btn btn-outline-primary mt-1">
                          Search
                      </button>
                  </form>
              </div>

              <div className="col-7">
                  <h4>Result</h4>
                  <hr/>

                  <div className="alert alert-primary animate__animated animate__fadeIn" style={{display: showSearh ? '' : 'none'}}>
                      Search a hero
                  </div>

                  <div className="alert alert-danger animate__animated animate__fadeIn" style={{display: showError ? '' : 'none'}}>
                        No hero with <b>{q}</b>
                  </div>


                  {
                    heroes.map(hero =>(
                      <HeroCard key={hero.id} {...hero}/> 
                    ))
                  }       
                 
              </div>
        </div>

    </>
  )
}
