export default function deleteItem({activeItem, setItems, items}) {
    if(activeItem.type === 'stars') {
        setItems({...items, stars: items.stars.filter((item)=>item.id !== activeItem.id)})
    } else {
        setItems({...items, texts: items.texts.filter((item)=>item.id !== activeItem.id)})
    }
}