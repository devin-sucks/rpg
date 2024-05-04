'use client'
import { useCompletion } from "ai/react";
import { useState } from "react";

const generate_image = async (story, set_image_url) => {

    const response = await fetch('/api/generate_visuals', {
        method: 'POST',
        body: JSON.stringify({
            story
        })
    })

    const { image_url } = await response.json()

    set_image_url(image_url)
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
            generate_image(c, set_image_url)
        }
    })

    const [input, set_input] = useState("")
    const [history, set_history] = useState([])
    const [image_url, set_image_url] = useState()

    return (
        <>
            <img src={image_url} alt="" className="absolute h-screen z-[-10]" />
            <div className="pt-20 px-20">
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
        </>
    )

}

export default Page;