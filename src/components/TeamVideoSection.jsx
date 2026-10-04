import React, { useRef, useState, useEffect } from 'react';

const VIDEO_LIST = [
  {
    id: 'video2',
    stage: 'STAGE 01',
    pill: 'Mine Sourcing & Sorting',
    title: 'Captive Mine Ore Sourcing & Sorting',
    desc: 'Careful selection of high-grade mineral strata, selective in-pit excavation, and manual quality sorting directly at our mining lease.',
    src: '/videos/video2.mp4',
    altSrc: '/video2.mp4',
    isFeatured: false,
    nextId: 'video1',
    prevId: 'video3'
  },
  {
    id: 'video1',
    stage: 'STAGE 02',
    pill: 'Heavy Excavation & Extraction',
    title: 'Active Mine Excavation & Earthmoving',
    desc: 'Continuous heavy excavation, overburden stripping, and high-capacity earthmoving by our mining team to unearth high-purity clay seams.',
    src: '/videos/video1.mp4',
    altSrc: '/video1.mp4',
    isFeatured: true,
    nextId: 'video3',
    prevId: 'video2'
  },
  {
    id: 'video3',
    stage: 'STAGE 03',
    pill: 'Haulage & Stockpiling',
    title: 'Deposit Haulage & Batch Stockpiling',
    desc: 'Systematic raw material stockpiling, grade-wise batch segregation, and dedicated haulage from the quarry floor to processing facilities.',
    src: '/videos/video3.mp4',
    altSrc: '/video3.mp4',
    isFeatured: false,
    nextId: 'video2',
    prevId: 'video1'
  }
];

