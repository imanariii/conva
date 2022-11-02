import React, {useRef, useState} from 'react';
import {Stage, Layer, Star, Text} from 'react-konva';
import { toRotateLeft, toRotateRight, toSizePlus, toSizeMinus, deleteItem, changeText, toExport } from "./components";

export function App () {
    const [activeItem, setActiveItem] = useState({ type: null, id: 0 })
    const [count, setCount] = useState({ stars: 0, texts: 0 })
    const [newText, setNewText] = useState('');
    const stageRef = useRef(null);

    const generateShapes = (count) => {
        return [...Array(count)].map((_, i) => ({
            id: i.toString(),
            x: 400,
            y: 400,
            fontSize: 16,
            text: 'Введите текст',
            innerRadius: 20,
            outerRadius: 40,
            rotation: 0,
            isDragging: false,
        }));
    }
    const [items, setItems] = useState({
        stars: generateShapes(count.stars),
        texts: generateShapes(count.texts)
    })

    const handleDragStart = (e) => {
        const id = e.target.id();
        if (e.target.name() === 'stars') {
            setItems({
                ...items, stars: items.stars.map((item) => {
                    return {...item, isDragging: item.id === id}})})
        } else {
            setItems({...items, texts: items.texts.map((item) => {
                return {...item, isDragging: item.id === id}})})
        }
    }

    const handleDragEnd = (e) => {
        if(e.target.name() === 'stars') {
            setItems({...items, stars: items.stars.map((item) => {
                return {...item, isDragging: false}
            })})
        } else {
            setItems({...items, texts: items.texts.map((item) => {
                return {...item, isDragging: false}
            })})
        }
    }

    const handleExport = () => {
        const uri = stageRef.current.toDataURL();
        toExport(uri, 'stage.png');
    };

    const toolsBar = (e) => setActiveItem({id: e.target.id(), type: e.target.name()});

    return (
      <>
      <div className="tools-bar">
          <div className="tools-bar-add">
              <h1>Добавить:</h1>
              <div>
                  <button onClick={()=>{
                      if(count.stars === 0) {
                          setCount({...count, stars: count.stars + 1 })
                          setItems({...items, stars: generateShapes(1)})
                      } else {
                        setCount({...count, stars: count.stars + 1 })
                        setItems({...items, stars: generateShapes(count.stars)})}
                      }}
                  >Звезду</button>
                  <button onClick={()=>{
                      if(count.texts === 0) {
                          setCount({...count, texts: count.texts + 1 })
                          setItems({...items, texts: generateShapes(1)})
                      } else {
                          setCount({...count, texts: count.texts + 1 })
                          setItems({...items, texts: generateShapes(count.texts)})}
                    }}
                  >Текст</button>
              </div>
          </div>
          <div className="tools-bar-edit">
              {(typeof activeItem.type === "string") && (
                  <>
                      <h1>Edit {activeItem.type}</h1>
                      <div>

                          <div className="tools-bar-item">
                              <h3>Повернуть:</h3>
                              <button onClick={()=>toRotateRight({activeItem, setItems, items})}>To right</button>
                              <button onClick={()=>toRotateLeft({activeItem, setItems, items})}>To left</button>
                          </div>

                          <div className="tools-bar-item">
                              <h3>Размер:</h3>
                              <button onClick={()=>toSizePlus({activeItem, setItems, items})}>Plus</button>
                              <button onClick={()=>toSizeMinus({activeItem, setItems, items})}>Minus</button>
                          </div>

                          <div className="tools-bar-item">
                              <h3>Удаление объекта:</h3>
                              <button onClick={()=>deleteItem({activeItem, setItems, items})}>Удалить</button>
                          </div>
                          <div className="tools-bar-item">
                              <h3>Экспорт:</h3>
                              <button onClick={handleExport}>Загрузить файл</button>
                          </div>
                          <div className={`tools-bar-item input ${activeItem.type === 'texts' && 'opacity-true'}`}>
                              <h3>Изменение текста:</h3>
                              <input type="text" value={newText} onChange={(e)=>setNewText(e.target.value)} placeholder="Введите текст" />
                              <button onClick={()=>changeText({activeItem, setItems, items, newText})}>Применить изменения</button>
                          </div>
                      </div>
                  </>
              )}
              {(typeof activeItem.type !== 'string') && (<h1>Для включения режима редактора тапните по созданной звездочке или тексту</h1>)}
          </div>
      </div>
      <div className="wrapper__canvas">
          <Stage width={window.innerWidth} height={window.innerHeight} ref={stageRef}>
              <Layer>
                  {items.stars && items.stars.map((star) => (
                      <Star
                          key={star.id}
                          name={'stars'}
                          id={star.id}
                          x={star.x}
                          y={star.y}
                          innerRadius={star.innerRadius}
                          outerRadius={star.outerRadius}
                          width={100}
                          fill={star.isDragging ? 'green' : '#89b717'}
                          opacity={0.8}
                          draggable
                          rotation={star.rotation}
                          shadowColor="black"
                          shadowBlur={10}
                          shadowOpacity={0.6}
                          shadowOffsetX={star.isDragging ? 10 : 5}
                          shadowOffsetY={star.isDragging ? 10 : 5}
                          scaleX={star.isDragging ? 1.2 : 1}
                          scaleY={star.isDragging ? 1.2 : 1}
                          onClick={toolsBar}
                          onTap={toolsBar}
                          onDragStart={handleDragStart}
                          onDragEnd={handleDragEnd}
                      />
                  ))}
                  {items.texts && items.texts.map((text) => (
                      <Text
                          key={text.id}
                          id={text.id}
                          fontSize={text.fontSize}
                          name={'texts'}
                          x={text.x}
                          y={text.y}
                          numPoints={5}
                          opacity={0.8}
                          draggable
                          rotation={text.rotation}
                          shadowColor="black"
                          shadowBlur={10}
                          shadowOpacity={0.6}
                          shadowOffsetX={text.isDragging ? 10 : 5}
                          shadowOffsetY={text.isDragging ? 10 : 5}
                          scaleX={text.isDragging ? 1.2 : 1}
                          scaleY={text.isDragging ? 1.2 : 1}
                          text={text.text}
                          onClick={toolsBar}
                          onTap={toolsBar}
                          fill={text.isDragging ? 'green' : 'black'}
                          onDragStart={handleDragStart}
                          onDragEnd={handleDragEnd}
                      />
                  ))}
              </Layer>
          </Stage>
      </div>
      </>
    );
};

