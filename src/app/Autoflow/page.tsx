"use client"
import { useState } from "react"
import { useFlow } from "@/hooks/useFlow"

export default function Page() {
    const { flow, addInputNode, addButton, addBlock, updateBlock, deleteBlock, deleteButton } = useFlow()

    const [input, setInput] = useState("")
    const [btnName, setBtnName] = useState("")
    const [selectedNode, setSelectedNode] = useState<string | null>(null)
    const [dark, setDark] = useState(true)

    const handleSave = () => {
        console.log("FLOW DATA 👉", flow)
    }

    console.log("deleteButton 👉", deleteButton)


    return (
        <div className={dark ? "dark" : ""}>


            <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white mt-20">

                {/* LEFT */}

                <div className="w-[25%] bg-white dark:bg-gray-800 p-4 border-r">

                    <h2 className="mb-2 font-semibold">Inputs</h2>

                    <input
                        className="w-full px-3 py-2 border rounded dark:bg-gray-700"
                        placeholder="Type input..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && input) {
                                addInputNode(input)
                                setInput("")
                            }
                        }}
                    />

                    <button
                        onClick={() => setDark(!dark)}
                        className="mt-4 px-3 py-1 bg-black text-white dark:bg-white dark:text-black rounded"
                    >
                        Toggle Dark
                    </button>
                </div>

                {/* CENTER */}
                <div className="w-[50%] p-4 space-y-4 overflow-auto">

                    {flow.nodes.map(node => (
                        <div
                            key={node.id}
                            onClick={() => setSelectedNode(node.id)}
                            className={`p-4 rounded-xl border cursor-pointer transition
              ${selectedNode === node.id
                                    ? "border-blue-500 shadow-lg"
                                    : "border-gray-300 dark:border-gray-700"
                                }
              bg-white dark:bg-gray-800`}
                        >
                            {node.parentButtonName && (
                                <div className="text-xs mb-2 text-gray-500">
                                    Reply of: <b>{node.parentButtonName}</b>
                                </div>
                            )}

                            {/* BLOCKS */}
                            {node.blocks.map((block: any) => {

                                // 🔥 HEADING
                                if (block.type === "heading") {
                                    return (

                                        <div key={block.id} className="relative group">

                                            {/* ❌ DELETE BTN */}
                                            <button
                                                onClick={() => deleteBlock(node.id, block.id)}
                                                className="absolute right-0 top-0 text-red-500 text-xs opacity-0 group-hover:opacity-100"
                                            >
                                                ✕
                                            </button>
                                            <input
                                                value={block.text}
                                                onChange={(e) =>
                                                    updateBlock(node.id, block.id, { text: e.target.value })
                                                }
                                                placeholder="Heading..."
                                                className="w-full font-bold text-lg bg-transparent outline-none"
                                            />
                                        </div>
                                    )
                                }

                                // 🔥 PARA
                                if (block.type === "paragraph") {
                                    return (
                                        <div key={block.id} className="relative group">

                                            {/* ❌ DELETE BTN */}
                                            <button
                                                onClick={() => deleteBlock(node.id, block.id)}
                                                className="absolute right-0 top-0 text-red-500 text-xs opacity-0 group-hover:opacity-100"
                                            >
                                                ✕
                                            </button>
                                            <textarea
                                                value={block.text}
                                                onChange={(e) =>
                                                    updateBlock(node.id, block.id, { text: e.target.value })
                                                }
                                                placeholder="Paragraph..."
                                                className="w-full bg-transparent outline-none"
                                            />
                                        </div>
                                    )
                                }

                                // 🔥 IMAGE
                                if (block.type === "image") {
                                    return (
                                        <div key={block.id} className="relative group">

                                            {/* ❌ DELETE BTN */}
                                            <button
                                                onClick={() => deleteBlock(node.id, block.id)}
                                                className="absolute right-0 top-0 text-red-500 text-xs opacity-0 group-hover:opacity-100"
                                            >
                                                ✕
                                            </button>
                                            <div className="mb-3">

                                                {/* FILE INPUT */}
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    className="w-full text-sm"
                                                    onChange={(e) => {
                                                        const file = e.target.files?.[0]
                                                        if (!file) return

                                                        const preview = URL.createObjectURL(file)

                                                        updateBlock(node.id, block.id, {
                                                            file,
                                                            preview
                                                        })
                                                    }}
                                                />

                                                {/* PREVIEW */}
                                                {block.preview && (
                                                    <img
                                                        src={block.preview}
                                                        className="w-full h-40 object-cover mt-2 rounded"
                                                    />
                                                )}

                                            </div>
                                        </div>
                                    )
                                }

                                // 🔥 INPUT FIELD (FORM)
                                if (block.type === "input") {
                                    return (
                                        <div key={block.id} className="relative group">

                                            {/* ❌ DELETE BTN */}
                                            <button
                                                onClick={() => deleteBlock(node.id, block.id)}
                                                className="absolute right-0 top-0 text-red-500 text-xs opacity-0 group-hover:opacity-100"
                                            >
                                                ✕
                                            </button>
                                            <div key={block.id} className="mb-2">

                                                <input
                                                    value={block.label}
                                                    onChange={(e) =>
                                                        updateBlock(node.id, block.id, { label: e.target.value })
                                                    }
                                                    placeholder="Label"
                                                />

                                                <input
                                                    value={block.placeholder}
                                                    onChange={(e) =>
                                                        updateBlock(node.id, block.id, { placeholder: e.target.value })
                                                    }
                                                    placeholder="Placeholder"
                                                />
                                            </div>
                                        </div>
                                    )
                                }

                            })}

                            {/* BUTTONS */}
                            <div className="flex gap-2 mt-3 flex-wrap">
                                {node.buttons.map((btn: any) => (
                                    <div key={btn.id} className="relative group">
                                          
                                        {/* ❌ DELETE BTN */}
                                        <button
                                            onClick={() => deleteButton(node.id, btn.id)}
                                            className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1 opacity-0 group-hover:opacity-100"
                                        >
                                            ✕
                                        </button>


                                        {/* BUTTON */}
                                        <button className="bg-green-500 text-white px-3 py-1 rounded">
                                            {btn.text}
                                        </button>

                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* RIGHT */}
                <div className="w-[25%] bg-white dark:bg-gray-800 p-4 border-l">
                    <h2 className="mb-3 font-semibold">Edit</h2>

                    {selectedNode && (
                        <>
                            <button
                                onClick={() => addBlock(selectedNode, "heading")}
                                className="w-full mb-2 bg-blue-500 text-white py-2 rounded"
                            >
                                Add Heading
                            </button>

                            <button
                                onClick={() => addBlock(selectedNode, "paragraph")}
                                className="w-full mb-2 bg-gray-500 text-white py-2 rounded"
                            >
                                Add Paragraph
                            </button>

                            <button
                                onClick={() => addBlock(selectedNode, "image")}
                                className="w-full mb-2 bg-yellow-500 text-white py-2 rounded"
                            >
                                Add Image
                            </button>

                            <button
                                onClick={() => addBlock(selectedNode, "input")}
                                className="w-full mb-2 bg-purple-500 text-white py-2 rounded"
                            >
                                Add Input Field
                            </button>

                            <input
                                value={btnName}
                                onChange={(e) => setBtnName(e.target.value)}
                                placeholder="Button name"
                                className="w-full border px-2 py-1 rounded mt-3 dark:bg-gray-700"
                            />

                            <button
                                onClick={() => {
                                    if (!btnName) return
                                    addButton(selectedNode, btnName, "form")
                                    setBtnName("")
                                }}
                                className="w-full mt-2 bg-green-500 text-white py-2 rounded"
                            >
                                Add Button
                            </button>
                            <button
                                onClick={handleSave}
                                className="mt-4 w-full bg-blue-600 text-white py-2 rounded"
                            >
                                Save Flow
                            </button>
                        </>
                    )}
                </div>

            </div>
        </div>
    )
}