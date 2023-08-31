import React from "react";

import {ImageGalleryItem} from "./imageGalleryItem/imagegalleryitem";
import { Gallery } from "./imagegallery.styled";


export const ImageGallery = ({ images }) => {
    return (
        <Gallery>
            {images.map((image) => (
                <ImageGalleryItem
                    key={image.id}
                    smallImage={image.webformatURL}
                    largeImage={image.largeImageURL}
                    id={image.id}
                    description={image.tags}
                />
            ))}
        </Gallery>
    );
};