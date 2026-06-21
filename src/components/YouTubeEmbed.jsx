import { useState } from 'react';
import './YouTubeEmbed.css';

export default function YouTubeEmbed({ videoId, title, lang }) {
  const [playing, setPlaying] = useState(false);
  if (!videoId) return null;

  return (
    <div className="yt-embed">
      {playing ? (
        <iframe
          className="yt-embed-frame"
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`}
          title={title || 'YouTube video'}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button
          className="yt-embed-thumb"
          onClick={() => setPlaying(true)}
          aria-label={`เล่นวิดีโอ ${title || ''}`}
          style={{ backgroundImage: `url(https://img.youtube.com/vi/${videoId}/hqdefault.jpg)` }}
        >
          <span className="yt-embed-play" aria-hidden="true">▶</span>
        </button>
      )}
      {(title || lang) && (
        <div className="yt-embed-caption">
          {title}{lang && <span className="yt-embed-lang"> · {lang}</span>}
        </div>
      )}
    </div>
  );
}
