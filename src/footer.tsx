import React from 'react';


export default function footer(){
    return(
        <footer className="footer">
        <div className="player">
          <div className="track-info">
            <div>
              <img className="author-image" src="./images/dora2.jpg" alt="img"/>            
            </div>
            <div className="author-name">
              <div>
                Дора<br></br>
                Я боюсь людей
              </div>    
            </div>
            <div>
              <input type="image" alt="img" className="playing-image" src="./images/love.png" id="footerHeart" />
            </div>
            <div>
              <input type="image"  alt="img" className="pip-image" src="./images/windowed.png" id="pip"/>
            </div>
          </div><audio controls className="playing-main">
          </audio>            
        </div>
      </footer>
    );
}