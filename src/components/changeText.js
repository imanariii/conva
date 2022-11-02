export default function changeText({activeItem, setItems, items, newText}) {
    setItems({...items, texts: items.texts.map((item)=>{
            if(item.id === activeItem.id) {
                return {
                    ...item,
                    text: newText
                }
            } else {
                return {
                    ...item
                }
            }
        })})
}