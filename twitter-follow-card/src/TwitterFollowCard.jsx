import { useState } from "react";
import "./TwitterFollowCard.css";
// Children es una prop especial de react que permite pasar elementos como props
export function TwitterFollowCard({formatUserName,username= "unknown", children, inicialIsFollowing}) {
    const [isFollowing, setIsFollowing] = useState(inicialIsFollowing);
    const handleClick=()=>{
      setIsFollowing(!isFollowing);
    }
    const buttonText = isFollowing ? "Siguiendo" : "Seguir";
    const buttonClassNmae=  isFollowing ? "tw-follow-card-button-following" : "tw-follow-card-button";
    return (
      <article className="tw-follow-card">
        <header className="tw-follow-card-header">
          <img
            className="tw-follow-card-avatar"
            alt="Elon Musk"
            src={`https://unavatar.io/${username}`}
          />
          <div className="tw-follow-card-info">
            {children}
            <span className="tw-follow-card-info-username">{formatUserName(username)}</span>
          </div>
        </header>
        <aside>
            <button className={buttonClassNmae} onClick={handleClick}>
                <span className="tw-follow-card-button-text">{buttonText}</span>
                <span className="tw-follow-card-stop-follow">Dejar de seguir</span>
            </button>
        </aside>
      </article>
    );
  }