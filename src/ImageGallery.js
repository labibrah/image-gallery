import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const initialImages = [
    // Add your initial image data here
    { id: 'image-1', url: 'https://picsum.photos/200/300', featured: false },
    { id: 'image-2', url: 'https://picsum.photos/200/200', featured: false },
    // ...
];

const ImageGallery = () => {
    const [images, setImages] = useState(initialImages);

    const handleDragEnd = (result) => {
        if (!result.destination) return;

        const newImages = Array.from(images);
        const [reorderedImage] = newImages.splice(result.source.index, 1);
        newImages.splice(result.destination.index, 0, reorderedImage);

        setImages(newImages);
    };

    const handleDelete = (id) => {
        setImages(images.filter(image => image.id !== id));
    };

    const handleSetFeatured = (id) => {
        setImages(images.map(image => ({
            ...image,
            featured: image.id === id,
        })));
    };

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="grid">
                {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                        {images.map((image, index) => (
                            <Draggable key={image.id} draggableId={image.id} index={index}>
                                {(provided) => (
                                    <div
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        ref={provided.innerRef}
                                    >
                                        <img src={image.url} alt="" />
                                        <button onClick={() => handleDelete(image.id)}>Delete</button>
                                        <button onClick={() => handleSetFeatured(image.id)}>Set as Featured</button>
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
};

export default ImageGallery;
