import dataGiphy from '../mocks/with-results.json' with { type: "json"}

const API_KEY = 'K0Y6057JP7uv49wOnsA5SlZdyakc60AR'

export const getGifs = async(category)=>{
    try{
        const resp = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${category}&limit=10`)
        const {data} = await resp.json()
        
        const gifs = data.map(img =>({
          id:img.id,
          title: img.title,
          url: img.images.downsized_medium.url
        }))
          
        return gifs

    }catch(e){
        throw new Error(`Error get gift ${e}`)
    }
}


export const getGifsTest = async(category)=>{  // eslint-disable-line
    try{

        const { data } = dataGiphy;
        
        const gifs = data.map(img =>({
          id:img.id,
          title: img.title,
          url: img.images.downsized_medium.url
        }))
      
        return gifs

    }catch(e){
        throw new Error(`Error get gift ${e}`)
    }
}





