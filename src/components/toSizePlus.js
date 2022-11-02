export default function toSizePlus({activeItem, setItems, items}) {
    if(activeItem.type === 'stars') {
        setItems({...items, stars: items.stars.map((item)=>{
                if(item.id === activeItem.id  && item.innerRadius < 100 && item.innerRadius < 200) {
                    return {
                        ...item,
                        innerRadius: item.innerRadius + 10,
                        outerRadius: item.outerRadius + 20
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
                        fontSize: item.fontSize + 1
                    };
                } else {
                    return {
                        ...item
                    }
                }
            })})
    }
}