export default function handleDragEndStars(e, setItems, items) {
    setItems({...items, stars: items.stars.map((item) => {
        return {
            ...item,
            isDragging: false,
        };
    })});
}