'use client'
import { useCompletion } from "ai/react";
import { useState } from "react";

const Page = () => {

    const c = useCompletion({
        api: '/api/new'
    })

    const gc = useCompletion({
        api: '/api/generate_story'
    })

    const [input, set_input] = useState("")

    return (
        <div>
            <button onClick={() => {
                c.complete()
                console.log("here");
            }}>Hello</button>

            <div className="text-white">
                {c.completion}
            </div>

            <textarea
                onChange={e => set_input(e.target.value)}
                className="text-white border-gray-300 bg-opacity-15 bg-gray-400"
                onKeyDown={e => {
                    if (e.key === "Enter") {
                        gc.complete("", {
                            body: {
                                input
                            }
                        })
                    }
                }}
                value={input}
            >
            </textarea>
        </div>
    )

}

export default Page;