import {useState, useEffect} from 'react'
import axios from 'axios'
import "./QuoteGenerator.css"


const QuoteGenerator = () => {
    const [quote, setQuote] = useState([]);
    const [error, setError] = useState(null)

    const fecthQuote = async () => {
        const category = 'happiness';
        const apiUrl = `https://api.api-ninjas.com/v1/quotes?category=${category}`
        const apiKey =  import.meta.env.VITE_API_KEY;

        if (!apiKey) {
            setError('API key is missing');
            return;
        }

        try{
            const res = await axios.get(apiUrl,{
                headers:{
                    'X-API-Key' : apiKey,
                }
            })
                setQuote(res.data[0]);
                console.log(res.data)
                setError(null)
        }catch(err){
            setError(`Error: ${err.response?.status} ${err.response?.statusText}`);
            console.error(err)
        }
    };
    useEffect(() =>{
        fecthQuote()
    },[])

  return (
    <div className='container'>
        <div className='box'>
            <div className='header'>
                <h3>Quotes on Happiness</h3>
            </div>

            <div>
                <h4>&quot;{quote.quote}&quot;</h4>
                <p className='text'>-{quote.author}</p>
            </div>
            <div >
                <button onClick={fecthQuote}>Find Quote</button>
            </div>
        </div>
    </div>
  )
}

export default QuoteGenerator