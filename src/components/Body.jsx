import { useState } from "react";
// import OpenAI from "openai";

const Body = () => {

    const [userObj, setUserObj] = useState({
        userText: "",
        language: ""
    })
    const [showTranslation, setShowTranslation] = useState(false)
    const [responseObj, setResponseObj] = useState("")

    const handleChange = (e) => {
        const { name, value } = e.target
        setUserObj(prevVals => {
            if(name === "langSel") {
                return {
                    ...prevVals,
                    language: value
                }
            } else if (name === "userInput") {
                return {
                    ...prevVals,
                    userText: value
                }
            }
        })
    }

    const handleClick = async () => {
        if (userObj.language === "" || userObj.userText === "") {
            alert("Please make sure there is text to translate and that the language has been selected.")
        } else {
            console.log(userObj);
            await callOpenAi()
            setShowTranslation(true)

    
        }
    }

    const callOpenAi = async () => {       
        // Logic for making the API call to the cloudfare helper
        try {
            const messages = [
                        {"role": "developer", "content": `You are a language translator. Translate the following text from English to ${userObj.language}`},
                        {"role": "user", "content": userObj.userText}
                    ]
            const url = "https://openai-api-worker.mclifford1984.workers.dev"
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(messages)
            })
            const status = response.status
            if (status === 200) {
                const data = await response.json()
                delete data.request_id
                setResponseObj(data.content)
            } else {
                setResponseObj("There was a problem with the API call. Contact Matt.")
            }
            
        } catch (error) {
            setResponseObj("There was a problem with the API call. Contact Matt.")
            
        }
        // setResponseObj("API is currently set to false to avoid token waste. Please contact author.")
    }

    const reset = () => {
        setShowTranslation(false)
        setUserObj(() => {
            return {
                userText: "",
                language: ""
            }
        })
        setResponseObj("")
    }

    return (
        <div className="main_body">

            <div className="box">
                <p className="instruction">Text to translate</p>
                <textarea name="userInput" onChange={handleChange} placeholder="Enter text here" value={userObj.userText}></textarea>
            </div>
            
            <div className="box">
                {showTranslation ? responseObj : 
                <>
                    <p className="instruction">Select language</p>
                    <p className="language">
                        <input 
                            type="radio" 
                            name="langSel"
                            value="french" 
                            id="french"
                            checked={userObj.language === "french"}
                            onChange={handleChange} 
                        />
                        <label htmlFor="french">French <img src="/assets/fr-flag.png" alt="" /></label>
                    </p>
                    <p className="language">
                        <input 
                            type="radio" 
                            name="langSel"
                            value="spanish" 
                            id="spanish"
                            checked={userObj.language === "spanish"}
                            onChange={handleChange} 
                        />
                        <label htmlFor="spanish">Spanish<img src="/assets/sp-flag.png" alt="" /></label>
                    </p>
                    <p className="language"> 
                        <input 
                            type="radio" 
                            name="langSel"
                            value="japanese" 
                            id="japanese"
                            checked={userObj.language === "japanese"}
                            onChange={handleChange} 
                        />
                        <label htmlFor="japanese">Japanese<img src="/assets/jpn-flag.png" alt="" /></label>
                    </p>
                </>
            }
            </div>
            
            <div className="box">
                {showTranslation ? 
                    <button id="btn" onClick={reset}>Start Over</button>
                : 
                    <button id="btn" onClick={handleClick}>Translate</button>
                }
            </div>
            
        </div>
    )
}

export default Body