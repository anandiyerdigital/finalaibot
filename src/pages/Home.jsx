

import logo from '../pages/logo.png'

import { Configuration, OpenAIApi } from "openai";


import { useState } from "react";


export default function Home() {


  const [animalInput, setAnimalInput] = useState("");
  const [result, setResult] = useState();



  async function onSubmit(event) {
    event.preventDefault();
    


    const configuration = new Configuration({
      apiKey: process.env.REACT_APP_OPENAPI_KEY,
    });

    console.log(process.env.REACT_APP_OPENAPI_KEY)
    const openai = new OpenAIApi(configuration)
    
    openai.createCompletion({
      model: "text-davinci-002",
      prompt: animalInput,
      temperature: 0.7,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,

    }).then((response)=>{
      console.log(response.data.choices[0].text)
      setResult(response.data.choices[0].text)
      
    })

    function generatePrompt(animal) {
      const capitalizedAnimal =
        animal[0].toUpperCase() + animal.slice(1).toLowerCase();
      return `${capitalizedAnimal}`;
    }

  
    
  }

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
        <img src={logo} />
          <h1 className="text-5xl font-bold">AI Bot</h1>
          
          <p className="py-6">
          I am a highly intelligent question answering bot built by Alltech Creative Team. If you ask me a question that is rooted in truth, I will give you the answer. If you ask me a question that is nonsense, trickery, or has no clear answer, I will respond with "Unknown".
          </p>

          <form onSubmit={onSubmit} method="post">
          <input
          class="input w-full max-w-xs"
            type="text"
            name="animal"
            placeholder="Please enter a question here"
            value={animalInput}
            onChange={(e) => setAnimalInput(e.target.value)}
          />
          <button className="btn btn-primary" type="submit" value="Give me the answer">Submit</button>
        </form>

        <div>{result}</div>

        </div>

      
        
        
      </div>
    </div>
  );
}




