import { useRef, useState } from "react";

// A swipeable device frame. Screenshots include their own iOS status
// bar, so the frame is bezel-only. Swiping is native scroll-snap —
// touch on mobile, drag/scroll on desktop, dots for pointer users.
export default function PhoneFrame({ screens, label }) {
  const trackRef = useRef(null);
  const [active, setActive] = useState(0);

  const onScroll = () => {
    const el = trackRef.current;
    if (el) setActive(Math.round(el.scrollLeft / el.clientWidth));
  };

  const goTo = (i) => {
    const el = trackRef.current;
    el?.scrollTo({ left: i * el.clientWidth, behavior: "smooth" });
  };

  return (
    <figure style={{ margin: 0 }}>
      <div className="phone">
        <div
          className="phone-track"
          ref={trackRef}
          onScroll={onScroll}
          role="group"
          aria-label={label}
          tabIndex={0}
        >
          {screens.map((s) => (
            <img key={s.img} src={s.img} alt={s.alt} loading="lazy" />
          ))}
        </div>
      </div>
      {screens.length > 1 && (
        <div className="phone-dots">
          {screens.map((s, i) => (
            <button
              key={s.img}
              type="button"
              className={`phone-dot ${i === active ? "active" : ""}`}
              onClick={() => goTo(i)}
              aria-label={`Go to screen ${i + 1} of ${screens.length}`}
              aria-current={i === active}
            />
          ))}
        </div>
      )}
    </figure>
  );
}
