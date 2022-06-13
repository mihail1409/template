import React from 'react';

export default function track (props: { image: string; name: string; desc: string }) {
    return (
        <div className="track">
        <div>
          <img className="track-image" src={props.image} alt="track-img"></img>
        </div>
        <div className="track-name">
          {props.name}
           <div className="track-author">
              {props.desc}  
            </div>
        </div>
      </div>
    );
}