export default function toRotateLeft({activeItem, setItems, items}) {
    if(activeItem.type === 'stars') {
        setItems({...items, stars: items.stars.map((item)=>{
                if(item.id === activeItem.id) {
                    return {
                        ...item,
                        rotation: item.rotation - 5
                    };
                } else {
                    return {
                        ...item
                    }
                }
            })})
    } else {
        setItems({...items, texts: items.texts.map((item)=>{
                if(item.id === activeItem.id) {
                    return {
                        ...item,
                        rotation: item.rotation - 5
                    };
                } else {
                    return {
                        ...item
                    }
                }
            })})
    }
}