export default function TeamVideoSection() {
  const [activeVideoId, setActiveVideoId] = useState('video2'); // Start with Stage 01
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState({ video1: 0, video2: 0, video3: 0 });
  const [activeVideoModal, setActiveVideoModal] = useState(null);

  const videoRefs = {
    video2: useRef(null),
    video1: useRef(null),
    video3: useRef(null)
  };

  const cardRefs = {
    video2: useRef(null),
    video1: useRef(null),
    video3: useRef(null)
  };

  const sliderRef = useRef(null);
  const sectionRef = useRef(null);

  // Synchronize playback: only activeVideoId plays
  useEffect(() => {
    Object.keys(videoRefs).forEach((id) => {
      const vid = videoRefs[id]?.current;
      if (!vid) return;

      if (id === activeVideoId && isPlaying) {
        vid.muted = isMuted;
        vid.play().catch(() => {
          vid.muted = true;
          setIsMuted(true);
          vid.play().catch((e) => console.warn(e));
        });
      } else {
        vid.pause();
        vid.currentTime = 0;
        setProgress((prev) => ({ ...prev, [id]: 0 }));
      }
    });
  }, [activeVideoId, isPlaying]);

  // Handle Mute changes
  useEffect(() => {
    const vid = videoRefs[activeVideoId]?.current;
    if (vid) {
      vid.muted = isMuted;
    }
  }, [isMuted, activeVideoId]);

  // Sync active card on mobile swipe/scroll
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    let timeoutId = null;
    const handleScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const sliderScrollLeft = slider.scrollLeft;
        let closestId = activeVideoId;
        let minDiff = Infinity;

        VIDEO_LIST.forEach((item) => {
          const cardEl = cardRefs[item.id]?.current;
          if (cardEl) {
            const cardLeft = cardEl.offsetLeft - slider.offsetLeft;
            const diff = Math.abs(cardLeft - sliderScrollLeft);
            if (diff < minDiff) {
              minDiff = diff;
              closestId = item.id;
            }
          }
        });

        if (closestId && closestId !== activeVideoId) {
          setActiveVideoId(closestId);
        }
      }, 80);
    };

    slider.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      slider.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
    };
  }, [activeVideoId]);

  // Handle Video Time Update for Progress Bar
  const handleTimeUpdate = (id) => {
    const vid = videoRefs[id]?.current;
    if (!vid || !vid.duration) return;
    const currentProg = (vid.currentTime / vid.duration) * 100;
    setProgress((prev) => ({ ...prev, [id]: currentProg }));
  };

  // Auto-advance to next video when current ends
  const handleVideoEnded = (currentId) => {
    const currentItem = VIDEO_LIST.find((v) => v.id === currentId);
    if (currentItem && currentItem.nextId) {
      scrollToCard(currentItem.nextId);
    }
  };

  // Smooth slide to selected card
  const scrollToCard = (id) => {
    setActiveVideoId(id);
    setIsPlaying(true);
    const cardEl = cardRefs[id]?.current;
    if (cardEl && sliderRef.current) {
      cardEl.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'start'
      });
    }
  };

  // Next / Prev slide handlers
  const handleNext = () => {
    const current = VIDEO_LIST.find((v) => v.id === activeVideoId);
    if (current?.nextId) scrollToCard(current.nextId);
  };

  const handlePrev = () => {
    const current = VIDEO_LIST.find((v) => v.id === activeVideoId);
    if (current?.prevId) scrollToCard(current.prevId);
  };

  // User click on card or play button
  const handleCardClick = (id) => {
    if (activeVideoId === id) {
      const vid = videoRefs[id]?.current;
      if (vid) {
        if (vid.paused) {
          vid.play().then(() => setIsPlaying(true)).catch((e) => console.warn(e));
        } else {
          vid.pause();
          setIsPlaying(false);
        }
      }
    } else {
      scrollToCard(id);
    }
  };

  // Sound toggle button click
  const handleToggleMute = (e, id) => {
    e.stopPropagation();
    const vid = videoRefs[id]?.current;
    if (!vid) return;

    if (activeVideoId !== id) {
      scrollToCard(id);
    }

    const nextMute = !isMuted;
    setIsMuted(nextMute);
    vid.muted = nextMute;
    vid.volume = 1.0;

    if (vid.paused) {
      vid.play().then(() => setIsPlaying(true)).catch((err) => console.warn(err));
    }
  };

  // Expand modal
  const handleExpand = (e, src, title) => {
    e.stopPropagation();
    setActiveVideoModal({ src, title });
  };

  return (
    <section className="team-video-section section-pad" id="team-operations" ref={sectionRef}>
      <div className="container">
        {/* Section Header */}
        <div className="section-head reveal-on-scroll">
          <div>
            <span className="section-number">OUR CAPTIVE MINES & EXTRACTION</span>
            <h2>
              Direct From Source:<br />
              <span>Our Captive Mines & Extraction in Action.</span>
            </h2>
          </div>
          <p>
            Take a direct look at our raw material mining operations. From active mineral deposit excavation to in-pit grading and raw batch haulage, our captive mining sites ensure abundant, consistent, and uninterrupted crude attapulgite and bentonite reserves.
          </p>
        </div>

        {/* 9:16 Video Grid / Mobile Horizontal Swipe Carousel */}
        <div className="team-video-grid reveal-on-scroll" ref={sliderRef}>
          {VIDEO_LIST.map((item) => {
            const isActive = activeVideoId === item.id;
            const isCurrentPlaying = isActive && isPlaying;

            return (
              <div
                key={item.id}
                ref={cardRefs[item.id]}
                className={`team-video-card ${item.isFeatured ? 'featured-card' : 'side-card'} ${
                  isActive ? 'card-now-active' : ''
                }`}
                onClick={() => handleCardClick(item.id)}
              >
                {item.isFeatured && (
                  <div className="featured-crown-badge">
                    <span className="star-icon">★</span>
                    <span>CORE MINING OPERATIONS</span>
                  </div>
                )}

                <div className="video-wrapper">
                  <video
                    ref={videoRefs[item.id]}
                    src={item.src}
                    playsInline
                    preload="auto"
                    muted={isMuted}
                    onTimeUpdate={() => handleTimeUpdate(item.id)}
                    onEnded={() => handleVideoEnded(item.id)}
                    onPlay={() => {
                      if (activeVideoId === item.id) setIsPlaying(true);
                    }}
                    onPause={() => {
                      if (activeVideoId === item.id) setIsPlaying(false);
                    }}
                  >
                    <source src={item.src} type="video/mp4" />
                    <source src={item.altSrc} type="video/mp4" />
                    Your browser does not support HTML5 video.
                  </video>

                  {/* Top Controls: Sound & Expand */}
                  <div className="video-top-controls" onClick={(e) => e.stopPropagation()}>
                    <button
                      type="button"
                      className={`video-control-btn sound-btn ${!isMuted && isActive ? 'sound-active' : ''}`}
                      onClick={(e) => handleToggleMute(e, item.id)}
                      aria-label={isMuted ? 'Turn Sound ON' : 'Turn Sound OFF'}
                      title={isMuted ? 'Click for Sound 🔊' : 'Mute Sound 🔇'}
                    >
                      {!isMuted && isActive ? (
                        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" />
                          <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                          <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                        </svg>
                      ) : (
                        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" />
                          <line x1="23" y1="9" x2="17" y2="15" />
                          <line x1="17" y1="9" x2="23" y2="15" />
                        </svg>
                      )}
                    </button>

                    <button
                      type="button"
                      className="video-control-btn"
                      onClick={(e) => handleExpand(e, item.src, item.title)}
                      aria-label="Expand Fullscreen"
                      title="Expand Video"
                    >
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                      </svg>
                    </button>
                  </div>

                  {/* State Overlay: Active Playing indicator or Click to Play */}
                  {!isCurrentPlaying && (
                    <div className="video-paused-indicator">
                      <div className={`play-pulse-circle ${item.isFeatured ? 'spotlight-pulse' : ''}`}>
                        <svg viewBox="0 0 24 24" width="30" height="30" fill="currentColor">
                          <polygon points="5,3 19,12 5,21" />
                        </svg>
                      </div>
                      <span className="play-hint-text">
                        {isActive ? 'Click to Resume' : 'Click to Play'}
                      </span>
                    </div>
                  )}

                  {/* Stage live badge */}
                  <div className={`video-live-pill ${isActive ? 'active-pill' : ''}`}>
                    <span className={`live-dot ${isActive ? 'dot-active' : ''}`}></span>
                    <span>{item.stage} · {item.pill}</span>
                  </div>

                  {/* Progress Line at bottom */}
                  <div className="video-progress-track">
                    <div
                      className="video-progress-bar"
                      style={{ width: `${progress[item.id] || 0}%` }}
                    />
                  </div>
                </div>

                <div className={`video-card-info ${item.isFeatured ? 'spotlight-info' : ''}`}>
                  <div className="video-card-header">
                    <div className="stage-row">
                      <span className={`video-pill-badge ${isActive ? 'active-badge' : ''}`}>
                        {item.pill}
                      </span>
                      {isActive && isCurrentPlaying && (
                        <span className="now-playing-tag">▶ NOW PLAYING</span>
                      )}
                    </div>
                    <h3>{item.title}</h3>
                  </div>
                  <p>{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Carousel Slider Controls positioned below Video Cards */}
        <div className="video-slider-controls">
          <button
            type="button"
            className="video-nav-arrow arrow-prev"
            onClick={handlePrev}
            aria-label="Previous Video"
            title="Previous Video"
          >
            ‹
          </button>
          <div className="video-dots-row">
            {VIDEO_LIST.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                className={`video-dot-btn ${activeVideoId === item.id ? 'active' : ''}`}
                onClick={() => scrollToCard(item.id)}
                aria-label={`Slide to Stage ${idx + 1}`}
              >
                <span className="dot-num">{idx + 1}</span>
                <span className="dot-label">{item.pill}</span>
              </button>
            ))}
          </div>
          <button
            type="button"
            className="video-nav-arrow arrow-next"
            onClick={handleNext}
            aria-label="Next Video"
            title="Next Video"
          >
            ›
          </button>
        </div>
      </div>

      {/* Lightbox / Fullscreen Modal */}
      {activeVideoModal && (
        <div className="video-lightbox-modal" onClick={() => setActiveVideoModal(null)}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <div className="lightbox-header">
              <h4>{activeVideoModal.title}</h4>
              <button
                type="button"
                className="lightbox-close"
                onClick={() => setActiveVideoModal(null)}
                aria-label="Close Video"
              >
                ✕
              </button>
            </div>
            <div className="lightbox-video-wrap">
              <video
                src={activeVideoModal.src}
                controls
                autoPlay
                playsInline
              >
                Your browser does not support video.
              </video>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
