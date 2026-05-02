import { useState } from "react"

const id = () => crypto.randomUUID()

export const useFlow = () => {
  const [flow, setFlow] = useState<{ nodes: any[] }>({
    nodes: []
  })

  // ➕ Add Input Node
  const addInputNode = (text: string) => {
    const node = {
      id: id(),
      type: "input",
      parentButtonName: null,
      blocks: [{ id: id(), type: "paragraph", text }],
      buttons: []
    }

    setFlow(prev => ({ nodes: [...prev.nodes, node] }))
  }

  // 🔘 Add Button + Auto Next Node
  const addButton = (nodeId: string, btnText: string, type: string) => {
    const nextId = id()

    const newNode = {
      id: nextId,
      type,
      parentButtonName: btnText,
      blocks: [],
      buttons: []
    }

    setFlow(prev => ({
      nodes: prev.nodes
        .map(n => {
          if (n.id === nodeId) {
            return {
              ...n,
              buttons: [
                ...n.buttons,
                {
                  id: id(),
                  text: btnText,
                  nextNodeId: nextId
                }
              ]
            }
          }
          return n
        })
        .concat(newNode)
    }))
  }

  // 🧱 Add Block (heading / para / image)
  const addBlock = (nodeId: string, type: string) => {
  setFlow(prev => ({
    nodes: prev.nodes.map(n => {
      if (n.id === nodeId) {
        let newBlock: any = { id: id(), type }

        if (type === "heading" || type === "paragraph") {
          newBlock.text = ""
        }

        if (type === "image") {
          newBlock.url = ""
        }

        if (type === "input") {
          newBlock.label = ""
          newBlock.placeholder = ""
        }

        return {
          ...n,
          blocks: [...n.blocks, newBlock]
        }
      }
      return n
    })
  }))
}


const updateBlock = (nodeId: string, blockId: string, data: any) => {
  setFlow(prev => ({
    nodes: prev.nodes.map(node => {
      if (node.id !== nodeId) return node

      return {
        ...node,
        blocks: node.blocks.map((block : any) => {
          if (block.id !== blockId) return block
          return { ...block, ...data }
        })
      }
    })
  }))
}


const deleteBlock = (nodeId: string, blockId: string) => {
  setFlow(prev => ({
    nodes: prev.nodes.map(node => {
      if (node.id !== nodeId) return node

      return {
        ...node,
        blocks: node.blocks.filter((b: any) => b.id !== blockId)
      }
    })
  }))
}
  



const deleteButton = (nodeId: string, btnId: string) => {
  setFlow(prev => {
    let deleteNodeId: string | null = null

    const updatedNodes = prev.nodes.map(node => {
      if (node.id !== nodeId) return node

      const btn = node.buttons.find((b: any) => b.id === btnId)
      if (btn) {
        deleteNodeId = btn.nextNodeId
      }

      return {
        ...node,
        buttons: node.buttons.filter((b: any) => b.id !== btnId)
      }
    })

    // 🔥 ALSO REMOVE LINKED NODE
    const finalNodes = updatedNodes.filter((n: any) => n.id !== deleteNodeId)

    return { nodes: finalNodes }
  })
}

  return {
    flow,
    addInputNode,
    addButton,
    addBlock,
    updateBlock,
    deleteBlock,
    deleteButton
  }
}