import React from "react";
import '../App.css';

const ImageComponent = ( { desc, author, id } ) => {
    return (
        <>
            <div className="card-container col-4" key={ id }>
                <div className="card">
                    <div className="card-body">
                        <span className="card-number card-circle subtle">{ id }</span>
                        <div className="card-read">Author: { author.substring( 0, 5 ) + "..." + author.substring( author.length - 5, author.length ) }</div>
                    </div>
                    <img src={ desc } alt="images" className="card-media" />
                    <span className="card-tag subtle">Tip Now</span>
                </div>
            </div>
        </>
    );
};

export default ImageComponent;