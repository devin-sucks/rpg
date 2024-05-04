'use client'
import { useCompletion } from "ai/react";
import { useState } from "react";

const generate_image = async (story) => {

    const response = await fetch('/api/generate_visuals', {
        method: 'POST',
        body: JSON.stringify({
            story
        })
    })

    const body = await response.json()

    console.log(body);
}

const Page = () => {

    const c = useCompletion({
        api: '/api/new',
        onFinish: (p, c) => {
            console.log(c);
            set_history([c])
        }
    })

    const gc = useCompletion({
        api: '/api/generate_story',
        onFinish: (p, c) => {
            set_history(arr => [...arr, c])
        }
    })

    const [input, set_input] = useState("")
    const [history, set_history] = useState([])

    return (
        <div className="pt-20 px-20">
            <button onClick={() => generate_image(history.at(-1))}>img</button>
            <div className="w-full grid place-content-center">
                <button className="" onClick={() => c.complete()}>Start</button>
            </div>

            <div className="text-white flex flex-col space-y-4">
                {history.length === 0 && <div>{c.completion}</div>}
                {history.map((text, idx) => {
                    return (
                        <div key={idx}>
                            {text}
                        </div>
                    )
                })}
                {gc.isLoading && <div>{gc.completion}</div>}
            </div>

            <div className="">
                <textarea
                    onChange={e => set_input(e.target.value)}
                    className="text-white border-gray-300 bg-opacity-15 bg-gray-400 w-full rounded-md"
                    onKeyDown={e => {
                        if (e.key === "Enter") {
                            gc.complete("", {
                                body: {
                                    input,
                                    history
                                }
                            })
                            set_input("")
                        }
                    }}
                    value={input}
                >
                </textarea>
            </div>
        </div>
    )

}

export default Page;